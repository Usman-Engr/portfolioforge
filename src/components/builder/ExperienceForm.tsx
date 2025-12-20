"use client";

import { Experience } from "@/lib/types/portfolio";
import {
  Plus,
  X,
  Briefcase,
  GripVertical,
  Calendar,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({
  data,
  onChange,
}: ExperienceFormProps) {
  const addExperience = () => {
    onChange([
      ...data,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const newExperience = [...data];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange(newExperience);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {data.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="pt-2 text-slate-300 group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Career Milestone #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeExperience(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      <Building2 className="w-3 h-3" /> Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      placeholder="e.g. Google, Apple"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(index, "role", e.target.value)
                      }
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                    <Calendar className="w-3 h-3" /> Duration
                  </label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) =>
                      updateExperience(index, "duration", e.target.value)
                    }
                    placeholder="e.g. Jan 2022 - Present"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="group">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Key Responsibilities
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    placeholder="Highlight your high-impact achievements..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addExperience}
        className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-3 font-bold"
      >
        <Plus className="w-6 h-6" />
        <span>Add Career Milestone</span>
      </button>
    </div>
  );
}
