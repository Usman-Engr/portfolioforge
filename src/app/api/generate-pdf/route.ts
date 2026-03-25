import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/db/supabase-admin";

// Constants for production PDF generation
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// A4 dimensions in pixels (at 96dpi for consistency)
const A4_WIDTH_PX = 794;   // 210mm at 96dpi
const A4_HEIGHT_PX = 1123; // 297mm at 96dpi

const VIEWPORT = {
  width: A4_WIDTH_PX,
  height: A4_HEIGHT_PX,
  deviceScaleFactor: 1, // Use 1:1 for accurate print rendering
} as const;

const TIMEOUTS = {
  NAVIGATION: 60000,
  RENDER_READY: 30000,
  NETWORK_IDLE: 15000,
  FONT_LOAD: 5000,
} as const;

type GeneratePdfBody = {
  templateId: string;
  data: unknown;
};

// Browser instance reuse
let browserInstance: any = null;

async function getBrowser() {
  if (browserInstance) {
    try {
      const pages = await browserInstance.pages();
      if (pages) return browserInstance;
    } catch {
      console.warn("[PDF] Browser unhealthy, relaunching...");
      browserInstance = null;
    }
  }

  const puppeteer = await import("puppeteer-core");

  if (IS_PRODUCTION) {
    const chromium = await import("@sparticuz/chromium") as any;
    const chromiumDefault = chromium.default ?? chromium;
    browserInstance = await puppeteer.default.launch({
      args: chromiumDefault.args ?? [],
      defaultViewport: chromiumDefault.defaultViewport ?? VIEWPORT,
      executablePath: await chromiumDefault.executablePath(),
      headless: chromiumDefault.headless ?? true,
    });
  } else {
    // Development - local Chrome
    const chromePath = process.env.CHROME_EXECUTABLE_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

    browserInstance = await puppeteer.default.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-features=VizDisplayCompositor",
      ],
      defaultViewport: VIEWPORT,
      executablePath: chromePath,
      headless: true,
    });
  }

  browserInstance.on("disconnected", () => {
    browserInstance = null;
  });

  console.log(`[PDF] Browser launched (${IS_PRODUCTION ? "production" : "development"})`);
  return browserInstance;
}

export async function POST(request: NextRequest) {
  let page: any = null;

  try {
    const body = (await request.json()) as GeneratePdfBody;
    const { templateId, data } = body;

    // Validate inputs
    if (!templateId || !data) {
      return NextResponse.json(
        { error: "Missing templateId or data" },
        { status: 400 }
      );
    }

    console.log(`[PDF] Generating resume: ${templateId}`);

    // Build render URL
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3009";
    const baseUrl = `${protocol}://${host}`;

    // Encode data for URL
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const renderUrl = `${baseUrl}/export/resume/${templateId}?data=${encodeURIComponent(encodedData)}&pdf=1`;

    console.log(`[PDF] Render URL: ${renderUrl.substring(0, 100)}...`);

    // Get browser and page
    const browser = await getBrowser();
    page = await browser.newPage();

    // Set viewport to A4
    await page.setViewport(VIEWPORT);

    // CRITICAL: Use screen media type for proper rendering
    // Using "screen" instead of "print" to avoid print-specific styling issues
    await page.emulateMediaType("screen");

    // Navigate to render URL
    console.log("[PDF] Navigating to render page...");
    await page.goto(renderUrl, {
      waitUntil: ["domcontentloaded", "load"],
      timeout: TIMEOUTS.NAVIGATION,
    });

    // Wait for root element
    console.log("[PDF] Waiting for content...");
    try {
      await page.waitForSelector(".export-canvas-root", {
        timeout: TIMEOUTS.RENDER_READY,
      });
    } catch (error) {
      console.error("[PDF] Root element not found:", error);
      throw new Error("Resume template not rendering properly");
    }

    // Wait for PDF ready signal (fonts loaded, etc.)
    console.log("[PDF] Waiting for PDF ready signal...");
    try {
      await page.waitForFunction(
        () => {
          const win = window as any;
          return (
            win.__PDF_READY__ === true &&
            (!("fonts" in document) ||
              (document as any).fonts?.status === "loaded")
          );
        },
        { timeout: TIMEOUTS.RENDER_READY }
      );
    } catch (error) {
      console.warn("[PDF] PDF ready timeout, proceeding anyway:", error);
      // Continue anyway - content might be ready enough
    }

    // Extra wait for any late-loading content
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get page height for debugging
    const dimensions = await page.evaluate(() => {
      const root = document.querySelector(".export-canvas-root");
      if (!root) return { width: 0, height: 0 };

      const rect = root.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        scrollHeight: root.scrollHeight,
      };
    });

    console.log("[PDF] Page dimensions:", dimensions);

    // Generate PDF with PRODUCTION settings
    console.log("[PDF] Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false, // Let PDF format control size, not CSS
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      scale: 1, // 1:1 scale - no scaling
      displayHeaderFooter: false, // No headers/footers
      omitBackground: false,
    });

    await page.close();
    page = null;

    // Log success
    console.log(`[PDF] Generated successfully (${pdfBuffer.length} bytes)`);

    // Generate filename
    let filename = `resume-${templateId}`;
    try {
      const resumeData = data as { personal?: { fullName?: string } };
      if (resumeData?.personal?.fullName) {
        const safeName = resumeData.personal.fullName
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase();
        filename = `${safeName}-resume`;
      }
    } catch {
      // Use default filename
    }

    // Return PDF with proper headers
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });

  } catch (error: any) {
    console.error("[PDF] Generation failed:", error);

    // Clean up page on error
    if (page) {
      try {
        await page.close();
      } catch {}
    }

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        detail: IS_PRODUCTION ? undefined : error.message,
      },
      { status: 500 }
    );
  } finally {
    // Always close the page
    if (page) {
      try {
        await page.close();
      } catch {}
    }
  }
}
