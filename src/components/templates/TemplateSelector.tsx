"use client";

import React from "react";
import { templates, TemplateInfo } from "@/lib/templates";
import { Check, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";

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
  const freeTemplates = templates.filter((t) => !t.isPremium);
  const premiumTemplates = templates.filter((t) => t.isPremium);

  return (
    <div className="space-y-8">
      {/* Free Templates */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Free Templates
          </h3>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
            No credit card required
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onSelect={() => onSelect(template.id)}
              onPreview={() => onPreview(template)}
              isLocked={false}
            />
          ))}
        </div>
      </div>

      {/* Premium Templates */}
      {premiumTemplates.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Premium Templates
            </h3>
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Premium
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={() => onSelect(template.id)}
                onPreview={() => onPreview(template)}
                isLocked={!userHasPremium}
              />
            ))}
          </div>
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
      whileHover={{ y: -4 }}
      className={`relative group bg-white dark:bg-gray-800 rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
        isSelected
          ? "border-blue-600 shadow-lg shadow-blue-500/20"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
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
          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white rounded-md text-xs font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" />
            Selected
          </div>
        )}

        {/* Premium/Locked Badge */}
        {isLocked && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md text-xs font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Preview Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md font-semibold text-sm transform scale-90 group-hover:scale-100 transition-transform"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
          {template.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {template.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 2 && (
            <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
              +{template.features.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center text-white">
            <Lock className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-semibold">Upgrade to Pro</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
