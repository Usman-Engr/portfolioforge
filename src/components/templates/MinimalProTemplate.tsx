"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Globe,
  MapPin,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";

export default function MinimalProTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills, experience, education } = data;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      {/* ── Navigation ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#f9f9f7]/90 backdrop-blur-lg border-b border-zinc-200/60 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-sm font-black uppercase tracking-widest text-zinc-900">
            {personal.name?.split(" ")[0] ?? "Portfolio"}
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            {social.github && (
              <a
                href={`https://github.com/${social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={`https://linkedin.com/in/${social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hire Me</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp as any}
          custom={0}
          className="space-y-6"
        >
          {/* Avatar initial */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900 rounded-[20px] flex items-center justify-center shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {personal.name?.[0] ?? "P"}
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase break-words">
              {personal.name ?? "Your Name"}
            </h1>
            <p className="text-base sm:text-lg font-medium text-zinc-500 uppercase tracking-widest">
              {personal.title}
              {personal.location && (
                <span className="ml-3 inline-flex items-center gap-1 text-zinc-400 normal-case tracking-normal">
                  <MapPin className="w-3.5 h-3.5 inline" />
                  {personal.location}
                </span>
              )}
            </p>
          </div>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            {personal.bio}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-700 transition-colors"
            >
              <Mail className="w-4 h-4" /> {contact.email}
            </a>
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:border-zinc-400 transition-colors"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {/* ── Skills ──────────────────────────────────────────────── */}
        {skills.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp as any}
            custom={0}
          >
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-5 flex items-center gap-3">
              <Code2 className="w-4 h-4" /> Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:border-zinc-400 transition-colors"
                >
                  {skill.name}
                  {skill.level >= 4 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block" />
                  )}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Projects ────────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-3">
              <ArrowUpRight className="w-4 h-4" /> Selected Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, i) => (
                <motion.article
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp as any}
                  custom={i}
                  className="group bg-white border border-zinc-200 rounded-[28px] overflow-hidden hover:border-zinc-400 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Project image */}
                  <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                        <Code2 className="w-10 h-10 text-zinc-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold leading-tight break-words">
                        {project.name}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-1.5 text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-zinc-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-zinc-700 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-all"
                        >
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

        {/* ── Experience & Education ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-3">
                <Briefcase className="w-4 h-4" /> Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp as any}
                    custom={i}
                    className="relative pl-5 border-l-2 border-zinc-200 hover:border-zinc-900 transition-colors group"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors" />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold">{exp.role}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                        {exp.company}
                      </p>
                      <p className="text-sm text-zinc-500 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-3">
                <GraduationCap className="w-4 h-4" /> Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp as any}
                    custom={i}
                    className="bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-400 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold flex-1 min-w-0 break-words">
                        {edu.degree}
                      </h3>
                      <span className="text-[10px] font-black text-zinc-400 shrink-0">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── Footer / CTA ──────────────────────────────────────────── */}
      <footer className="bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Available for opportunities
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Let&apos;s work together.
              </h2>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm hover:bg-zinc-100 transition-colors shrink-0"
            >
              <Mail className="w-5 h-5" />
              {contact.email}
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">
            <span>© {new Date().getFullYear()} {personal.name}</span>
            <div className="flex gap-4">
              {social.github && (
                <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              )}
              {social.linkedin && (
                <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
