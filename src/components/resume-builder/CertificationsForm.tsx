"use client";

import React, { useState } from "react";
import { ResumeCertification } from "@/lib/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: ResumeCertification[]; onChange: (data: ResumeCertification[]) => void; }

function generateId() { return Math.random().toString(36).slice(2); }
function emptyCert(): ResumeCertification { return { id: generateId(), name: "", issuer: "", issueDate: "", expiryDate: "", credentialId: "", url: "" }; }

function CertCard({ cert, index, onUpdate, onDelete }: { cert: ResumeCertification; index: number; onUpdate: (u: ResumeCertification) => void; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(index === 0);
  const field = (k: keyof ResumeCertification, v: string) => onUpdate({ ...cert, [k]: v });

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
      <button type="button" onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left">
        <Award className="w-4 h-4 text-gray-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{cert.name || "New Certification"}</p>
          <p className="text-xs text-gray-500 truncate">{cert.issuer || "Issuing Organization"}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3 border-t border-white/5">
              <div className="pt-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Certification Name *</label>
                <input type="text" value={cert.name} onChange={(e) => field("name", e.target.value)} placeholder="AWS Certified Solutions Architect" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Issuing Organization *</label>
                <input type="text" value={cert.issuer} onChange={(e) => field("issuer", e.target.value)} placeholder="Amazon Web Services" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Issue Date</label>
                  <input type="month" value={cert.issueDate || ""} onChange={(e) => field("issueDate", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Expiry Date</label>
                  <input type="month" value={cert.expiryDate || ""} onChange={(e) => field("expiryDate", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Credential URL</label>
                <input type="url" value={cert.url || ""} onChange={(e) => field("url", e.target.value)} placeholder="https://credentials.example.com/..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>
              <button type="button" onClick={onDelete} className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />Remove
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CertificationsForm({ data, onChange }: Props) {
  const add = () => onChange([...data, emptyCert()]);
  const update = (idx: number, u: ResumeCertification) => { const n = [...data]; n[idx] = u; onChange(n); };
  const remove = (idx: number) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {data.map((cert, idx) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <CertCard cert={cert} index={idx} onUpdate={(u) => update(idx, u)} onDelete={() => remove(idx)} />
          </motion.div>
        ))}
      </AnimatePresence>
      {data.length === 0 && (
        <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
          <Award className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No certifications yet</p>
        </div>
      )}
      <button type="button" onClick={add} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-blue-500/30 rounded-2xl text-sm text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all">
        <Plus className="w-4 h-4" />Add Certification
      </button>
    </div>
  );
}
