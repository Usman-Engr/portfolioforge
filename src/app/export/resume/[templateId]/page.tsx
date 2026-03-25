"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, use, Suspense } from "react";
import { renderResumeTemplateForExport } from "@/lib/utils/resume-template-renderer";
import { ResumeData } from "@/lib/types/resume";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

// ---------------------------------------------------------------------------
// Inner component — consumes searchParams (must be inside <Suspense>)
// ---------------------------------------------------------------------------
function ResumeRenderContent({ templateId }: { templateId: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── 1. Decode resume data from URL ────────────────────────────────────────
  useEffect(() => {
    try {
      const dataParam = searchParams.get("data");
      if (!dataParam) {
        setError("No resume data provided");
        return;
      }
      // Data is base64-encoded JSON, identical to what the API route encodes
      const decoded = Buffer.from(dataParam, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded) as ResumeData;
      setData(parsed);
    } catch (e) {
      console.error("[ResumeRender] Failed to parse resume data:", e);
      setError("Invalid resume data format");
    }
  }, [searchParams]);

  // ── 2. Signal readiness to Puppeteer once data + fonts are loaded ─────────
  useEffect(() => {
    if (!data) return;

    let cancelled = false;

    const signalReady = async () => {
      // Wait for all fonts (Google Fonts, system fonts, etc.) to finish loading
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      // Additional time for custom fonts to fully render
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      // Two rAF cycles to ensure the last paint is committed
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      if (cancelled) return;

      // Puppeteer polls for window.__PDF_READY__ === true before capturing
      (window as Window & { __PDF_READY__?: boolean }).__PDF_READY__ = true;
      document.documentElement.classList.add("ready-for-pdf");
    };

    signalReady();
    return () => { cancelled = true; };
  }, [data]);

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-600 p-10 font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Render Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // ── Render the resume at NATIVE A4 dimensions with PRODUCTION-READY CSS ───────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Merriweather:wght@300;400;700&family=Roboto+Slab:wght@400;500;700&family=Source+Sans+Pro:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap');

        /* ─────────────────────────────────────────────────────────────────
           CRITICAL: RESET ALL DEFAULT BROWSER STYLES
           ───────────────────────────────────────────────────────────────── */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Ensure no default margins on common elements */
        h1, h2, h3, h4, h5, h6, p, div, span, section {
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px; /* Base font size for rem units */
          width: 210mm;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          width: 210mm !important;
          min-height: 297mm;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* ─────────────────────────────────────────────────────────────────
           PAGE & MARGIN CONFIGURATION
           ───────────────────────────────────────────────────────────────── */
        @page {
          size: A4;
          margin: 0; /* No margins - template handles padding */
        }

        /* ─────────────────────────────────────────────────────────────────
           PREVENT EXTRA BLANK PAGES
           ───────────────────────────────────────────────────────────────── */
        .export-canvas-root {
          /* NO minHeight - prevents forced page breaks */
          width: 210mm;
          height: auto;
          /* Critical: display block not inline-block to prevent white space */
          display: block;
          background: #ffffff;
          position: relative;
          margin: 0;
          padding: 0;
          /* Force block layout context but allow natural page breaks */
        }

        /* ─────────────────────────────────────────────────────────────────
           PREVENT UNWANTED PAGE BREAKS
           ───────────────────────────────────────────────────────────────── */
        .resume-section {
          page-break-inside: avoid;
          orphans: 2;
          widows: 2;
        }

        .resume-entry {
          page-break-inside: avoid;
          orphans: 3;
          widows: 3;
        }

        .no-break {
          page-break-inside: avoid;
        }

        /* Force page break before major sections if needed */
        .page-break-before {
          page-break-before: always;
        }

        .page-break-after {
          page-break-after: always;
        }

        /* Hide elements during export */
        .no-print {
          display: none !important;
        }

        /* ─────────────────────────────────────────────────────────────────
           PRINT-SPECIFIC OPTIMIZATIONS
           ───────────────────────────────────────────────────────────────── */
        @media print {
          /* Ensure proper color reproduction */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Remove any shadows or filters that don't print well */
          * {
            box-shadow: none !important;
            text-shadow: none !important;
            filter: none !important;
          }

          /* Background colors should print */
          * {
            background-color: initial !important;
            color-adjust: exact !important;
          }

          html, body {
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            min-height: 297mm !important;
          }

          .export-canvas-root {
            display: block !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Ensure links don't show URLs in print */
          a {
            text-decoration: none;
            color: inherit !important;
          }

          a[href]::after {
            content: none !important;
          }

          /* Remove any interactive elements */
          button, .no-print {
            display: none !important;
          }
        }

        /* ─────────────────────────────────────────────────────────────────
           FONT OPTIMIZATIONS FOR PDF
           ───────────────────────────────────────────────────────────────── */
        /* Preload critical fonts */
        @font-face {
          font-family: 'Georgia';
          src: local('Georgia'), local('Georgia Regular');
          font-display: swap;
        }

        @font-face {
          font-family: 'Times New Roman';
          src: local('Times New Roman');
          font-display: swap;
        }

        @font-face {
          font-family: Arial;
          src: local('Arial');
          font-display: swap;
        }
      `}</style>

      {/*
        The resume template component is rendered with:
        - width: 210mm (A4 width)
        - NO minHeight (prevents extra pages)
        - Proper page-break-inside: avoid classes
      */}
      <div className="export-canvas-root">
        {renderResumeTemplateForExport(templateId, data)}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------
export default function ResumeRenderPage({ params }: PageProps) {
  const { templateId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      }
    >
      <ResumeRenderContent templateId={templateId} />
    </Suspense>
  );
}
