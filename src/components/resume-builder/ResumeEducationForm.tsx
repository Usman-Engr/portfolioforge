"use client";

import React, { useState } from "react";
import { ResumeEducation } from "@/lib/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: ResumeEducation[];
  onChange: (data: ResumeEducation[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2);
}

function emptyEducation(): ResumeEducation {
  return { id: generateId(), institution: "", degree: "", fieldOfStudy: "", location: "", startDate: "", endDate: "", gpa: "", description: "" };
}

function EduCard({ edu, index, onUpdate, onDelete }: { edu: ResumeEducation; index: number; onUpdate: (u: ResumeEducation) => void; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(index === 0);
  const field = (k: keyof ResumeEducation, v: string) => onUpdate({ ...edu, [k]: v });

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
      <button type="button" onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left">
        <GraduationCap className="w-4 h-4 text-gray-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{edu.degree || "New Degree"}</p>
          <p className="text-xs text-gray-500 truncate">{edu.institution || "Institution"}{edu.startDate ? ` · ${edu.startDate}` : ""}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3 border-t border-white/5">
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Degree *</label>
                  <input type="text" value={edu.degree} onChange={(e) => field("degree", e.target.value)} placeholder="Bachelor of Science" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Field of Study</label>
                  <input type="text" value={edu.fieldOfStudy || ""} onChange={(e) => field("fieldOfStudy", e.target.value)} placeholder="Computer Science" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Institution *</label>
                <input type="text" value={edu.institution} onChange={(e) => field("institution", e.target.value)} placeholder="Massachusetts Institute of Technology" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Location</label>
                <input type="text" value={edu.location || ""} onChange={(e) => field("location", e.target.value)} placeholder="Cambridge, MA" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Start Date</label>
                  <input type="month" value={edu.startDate} onChange={(e) => field("startDate", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">End Date</label>
                  <input type="month" value={edu.endDate || ""} onChange={(e) => field("endDate", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">GPA (Optional)</label>
                <input type="text" value={edu.gpa || ""} onChange={(e) => field("gpa", e.target.value)} placeholder="3.8 / 4.0" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Additional Details</label>
                <textarea value={edu.description || ""} onChange={(e) => field("description", e.target.value)} placeholder="Relevant coursework, honors, thesis, clubs..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all resize-none" />
              </div>
              <button type="button" onClick={onDelete} className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />Remove this entry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResumeEducationForm({ data, onChange }: Props) {
  const add = () => onChange([...data, emptyEducation()]);
  const update = (idx: number, updated: ResumeEducation) => { const n = [...data]; n[idx] = updated; onChange(n); };
  const remove = (idx: number) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {data.map((edu, idx) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <EduCard edu={edu} index={idx} onUpdate={(u) => update(idx, u)} onDelete={() => remove(idx)} />
          </motion.div>
        ))}
      </AnimatePresence>
      {data.length === 0 && (
        <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
          <GraduationCap className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No education added yet</p>
        </div>
      )}
      <button type="button" onClick={add} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-blue-500/30 rounded-2xl text-sm text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all">
        <Plus className="w-4 h-4" />Add Education
      </button>
    </div>
  );
}
