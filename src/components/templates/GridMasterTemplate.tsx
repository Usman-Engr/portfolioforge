"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  MoveUpRight,
  Sparkles,
  LayoutGrid,
  Camera,
  Menu,
  X,
  ArrowRight,
  Briefcase
} from "lucide-react";
import { useState } from "react";

export default function GridMasterTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#1a1a1a] font-mono p-4 sm:p-6 md:p-12 lg:p-20 overflow-x-hidden relative selection:bg-black selection:text-white">
      
      {/* ── Mobile Header Toggle ────────────────────────────────────── */}
      <div className="lg:hidden fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 sm:p-4 bg-black text-white rounded-full shadow-2xl hover:scale-105 transition-transform">
          {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* ── Gallery Controls ────────────────────────────────────────── */}
      <AnimatePresence>
        {(isMenuOpen || (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -100, opacity: 0, x: "-50%" }}
            className={`fixed top-4 sm:top-6 lg:top-12 left-1/2 z-40 bg-white/95 backdrop-blur-3xl border-2 sm:border-4 border-black rounded-[2rem] sm:rounded-full px-6 sm:px-8 py-4 sm:py-5 flex-col lg:flex-row items-center gap-6 lg:gap-10 shadow-[8px_8px_0px_#000] sm:shadow-[12px_12px_0px_#000] w-[90%] sm:w-[80%] lg:w-auto transform -translate-x-1/2 ${
              isMenuOpen ? "flex" : "hidden lg:flex"
            }`}
          >
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap">
                {personal.name?.split(" ")[0] || "USER"}
              </span>
            </div>
            <div className="w-full h-px lg:w-px lg:h-8 bg-black/10" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 items-center justify-center w-full">
              <a href="#works" onClick={() => setIsMenuOpen(false)} className="text-black inline-flex items-center gap-2 underline underline-offset-4 decoration-2 hover:text-black transition-colors w-full sm:w-auto justify-center">
                <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" /> All_Works
              </a>
              {experience.length > 0 && (
                <a href="#experience" onClick={() => setIsMenuOpen(false)} className="hover:text-black cursor-pointer transition-colors w-full sm:w-auto text-center">
                  Experience
                </a>
              )}
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-black cursor-pointer transition-colors w-full sm:w-auto text-center">
                Connect
              </a>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Title Section ───────────────────────────────────────────── */}
      <div className="mt-20 sm:mt-32 lg:mt-40 mb-12 sm:mb-20 space-y-8 max-w-[100rem] mx-auto flex flex-col xl:flex-row xl:items-end justify-between gap-8 lg:gap-12">
        <div className="space-y-4 sm:space-y-6 w-full xl:w-auto">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest italic rounded-md">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" /> Visual Index // v1.0
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[8vw] xl:text-[9vw] font-black uppercase tracking-tighter italic leading-none break-words w-full">
            GRID_SYS
          </h1>
        </div>
        <div className="space-y-4 max-w-xl text-left xl:text-right w-full xl:w-auto">
          <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold opacity-60 leading-relaxed italic">
            {personal.title} — {personal.bio}
          </p>
          {personal.location && (
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 inline-block xl:block">
              LOC: {personal.location}
            </div>
          )}
        </div>
      </div>

      {/* ── Masonry Grid Layout ─────────────────────────────────────── */}
      <main className="max-w-[100rem] mx-auto pb-20 sm:pb-32 lg:pb-40">
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 sm:gap-8 lg:gap-10 space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Skills Polaroid */}
          {skills.length > 0 && (
            <motion.div whileHover={{ scale: 0.98, rotate: -1 }}
              className="break-inside-avoid p-6 sm:p-8 lg:p-10 bg-zinc-900 text-white rounded-[2rem] sm:rounded-[40px] shadow-[8px_8px_0px_#000] lg:shadow-[16px_16px_0px_#000] border-4 border-black group">
              <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 sm:mb-12 flex justify-between items-center">
                <span>Resource_Array</span>
                <span className="text-[#00FF66] animate-pulse">●</span>
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="px-3 sm:px-4 py-2 bg-zinc-800 text-white border-2 border-transparent hover:border-white transition-all rounded-xl flex flex-col gap-1 sm:gap-2 cursor-default shrink-0">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{skill.name}</span>
                    <div className="flex gap-1 justify-between">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <div key={si} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${si < skill.level ? "bg-[#00FF66]" : "bg-white/10"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Polaroids */}
          {projects.map((project, i) => (
            <motion.div key={i} id={i === 0 ? "works" : ""}
              whileHover={{ y: -5, rotate: i % 2 === 0 ? 1 : -1, scale: 1.01 }}
              className="break-inside-avoid bg-white border-2 sm:border-4 border-black p-3 sm:p-4 pb-8 sm:pb-12 shadow-[8px_8px_0px_#000] lg:shadow-[16px_16px_0px_#000] group cursor-pointer relative rounded-sm sm:rounded-md lg:rounded-[20px] transition-transform duration-300">
              <div className="aspect-[4/5] sm:aspect-square bg-zinc-100 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 border border-zinc-200 rounded-sm lg:rounded-[12px]">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-zinc-200 rounded-full group-hover:scale-110 transition-transform duration-700" />
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/60 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all flex items-center justify-center">
                    <span className="px-5 sm:px-8 py-3 sm:py-4 bg-[#00FF66] text-black text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] lg:tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl border-2 border-black rounded-full">
                      Expand Interface
                    </span>
                  </a>
                )}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[8px] sm:text-[9px] font-black bg-white px-2 py-1 border border-black z-10">
                  ID_{i + 101}
                </div>
              </div>
              <div className="px-2 sm:px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase italic tracking-tight flex justify-between items-start gap-4 break-words leading-tight">
                  <span className="line-clamp-2">{project.name}</span>
                  {(project.liveUrl || project.githubUrl) && (
                    <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 p-2 sm:p-3 bg-zinc-100 rounded-full group-hover:bg-black group-hover:text-white transition-colors border border-black">
                      <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                </h4>
                <p className="text-[9px] sm:text-xs font-bold leading-relaxed opacity-60 uppercase tracking-tight italic line-clamp-3 lg:line-clamp-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                  {project.techStack?.map((tech, ti) => (
                    <span key={ti} className="text-[8px] sm:text-[9px] font-black px-2 py-1 bg-zinc-100 border border-zinc-200 rounded-md uppercase tracking-wider text-zinc-600">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Experience List Polaroid */}
          {experience.length > 0 && (
             <div id="experience" className="break-inside-avoid p-6 sm:p-8 lg:p-10 bg-black text-white rounded-[2rem] sm:rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] lg:shadow-[16px_16px_0px_rgba(0,0,0,0.5)] border-4 border-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-20 bg-zinc-900 rounded-full blur-3xl opacity-50" />
               <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 flex justify-between items-center relative z-10">
                 <span className="flex items-center gap-2"><Briefcase className="w-3 h-3 sm:w-4 sm:h-4" /> Chronology</span>
               </h3>
               <div className="space-y-6 sm:space-y-8 relative z-10">
                 {experience.map((exp, i) => (
                    <div key={i} className="pl-4 sm:pl-6 border-l-2 border-zinc-800 space-y-2">
                      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#00FF66] bg-zinc-900 inline-block px-2 py-1 rounded-sm border border-zinc-800">
                        {exp.duration}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-tight">{exp.role}</h4>
                      <p className="text-xs sm:text-sm font-bold opacity-50 uppercase tracking-widest">{exp.company}</p>
                      <p className="text-[10px] sm:text-xs opacity-70 leading-relaxed font-sans">{exp.description}</p>
                    </div>
                 ))}
               </div>
             </div>
          )}

          {/* Contact Card */}
          <div id="contact" className="break-inside-avoid p-8 sm:p-10 lg:p-16 bg-[#00FF66] border-4 sm:border-8 border-black text-black space-y-8 sm:space-y-12 shadow-[8px_8px_0px_#000] lg:shadow-[16px_16px_0px_#000] rounded-[2rem] sm:rounded-[40px] relative overflow-hidden group transition-transform hover:rotate-1">
            <div className="absolute top-0 right-0 p-16 sm:p-32 bg-white/30 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <h3 className="text-5xl sm:text-6xl lg:text-[6vw] font-black uppercase italic tracking-tighter leading-[0.9]">
                GOT <br />IDEAS?
              </h3>
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 animate-pulse shrink-0" />
            </div>
            <div className="space-y-3 sm:space-y-4 relative z-10">
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest block opacity-60 italic">
                Open_Frequency
              </span>
              <a href={`mailto:${contact.email}`}
                className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase underline decoration-4 sm:decoration-8 underline-offset-4 sm:underline-offset-8 hover:italic transition-all break-all leading-tight">
                {contact.email}
              </a>
            </div>
            <div className="pt-6 sm:pt-10 border-t-4 border-black flex items-center gap-4 group-hover:gap-6 transition-all">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-black text-[#00FF66] rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 -rotate-45" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest leading-tight">
                Initialise <br className="hidden sm:block"/>Protocol
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Aesthetic Footer ────────────────────────────────────────── */}
      <footer className="mt-16 sm:mt-24 lg:mt-40 text-center border-t-4 border-black pt-12 sm:pt-20 pb-10">
        <div className="inline-block p-1.5 sm:p-2 bg-black rounded-xl sm:rounded-2xl transform hover:rotate-2 transition-transform cursor-default shadow-lg">
          <div className="px-6 sm:px-10 py-3 sm:py-5 bg-white border-2 sm:border-4 border-black rounded-lg sm:rounded-xl flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_10px_#00FF66]" />
            <span className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-black">
              All Systems Operational — v1.02
            </span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
