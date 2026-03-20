"use client";

import React from "react";
import { ResumeLanguage } from "@/lib/types/resume";
import { Plus, Trash2, Languages } from "lucide-react";

interface Props { data: ResumeLanguage[]; onChange: (data: ResumeLanguage[]) => void; }

const PROFICIENCY_LEVELS: ResumeLanguage["proficiency"][] = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];
const PROFICIENCY_COLORS = { Native: "text-green-400", Fluent: "text-blue-400", Advanced: "text-purple-400", Intermediate: "text-yellow-400", Basic: "text-gray-400" };

function generateId() { return Math.random().toString(36).slice(2); }

export default function LanguagesForm({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: generateId(), language: "", proficiency: "Fluent" }]);
  const update = (idx: number, key: keyof ResumeLanguage, val: string) => {
    const next = [...data];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  };
  const remove = (idx: number) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {data.length === 0 && (
        <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
          <Languages className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No languages added yet</p>
        </div>
      )}

      <div className="space-y-2">
        {data.map((lang, idx) => (
          <div key={lang.id} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-2xl px-4 py-3">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <input
                type="text"
                value={lang.language}
                onChange={(e) => update(idx, "language", e.target.value)}
                placeholder="Spanish"
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => update(idx, "proficiency", e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]"
              >
                {PROFICIENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={() => remove(idx)} className="p-1.5 text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-blue-500/30 rounded-2xl text-sm text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all">
        <Plus className="w-4 h-4" />Add Language
      </button>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Proficiency Scale</p>
        <div className="space-y-1.5">
          {PROFICIENCY_LEVELS.map((level) => (
            <div key={level} className="flex items-center gap-2 text-xs">
              <span className={`font-semibold w-20 ${PROFICIENCY_COLORS[level]}`}>{level}</span>
              <span className="text-gray-600">{level === "Native" ? "Mother tongue" : level === "Fluent" ? "Near-native proficiency" : level === "Advanced" ? "Can work professionally" : level === "Intermediate" ? "Can hold conversations" : "Basic understanding"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
