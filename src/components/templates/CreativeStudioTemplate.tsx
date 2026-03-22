"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Globe,
  MapPin,
  ArrowRight,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
} from "lucide-react";

export default function CreativeStudioTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    experience = [],
    skills = [],
    education = [],
  } = data || {};

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 pb-12">
        {/* Floating Nav */}
        <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 flex items-center gap-4 sm:gap-8 shadow-2xl no-print">
          <div className="font-black tracking-tighter text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
            {personal.name?.split(" ")[0].toUpperCase() || "STUDIO"}
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/50">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors hidden sm:inline-block">History</a>
            <a href="#contact" className="hover:text-white transition-colors">Connect</a>
          </div>
        </nav>

        {/* Hero */}
        <header className="min-h-[85vh] flex flex-col items-center justify-center text-center space-y-8 sm:space-y-12 pt-32 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp as any}
            custom={0}
            className="space-y-6 max-w-5xl px-4"
          >
            {personal.imageUrl && (
              <img src={personal.imageUrl} alt={personal.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mx-auto mb-8 border-4 border-white/10 shadow-2xl shadow-pink-500/20" />
            )}
            
            <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 pb-2 sm:pb-4 break-words">
              {personal.name || "Creative"}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <span className="px-5 sm:px-6 py-2 bg-pink-500 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                {personal.title}
              </span>
              {personal.location && (
                <div className="flex items-center gap-2 text-white/40 font-black uppercase tracking-widest text-[10px] sm:text-xs">
                  <MapPin className="w-3.5 h-3.5" /> {personal.location}
                </div>
              )}
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp as any}
            custom={1}
            className="text-lg sm:text-xl md:text-3xl text-white/60 max-w-3xl leading-relaxed font-medium px-4"
          >
            {personal.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-8 px-4"
          >
            {Object.entries(social).map(([platform, url], i) => (
              <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all group">
                {platform === "github" ? <Github className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white" /> :
                 platform === "linkedin" ? <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white" /> : 
                 <Globe className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white" />}
              </a>
            ))}
            <a href={`mailto:${contact.email}`} className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-orange-500/20">
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </motion.div>
        </header>

        {/* Selected Work */}
        {projects.length > 0 && (
          <section id="work" className="py-20 sm:py-32 space-y-16 sm:space-y-20 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 px-4">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500">
                SELECTED_WORK.
              </h2>
              <p className="text-white/40 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs">
                Handpicked Case Studies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {projects.map((project, i) => (
                <motion.article
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp as any}
                  custom={i}
                  className="group relative bg-white/5 rounded-[32px] sm:rounded-[48px] border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-700 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-black/40 relative">
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <div className="p-6 sm:p-10 lg:p-12 space-y-6 relative z-10 flex flex-col flex-1 -mt-20 sm:-mt-24 pointer-events-none">
                    <div className="pointer-events-auto flex flex-wrap gap-2">
                      {project.techStack?.slice(0, 4).map((t, idx) => (
                        <span key={idx}
                          className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white/50 border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full group-hover:text-pink-400 group-hover:border-pink-500/30 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="pointer-events-auto text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase break-words">
                      {project.name}
                    </h3>
                    <p className="pointer-events-auto text-white/60 text-sm sm:text-base leading-relaxed flex-1">
                      {project.description}
                    </p>
                    
                    <div className="pointer-events-auto flex items-center justify-between pt-4">
                      <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-black uppercase tracking-widest text-pink-500 group-hover:gap-5 sm:group-hover:gap-6 transition-all">
                        Explore <span className="hidden sm:inline">Case Study</span> <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Core Stack */}
        {skills.length > 0 && (
          <section className="py-20 sm:py-32 bg-white/5 rounded-[32px] sm:rounded-[48px] border border-white/5 overflow-hidden relative max-w-7xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.08),transparent)] pointer-events-none" />
            <div className="relative z-10 space-y-12 sm:space-y-20 px-6 sm:px-12">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-center pt-8">
                CORE_STACK.
              </h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pb-8">
                {skills.map((skill, i) => (
                  <div key={i}
                    className="px-6 sm:px-10 py-3 sm:py-5 bg-white/5 rounded-[24px] sm:rounded-[32px] border border-white/10 text-base sm:text-xl md:text-2xl font-black uppercase hover:bg-pink-500 hover:scale-105 hover:-rotate-2 transition-all cursor-default select-none shadow-xl">
                    <span className="text-white/80 hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* History & Academy */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 py-20 sm:py-32 max-w-7xl mx-auto">
          {/* History */}
          {experience.length > 0 && (
            <div className="space-y-10 sm:space-y-16">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/30 flex items-center gap-4">
                <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500" /> HISTORY.
              </h2>
              <div className="space-y-8 sm:space-y-12">
                {experience.map((exp, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                    className="group space-y-3 sm:space-y-4 relative pl-6 border-l border-white/10 border-dashed hover:border-pink-500/50 transition-colors">
                    <div className="absolute top-2 -left-[5px] w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-pink-500 group-hover:scale-150 transition-all" />
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/10 pb-3 sm:pb-4 group-hover:border-pink-500/30 transition-colors">
                      <div className="space-y-1">
                        <h4 className="text-xl sm:text-2xl font-black uppercase text-pink-500 break-words">{exp.role}</h4>
                        <p className="text-base sm:text-lg font-bold text-white/70">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded-md shrink-0">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed max-w-lg pt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Academy */}
          {education.length > 0 && (
            <div className="space-y-10 sm:space-y-16">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-l from-white to-white/30 flex items-center gap-4">
                <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400" /> ACADEMY.
              </h2>
              <div className="space-y-8 sm:space-y-12">
                {education.map((edu, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                    className="group space-y-2 relative pl-6 border-l border-white/10 border-dashed hover:border-orange-500/50 transition-colors">
                    <div className="absolute top-2 -left-[5px] w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-orange-500 group-hover:scale-150 transition-all" />
                    <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3 sm:pb-4 group-hover:border-orange-500/30 transition-colors">
                      <h4 className="text-xl sm:text-2xl font-black uppercase text-orange-400 break-words flex-1 min-w-0">{edu.degree}</h4>
                      <span className="text-[10px] sm:text-xs font-black text-white/40 bg-white/5 px-2 py-1 rounded-md shrink-0">{edu.year}</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white/70 pt-2">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-white/40 text-sm leading-relaxed max-w-lg mt-2">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Footer */}
        <footer id="contact" className="py-20 sm:py-32 border-t border-white/10 mt-16 sm:mt-32 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
            <h2 className="text-5xl sm:text-7xl md:text-[10vw] font-black tracking-tighter leading-none uppercase px-4">
              LET'S <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">CREATE</span>.
            </h2>
            <a href={`mailto:${contact.email}`}
              className="text-xl sm:text-3xl md:text-5xl font-black text-white/90 hover:text-pink-500 underline underline-offset-8 sm:underline-offset-[12px] decoration-pink-500 decoration-4 hover:decoration-white transition-all break-all px-4 max-w-full">
              {contact.email}
            </a>
            
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-8 sm:pt-12 px-4">
              {Object.entries(social).map(([platform, url], i) => (
                <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  {platform}
                </a>
              ))}
            </div>
            
            <div className="pt-20 sm:pt-32 text-[8px] sm:text-[9px] font-black text-white/20 uppercase tracking-[0.4em] sm:tracking-[0.5em] px-4">
              CREATIVE STUDIO © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
