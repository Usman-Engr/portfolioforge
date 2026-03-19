"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, use, Suspense } from "react";
import { renderTemplateForExport } from "@/lib/utils/template-renderer";
import { PortfolioData } from "@/lib/types/portfolio";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

function RenderContent({ templateId }: { templateId: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isPdfMode = searchParams.get("pdf") === "1";

  useEffect(() => {
    try {
      const dataParam = searchParams.get("data");
      if (dataParam) {
        // We expect base64 encoded JSON to avoid URL character issues
        const decoded = atob(dataParam);
        setData(JSON.parse(decoded));
      } else {
        setError("No portfolio data provided");
      }
    } catch (e) {
      console.error("Failed to parse portfolio data:", e);
      setError("Invalid portfolio data format");
    }
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      let cancelled = false;

      const signalReady = async () => {
        if ("fonts" in document) {
          await document.fonts.ready;
        }

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });

        if (cancelled) return;

        (
          window as Window & { __PDF_READY__?: boolean; status?: string }
        ).__PDF_READY__ = true;
        (
          window as Window & { __PDF_READY__?: boolean; status?: string }
        ).status = "ready";
        document.documentElement.classList.add("ready-for-pdf");
      };

      signalReady();

      return () => {
        cancelled = true;
      };
    }
  }, [data]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-red-500 p-10">
        <h1 className="text-2xl font-bold mb-4">Render Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --export-canvas-width: 1200px;
          --export-a4-scale: 0.661417;
        }

        html,
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: #fff !important;
        }

        .export-render-shell {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #fff;
        }

        .export-canvas-print-frame {
          width: var(--export-canvas-width);
          overflow: visible;
          background: #fff;
        }

        .export-canvas-root {
          width: var(--export-canvas-width);
          margin: 0;
          padding: 0;
          background: #fff;
          transform-origin: top left;
        }

        .pdf-mode.export-render-shell {
          width: 210mm;
          min-height: 297mm;
          display: block;
          margin: 0;
          padding: 0;
          background: #fff;
        }

        .pdf-mode .export-canvas-print-frame {
          width: 210mm;
          min-height: 297mm;
          overflow: hidden;
          margin: 0;
          padding: 0;
          background: #fff;
        }

        .pdf-mode .export-canvas-root {
          width: var(--export-canvas-width);
          margin: 0;
          padding: 0;
          transform: scale(var(--export-a4-scale));
          transform-origin: top left;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .export-render-shell {
            width: 210mm !important;
            min-height: 297mm !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }

          .export-canvas-print-frame {
            width: 210mm !important;
            min-height: 297mm !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .export-canvas-root {
            width: var(--export-canvas-width) !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: scale(var(--export-a4-scale)) !important;
            transform-origin: top left !important;
          }
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `}</style>

      <div className={`export-render-shell ${isPdfMode ? "pdf-mode" : ""}`}>
        <div className="export-canvas-print-frame">
          <div className="export-canvas-root">
            {renderTemplateForExport(templateId, data)}
          </div>
        </div>
      </div>
    </>
  );
}

export default function RenderPage({ params }: PageProps) {
  const { templateId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      }
    >
      <RenderContent templateId={templateId} />
    </Suspense>
  );
}
