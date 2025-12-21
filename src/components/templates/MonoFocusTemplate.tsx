"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  ArrowUpRight,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Twitter,
  ArrowDown,
} from "lucide-react";

export default function MonoFocusTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
    education = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-[#EAEAEA] text-[#111] font-sans selection:bg-[#111] selection:text-white overflow-x-hidden scroll-smooth">
      {/* Dynamic Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-[#EAEAEA]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#111]/5">
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
            {personal.name || "MONO"}
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1">
            System v2.5
          </p>
        </div>
        <div className="pointer-events-auto hidden md:flex flex-col items-end gap-2 bg-[#EAEAEA]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#111]/5">
          <div className="flex gap-4">
            {Object.entries(social).map(([platform, url], i) => (
              <a
                key={i}
                href={url as string}
                className="text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="w-full">
        {/* Hero Section - Minimalist Typography */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-40 py-40">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <h1 className="text-6xl md:text-[12vw] font-black uppercase leading-[0.85] tracking-tighter">
              {personal.title?.split(" ")[0]} <br />
              <span className="text-transparent text-stroke-2">
                {personal.title?.split(" ").slice(1).join(" ") || "CREATOR"}
              </span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <p className="text-xl md:text-3xl font-medium leading-tight max-w-2xl text-zinc-600">
                {personal.bio}
              </p>
              <div className="flex flex-col gap-4 border-l border-[#111]/10 pl-8">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
                  <MapPin className="w-4 h-4" /> Based in{" "}
                  {personal.location || "Earth"}
                </div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  <div className="w-2 h-2 bg-[#111] rounded-full animate-pulse" />{" "}
                  Available for Hire
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mt-24 animate-bounce">
            <ArrowDown className="w-6 h-6" />
          </div>
        </section>

        {/* Work Section - Large Scale Grid */}
        <section id="work" className="px-6 md:px-20 lg:px-40 py-20 space-y-32">
          <div className="flex items-center gap-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Selected_Work
            </h2>
            <div className="h-px flex-1 bg-[#111]/10" />
          </div>

          <div className="space-y-40 md:space-y-64">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`lg:col-span-7 relative group overflow-hidden bg-zinc-200 aspect-video rounded-2xl ${
                    i % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  )}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#111]/5">
                    Project_0{i + 1}
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none">
                    {project.name}
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-[#111]/10 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.liveUrl || "#"}
                    className="inline-flex items-center justify-center px-10 py-5 bg-[#111] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all gap-4"
                  >
                    Explore Case Study <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Core Stack */}
        <section className="px-6 md:px-20 lg:px-40 py-40 border-t border-[#111]/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-16">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Experience_
              </h3>
              <div className="space-y-12 border-l border-[#111]/10 pl-8">
                {experience.map((exp, i) => (
                  <div key={i} className="space-y-2 group">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      {exp.duration}
                    </span>
                    <h4 className="text-2xl font-black uppercase group-hover:text-zinc-500 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#111]">
                      {exp.company}
                    </p>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-16">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Core_Stack_
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-8 bg-zinc-100/50 border border-[#111]/5 rounded-2xl space-y-4 hover:bg-zinc-100 transition-colors"
                  >
                    <div className="flex justify-between items-center font-black text-xs uppercase tracking-widest">
                      <span>{skill.name}</span>
                      <span>{skill.level}/5</span>
                    </div>
                    <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        className="h-full bg-[#111]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="bg-[#111] text-[#EAEAEA] px-6 md:px-20 lg:px-40 py-32 rounded-t-[40px] md:rounded-t-[80px]">
          <div className="max-w-screen-2xl mx-auto space-y-20">
            <h2 className="text-6xl md:text-[10vw] font-black uppercase leading-none tracking-tighter">
              Ready_to <br />
              <span className="text-transparent text-stroke-white italic">
                Collaborate?
              </span>
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-20 border-t border-white/10">
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-white/40">
                  Direct Contact
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-3xl md:text-5xl font-bold hover:text-white/60 transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(social).map(([platform, url], i) => (
                  <a
                    key={i}
                    href={url as string}
                    className="text-xs font-black uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
            <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
              <span>© 2025 MONO FOCUS SYSTEM</span>
              <span>Based in {personal.location?.toUpperCase()}</span>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .text-stroke-2 {
          -webkit-text-stroke: 2px #111;
        }
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
