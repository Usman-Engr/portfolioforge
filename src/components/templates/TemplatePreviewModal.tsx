import {
  X,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Loader2,
} from "lucide-react";
import { TemplateInfo } from "@/lib/templates";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { demoPortfolioData, PortfolioData } from "@/lib/types/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { downloadProfessionalPDF } from "@/lib/utils/pdf-service";
import IFramePreview from "@/components/templates/IFramePreview";

interface TemplatePreviewModalProps {
  template: TemplateInfo;
  customData?: PortfolioData;
  onClose: () => void;
  onUse: () => void;
  hideUseButton?: boolean;
}

export default function TemplatePreviewModal({
  template,
  customData,
  onClose,
  onUse,
  hideUseButton = false,
}: TemplatePreviewModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const dataToUse = customData || demoPortfolioData;
      await downloadProfessionalPDF(
        template.id,
        dataToUse,
        `${dataToUse.personal.name || "portfolio"}-${template.id}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const dataToRender = customData || demoPortfolioData;

  return (
    <div
      className="fixed inset-0 z-60 overflow-y-auto"
      id="template-preview-modal"
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-60"
        />

        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-zinc-900 rounded-[40px] shadow-2xl overflow-hidden border border-white/10 z-70"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-10 py-6 border-b border-white/5 bg-black/95 backdrop-blur-xl z-70 shrink-0">
            <div className="flex items-center gap-8">
              <button
                onClick={onClose}
                className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Close
                </span>
              </button>

              <div className="h-8 w-px bg-white/10 hidden md:block" />

              <div className="hidden lg:flex items-center gap-2 px-1 py-1 bg-white/5 rounded-full border border-white/5">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === "desktop"
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("tablet")}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === "tablet"
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === "mobile"
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center pointer-events-none">
              <h2 className="text-lg font-black tracking-tighter text-white uppercase italic">
                {template.name}
              </h2>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">
                {customData ? "Live Preview" : "Template Demo"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 h-10 shrink-0"
              >
                {isDownloading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              {!hideUseButton && (
                <button
                  onClick={onUse}
                  className="group flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] h-10 shrink-0"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">
                    {template.isPremium ? "Upgrade" : "Design"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-hidden bg-[#0a0a0a] p-4 lg:p-10 relative z-10 h-[calc(100vh-280px)]">
            <div
              id="portfolio-preview-content"
              className={`mx-auto h-full overflow-y-auto custom-scrollbar rounded-2xl bg-[#050505] transition-all duration-700 shadow-2xl ${
                viewMode === "mobile"
                  ? "max-w-[375px]"
                  : viewMode === "tablet"
                  ? "max-w-[768px]"
                  : "w-full"
              }`}
            >
              <IFramePreview className="w-full h-full border-0">
                {renderTemplate(template.id, dataToRender)}
              </IFramePreview>
            </div>
          </div>

          {/* Tech Specs Info */}
          <div className="px-10 py-5 border-t border-white/5 bg-black/40 flex items-center justify-between z-70">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                High Fidelity Render
              </span>
            </div>
            <p className="text-[10px] font-black italic text-gray-600 tracking-widest">
              PORTFOLIOFORGE STUDIO V1.0
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
