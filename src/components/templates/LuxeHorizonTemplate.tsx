"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles,
  MapPin,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";

export default function LuxeHorizonTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-serif selection:bg-[#c1a35f]/30 overflow-x-hidden">
      
      {/* ── Fixed Minimal Nav ─────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 px-6 sm:px-10 py-6 sm:py-8 flex justify-between items-center bg-gradient-to-b from-[#050505]/90 to-transparent backdrop-blur-sm pointer-events-none no-print">
        <div className="pointer-events-auto text-xl sm:text-2xl font-black tracking-tighter text-white italic">
          {personal.name?.split(" ").map((n: string) => n[0]).join("") || "LH"}
        </div>
        <div className="pointer-events-auto hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
          <a href={`mailto:${contact.email}`} className="hover:text-[#c1a35f] transition-colors border-b border-transparent hover:border-[#c1a35f]/50 pb-1">Inquiries</a>
        </div>
        {/* Mobile connect button */}
        <a href={`mailto:${contact.email}`} className="pointer-events-auto md:hidden text-[10px] font-bold uppercase tracking-[0.3em] text-[#c1a35f] border border-[#c1a35f]/30 px-4 py-2 rounded-full">
          Connect
        </a>
      </nav>

      {/* ── Desktop/Mobile Shared Flow ────────────────────────────── */}
      <main className="w-full relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 lg:top-1/4 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-[#c1a35f]/5 rounded-full blur-[80px] sm:blur-[120px]" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 sm:px-10 pt-32 pb-20">
          <div className="space-y-8 sm:space-y-12 max-w-5xl w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp as any} custom={0}>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#c1a35f] mb-6 flex items-center justify-center gap-4">
                <div className="w-8 sm:w-16 h-px bg-[#c1a35f]/30" />
                ESTABLISHED {new Date().getFullYear()}
                <div className="w-8 sm:w-16 h-px bg-[#c1a35f]/30" />
              </span>
              {personal.imageUrl && (
                <img src={personal.imageUrl} alt={personal.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-8 sm:mb-12 object-cover border-2 border-[#c1a35f]/20" />
              )}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black italic tracking-tighter text-white leading-[0.85] break-words">
                {personal.name?.split(" ")[0]}<br className="lg:hidden" />
                <span className="text-[#c1a35f] hidden lg:inline"> </span>
                <span className="text-white/60 text-5xl sm:text-6xl md:text-7xl lg:text-[8rem]">{personal.name?.split(" ").slice(1).join(" ")}</span>
              </h1>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp as any} custom={1} className="space-y-8 max-w-2xl mx-auto">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-400 font-medium leading-relaxed italic">
                {personal.title}
              </p>
              <p className="text-sm sm:text-base text-gray-500 font-sans leading-loose">
                {personal.bio}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {personal.location && (
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c1a35f] font-sans">
                    <MapPin className="w-4 h-4" /> {personal.location}
                  </span>
                )}
                <div className="flex items-center gap-4 text-gray-500">
                  {social.github && <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>}
                  {social.linkedin && <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>}
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 animate-pulse">
            <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-[#c1a35f] to-transparent mx-auto" />
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-40 space-y-32 sm:space-y-56">

          {/* ── The Journey (Experience) ──────────────────────────── */}
          {experience.length > 0 && (
            <section className="flex flex-col lg:flex-row gap-12 sm:gap-20">
              <div className="lg:w-1/3">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-white uppercase lg:sticky lg:top-32">
                  The <br className="hidden lg:block"/> Journey.
                </h2>
              </div>
              <div className="lg:w-2/3 space-y-16 sm:space-y-24 pt-4 sm:pt-6">
                {experience.map((exp, index) => (
                  <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={index}
                    className="group relative pl-8 sm:pl-12 border-l border-white/10 hover:border-[#c1a35f]/50 transition-colors duration-500">
                    <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-[#050505] border border-[#c1a35f] rounded-full group-hover:bg-[#c1a35f] group-hover:scale-150 transition-all duration-500 shadow-[0_0_10px_rgba(193,163,95,0)] group-hover:shadow-[0_0_20px_rgba(193,163,95,0.5)]" />
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tight group-hover:text-[#c1a35f] transition-colors uppercase break-words">
                          {exp.role}
                        </h3>
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 font-sans border border-gray-800 px-3 py-1 rounded-full w-fit shrink-0">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#c1a35f] font-sans">
                        {exp.company}
                      </div>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed font-sans max-w-xl">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ── Selected Works (Projects) ─────────────────────────── */}
          {projects.length > 0 && (
            <section className="bg-[#080808] -mx-6 sm:-mx-10 px-6 sm:px-10 py-24 sm:py-40 border-y border-white/5 relative">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16 sm:mb-24 text-center">
                  <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black italic tracking-tighter text-white uppercase inline-flex items-center gap-4 sm:gap-6">
                    <Sparkles className="text-[#c1a35f] w-8 h-8 sm:w-12 sm:h-12 shrink-0" />
                    Selected Works
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
                  {projects.map((project, index) => (
                    <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={index}
                      className="group cursor-pointer">
                      <div className="aspect-[4/3] sm:aspect-[16/10] bg-[#0f0f0f] rounded-3xl sm:rounded-[40px] overflow-hidden mb-6 sm:mb-8 relative border border-white/5 group-hover:border-[#c1a35f]/30 transition-colors duration-500">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111] to-[#0A0A0A]">
                            <Layers className="w-12 h-12 text-white/5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 sm:gap-4 px-2 sm:px-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                             {project.techStack?.slice(0, 3).map((tech, ti) => (
                               <span key={ti} className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#c1a35f] font-sans border border-[#c1a35f]/20 bg-[#c1a35f]/10 px-3 py-1 rounded-full">
                                {tech}
                              </span>
                             ))}
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-black italic tracking-tight text-white uppercase">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-sans leading-relaxed line-clamp-3 max-w-sm">
                            {project.description}
                          </p>
                        </div>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#c1a35f] hover:text-black hover:border-transparent transition-all shrink-0 self-start sm:self-auto group-hover:-rotate-45">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Expertise (Skills) ────────────────────────────────── */}
          {skills.length > 0 && (
            <section className="flex flex-col lg:flex-row gap-12 sm:gap-20">
              <div className="lg:w-1/3">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-white uppercase lg:sticky lg:top-32">
                  Ars <br className="hidden lg:block"/> Expertis.
                </h2>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 pt-4 sm:pt-6">
                 {skills.map((skill, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                      className="space-y-4 group">
                      <div className="flex justify-between items-end">
                        <span className="text-lg sm:text-xl font-black italic uppercase text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1a35f] font-sans">{skill.level} / 5</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 relative">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(skill.level/5)*100}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-0 left-0 h-full bg-[#c1a35f]" />
                      </div>
                    </motion.div>
                 ))}
              </div>
            </section>
          )}

        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="py-24 sm:py-40 px-6 sm:px-10 border-t border-white/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#080808] group-hover:bg-[#0a0a0a] transition-colors duration-1000 z-0" />
          <div className="relative z-10 space-y-12 max-w-3xl mx-auto">
            <h2 className="text-sm sm:text-base font-black text-[#c1a35f] uppercase tracking-[0.4em] mb-4">
              Begin Collaboration
            </h2>
            <a href={`mailto:${contact.email}`}
              className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic text-white uppercase tracking-tighter hover:text-[#c1a35f] transition-colors break-all">
              {contact.email}
            </a>
            <div className="flex justify-center gap-8 pt-12">
               {social.github && <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>}
               {social.linkedin && <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>}
            </div>
            <div className="pt-16 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.5em] sm:tracking-[1em] text-gray-700 font-sans">
              LUXE HORIZON © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
