"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function ModernTechTemplate({ data }: { data: PortfolioData }) {
  // Defensive check for data and its nested properties
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "", phone: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
    education = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden scroll-smooth">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[64px_64px]" />
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 md:opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 md:opacity-20 animate-pulse delay-700" />
      </div>

      <div className="relative z-10">
        {/* Navigation / Header */}
        <nav className="sticky top-0 z-50 px-6 py-4 md:py-6 backdrop-blur-md bg-gray-950/50 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-purple-600 p-px">
                <div className="w-full h-full bg-gray-900 rounded-[11px] flex items-center justify-center font-black text-sm text-cyan-400">
                  {personal.name?.[0] || "?"}
                </div>
              </div>
              <span className="hidden sm:block font-black uppercase tracking-tighter text-lg italic">
                {personal.name?.split(" ")[0] || "Portfolio"}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {Object.entries(social).map(([platform, url], i) => (
                <a
                  key={i}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 md:p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-cyan-400"
                  title={platform}
                >
                  <Globe className="w-4 h-4" />
                </a>
              ))}
              <a
                href={`mailto:${contact.email}`}
                className="ml-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Hire Me
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-[32px] md:rounded-[64px] p-8 md:p-20 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6 md:space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest text-cyan-400">
                <Star className="w-3 h-3 fill-current" /> Available for Projects
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                {personal.name || "Modern Creator"}
              </h1>
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-200 tracking-tight">
                {personal.title}
              </p>
              <p className="text-lg md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
                {personal.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  <span className="text-sm md:text-lg font-medium">
                    {personal.location || "Remote / Global"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <span className="text-sm md:text-lg font-medium">
                    {contact.email}
                  </span>
                </div>
              </div>
            </div>
            {/* Ambient decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-cyan-500/20 transition-colors" />
          </div>
        </section>

        {/* Core Content Grid */}
        <main className="max-w-7xl mx-auto px-6 py-20 space-y-24 md:space-y-40">
          {/* Projects Section - Responsive Grid */}
          <section id="work">
            <div className="flex items-center justify-between mb-12 md:mb-20">
              <h2 className="text-4xl md:text-7xl font-black bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                Featured Work_
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="group bg-white/5 rounded-[32px] p-6 md:p-8 border border-white/10 hover:border-cyan-500/50 transition-all hover:-translate-y-2 flex flex-col h-full overflow-hidden"
                >
                  <div className="relative mb-8 rounded-2xl overflow-hidden aspect-video bg-gray-900">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent opacity-60" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed text-sm grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl || "#"}
                      className="flex-1 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      View Live <ExternalLink className="w-3 h-3" />
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dual Column: Experience & Technical Arsenal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Experience & Education */}
            <div className="space-y-20">
              <section>
                <h3 className="text-4xl font-black mb-12 flex items-center gap-4">
                  <Briefcase className="w-8 h-8 text-cyan-400" /> History_
                </h3>
                <div className="space-y-12 border-l-2 border-white/10 ml-4 pl-8">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-cyan-500 group-hover:scale-125 transition-transform" />
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {exp.role}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full w-fit">
                            {exp.duration}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-purple-400 uppercase tracking-tight">
                          {exp.company}
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-4xl font-black mb-12 flex items-center gap-4">
                  <GraduationCap className="w-8 h-8 text-purple-400" />{" "}
                  Education_
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {education.map((edu, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-white">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-black text-gray-500">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-purple-400 font-bold text-sm uppercase tracking-tight">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Arsenal (Skills) */}
            <section className="bg-white/5 rounded-[40px] p-8 md:p-12 border border-white/10 h-fit">
              <h3 className="text-4xl md:text-5xl font-black mb-16 flex items-center gap-4">
                <Terminal className="w-8 md:w-10 h-8 md:h-10 text-cyan-400" />{" "}
                Arsenal_
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skill, i) => (
                  <div key={i} className="space-y-3 group">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-gray-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                        {skill.name}
                      </span>
                      <span className="text-xs font-black text-gray-500 group-hover:text-white transition-colors">
                        {skill.level}/5
                      </span>
                    </div>
                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: i * 0.1,
                        }}
                        className="h-full bg-linear-to-r from-cyan-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Unified Responsive Footer */}
        <footer className="mt-40 border-t border-white/5 py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h4 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                Let's <span className="text-cyan-400">Connect</span>.
              </h4>
              <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                Seeking 2024 opportunities
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="text-2xl md:text-3xl font-bold bg-white text-black px-10 py-5 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all shadow-2xl flex items-center gap-4"
              >
                Send Message <ArrowRight className="w-6 h-6" />
              </a>
              <div className="flex gap-4">
                {Object.entries(social).map(([platform, url], i) => (
                  <a
                    key={i}
                    href={url as string}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white uppercase text-[10px] font-black tracking-widest"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
            <span>© 2025 {personal.name} Studio</span>
            <span>
              Ref_0XY_{personal.name?.replace(" ", "_").toUpperCase()}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
