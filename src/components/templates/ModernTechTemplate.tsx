"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Terminal,
  Star,
} from "lucide-react";

export default function ModernTechTemplate({ data }: { data: PortfolioData }) {
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
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[160px] opacity-[0.07]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[160px] opacity-[0.07]" />
      </div>

      <div className="relative z-10">
        {/* ── Nav ───────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-px">
                <div className="w-full h-full bg-gray-900 rounded-[11px] flex items-center justify-center font-black text-sm text-cyan-400">
                  {personal.name?.[0] ?? "P"}
                </div>
              </div>
              <span className="hidden sm:block font-black uppercase tracking-tighter text-base italic">
                {personal.name?.split(" ")[0] ?? "Portfolio"}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {social.github && (
                <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/30 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/30 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a href={`mailto:${contact.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hire Me</span>
              </a>
            </div>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] sm:rounded-[48px] p-8 sm:p-14 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-black uppercase tracking-widest text-cyan-400">
                <Star className="w-3 h-3 fill-current" /> Available for Projects
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 break-words">
                {personal.name ?? "Modern Creator"}
              </h1>
              <p className="text-xl sm:text-3xl font-bold text-gray-200 tracking-tight">
                {personal.title}
              </p>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl leading-relaxed">
                {personal.bio}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
                {personal.location && (
                  <span className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                    {personal.location}
                  </span>
                )}
                <span className="flex items-center gap-2 text-gray-400 text-sm font-medium break-all">
                  <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                  {contact.email}
                </span>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24 sm:space-y-32">
          {/* ── Projects ─────────────────────────────────────────── */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-3xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-10 sm:mb-14">
                Featured Work_
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {projects.map((project, i) => (
                  <motion.article
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp as any}
                    custom={i}
                    className="group bg-white/5 rounded-[28px] border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-2 flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-600/10">
                          <Terminal className="w-10 h-10 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
                      <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors break-words">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech, idx) => (
                          <span key={idx}
                            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 text-gray-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-1">
                        <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                          View Live <ExternalLink className="w-3 h-3" />
                        </a>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all">
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

          {/* ── Skills Arsenal ───────────────────────────────────── */}
          {skills.length > 0 && (
            <section className="bg-white/5 rounded-[40px] border border-white/10 p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl font-black mb-10 flex items-center gap-4">
                <Terminal className="w-8 h-8 text-cyan-400" /> Arsenal_
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {skills.map((skill, i) => (
                  <div key={i} className="space-y-2 group">
                    <div className="flex justify-between items-end">
                      <span className="text-base font-bold text-gray-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                        {skill.name}
                      </span>
                      <span className="text-xs font-black text-gray-500 group-hover:text-white transition-colors">
                        {skill.level}/5
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Experience & Education ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-black mb-10 flex items-center gap-4">
                  <Briefcase className="w-7 h-7 text-cyan-400" /> History_
                </h2>
                <div className="space-y-10 border-l-2 border-white/10 ml-3 pl-7">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[33px] top-1.5 w-3.5 h-3.5 rounded-full bg-gray-950 border-2 border-cyan-500 group-hover:scale-125 transition-transform" />
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {exp.role}
                          </h3>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-purple-400 uppercase tracking-tight">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-black mb-10 flex items-center gap-4">
                  <GraduationCap className="w-7 h-7 text-purple-400" /> Education_
                </h2>
                <div className="space-y-5">
                  {education.map((edu, i) => (
                    <div key={i}
                      className="bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold break-words flex-1 min-w-0">{edu.degree}</h3>
                        <span className="text-[10px] font-black text-gray-500 shrink-0">{edu.year}</span>
                      </div>
                      <p className="text-sm font-bold text-purple-400 uppercase tracking-tight">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic">
                  Let&apos;s <span className="text-cyan-400">Connect.</span>
                </h3>
                <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                  Open to new opportunities
                </p>
              </div>
              <a href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 px-7 py-4 bg-white text-black rounded-2xl text-base sm:text-lg font-black hover:bg-cyan-400 transition-colors shadow-2xl">
                Send Message <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
              <span>© {new Date().getFullYear()} {personal.name} Studio</span>
              <div className="flex gap-4">
                {social.github && <a href={`https://github.com/${social.github}`} className="hover:text-white transition-colors">GitHub</a>}
                {social.linkedin && <a href={`https://linkedin.com/in/${social.linkedin}`} className="hover:text-white transition-colors">LinkedIn</a>}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
