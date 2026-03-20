"use client";

import React, { useState } from "react";
import { ResumeWorkExperience } from "@/lib/types/resume";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: ResumeWorkExperience[];
  onChange: (data: ResumeWorkExperience[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2);
}

function emptyJob(): ResumeWorkExperience {
  return {
    id: generateId(),
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  };
}

function JobCard({
  job,
  index,
  onUpdate,
  onDelete,
}: {
  job: ResumeWorkExperience;
  index: number;
  onUpdate: (updated: ResumeWorkExperience) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  const field = (key: keyof ResumeWorkExperience, value: string | boolean) =>
    onUpdate({ ...job, [key]: value });

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
      >
        <Briefcase className="w-4 h-4 text-gray-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {job.position || "New Position"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {job.company || "Company"} {job.startDate ? `· ${job.startDate}` : ""}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-white/5">
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Job Title *</label>
                  <input
                    type="text"
                    value={job.position}
                    onChange={(e) => field("position", e.target.value)}
                    placeholder="Senior Software Engineer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Company *</label>
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => field("company", e.target.value)}
                    placeholder="Acme Corporation"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Location</label>
                <input
                  type="text"
                  value={job.location || ""}
                  onChange={(e) => field("location", e.target.value)}
                  placeholder="San Francisco, CA (Remote)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Start Date *</label>
                  <input
                    type="month"
                    value={job.startDate}
                    onChange={(e) => field("startDate", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">End Date</label>
                  <input
                    type="month"
                    value={job.endDate || ""}
                    onChange={(e) => field("endDate", e.target.value)}
                    disabled={job.isCurrent}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed [color-scheme:dark]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => {
                    onUpdate({ ...job, isCurrent: !job.isCurrent, endDate: !job.isCurrent ? "" : job.endDate });
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative ${job.isCurrent ? "bg-blue-500" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${job.isCurrent ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-gray-400">Currently working here</span>
              </label>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                  Description & Achievements
                </label>
                <p className="text-xs text-gray-600 mb-2">Start each bullet with an action verb. Use numbers to quantify impact.</p>
                <textarea
                  value={job.description}
                  onChange={(e) => field("description", e.target.value)}
                  placeholder={"• Led migration of monolith to microservices, reducing latency by 40%\n• Mentored team of 5 junior engineers, improving code review turnaround by 30%\n• Implemented CI/CD pipeline using GitHub Actions, cutting deployment time from 2h to 15min"}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={onDelete}
                className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove this position
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkExperienceForm({ data, onChange }: Props) {
  const add = () => onChange([...data, emptyJob()]);
  const update = (idx: number, updated: ResumeWorkExperience) => {
    const next = [...data];
    next[idx] = updated;
    onChange(next);
  };
  const remove = (idx: number) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {data.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <JobCard
              job={job}
              index={idx}
              onUpdate={(updated) => update(idx, updated)}
              onDelete={() => remove(idx)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
          <Briefcase className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No work experience added yet</p>
          <p className="text-xs text-gray-600 mt-1">Add your most recent job first</p>
        </div>
      )}

      <button
        type="button"
        onClick={add}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-blue-500/30 rounded-2xl text-sm text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Work Experience
      </button>
    </div>
  );
}
