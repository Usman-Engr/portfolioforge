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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#fff",
          color: "#ef4444",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          Render Error
        </h1>
        <p>{error}</p>
      </div>
    );
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        <Loader2
          style={{ width: "40px", height: "40px", color: "#3b82f6" }}
          className="animate-spin"
        />
      </div>
    );
  }

  // ── Render the resume at NATIVE A4 dimensions (no CSS transforms) ─────────
  return (
    <>
      {/*
       * CRITICAL PRINT CSS
       * ------------------
       * We render the resume template components at exactly 210mm × 297mm.
       * No scaling transforms. The Puppeteer PDF engine gets pixel-perfect
       * vector output directly from the browser's Chrome print engine.
       *
       * page-break-inside: avoid is set on section wrappers inside each
       * template component, so long resumes paginate cleanly.
       */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap');

        @page {
          size: A4;
          margin: 0;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          width: 210mm;
          /* Let height be driven by content for multi-page */
        }

        /* Remove any interactive UI chrome that may bleed in */
        .no-print {
          display: none !important;
        }

        /* Section page-break helpers (templates use these classes) */
        .resume-section {
          page-break-inside: avoid;
        }

        .resume-entry {
          page-break-inside: avoid;
        }

        @media print {
          html, body {
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      {/*
       * The resume template component is responsible for its own dimensions.
       * All templates have: width: "210mm", minHeight: "297mm" as root styles.
       * We simply render the component — Puppeteer's Chrome print engine
       * will paginate correctly when content overflows the A4 height.
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#fff",
          }}
        >
          <Loader2
            style={{ width: "40px", height: "40px", color: "#3b82f6" }}
            className="animate-spin"
          />
        </div>
      }
    >
      <ResumeRenderContent templateId={templateId} />
    </Suspense>
  );
}
