"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { templates, TemplateInfo } from "@/lib/templates";
import {
  Eye,
  Sparkles,
  Check,
  Loader2,
  Zap,
  ArrowRight,
  Layout,
  Star,
} from "lucide-react";
import TemplatePreviewModal from "@/components/templates/TemplatePreviewModal";
import { motion, AnimatePresence } from "framer-motion";

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/templates");
    }
  }, [status, router]);

  const handleUseTemplate = async (template: TemplateInfo) => {
    router.push(`/builder-new?template=${template.id}`);
  };

  const handlePreview = (template: TemplateInfo) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-bold tracking-widest uppercase animate-pulse">
            Loading Gallery...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-full h-full bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-full h-full bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-purple-400 fill-current" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
              The 2024 Collection
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">
            SELECT YOUR <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-purple-500/20 underline-offset-8 transition-all hover:tracking-widest duration-700">
              STUDIO BASE.
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            High-fidelity, cinematic templates designed to capture attention
            instantly. Choose your canvas and start building a world-class
            presence.
          </p>
        </motion.div>

        {/* Templates Grid Container */}
        <div className="space-y-32">
          {/* Developers Section */}
          <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                  <Layout className="w-8 h-8 text-blue-500" />
                  Engineering & Tech
                </h2>
                <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
                  High-performance layouts for developers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates
                .filter((t) => t.targetAudience === "developer")
                .map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    index={index}
                    template={template}
                    onPreview={() => handlePreview(template)}
                    onUse={() => handleUseTemplate(template)}
                  />
                ))}
            </div>
          </section>

          {/* Designers Section */}
          <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  Creative & Design
                </h2>
                <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
                  Visual-first portfolios for artists and designers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates
                .filter((t) => t.targetAudience === "designer")
                .map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    index={index}
                    template={template}
                    onPreview={() => handlePreview(template)}
                    onUse={() => handleUseTemplate(template)}
                  />
                ))}
            </div>
          </section>

          {/* Corporate/Resume Section */}
          <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  Corporate & Resume
                </h2>
                <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
                  Professional excellence for all careers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates
                .filter(
                  (t) =>
                    t.targetAudience === "corporate" ||
                    t.category === "resume" ||
                    t.category === "non-tech"
                )
                .map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    index={index}
                    template={template}
                    onPreview={() => handlePreview(template)}
                    onUse={() => handleUseTemplate(template)}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedTemplate && (
          <TemplatePreviewModal
            template={selectedTemplate}
            onClose={() => setShowPreview(false)}
            onUse={() => handleUseTemplate(selectedTemplate)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplateCard({
  template,
  index,
  onPreview,
  onUse,
}: {
  template: TemplateInfo;
  index: number;
  onPreview: () => void;
  onUse: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-[#121212] border border-white/5 rounded-[40px] overflow-hidden hover:border-purple-500/50 transition-all duration-700 hover:-translate-y-2 shadow-2xl"
    >
      {/* Visual Header */}
      <div className="relative h-80 overflow-hidden bg-gray-900">
        {template.thumbnailUrl ? (
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center p-12 bg-black/20 group-hover:bg-black/0 transition-colors">
          {!template.thumbnailUrl && (
            <div className="w-full h-full border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-6 group-hover:border-white/20 transition-colors">
              <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-500">
                <Layout className="w-10 h-10 text-white/50 group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                  {template.id} system
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interaction Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={onPreview}
            className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-110 transition-transform"
          >
            Live Preview
          </button>
          <button
            onClick={onUse}
            className="px-6 py-3 bg-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-full hover:scale-110 transition-transform"
          >
            Select
          </button>
        </div>
      </div>

      {/* Information Body */}
      <div className="p-10 grow flex flex-col">
        <div className="mb-6">
          <h3 className="text-3xl font-black italic tracking-tighter group-hover:text-purple-400 transition-colors mb-2 uppercase">
            {template.name}
          </h3>
          <p className="text-gray-500 font-medium line-clamp-2">
            {template.description}
          </p>
        </div>

        <div className="space-y-3 mt-auto">
          {template.features.slice(0, 3).map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-xs font-bold text-gray-400"
            >
              <div className="w-1 h-1 bg-purple-500 rounded-full" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            Template Collection
          </div>
          <button
            onClick={onUse}
            className="flex items-center gap-2 text-[10px] font-black text-purple-400 hover:text-white transition-colors group/btn"
          >
            LAUNCH NOW
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
