"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  MapPin,
  Globe,
  Star,
  ArrowRight,
} from "lucide-react";

export default function CreativeStudioTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    experience = [],
    skills = [],
    education = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-pink-500 overflow-x-hidden selection:text-white">
      {/* Dynamic Studio Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-4 md:p-8 lg:p-12">
        {/* Floating Nav */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 flex items-center gap-8 shadow-2xl">
          <div className="font-black tracking-tighter text-xl bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-orange-400">
            {personal.name?.split(" ")[0].toUpperCase() || "STUDIO"}
          </div>
          <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/50">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              History
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Connect
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="min-h-[90vh] flex flex-col items-center justify-center text-center space-y-12 py-32 md:py-48 mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-5xl"
          >
            <h1 className="text-7xl md:text-[10vw] font-black leading-[0.8] tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/20 pb-4">
              {personal.name || "Creative"}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <span className="px-6 py-2 bg-pink-500 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                {personal.title}
              </span>
              <div className="flex items-center gap-2 text-white/40 font-black uppercase tracking-widest text-[10px]">
                <MapPin className="w-3 h-3" /> {personal.location || "Earth"}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-3xl text-white/60 max-w-3xl leading-relaxed font-medium px-4"
          >
            {personal.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {Object.entries(social).map(([platform, url], i) => (
              <a
                key={i}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all group"
              >
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white" />
              </a>
            ))}
          </motion.div>
        </header>

        {/* Selected Work - Responsive BENTOE GRID */}
        <section id="work" className="py-32 space-y-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-orange-400 to-purple-500">
              SELECTED_WORK.
            </h2>
            <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">
              Handpicked Case Studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 rounded-[40px] md:rounded-[64px] border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-700"
              >
                <div className="aspect-ratio-4/3 overflow-hidden bg-white/5 relative">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 md:p-12 space-y-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-black uppercase tracking-wider text-white/30 border border-white/10 px-3 py-1 rounded-full group-hover:text-pink-400 group-hover:border-pink-500/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <a
                    href={project.liveUrl || "#"}
                    className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-pink-500 group-hover:gap-6 transition-all"
                  >
                    Explore Case Study <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Capabilities - Scrolling Text Effect or Tag Cloud */}
        <section className="py-32 bg-white/5 rounded-[48px] border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent)]" />
          <div className="max-w-7xl mx-auto px-8 relative z-10 space-y-20">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-center">
              CORE_STACK.
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3 }}
                  className="px-8 md:px-12 py-4 md:py-6 bg-white/5 rounded-[32px] border border-white/10 text-xl md:text-3xl font-black uppercase group hover:bg-pink-500 transition-colors cursor-default"
                >
                  <span className="group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education - Two Column Layout */}
        <div
          id="about"
          className="grid grid-cols-1 md:grid-cols-2 gap-20 py-32 px-4"
        >
          {/* History */}
          <div className="space-y-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-white/20">
              HISTORY.
            </h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="group space-y-4">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-pink-500/50 transition-colors">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black uppercase text-pink-500">
                        {exp.role}
                      </h4>
                      <p className="text-lg font-bold text-white/60">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed max-w-md">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-l from-white to-white/20">
              ACADEMY.
            </h2>
            <div className="space-y-12">
              {education.map((edu, i) => (
                <div key={i} className="group space-y-2">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 group-hover:border-orange-500/50 transition-colors">
                    <h4 className="text-2xl font-black uppercase text-orange-400">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-black text-white/30">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white/60">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Footer */}
        <footer id="contact" className="py-32 border-t border-white/10 mt-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
            <h2 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-none uppercase">
              LET'S{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-orange-400">
                CREATE
              </span>
              .
            </h2>
            <a
              href={`mailto:${contact.email}`}
              className="text-2xl md:text-5xl font-black underline underline-offset-8 decoration-pink-500 decoration-4 hover:text-pink-500 transition-colors"
            >
              {contact.email}
            </a>
            <div className="flex flex-wrap justify-center gap-12 pt-12">
              {Object.entries(social).map(([platform, url], i) => (
                <a
                  key={i}
                  href={url as string}
                  className="text-xs font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
            <div className="pt-32 text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
              CREATIVE STUDIO © 2025 ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
