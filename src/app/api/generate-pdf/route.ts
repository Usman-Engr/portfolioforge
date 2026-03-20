import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { getTemplateById } from "@/lib/templates";
import { getResumeTemplateById } from "@/lib/resume-templates";

// Basic config
const isProduction = process.env.NODE_ENV === 'production';

// VIEWPORT and other constants...
const VIEWPORT = {
  width: 1200,
  height: 1600,
  deviceScaleFactor: 2,
} as const;

const NAVIGATION_TIMEOUT_MS = 60_000;
const RENDER_READY_TIMEOUT_MS = 30_000;

type GeneratePdfBody = {
  templateId: string;
  data: unknown;
};

export async function POST(req: NextRequest) {
  let browser: any = null;

  try {
    const body = (await req.json()) as GeneratePdfBody;
    const templateId = body?.templateId;
    const data = body?.data;

    if (!templateId || !data) {
      return NextResponse.json(
        { error: "Missing templateId or portfolio data" },
        { status: 400 }
      );
    }

    if (
      typeof templateId !== "string" ||
      (!getTemplateById(templateId) && !getResumeTemplateById(templateId))
    ) {
      return NextResponse.json({ error: "Invalid templateId" }, { status: 400 });
    }

    // Determine the base URL for the render route
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3002";
    const baseUrl = `${protocol}://${host}`;

    // Base64 encode data to pass in URL
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const renderUrl = `${baseUrl}/export/render/${templateId}?data=${encodeURIComponent(encodedData)}&pdf=1`;

    console.log(`[PDF] Rendering template: ${templateId} in ${isProduction ? 'PROD' : 'DEV'}`);

    // Launch puppeteer with sparticuz/chromium config for Vercel
    browser = await puppeteer.launch({
      args: isProduction ? chromium.args : ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: isProduction ? (chromium as any).defaultViewport : VIEWPORT,
      executablePath: isProduction ? await chromium.executablePath() : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: isProduction ? (chromium as any).headless : true,
    });

    const page = await browser.newPage();

    // Lock viewport to fixed canvas contract.
    await page.setViewport(VIEWPORT);
    // Keep screen media for PDF parity with the live template layout.
    await page.emulateMediaType("screen");

    // Wait for full network idle and hydration.
    await page.goto(renderUrl, {
      waitUntil: ["networkidle0", "domcontentloaded", "load"],
      timeout: NAVIGATION_TIMEOUT_MS,
    });

    // Ensure the export canvas root exists before checking readiness flags.
    await page.waitForSelector(".export-canvas-root", {
      timeout: RENDER_READY_TIMEOUT_MS,
    });

    // Deterministic readiness gate: fonts and render signal must both be ready.
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

    // Keep one extra paint cycle to avoid late style application races.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        })
    );

    await page.waitForNetworkIdle({
      idleTime: 500,
      timeout: RENDER_READY_TIMEOUT_MS,
    });

    // Allow any motion effects to settle before capture.
    await page.evaluate(
      () => new Promise<void>((resolve) => setTimeout(resolve, 2200))
    );

    // Generate PDF following the export route print contract.
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    await page.close();

    // Return the PDF file directly.
    const responseBuffer = Buffer.from(pdfBuffer);

    return new NextResponse(responseBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="portfolio-${templateId}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("[PDF] Generation Error");
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
