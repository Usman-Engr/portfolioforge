"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props {
  data: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ data, onChange }: Props) {
  const charCount = data.length;
  const recommended = 150;
  const max = 400;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          A strong summary (2–4 sentences) tells recruiters who you are, what you bring, and what you're looking for. Keep it concise and impactful.
        </p>
        <div className="relative">
          <textarea
            value={data}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Results-driven Software Engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering projects on time. Passionate about clean code, performance optimization, and mentoring junior developers."
            maxLength={max}
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all resize-none text-sm leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 text-xs font-mono">
            <span className={charCount > max * 0.9 ? "text-red-400" : charCount > recommended ? "text-yellow-400" : "text-gray-600"}>
              {charCount}
            </span>
            <span className="text-gray-600">/{max}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                charCount < 50 ? "bg-red-500" : charCount < recommended ? "bg-yellow-500" : charCount < 250 ? "bg-green-500" : "bg-orange-500"
              }`}
              style={{ width: `${Math.min(100, (charCount / max) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {charCount < 50 ? "Too short" : charCount < recommended ? "Getting there" : charCount < 300 ? "Good length" : "Consider trimming"}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-4 space-y-2">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Pro Tips</p>
        <ul className="space-y-1.5 text-xs text-gray-500">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Start with your years of experience and key specialty</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Mention 1–2 quantifiable achievements</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> End with your career goal or what you're seeking</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Avoid first-person pronouns ("I", "me", "my")</li>
        </ul>
      </div>
    </div>
  );
}
