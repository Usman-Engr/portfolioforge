import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/db/supabase-admin";

// Import the PDF generation function directly
async function generatePDFDirect(templateId: string, data: any, req: NextRequest): Promise<Buffer> {
  // Lazily import to avoid build issues
  const puppeteer = await import("puppeteer-core");

  const IS_PRODUCTION = process.env.NODE_ENV === "production";
  const VIEWPORT = {
    width: 794,   // A4 width in pixels
    height: 1123, // A4 height in pixels
    deviceScaleFactor: 2,
  } as const;

  let browser: any = null;
  let page: any = null;

  try {
    if (IS_PRODUCTION) {
      const chromium = await import("@sparticuz/chromium") as any;
      const chromiumDefault = chromium.default ?? chromium;
      browser = await puppeteer.default.launch({
        args: chromiumDefault.args ?? [],
        defaultViewport: chromiumDefault.defaultViewport ?? VIEWPORT,
        executablePath: await chromiumDefault.executablePath(),
        headless: chromiumDefault.headless ?? true,
      });
    } else {
      // Local development
      const possibleChromePaths = [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ];

      const chromePath = process.env.CHROME_EXECUTABLE_PATH || possibleChromePaths[0];

      browser = await puppeteer.default.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
        defaultViewport: VIEWPORT,
        executablePath: chromePath,
        headless: true,
      });
    }

    page = await browser.newPage();

    // Build render URL
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3009";
    const baseUrl = `${protocol}://${host}`;

    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const renderUrl = `${baseUrl}/export/resume/${templateId}?data=${encodeURIComponent(encodedData)}&pdf=1`;

    console.log(`[PDF] Rendering resume: ${templateId}`);

    // Navigate to the render URL
    await page.goto(renderUrl, {
      waitUntil: ["networkidle0", "domcontentloaded", "load"],
      timeout: 60000,
    });

    // Wait for the content to be ready
    await page.waitForSelector(".export-canvas-root", {
      timeout: 30000,
    });

    // Wait for PDF ready signal
    await page.waitForFunction(
      () => {
        const pdfReady = (window as any).__PDF_READY__;
        const fontsReady = !("fonts" in document) || (document as any).fonts?.status === "loaded";
        return Boolean(pdfReady && fontsReady);
      },
      { timeout: 30000 }
    );

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (page) {
      try {
        await page.close();
      } catch {}
    }
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let page: any = null;

  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch resume data
    const { data: resume, error } = await supabaseAdmin
      .from("app_resumes")
      .select("*")
      .eq("id", id)
      .eq("user_id", session.user.id)
      .single();

    if (error || !resume) {
      console.error("Resume fetch error:", error);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Generate PDF directly
    const pdfBuffer = await generatePDFDirect(
      resume.template_id,
      resume.data,
      request
    );

    // Create filename
    const filename = `${resume.title.replace(/\s+/g, "-")}-resume.pdf`;

    // Return PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });

  } catch (error: any) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        detail: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
