import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { templateId, data } = await req.json();

    if (!templateId || !data) {
      return NextResponse.json(
        { error: "Missing templateId or portfolio data" },
        { status: 400 }
      );
    }

    // Determine the base URL for the render route
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Base64 encode data to pass in URL
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const renderUrl = `${baseUrl}/export/render/${templateId}?data=${encodedData}`;

    console.log(`[PDF] Launching browser to render: ${baseUrl}/export/render/${templateId}`);

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set a fixed desktop width to trigger the desktop layout
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2,
    });

    // 1. Wait for various load states with a longer timeout for stability
    await page.goto(renderUrl, {
      waitUntil: ["networkidle2", "domcontentloaded", "load"],
      timeout: 60000,
    });

    // 2. Extra safety for fonts and layout signal
    await page.evaluateHandle('document.fonts.ready');
    await page.waitForFunction('window.status === "ready"', {
      timeout: 10000,
    });

    // 3. Generate PDF with layout lock settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true, // Follow @media print with zoom
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    await browser.close();

    // Return the PDF blob
    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/json", // We return a buffer that the frontend will blob-ify
        "Content-Disposition": `attachment; filename="portfolio-${templateId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("[PDF] Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error.message },
      { status: 500 }
    );
  }
}
