"use client";

import { SocialLinks } from "@/lib/types/portfolio";
import {
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Plus,
  X,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialLinksFormProps {
  data: SocialLinks;
  onChange: (data: SocialLinks) => void;
}

export default function SocialLinksForm({
  data,
  onChange,
}: SocialLinksFormProps) {
  const [customLinks, setCustomLinks] = useState<
    Array<{ key: string; value: string }>
  >(
    Object.entries(data)
      .filter(
        ([key]) => !["linkedin", "github", "twitter", "instagram"].includes(key)
      )
      .map(([key, value]) => ({ key, value: value || "" }))
  );

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addCustomLink = () => {
    const newLinks = [...customLinks, { key: "", value: "" }];
    setCustomLinks(newLinks);
  };

  const updateCustomLink = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newLinks = [...customLinks];
    newLinks[index][field] = value;
    setCustomLinks(newLinks);

    // Update data
    const newData = { ...data };
    if (newLinks[index].key && newLinks[index].value) {
      newData[newLinks[index].key] = newLinks[index].value;
    }
    onChange(newData);
  };

  const removeCustomLink = (index: number) => {
    const linkToRemove = customLinks[index];
    const newLinks = customLinks.filter((_, i) => i !== index);
    setCustomLinks(newLinks);

    // Remove from data
    const newData = { ...data };
    delete newData[linkToRemove.key];
    onChange(newData);
  };

  const platformIcons = [
    {
      id: "linkedin",
      icon: Linkedin,
      color: "text-blue-600",
      prefix: "linkedin.com/in/",
    },
    {
      id: "github",
      icon: Github,
      color: "text-slate-900 dark:text-white",
      prefix: "github.com/",
    },
    {
      id: "twitter",
      icon: Twitter,
      color: "text-sky-500",
      prefix: "twitter.com/",
    },
    {
      id: "instagram",
      icon: Instagram,
      color: "text-pink-600",
      prefix: "instagram.com/",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {platformIcons.map((platform) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
              <platform.icon className={`w-3 h-3 ${platform.color}`} />
              {platform.id}
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group-focus-within:ring-2 group-focus-within:ring-blue-500 transition-all overflow-hidden">
              <span className="pl-4 pr-1 text-xs text-slate-400 font-medium select-none bg-slate-50 dark:bg-slate-800/50 py-3 border-r border-slate-200 dark:border-slate-700">
                {platform.prefix}
              </span>
              <input
                type="text"
                value={(data as any)[platform.id] || ""}
                onChange={(e) => handleChange(platform.id, e.target.value)}
                placeholder="username"
                className="flex-1 px-3 py-3 bg-transparent outline-none font-medium"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Custom Connections
          </h4>
        </div>

        <AnimatePresence initial={false}>
          {customLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={link.key}
                onChange={(e) => updateCustomLink(index, "key", e.target.value)}
                placeholder="Platform"
                className="w-1/3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-sm"
              />
              <div className="flex-1 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <span className="pl-4 pr-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                </span>
                <input
                  type="url"
                  value={link.value}
                  onChange={(e) =>
                    updateCustomLink(index, "value", e.target.value)
                  }
                  placeholder="https://..."
                  className="flex-1 px-3 py-3 bg-transparent outline-none font-medium text-sm"
                />
              </div>
              <button
                onClick={() => removeCustomLink(index)}
                className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={addCustomLink}
          className="w-full p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Connection</span>
        </button>
      </div>
    </div>
  );
}
