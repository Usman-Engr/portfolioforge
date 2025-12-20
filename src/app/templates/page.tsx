"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { templates, TemplateInfo } from "@/lib/templates";
import {
  Eye,
  Sparkles,
  Lock,
  Check,
  Loader2,
  Zap,
  ArrowRight,
  Layout,
  Star,
} from "lucide-react";
import TemplatePreviewModal from "@/components/templates/TemplatePreviewModal";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/templates");
    }
  }, [status, router]);

  const handleUseTemplate = async (template: TemplateInfo) => {
    if (template.isPremium) {
      const userSubscription = (session?.user as any)?.subscriptionStatus;
      if (userSubscription === "premium") {
        router.push(`/builder-new?template=${template.id}`);
        return;
      }

      setIsCheckingOut(true);
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateId: template.id,
            templateName: template.name,
            price: 29.99,
          }),
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Checkout Unavailable", {
            description: "The payment gateway is currently offline.",
          });
          setIsCheckingOut(false);
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error("An error occurred during transaction setup.");
        setIsCheckingOut(false);
      }
      return;
    }

    router.push(`/builder-new?template=${template.id}`);
  };

  const handlePreview = (template: TemplateInfo) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  if (status === "loading" || isCheckingOut) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-bold tracking-widest uppercase animate-pulse">
            {isCheckingOut ? "Securing Transaction..." : "Loading Gallery..."}
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
          {/* Free Section */}
          <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight">
                  Essential Series
                </h2>
                <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
                  Free for all creators
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
                  001 — 004
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates
                .filter((t) => !t.isPremium)
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

          {/* Premium Section */}
          <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black tracking-tight">
                    Signature Series
                  </h2>
                  <div className="px-3 py-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    Pro
                  </div>
                </div>
                <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
                  Curated Masterpieces
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
                  001 — 003
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates
                .filter((t) => t.isPremium)
                .map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    index={index}
                    template={template}
                    onPreview={() => handlePreview(template)}
                    onUse={() => handleUseTemplate(template)}
                    isPremium
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
  isPremium = false,
}: {
  template: TemplateInfo;
  index: number;
  onPreview: () => void;
  onUse: () => void;
  isPremium?: boolean;
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
        <div
          className={`absolute inset-0 bg-linear-to-br ${
            isPremium
              ? "from-purple-900/30 to-blue-900/30"
              : "from-gray-800 to-gray-900"
          } transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center p-12">
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
        </div>

        {/* Badge Overlay */}
        {isPremium && (
          <div className="absolute top-8 left-8">
            <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Advanced Tier
              </span>
            </div>
          </div>
        )}

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
            {isPremium ? "Upgrade" : "Select"}
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
            {isPremium ? "Signature Range 01" : "Essential Range 01"}
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
