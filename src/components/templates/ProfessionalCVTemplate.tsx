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
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function ProfessionalCVTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const { personal, contact, social, projects, experience, education, skills } =
    data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1B] font-sans flex flex-col p-2 md:p-8 lg:p-12 overflow-x-hidden">
      {/* Executive Top Bar - Responsive */}
      {/* Executive Top Bar - Responsive */}
      <header className="h-auto lg:h-16 bg-white border border-zinc-200 rounded-2xl flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 py-4 lg:py-0 mb-4 lg:mb-8 shadow-xs shrink-0 relative z-50">
        <div className="flex items-center justify-between w-full lg:w-auto gap-6">
          <div className="text-lg md:text-xl font-black tracking-tight text-[#0066FF] flex items-center gap-2">
            EXECUTIVE_SUITE
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-400 text-[9px] rounded-md hidden sm:inline-block">
              V2.4
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-zinc-50 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          <div className="h-4 w-px bg-zinc-200 hidden lg:block" />

          <div className="hidden lg:flex items-center gap-2 text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
            <Search className="w-3 h-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              Search DB...
            </span>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mt-4 lg:mt-0 w-full lg:w-auto border-t lg:border-t-0 border-zinc-100 pt-4 lg:pt-0`}
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest w-full lg:w-auto justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for Hire
          </div>
          <div className="flex items-center gap-6 w-full lg:w-auto justify-center">
            <Bell className="w-4 h-4 text-zinc-400 hover:text-black cursor-pointer transition-colors" />
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-200">
              <div className="text-right hidden lg:block">
                <div className="text-[10px] font-black uppercase text-zinc-900">
                  {personal.name}
                </div>
                <div className="text-[9px] font-bold text-zinc-400 uppercase">
                  Admin View
                </div>
              </div>
              <div className="w-8 h-8 bg-zinc-900 rounded-lg text-white flex items-center justify-center font-black text-xs shadow-lg shadow-zinc-200">
                {personal.name?.[0]}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-8 overflow-visible lg:overflow-hidden h-auto lg:h-[calc(100vh-140px)]">
        {/* Left Sidebar: Key Stats - Scrollable on mobile, Fixed on Desktop */}
        <aside className="w-full lg:w-80 space-y-4 md:space-y-8 lg:overflow-y-auto no-scrollbar p-1 shrink-0 h-auto">
          <section className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#0066FF]/10 to-transparent rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />

            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-100 rounded-2xl mx-auto flex items-center justify-center overflow-hidden shadow-inner relative z-10">
              {personal.avatarUrl ? (
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-full h-full bg-linear-to-br from-[#0066FF] to-[#0044AA] flex items-center justify-center text-3xl md:text-4xl font-black text-white"
                >
                  {personal.name?.[0]}
                </motion.div>
              )}
            </div>
            <div className="text-center relative z-10">
              <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none mb-2 text-zinc-900">
                {personal.name}
              </h1>
              <p className="text-[10px] md:text-xs font-bold text-[#0066FF] uppercase tracking-widest bg-[#0066FF]/5 inline-block px-3 py-1 rounded-full">
                {personal.title}
              </p>
            </div>
            <div className="space-y-3 pt-6 border-t border-zinc-50 relative z-10">
              {[
                { icon: Mail, value: contact.email, label: "Email" },
                { icon: MapPin, value: personal.location, label: "Location" },
                {
                  icon: Linkedin,
                  value: social.linkedin || "LinkedIn",
                  label: "Profile",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-zinc-500 hover:text-[#0066FF] transition-colors group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center group-hover/item:bg-[#0066FF]/10 transition-colors">
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-700 truncate">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 md:py-4 bg-[#1a1a1b] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0066FF] hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </section>

          <section className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#0066FF]">
                Core Expertise
              </h3>
              <Star className="w-3 h-3 text-[#0066FF]" />
            </div>
            <div className="space-y-4">
              {skills.slice(0, 6).map((skill, i) => (
                <div key={i} className="space-y-1.5 group">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-zinc-700 group-hover:text-[#0066FF] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-zinc-400">{skill.level * 20}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 20}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-[#1a1a1b] group-hover:bg-[#0066FF] transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content: Case Files - Vertical Scroll on Desktop */}
        <main className="flex-1 flex flex-col gap-4 md:gap-8 lg:overflow-y-auto no-scrollbar pr-1 pb-20 md:pb-0">
          {/* Summary Card */}
          <section className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 space-y-4 md:space-y-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 bg-zinc-50 rounded-full -mr-10 -mt-10 blur-3xl opacity-50 pointer-events-none" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-l-4 border-[#0066FF] pl-4">
              Professional Manifesto
            </h3>
            <p className="text-lg md:text-2xl font-bold tracking-tight text-zinc-800 leading-relaxed italic relative z-10">
              "{personal.bio}"
            </p>
          </section>

          {/* Bento Grid Content - Auto rows on mobile, 2 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-none md:flex-1 min-h-0">
            {/* Experience Log */}
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col md:row-span-2">
              <div className="p-6 md:p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center sticky top-0 z-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0066FF] rounded-full" />
                  Career Trajectory
                </h3>
                <Briefcase className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="p-6 md:p-8 space-y-8 md:space-y-10 overflow-y-auto custom-scrollbar md:max-h-[600px]">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-8 border-l-2 border-zinc-100 last:border-0 pb-10 last:pb-0 group"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-[#0066FF] rounded-full group-hover:scale-125 transition-transform" />
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="text-sm md:text-base font-black uppercase italic leading-none text-zinc-800">
                          {exp.role}
                        </div>
                        <div className="text-[9px] font-black text-white bg-black px-2 py-1 rounded inline-block w-fit">
                          {exp.duration}
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-[#0066FF] uppercase tracking-wide">
                        {exp.company}
                      </div>
                      <p className="text-xs md:text-sm font-medium text-zinc-500 mt-2 leading-relaxed border-l-2 border-transparent group-hover:border-zinc-200 pl-4 transition-all">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 md:space-y-8 flex flex-col h-full">
              {/* Portfolio Showcase */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-1">
                <div className="p-6 md:p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Project Highlights
                  </h3>
                  <Award className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  {projects.slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      className="group p-4 bg-zinc-50 rounded-2xl hover:bg-[#1a1a1b] hover:text-white transition-all cursor-pointer border border-transparent hover:border-black/5"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-black uppercase italic">
                          {p.name}
                        </h4>
                        <div className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-[#0066FF]" />
                      </div>
                      <p className="text-[10px] font-medium opacity-60 line-clamp-1 group-hover:opacity-80">
                        {p.techStack.join(" • ")}
                      </p>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:border-[#0066FF] hover:text-[#0066FF] transition-all">
                    View Full Archive
                  </button>
                </div>
              </div>

              {/* Education History */}
              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-1">
                <div className="p-6 md:p-8 border-b border-zinc-50 bg-[#FBFBFC] flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Academic BG
                  </h3>
                  <GraduationCap className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1 group">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs md:text-sm font-black uppercase italic group-hover:text-[#0066FF] transition-colors">
                          {edu.degree}
                        </h4>
                        <span className="text-[9px] font-black text-zinc-300">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                        {edu.institution}
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
      <footer className="h-auto md:h-10 flex flex-col md:flex-row items-center justify-between px-4 text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-4 py-4 md:py-0 border-t md:border-t-0 border-zinc-200 shrink-0 gap-2 md:gap-0 text-center md:text-left">
        <span>
          Ref_ID: {personal.name?.toUpperCase().replace(" ", "_")}_2025
        </span>
        <div className="flex flex-col md:flex-row gap-2 md:gap-10">
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
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
