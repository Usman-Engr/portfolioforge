"use client";

import { templates, TemplateInfo } from "@/lib/templates";
import {
  Check,
  Sparkles,
  Lock,
  Terminal,
  Palette,
  Briefcase,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TemplateSelectorProps {
  selectedTemplateId?: string;
  onSelect: (templateId: string) => void;
  onPreview: (template: TemplateInfo) => void;
  userHasPremium?: boolean;
}

/**
 * Template Selector Component
 * Displays all available templates in a grid with selection capability
 */
export default function TemplateSelector({
  selectedTemplateId,
  onSelect,
  onPreview,
  userHasPremium = false,
}: TemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "developer" | "designer" | "corporate"
  >("all");

  const tabs = [
    { id: "all", label: "All Styles", icon: LayoutGrid },
    { id: "developer", label: "For Developers", icon: Terminal },
    { id: "designer", label: "For Designers", icon: Palette },
    { id: "corporate", label: "Corporate & Resume", icon: Briefcase },
  ] as const;

  const filteredTemplates = templates.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "corporate") {
      return (
        t.targetAudience === "corporate" ||
        t.category === "resume" ||
        t.category === "corporate" ||
        t.category === "non-tech"
      );
    }
    return t.targetAudience === (activeTab as any);
  });

  return (
    <div className="space-y-10">
      {/* Category Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-white/5 p-2 rounded-[24px] border border-white/5 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onSelect={() => onSelect(template.id)}
              onPreview={() => onPreview(template)}
              isLocked={template.isPremium && !userHasPremium}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTemplates.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-widest">
            No templates found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

// Template Card Component
function TemplateCard({
  template,
  isSelected,
  onSelect,
  onPreview,
  isLocked,
}: {
  template: TemplateInfo;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  isLocked: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`relative group bg-[#0f0f0f] rounded-[32px] border-2 transition-all cursor-pointer overflow-hidden ${
        isSelected
          ? "border-blue-600 shadow-2xl shadow-blue-500/20"
          : "border-white/5 hover:border-white/10"
      }`}
      onClick={isLocked ? undefined : onSelect}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-zinc-900 overflow-hidden">
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-2xl">
            <Check className="w-3 h-3" />
            Active Base
          </div>
        )}

        {/* Premium/Locked Badge */}
        {template.isPremium && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-yellow-500 to-orange-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-black" />
            Premium
          </div>
        )}

        {/* Preview Button Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest transform scale-90 group-hover:scale-100 transition-transform shadow-2xl"
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-black text-white italic uppercase tracking-tighter text-lg mb-1">
          {template.name}
        </h4>
        <p className="text-xs text-gray-500 font-medium mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {template.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-white/5 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white">
            Upgrade to Studio Pro
          </p>
          <p className="text-[10px] text-gray-400 mt-2 font-bold">
            This premium base requires a subscription.
          </p>
        </div>
      )}
    </motion.div>
  );
}
