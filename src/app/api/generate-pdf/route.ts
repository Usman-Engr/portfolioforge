import { NextRequest, NextResponse } from "next/server";
import { getTemplateById } from "@/lib/templates";
import { getResumeTemplateById } from "@/lib/resume-templates";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const VIEWPORT = {
  width: 794,   // Exact pixel-equivalent of 210mm at 96dpi
  height: 1123, // Exact pixel-equivalent of 297mm at 96dpi
  deviceScaleFactor: 2, // HiDPI for crisp text
} as const;

const NAVIGATION_TIMEOUT_MS = 60_000;
const RENDER_READY_TIMEOUT_MS = 30_000;
const NETWORK_IDLE_TIMEOUT_MS = 15_000;

type GeneratePdfBody = {
  templateId: string;
  data: unknown;
};

// ---------------------------------------------------------------------------
// Browser singleton — reuse across requests (critical for performance)
// ---------------------------------------------------------------------------
let browserInstance: import("puppeteer-core").Browser | null = null;

async function getBrowser(): Promise<import("puppeteer-core").Browser> {
  // If we have a live browser, return it
  if (browserInstance) {
    try {
      // Health-check: if this throws the browser crashed
      const pages = await browserInstance.pages();
      if (pages !== undefined) {
        return browserInstance;
      }
    } catch {
      console.warn("[PDF] Browser instance unhealthy, relaunching...");
      browserInstance = null;
    }
  }

  // Lazily import so Next.js doesn't attempt to bundle Chromium at build time
  const puppeteer = await import("puppeteer-core");

  if (IS_PRODUCTION) {
    // @sparticuz/chromium types are incomplete — cast to access runtime properties
    const chromium = await import("@sparticuz/chromium") as any;
    const chromiumDefault = chromium.default ?? chromium;
    browserInstance = await puppeteer.default.launch({
      args: chromiumDefault.args ?? [],
      defaultViewport: chromiumDefault.defaultViewport ?? VIEWPORT,
      executablePath: await chromiumDefault.executablePath(),
      headless: chromiumDefault.headless ?? true,
    });
  } else {
    // Local development — use the system Chrome installation
    // Adjust this path if Chrome is installed elsewhere on your machine
    const possibleChromePaths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ];

    // Use environment variable override if set
    const chromePath =
      process.env.CHROME_EXECUTABLE_PATH ||
      possibleChromePaths.find((p) => {
        try {
          require("fs").accessSync(p);
          return true;
        } catch {
          return false;
        }
      }) ||
      possibleChromePaths[0];

    browserInstance = await puppeteer.default.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--font-render-hinting=none", // Ensures consistent font rendering
      ],
      defaultViewport: VIEWPORT,
      executablePath: chromePath,
      headless: true,
    });
  }

  // Clean up on process exit so we don't leave zombie Chromium processes
  browserInstance.on("disconnected", () => {
    browserInstance = null;
  });

  console.log(`[PDF] Browser launched (${IS_PRODUCTION ? "prod" : "dev"})`);
  return browserInstance;
}

// ---------------------------------------------------------------------------
// POST /api/generate-pdf
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  let page: import("puppeteer-core").Page | null = null;

  try {
    const body = (await req.json()) as GeneratePdfBody;
    const { templateId, data } = body;

    // ── Input validation ──────────────────────────────────────────────────
    if (!templateId || typeof templateId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid templateId" },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Missing resume/portfolio data" },
        { status: 400 }
      );
    }

    const isResumeTemplate = templateId.startsWith("resume-");
    const isValidTemplate = isResumeTemplate
      ? Boolean(getResumeTemplateById(templateId))
      : Boolean(getTemplateById(templateId));

    if (!isValidTemplate) {
      return NextResponse.json({ error: "Invalid templateId" }, { status: 400 });
    }

    // ── Build render URL ──────────────────────────────────────────────────
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3009";
    const baseUrl = `${protocol}://${host}`;

    // Base64-encode JSON data to safely pass through URL query params
    // (avoids special character encoding issues with complex data)
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");

    // Resume templates use the dedicated high-fidelity route;
    // portfolio templates continue to use the existing generic render route.
    const renderPath = isResumeTemplate
      ? `/export/resume/${templateId}`
      : `/export/render/${templateId}`;

    const renderUrl = `${baseUrl}${renderPath}?data=${encodeURIComponent(encodedData)}&pdf=1`;

    console.log(`[PDF] Rendering: ${templateId} → ${renderUrl}`);

    // ── Acquire browser page ──────────────────────────────────────────────
    const browser = await getBrowser();
    page = await browser.newPage();

    // Use screen media so Tailwind's responsive classes apply correctly
    // (the template CSS already handles @media print adjustments)
    await page.emulateMediaType("screen");
    await page.setViewport(VIEWPORT);

    // ── Navigate and wait for full render ─────────────────────────────────
    await page.goto(renderUrl, {
      waitUntil: ["networkidle0", "domcontentloaded", "load"],
      timeout: NAVIGATION_TIMEOUT_MS,
    });

    // Wait for the resume root element to appear in the DOM
    await page.waitForSelector(".export-canvas-root", {
      timeout: RENDER_READY_TIMEOUT_MS,
    });

    // Wait for deterministic readiness signal:
    // window.__PDF_READY__ is set by the render page AFTER fonts.ready + 2×rAF
    await page.waitForFunction(
      () => {
        const pdfReady = (window as Window & { __PDF_READY__?: boolean })
          .__PDF_READY__;
        const fontsReady =
          !("fonts" in document) ||
          (document as Document & { fonts?: FontFaceSet }).fonts?.status ===
            "loaded";
        return Boolean(pdfReady && fontsReady);
      },
      { timeout: RENDER_READY_TIMEOUT_MS }
    );

    // One extra rAF to catch any late-applied styles (e.g. CSS custom properties)
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
    );

    // Brief network idle check to ensure remote fonts / assets are done
    try {
      await page.waitForNetworkIdle({
        idleTime: 300,
        timeout: NETWORK_IDLE_TIMEOUT_MS,
      });
    } catch {
      // Non-fatal: network may have already settled; proceed to capture
      console.warn("[PDF] Network idle timeout reached — proceeding anyway");
    }

    // ── Generate A4 PDF ───────────────────────────────────────────────────
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,  // Ensures colored backgrounds are included
      preferCSSPageSize: true, // Respects @page { size: A4; margin: 0 }
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    await page.close();
    page = null;

    // ── Derive filename ───────────────────────────────────────────────────
    let fileName = `resume-${templateId}`;
    try {
      const resumeData = data as { personal?: { fullName?: string } };
      if (resumeData?.personal?.fullName) {
        const safeName = resumeData.personal.fullName
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase();
        fileName = `${safeName}-resume`;
      }
    } catch {
      // Fallback filename is fine
    }

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[PDF] Generation failed:", message);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        detail: IS_PRODUCTION ? undefined : message,
      },
      { status: 500 }
    );
  } finally {
    // Always close the page (not the browser) so the instance can be reused
    if (page) {
      try {
        await page.close();
      } catch {
        // Ignore close errors
      }
    }
  }
}
