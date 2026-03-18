"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, use, Suspense } from "react";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { PortfolioData } from "@/lib/types/portfolio";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

function RenderContent({ templateId }: { templateId: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      // Signal to Puppeteer that we are ready
      const timer = setTimeout(() => {
        (window as any).status = "ready";
        document.documentElement.classList.add("ready-for-pdf");
      }, 1000);
      return () => clearTimeout(timer);
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
          @media print {
            @page {
              size: A4;
              margin: 15mm 10mm !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: white !important;
            }
            .no-print {
              display: none !important;
            }
            
            /* Add some breathing room at the start of the document */
            .template-container {
              padding-top: 5mm !important;
            }
            
            /* Ensure layouts don't shrink but keep their flex/grid nature */
            .template-container > div {
              padding: 0 !important;
              margin: 0 !important;
              width: 210mm !important;
              max-width: none !important;
              min-height: auto !important;
              background: white !important;
              display: block !important;
            }

            /* Reclaim space by reducing inner padding for print */
            .template-container div {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }
            .template-container header, 
            .template-container section, 
            .template-container .section {
               padding-left: 0 !important;
               padding-right: 0 !important;
            }

            /* Prevent awkward splits for cards and headers */
            h1, h2, h3, h4, 
            .card, .project-card, .skill-card, .experience-item, 
            header, section, .section, [class*="bg-white/5"] {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }

            .template-container {
              width: 210mm !important;
              height: auto !important;
              overflow: visible !important;
              background: transparent !important;
            }
          }
          
          /* Ensure backgrounds are rendered exactly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* General PDF container constraints */
          .template-container {
            width: 210mm !important;
            min-height: 100vh;
            margin: 0 auto;
          }
        `}</style>
      
      <div className="template-container">
        {renderTemplate(templateId, data)}
      </div>
    </>
  );
}

export default function RenderPage({ params }: PageProps) {
  const { templateId } = use(params);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    }>
      <RenderContent templateId={templateId} />
    </Suspense>
  );
}
