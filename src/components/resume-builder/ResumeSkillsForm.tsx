"use client";

import React, { useState } from "react";
import { ResumeSkillGroup } from "@/lib/types/resume";
import { Plus, X } from "lucide-react";

interface Props {
  data: ResumeSkillGroup[];
  onChange: (data: ResumeSkillGroup[]) => void;
}

const PRESET_CATEGORIES = ["Technical", "Soft Skills", "Design", "Languages", "Tools"];

export default function ResumeSkillsForm({ data, onChange }: Props) {
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({});
  const [newCategoryName, setNewCategoryName] = useState("");

  const addSkill = (groupIdx: number) => {
    const skill = (newSkill[groupIdx] || "").trim();
    if (!skill) return;
    const next = data.map((g, i) =>
      i === groupIdx ? { ...g, skills: [...g.skills, skill] } : g
    );
    onChange(next);
    setNewSkill({ ...newSkill, [groupIdx]: "" });
  };

  const removeSkill = (groupIdx: number, skillIdx: number) => {
    onChange(data.map((g, i) => i === groupIdx ? { ...g, skills: g.skills.filter((_, si) => si !== skillIdx) } : g));
  };

  const updateCategory = (groupIdx: number, category: string) => {
    onChange(data.map((g, i) => i === groupIdx ? { ...g, category } : g));
  };

  const removeGroup = (groupIdx: number) => {
    onChange(data.filter((_, i) => i !== groupIdx));
  };

  const addGroup = (name: string) => {
    if (!name.trim()) return;
    onChange([...data, { category: name.trim(), skills: [] }]);
    setNewCategoryName("");
  };

  return (
    <div className="space-y-4">
      {data.map((group, gIdx) => (
        <div key={gIdx} className="bg-white/3 border border-white/8 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={group.category}
              onChange={(e) => updateCategory(gIdx, e.target.value)}
              className="flex-1 bg-transparent text-sm font-bold text-white border-b border-white/10 pb-1 focus:outline-none focus:border-blue-500/60 transition-all"
            />
            <button type="button" onClick={() => removeGroup(gIdx)} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill, sIdx) => (
              <div key={sIdx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300">
                <span>{skill}</span>
                <button type="button" onClick={() => removeSkill(gIdx, sIdx)} className="hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill[gIdx] || ""}
              onChange={(e) => setNewSkill({ ...newSkill, [gIdx]: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(gIdx))}
              placeholder="Type a skill and press Enter"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
            <button type="button" onClick={() => addSkill(gIdx)} className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Add Category</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_CATEGORIES.filter((c) => !data.find((g) => g.category === c)).map((c) => (
            <button key={c} type="button" onClick={() => addGroup(c)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:border-blue-500/40 hover:text-blue-400 transition-all">
              + {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGroup(newCategoryName))}
            placeholder="Custom category name..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
          />
          <button type="button" onClick={() => addGroup(newCategoryName)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
