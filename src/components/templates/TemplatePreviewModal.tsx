"use client";

import {
  X,
  Edit3,
  ArrowRight,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { TemplateInfo } from "@/lib/templates";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { demoPortfolioData } from "@/lib/types/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TemplatePreviewModalProps {
  template: TemplateInfo;
  onClose: () => void;
  onUse: () => void;
}

export default function TemplatePreviewModal({
  template,
  onClose,
  onUse,
}: TemplatePreviewModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/95 backdrop-blur-2xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full h-full max-w-[1600px] bg-[#050505] rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/5"
      >
        {/* Wix-Style Premium Header */}
        <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl z-50">
          <div className="flex items-center gap-8">
            <button
              onClick={onClose}
              className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-xs font-black uppercase tracking-widest">
                Close Preview
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

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-black tracking-tighter text-white uppercase italic">
              {template.name}
            </h2>
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">
              Studio Preview Mode
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onUse}
              className="group flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Zap className="w-4 h-4 fill-current" />
              {template.isPremium ? "Upgrade & Build" : "Start Designing"}
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-[#0a0a0a] p-4 lg:p-10">
          <div
            className={`mx-auto h-full overflow-y-auto custom-scrollbar rounded-2xl bg-[#050505] transition-all duration-700 shadow-2xl ${
              viewMode === "mobile"
                ? "max-w-[375px]"
                : viewMode === "tablet"
                ? "max-w-[768px]"
                : "w-full"
            }`}
          >
            {renderTemplate(template.id, demoPortfolioData)}
          </div>
        </div>

        {/* Tech Specs Info */}
        <div className="px-10 py-5 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {template.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-black italic text-gray-600 tracking-widest">
            PORTFOLIOFORGE STUDIO V1.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
