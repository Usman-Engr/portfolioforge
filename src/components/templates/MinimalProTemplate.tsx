"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Globe,
  Command,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function MinimalProTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-black selection:text-white w-full overflow-x-hidden">
      {/* MOBILE/TABLET LAYOUT (<1024px) - Strictly Linear & Stacked */}
      <div className="lg:hidden flex flex-col p-4 space-y-8 w-full max-w-[100vw] overflow-hidden">
        {/* Mobile Header */}
        <header className="flex flex-col items-center text-center space-y-6 pt-6 w-full">
          <div className="w-20 h-20 bg-zinc-900 rounded-[24px] flex items-center justify-center shadow-xl shrink-0">
            <span className="text-2xl font-black text-white">
              {personal.name?.[0]}
            </span>
          </div>
          <div className="space-y-2 w-full px-2">
            <h1 className="text-3xl font-black tracking-tight leading-tight break-words uppercase">
              {personal.name}
            </h1>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest break-words px-4">
              {personal.title}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {social.github && (
              <a
                href={`https://github.com/${social.github}`}
                className="p-3 bg-white border border-zinc-200 rounded-xl shadow-sm"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={`https://linkedin.com/in/${social.linkedin}`}
                className="p-3 bg-white border border-zinc-200 rounded-xl shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="p-3 bg-black text-white rounded-xl shadow-xl"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Mobile Bio Card */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm w-full">
          <Command className="w-8 h-8 text-zinc-300 mb-4" />
          <p className="text-base font-bold leading-relaxed italic text-zinc-700 break-words">
            {personal.bio}
          </p>
        </div>

        {/* Mobile Skills Stack */}
        <div className="space-y-4 w-full">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 pl-2">
            Core Tech
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Projects List */}
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Selected Work
            </h3>
            <span className="text-xs font-bold text-zinc-300">2024-25</span>
          </div>
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-[32px] p-6 space-y-4 shadow-sm w-full"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-zinc-400" />
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="w-full">
                <h4 className="text-lg font-bold mb-1 break-words">
                  {project.name}
                </h4>
                <p className="text-xs text-zinc-500 font-medium line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Contact Box */}
        <div className="bg-zinc-900 text-white rounded-[32px] p-6 text-center space-y-6 w-full">
          <Globe className="w-8 h-8 mx-auto text-zinc-500" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Available for hire
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-lg font-black underline decoration-2 underline-offset-4 break-all block"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <footer className="pt-8 pb-4 text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <ShieldCheck className="w-3 h-3" /> Verified Pro
          </div>
        </footer>
      </div>

      {/* DESKTOP LAYOUT (lg+) - The Original Bento Grid */}
      <div className="hidden lg:block p-12 lg:p-16 relative w-full">
        <div className="space-y-12">
          {/* Desktop Header */}
          <header className="flex flex-col items-center text-center space-y-8 mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-zinc-100 rounded-[32px] p-2 border border-zinc-200 shadow-xl"
            >
              <div className="w-full h-full bg-zinc-900 rounded-[28px] flex items-center justify-center">
                <span className="text-3xl font-black text-white">
                  {personal.name?.[0]}
                </span>
              </div>
            </motion.div>
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl lg:text-6xl font-black tracking-tight uppercase"
              >
                {personal.name}
              </motion.h1>
              <p className="text-xl font-medium text-zinc-500">
                {personal.title} {personal.location && `— ${personal.location}`}
              </p>
            </div>
            <div className="flex gap-3">
              {social.github && (
                <a
                  href={`https://github.com/${social.github}`}
                  className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all text-zinc-400 hover:text-black"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${social.linkedin}`}
                  className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all text-zinc-400 hover:text-black"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="p-3 bg-black text-white rounded-2xl hover:scale-110 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </header>

          {/* Desktop Bento Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Manifesto */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 p-10 bg-white border border-zinc-200 rounded-[40px] shadow-xs relative overflow-hidden group"
            >
              <div className="absolute top-10 right-10 text-zinc-100 group-hover:text-zinc-200 transition-colors">
                <Command className="w-20 h-20" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6">
                Manifesto
              </h3>
              <p className="text-2xl font-bold leading-relaxed tracking-tight relative z-10 italic max-w-2xl">
                {personal.bio}
              </p>
            </motion.div>

            {/* Skills */}
            <div className="p-8 bg-zinc-900 text-white rounded-[40px] flex flex-col justify-between gap-10 min-h-[300px]">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Infrastructure
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.slice(0, 6).map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="p-8 bg-white border border-zinc-200 rounded-[40px] flex flex-col justify-between items-start gap-10 min-h-[300px]">
              <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                  Available At
                </span>
                <span className="text-lg font-black fixed-canvas-contact-anchor">
                  {contact.email}
                </span>
              </div>
            </div>

            {/* Projects */}
            <div className="col-span-2 space-y-4 mt-8">
              <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">
                Archive // v1.0
              </h3>
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, backgroundColor: "#fdfdfd" }}
                  className="group p-8 bg-white border border-zinc-200 rounded-[32px] flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:text-black transition-colors">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold group-hover:italic">
                        {project.name}
                      </h4>
                      <p className="text-sm text-zinc-400 font-medium">
                        {project.techStack[0]}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-full bg-zinc-50 border border-zinc-100 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
