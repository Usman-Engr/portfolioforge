"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowRight, Zap, Target, Globe, Star, Mail, Briefcase, Code } from "lucide-react";

export default function BrutalistPulseTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-400 border-8 sm:border-[16px] border-black overflow-x-hidden relative flex flex-col">
      
      {/* ── Desktop Header (Sticky) ───────────────────────────────── */}
      <header className="sticky top-0 w-full z-50 p-4 sm:p-6 flex justify-between items-center pointer-events-none no-print">
        <div className="pointer-events-auto bg-black text-white px-4 sm:px-6 py-2 sm:py-3 border-2 sm:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair">
          <span className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter line-clamp-1 break-all">
            {personal.name?.split(" ")[0] || "UNNAMED"}
          </span>
        </div>
        <div className="pointer-events-auto flex gap-3 sm:gap-4">
          <button className="bg-yellow-400 p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all hidden sm:block">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </button>
          <a href={`mailto:${contact.email}`}
            className="bg-white p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </header>

      {/* ── Main Content Grid ───────────────────────────────────── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-12 pb-12 sm:pb-20 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:auto-rows-min">
          
          {/* Identity Block */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white border-4 lg:border-8 border-black p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden group min-h-[300px] lg:min-h-[400px]">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-300">
              01 / IDENTITY
            </div>
            {personal.imageUrl && (
              <img src={personal.imageUrl} alt={personal.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-black mb-6 object-cover" />
            )}
            <h1 className="text-5xl sm:text-6xl lg:text-[7rem] xl:text-[8rem] font-black uppercase italic tracking-tighter leading-[0.85] lg:leading-[0.85] mb-4 sm:mb-6 break-words">
              {personal.name}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-yellow-400 inline-block px-3 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 border-black w-fit mb-4 sm:mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              {personal.title}
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-bold max-w-2xl leading-tight">
              {personal.bio}
            </p>
          </div>

          {/* Stats/Location Block */}
          <div className="col-span-1 bg-yellow-400 border-4 lg:border-8 border-black p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 lg:gap-10 min-h-[250px] lg:min-h-[400px] relative overflow-hidden">
            <Target className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
            <div className="space-y-2 relative z-10">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black block leading-none">
                {projects.length < 10 ? `0${projects.length}` : projects.length}
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest block bg-white border-2 border-black px-2 py-1 w-fit">
                Shipped Work
              </span>
            </div>
            {personal.location && (
              <div className="space-y-2 relative z-10 mt-auto">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic block break-words">
                  {personal.location}
                </span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest block">
                  Base / Grid
                </span>
              </div>
            )}
          </div>

          {/* Featured projects */}
          {projects.map((project, i) => (
            <div key={i} className="col-span-1 md:col-span-2 lg:col-span-2 bg-blue-500 border-4 lg:border-8 border-black relative group overflow-hidden min-h-[350px] lg:min-h-[400px] flex flex-col">
              <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between text-white relative z-10">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-black px-2 py-1 flex items-center gap-2">
                       <Code className="w-3 h-3" /> PROJECT_{i+1}
                    </span>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black p-2 border-2 border-black hover:bg-yellow-400 transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4 break-words">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((t, idx) => (
                      <span key={idx} className="bg-black text-white px-2 py-1 text-[9px] font-bold uppercase border border-white/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm border-l-4 border-yellow-400 pl-4 font-bold leading-tight mb-6 line-clamp-4 bg-black/20 p-3 sm:p-4 backdrop-blur-sm">
                    {project.description}
                  </p>
                  {(project.liveUrl || project.githubUrl) && (
                    <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 py-3 sm:py-4 px-6 sm:px-8 bg-white text-black font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs sm:text-sm">
                      View Source <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Contact Pin */}
          <a href={`mailto:${contact.email}`} className="col-span-1 md:col-span-1 lg:col-span-1 bg-purple-500 border-4 lg:border-8 border-black p-6 sm:p-8 flex flex-col justify-between group min-h-[250px] lg:min-h-[400px] hover:bg-purple-400 transition-colors cursor-pointer">
            <ArrowRight className="w-12 h-12 lg:w-16 lg:h-16 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-white" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80 text-white bg-black px-2 py-1 w-fit">
                Let's Talk
              </span>
              <span className="text-xl sm:text-2xl font-black break-all uppercase italic text-white line-clamp-2">
                {contact.email}
              </span>
            </div>
          </a>

          {/* Tech Stack Block */}
          {skills.length > 0 && (
            <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white border-4 lg:border-8 border-black p-6 sm:p-8 space-y-4 sm:space-y-6 min-h-[250px] lg:min-h-[400px]">
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-4 border-black pb-2">
                02 / ARSENAL
              </div>
              <div className="flex flex-wrap gap-2 text-white">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 sm:px-4 py-2 sm:py-3 bg-black text-[10px] sm:text-xs font-black uppercase italic hover:bg-yellow-400 hover:text-black transition-colors cursor-default border-2 border-transparent hover:border-black hover:-translate-y-1">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience List - Unified layout */}
          {experience.length > 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#F0F0F0] border-4 lg:border-8 border-black overflow-hidden flex flex-col">
              <div className="bg-black text-white p-4 sm:p-6 text-xl sm:text-2xl font-black uppercase italic flex items-center gap-4">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" /> History Tracks
              </div>
              <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-4 lg:space-x-4 lg:flex-row lg:overflow-x-auto lg:items-stretch lg:pb-12">
                {experience.map((exp, i) => (
                  <div key={i} className="flex-1 lg:min-w-[350px] border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 py-2">
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-yellow-400 px-2 flex inline-block w-fit border-2 border-black mb-2">
                      {exp.duration}
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic leading-none mb-2 break-words">
                      {exp.role}
                    </div>
                    <div className="text-sm sm:text-base font-black uppercase text-gray-500 mb-3 break-words">
                      {exp.company}
                    </div>
                    <p className="text-xs sm:text-sm font-bold leading-relaxed line-clamp-4">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <footer className="mt-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24">
        <a href={`mailto:${contact.email}`} className="block w-full bg-black text-white p-6 sm:p-10 lg:p-16 border-4 sm:border-8 border-black shadow-[8px_8px_0px_#A855F7] sm:shadow-[16px_16px_0px_#A855F7] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all cursor-pointer group text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase italic tracking-tight group-hover:text-yellow-400 transition-colors break-words">
              Hire The Maverick
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] block opacity-50">
              © {new Date().getFullYear()} Grid Based Reality
            </span>
          </div>
        </a>
      </footer>

    </div>
  );
}
