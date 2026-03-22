"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  User,
  Briefcase,
  Code,
  Mail,
  ArrowRight,
  ExternalLink,
  MapPin,
  Globe,
  Github,
  Linkedin,
  GraduationCap,
} from "lucide-react";

export default function AeroGlassTemplate({ data }: { data: PortfolioData }) {
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
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0f172a]" />
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* ── Nav ────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/10 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <span className="text-lg font-bold tracking-tight text-white/90">
              {personal.name?.split(" ")[0] ?? "Studio"}
            </span>
            <div className="flex items-center gap-3">
              {social.github && (
                <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all hidden sm:flex">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all hidden sm:flex">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a href={`mailto:${contact.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </a>
            </div>
          </div>
        </nav>

        {/* ── Main content wrapper ───────────────────────────────── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 sm:space-y-24">
          
          {/* ── Hero Profile Card ────────────────────────────────── */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp as any}
            custom={0}
            className="bg-white/5 border border-white/10 rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 text-center lg:text-left">
              {/* Avatar */}
              <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl shadow-blue-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/50 flex flex-col items-center justify-center text-blue-200">
                  {personal.imageUrl ? (
                    <img src={personal.imageUrl} alt={personal.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </div>
              </div>
              
              <div className="space-y-6 max-w-2xl flex-1">
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 break-words">
                    {personal.name}
                  </h1>
                  <p className="text-lg sm:text-xl font-bold uppercase tracking-widest text-blue-300">
                    {personal.title}
                  </p>
                </div>
                <p className="text-base sm:text-lg text-blue-50/70 leading-relaxed">
                  {personal.bio}
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                  {personal.location && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-blue-100">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" /> {personal.location}
                    </div>
                  )}
                  {contact.website && (
                    <a href={contact.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-blue-100 hover:bg-white/10 transition-colors">
                      <Globe className="w-4 h-4 text-purple-400 shrink-0" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Active Projects ──────────────────────────────────── */}
          {projects.length > 0 && (
            <section className="space-y-8 sm:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> Active Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {projects.map((project, i) => (
                  <motion.article
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp as any}
                    custom={i}
                    className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/10 transition-all flex flex-col h-full"
                  >
                    <div className="aspect-video bg-black/40 relative overflow-hidden">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 font-sans" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-white/10 text-white/90">
                        Case Study
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 break-words">{project.name}</h3>
                      <p className="text-sm sm:text-base text-blue-50/60 leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((t, idx) => (
                            <span key={idx} className="text-[10px] sm:text-xs uppercase font-bold tracking-wider bg-blue-500/10 border border-blue-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-blue-200">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer"
                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors">
                            View Project <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center shrink-0">
                              <Github className="w-4 h-4 text-blue-200" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          )}

          {/* ── Two Column ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            
            {/* Left Col: Skills & Experience */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Skills Area */}
              {skills.length > 0 && (
                <section className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-10 backdrop-blur-xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
                    <Code className="w-5 h-5 text-blue-400" /> System Status
                  </h3>
                  <div className="space-y-6">
                    {skills.map((skill, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                          <span className="text-blue-50">{skill.name}</span>
                          <span className="text-blue-400">{skill.level * 20}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level * 20}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience Area */}
              {experience.length > 0 && (
                <section>
                  <h2 className="text-2xl sm:text-4xl font-black text-white mb-10 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" /> Experience
                  </h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {experience.map((exp, i) => (
                      <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp as any}
                        custom={i}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                      >
                        {/* Timeline dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0f172a] bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md hover:bg-white/10 transition-colors">
                          <div className="flex flex-col gap-1 mb-3">
                            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">{exp.duration}</span>
                            <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                            <h4 className="text-sm font-medium text-blue-200">{exp.company}</h4>
                          </div>
                          <p className="text-sm text-blue-50/60 leading-relaxed">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Col: Education & Contact small */}
            <div className="lg:col-span-5 space-y-8">
              {education.length > 0 && (
                <section className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-10 backdrop-blur-xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-400" /> Education
                  </h3>
                  <div className="space-y-6">
                    {education.map((edu, i) => (
                      <div key={i} className="pb-6 border-b border-white/10 last:pb-0 last:border-0">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h4 className="font-bold text-base text-white leading-tight break-words">{edu.degree}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md shrink-0">{edu.year}</span>
                        </div>
                        <p className="text-sm font-medium text-blue-200">{edu.institution}</p>
                        {edu.description && (
                          <p className="text-sm text-blue-50/60 mt-3">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quick Contact Card */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[32px] p-8 sm:p-10 text-center shadow-2xl shadow-blue-500/20">
                <Mail className="w-10 h-10 text-white/50 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-2">Let's talk</h3>
                <p className="text-blue-100/80 text-sm mb-6">Open for new opportunities and interesting projects.</p>
                <a href={`mailto:${contact.email}`}
                  className="inline-flex items-center justify-center w-full py-4 bg-white text-blue-900 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg">
                  Send Message
                </a>
              </section>
            </div>

          </div>
        </main>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer className="border-t border-white/10 py-12 text-center bg-[#0f172a]/80 backdrop-blur-xl mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-black mb-8 text-white/90">AeroGlass_</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              {Object.entries(social).map(([platform, url], i) => (
                <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all text-blue-200 hover:text-white">
                  {platform === "github" ? <Github className="w-5 h-5" /> :
                   platform === "linkedin" ? <Linkedin className="w-5 h-5" /> : 
                   <Globe className="w-5 h-5" />}
                </a>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/50">
              © {new Date().getFullYear()} {personal.name}. All systems operational.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
