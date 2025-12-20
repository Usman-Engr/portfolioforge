"use client";

import { Skill } from "@/lib/types/portfolio";
import { Plus, X, Star, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    onChange([...data, { name: "", level: 3 }]);
  };

  const updateSkill = (
    index: number,
    field: keyof Skill,
    value: string | number
  ) => {
    const newSkills = [...data];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onChange(newSkills);
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const renderStars = (level: number, index: number) => {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateSkill(index, "level", star)}
            className="focus:outline-none transition-all hover:scale-125 active:scale-90"
          >
            <Star
              className={`w-6 h-6 ${
                star <= level
                  ? "fill-blue-500 text-blue-500"
                  : "text-slate-200 dark:text-slate-700"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {data.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start gap-4">
              <div className="pt-3 text-slate-300 group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Skill Details
                  </h4>
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  placeholder="e.g. React, UI Design, Swift"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Proficiency
                    </label>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {skill.level === 1 && "Novice"}
                      {skill.level === 2 && "Advanced Beginner"}
                      {skill.level === 3 && "Competent"}
                      {skill.level === 4 && "Proficient"}
                      {skill.level === 5 && "Expert"}
                    </span>
                  </div>
                  {renderStars(skill.level, index)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addSkill}
        className="w-full p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2 font-bold text-sm"
      >
        <Plus className="w-5 h-5" />
        <span>Add Skill</span>
      </button>
    </div>
  );
}
