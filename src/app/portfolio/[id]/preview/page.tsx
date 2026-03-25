"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function PortfolioPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolios/${id}`);
        if (response.ok) {
          const portfolio = await response.json();
          setPortfolioData(portfolio.data);
          setTemplateId(portfolio.template_id);
        } else {
          setError("Failed to load portfolio");
        }
      } catch (err) {
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
          <p className="text-gray-400 font-bold tracking-widest uppercase animate-pulse">
            Loading Preview...
          </p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData || !templateId) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            {error || "Portfolio Not Found"}
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-white text-black rounded-full font-bold"
          >
            Back to Dashboard
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
          Your Portfolio Preview
        </p>
      </div>

      {/* View Mode Controls - Top Center (below template name) */}
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

      {/* Edit Button - Bottom Center */}
      <button
        onClick={() => router.push(`/builder?id=${id}`)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        <span>Edit Portfolio</span>
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
