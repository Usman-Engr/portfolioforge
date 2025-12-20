"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Search,
  Bell,
} from "lucide-react";

export default function ProfessionalCVTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const { personal, contact, social, projects, experience, education, skills } =
    data;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1B] font-sans flex flex-col p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Executive Top Bar */}
      <header className="h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between px-8 mb-8 shadow-xs shrink-0">
        <div className="flex items-center gap-6">
          <div className="text-xl font-black tracking-tight text-[#0066FF]">
            EXECUTIVE_SUITE
          </div>
          <div className="h-4 w-px bg-zinc-200 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-zinc-400">
            <Search className="w-4 h-4" />
            <span className="text-xs font-semibold">
              Search candidate database...
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to Opportunities
          </div>
          <Bell className="w-4 h-4 text-zinc-400" />
          <div className="w-8 h-8 bg-zinc-900 rounded-lg text-white flex items-center justify-center font-black text-xs">
            {personal.name?.[0]}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        {/* Left Sidebar: Key Stats */}
        <aside className="w-full lg:w-80 space-y-8 overflow-y-auto no-scrollbar overflow-x-hidden p-1">
          <section className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-xs">
            <div className="w-24 h-24 bg-zinc-100 rounded-2xl mx-auto flex items-center justify-center overflow-hidden">
              {/* Placeholder for avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-full h-full bg-linear-to-br from-[#0066FF] to-[#0044AA] flex items-center justify-center text-4xl font-black text-white"
              >
                {personal.name?.[0]}
              </motion.div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tight leading-none mb-2">
                {personal.name}
              </h1>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {personal.title}
              </p>
            </div>
            <div className="space-y-3 pt-6 border-t border-zinc-50">
              {[
                { icon: Mail, value: contact.email },
                { icon: MapPin, value: personal.location },
                { icon: Linkedin, value: social.linkedin || "LinkedIn" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-zinc-500 hover:text-black transition-colors"
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-[#0066FF] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0055DD] transition-all">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </section>

          <section className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0066FF]">
              Core Expertise
            </h3>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span>{skill.name}</span>
                    <span className="text-zinc-400">{skill.level * 20}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0066FF]"
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content: Case Files */}
        <main className="flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar pr-1">
          {/* Summary Card */}
          <section className="bg-white border border-zinc-200 rounded-3xl p-10 space-y-6 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 border-l-4 border-[#0066FF] pl-4">
              Professional Manifesto
            </h3>
            <p className="text-2xl font-bold tracking-tight text-zinc-700 leading-relaxed italic">
              "{personal.bio}"
            </p>
          </section>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {/* Experience Log */}
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col">
              <div className="p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Career Trajectory
                </h3>
                <Briefcase className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="p-8 space-y-8 flex-1">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-8 border-l-2 border-zinc-100 last:border-0 pb-8 last:pb-0"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-[#0066FF] rounded-full" />
                    <div className="space-y-1">
                      <div className="text-sm font-black uppercase italic leading-none">
                        {exp.role}
                      </div>
                      <div className="text-[10px] font-black text-[#0066FF] uppercase">
                        {exp.company} // {exp.duration}
                      </div>
                      <p className="text-xs font-medium text-zinc-500 mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {/* Portfolio Showcase */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col h-1/2">
                <div className="p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                    Project Highlights
                  </h3>
                  <Star className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="p-8 space-y-4 overflow-y-auto no-scrollbar">
                  {projects.slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      className="group p-4 bg-zinc-50 rounded-2xl hover:bg-[#0066FF] hover:text-white transition-all cursor-pointer"
                    >
                      <h4 className="text-sm font-black uppercase italic">
                        {p.name}
                      </h4>
                      <p className="text-[10px] font-medium opacity-60 line-clamp-1">
                        {p.techStack.join(" • ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education History */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col h-1/2">
                <div className="p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                    Academic Background
                  </h3>
                  <GraduationCap className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="p-8 space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="text-sm font-black uppercase italic">
                        {edu.degree}
                      </h4>
                      <p className="text-[10px] font-black text-zinc-400 uppercase">
                        {edu.institution} // {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Executive Footer */}
      <footer className="h-10 flex items-center justify-between px-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-4">
        <span>
          Ref_ID: {personal.name?.toUpperCase().replace(" ", "_")}_2025
        </span>
        <div className="flex gap-10">
          <span>Validation Stage: PASS</span>
          <span>Checksum: 8B2F99_CV</span>
        </div>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
