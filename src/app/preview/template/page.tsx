"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { templates } from "@/lib/templates";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { PortfolioData } from "@/lib/types/portfolio";
import IFramePreview from "@/components/templates/IFramePreview";
import {
  X,
  Monitor,
  Smartphone,
  Tablet,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";

function BuilderTemplatePreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from sessionStorage (set by builder before navigation)
    const savedData = sessionStorage.getItem("builderPreviewData");
    const savedTemplateId = searchParams.get("templateId");

    if (savedData && savedTemplateId) {
      setPortfolioData(JSON.parse(savedData));
      setTemplateId(savedTemplateId);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-gray-400 font-bold tracking-widest uppercase animate-pulse">
          Loading Preview...
        </div>
      </div>
    );
  }

  if (!portfolioData || !templateId) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Preview Not Available</h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-black rounded-full font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const template = templates.find((t) => t.id === templateId) || templates[0];

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden">
      {/* Close Button - Top Left */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-xl group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back</span>
      </button>

      {/* Close Button - Top Right */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-xl group"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-black uppercase tracking-widest">Close</span>
      </button>

      {/* Template Info - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h2 className="text-lg font-black tracking-tighter text-white uppercase italic">
          {template.name}
        </h2>
        <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mt-1">
          Preview with Your Data
        </p>
      </div>

      {/* View Mode Controls */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 bg-black/80 backdrop-blur-xl rounded-full border border-white/10">
        <button
          onClick={() => setViewMode("desktop")}
          className={`p-2.5 rounded-full transition-all ${
            viewMode === "desktop"
              ? "bg-white text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          }`}
          title="Desktop View"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("tablet")}
          className={`p-2.5 rounded-full transition-all ${
            viewMode === "tablet"
              ? "bg-white text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          }`}
          title="Tablet View"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("mobile")}
          className={`p-2.5 rounded-full transition-all ${
            viewMode === "mobile"
              ? "bg-white text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          }`}
          title="Mobile View"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Select Template Button - Bottom Center */}
      <button
        onClick={() => {
          // Navigate back and signal to select this template
          if (window.opener) {
            window.opener.postMessage(
              { type: "SELECT_TEMPLATE", templateId },
              "*"
            );
          }
          router.back();
        }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        <span>Select This Template</span>
      </button>

      {/* Template Preview Content */}
      <div className="w-full h-screen flex items-center justify-center p-8 pt-28 pb-24">
        <div
          className={`w-full h-full bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden border border-white/5 transition-all duration-500 ${
            viewMode === "mobile"
              ? "max-w-[400px]"
              : viewMode === "tablet"
              ? "max-w-[900px]"
              : "max-w-7xl"
          }`}
        >
          <IFramePreview className="w-full h-full border-0 bg-white">
            {renderTemplate(template.id, portfolioData)}
          </IFramePreview>
        </div>
      </div>
    </div>
  );
}

export default function BuilderTemplatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="text-gray-400 font-bold tracking-widest uppercase animate-pulse">
            Loading Preview...
          </div>
        </div>
      }
    >
      <BuilderTemplatePreviewContent />
    </Suspense>
  );
}
