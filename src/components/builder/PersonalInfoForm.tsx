"use client";

import { PersonalInfo } from "@/lib/types/portfolio";
import { User, MapPin, BadgeInfo, Camera } from "lucide-react";
import { motion } from "framer-motion";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 group transition-all hover:border-blue-500/50">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-inner group-hover:scale-105 transition-transform duration-500">
          {data.avatarUrl || data.avatar ? (
            <img
              src={data.avatarUrl || data.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <Camera className="w-8 h-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform" />
          </div>
        </div>
        <div className="mt-6 w-full max-w-sm">
          <label className="block text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Avatar URL
          </label>
          <input
            type="text"
            value={data.avatarUrl || data.avatar || ""}
            onChange={(e) => handleChange("avatarUrl", e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2 rounded-xl text-center text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <User className="w-3 h-3" /> Full Name
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Jonathan Ive"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <BadgeInfo className="w-3 h-3" /> Professional Title
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Senior Product Designer"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <MapPin className="w-3 h-3" /> Location
          </label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g. London, UK"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <BadgeInfo className="w-3 h-3" /> Biography
          </label>
          <textarea
            value={data.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Tell your professional story..."
            rows={5}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none leading-relaxed"
          />
        </motion.div>
      </div>
    </div>
  );
}
