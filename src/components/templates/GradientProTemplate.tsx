"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Globe,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  ArrowRight,
  Code
} from "lucide-react";

export default function GradientProTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
    education = [],
  } = data || {};

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 overflow-x-hidden">
      {/* ── Background ────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 opacity-80" />
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-pink-500/20 blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {/* ── Navigation ──────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 pt-4 pb-2 px-4 sm:px-6 no-print">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 sm:px-8 py-4 flex items-center justify-between shadow-2xl">
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                {personal.name?.split(" ")[0] || "PRO"}
              </span>
              <div className="flex gap-4 sm:gap-6 items-center">
                <div className="hidden sm:flex gap-4">
                  {social.github && (
                    <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {contact.website && (
                    <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <a href={`mailto:${contact.email}`}
                  className="bg-white text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Hero section ────────────────────────────────────────── */}
        <header className="min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 py-20 sm:py-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp as any} custom={0} className="relative w-full max-w-5xl mx-auto">
            {personal.imageUrl && (
              <img src={personal.imageUrl} alt={personal.name}
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-[32px] sm:rounded-[48px] object-cover border-2 border-white/20 shadow-2xl mb-8 sm:mb-12 mx-auto rotate-3 hover:rotate-0 transition-transform duration-500" />
            )}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-4 sm:mb-6 break-words">
              {personal.name}
            </h1>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-8 sm:mb-12 leading-tight">
              {personal.title}
            </p>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={fadeUp as any} custom={1} className="max-w-3xl text-lg sm:text-2xl text-white/70 leading-relaxed font-medium mb-12 px-4">
            {personal.bio}
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp as any} custom={2} className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {personal.location && (
              <div className="flex items-center gap-3 text-white/50 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <MapPin className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">{personal.location}</span>
              </div>
            )}
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/50 bg-white/5 px-6 py-3 rounded-full border border-white/5 hover:bg-white/10 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest break-all line-clamp-1">{contact.email}</span>
            </a>
          </motion.div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 space-y-24 sm:space-y-40">
          
          {/* ── Selected Work ─────────────────────────────────────── */}
          {projects.length > 0 && (
            <section id="work" className="space-y-12 sm:space-y-20">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mix-blend-overlay opacity-90">
                  Selected<br/>Projects_
                </h2>
                <div className="h-2 w-24 sm:w-32 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
              </div>

              <div className="flex flex-col gap-8 sm:gap-16">
                {projects.map((project, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp as any} custom={i}
                    className="group bg-white/5 backdrop-blur-xl rounded-[32px] sm:rounded-[48px] border border-white/10 overflow-hidden flex flex-col lg:flex-row hover:border-indigo-500/50 transition-colors duration-500 shadow-2xl">
                    {/* Image Area */}
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto relative bg-slate-900 overflow-hidden min-h-[300px]">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-pink-500/10">
                          <Code className="w-16 h-16 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 lg:from-slate-950 via-transparent to-transparent opacity-90 pointer-events-none" />
                    </div>
                    
                    {/* Content Area */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10 -mt-20 lg:mt-0">
                      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                        {project.techStack?.map((t, idx) => (
                          <span key={idx} className="bg-indigo-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-indigo-200 border border-indigo-500/30">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 group-hover:text-pink-400 transition-colors break-words">
                        {project.name}
                      </h3>
                      <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-auto">
                        <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-950 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] hover:bg-pink-400 transition-colors shadow-lg">
                          Explore Case <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ── Arsenal (Skills) ──────────────────────────────────── */}
          {skills.length > 0 && (
            <section className="bg-white/5 backdrop-blur-3xl rounded-[40px] sm:rounded-[64px] border border-white/10 p-8 sm:p-16 lg:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
              <div className="relative z-10 space-y-12 sm:space-y-20">
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                  Arsenal_
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                  {skills.map((skill, i) => (
                    <div key={i} className="group space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white/90 group-hover:text-pink-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] sm:text-xs font-black text-white/30 uppercase tracking-widest">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── History & Academy ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {experience.length > 0 && (
              <section className="space-y-12 sm:space-y-16">
                <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter flex items-center gap-4 sm:gap-6">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" /> History
                </h3>
                <div className="space-y-10 sm:space-y-16 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:w-0.5 before:bg-white/10">
                  {experience.map((exp, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                      className="relative pl-12 sm:pl-16 space-y-3 sm:space-y-4 group">
                      <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-950 border-4 border-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{exp.role}</h4>
                          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs sm:text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-full shrink-0">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="space-y-12 sm:space-y-16">
                <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter flex items-center gap-4 sm:gap-6">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" /> Academy
                </h3>
                <div className="flex flex-col gap-6 sm:gap-8">
                  {education.map((edu, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                      className="bg-white/5 p-8 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/5 hover:border-pink-500/30 transition-colors shadow-xl">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex-1 min-w-0 break-words">{edu.degree}</h4>
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-pink-500 bg-pink-500/10 px-3 py-1.5 rounded-full shrink-0">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-white/50 font-bold text-xs sm:text-sm uppercase tracking-widest mb-4">
                        {edu.institution}
                      </p>
                      {edu.description && (
                         <p className="text-white/70 leading-relaxed text-sm sm:text-base">{edu.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="py-24 sm:py-40 bg-white text-slate-950 rounded-t-[64px] sm:rounded-t-[100px] text-center px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 relative z-10">
            <h2 className="text-6xl sm:text-8xl md:text-[12vw] font-black leading-none tracking-tighter uppercase italic px-4">
              Let's <span className="text-indigo-600">Scale</span>.
            </h2>
            <div className="flex flex-col items-center gap-8 sm:gap-12">
              <a href={`mailto:${contact.email}`}
                className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 underline underline-offset-8 sm:underline-offset-[16px] decoration-slate-300 hover:decoration-indigo-600 transition-colors break-all px-4">
                {contact.email}
              </a>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-8 sm:pt-12 px-4">
                {Object.entries(social).map(([platform, url], i) => (
                  <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:text-indigo-600 transition-colors bg-slate-100 px-5 sm:px-6 py-3 rounded-full border border-slate-200 shadow-sm">
                    {platform}
                  </a>
                ))}
              </div>
            </div>
            <div className="pt-24 sm:pt-40 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-slate-400">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED / DESIGNED FOR GROWTH
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
