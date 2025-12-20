"use client";

import { Education } from "@/lib/types/portfolio";
import {
  Plus,
  X,
  GraduationCap,
  GripVertical,
  Calendar,
  School,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([
      ...data,
      { institution: "", degree: "", year: "", description: "" },
    ]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducation = [...data];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange(newEducation);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {data.map((edu, index) => (
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
                    Academic Background #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeEducation(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      <School className="w-3 h-3" /> Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      placeholder="e.g. Stanford University"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      <Calendar className="w-3 h-3" /> Graduation Year
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(index, "year", e.target.value)
                      }
                      placeholder="e.g. 2023"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Degree / Certification
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    placeholder="e.g. BS in Computer Science"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="group">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                    Achievements & Honors
                  </label>
                  <textarea
                    value={edu.description || ""}
                    onChange={(e) =>
                      updateEducation(index, "description", e.target.value)
                    }
                    placeholder="Major, GPA, honors, etc..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addEducation}
        className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-3 font-bold"
      >
        <Plus className="w-6 h-6" />
        <span>Add Education</span>
      </button>
    </div>
  );
}
