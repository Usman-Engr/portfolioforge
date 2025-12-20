"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Globe,
  MapPin,
  Sparkles,
  Command,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function MinimalProTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills } = data;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-black selection:text-white p-6 md:p-12 lg:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Profile Island */}
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
              className="text-4xl md:text-5xl font-black tracking-tight"
            >
              {personal.name}
            </motion.h1>
            <p className="text-lg md:text-xl font-medium text-zinc-500 max-w-xl mx-auto">
              {personal.title} — {personal.location}
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

        {/* The "Life Map" - Bento Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Box */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 bg-white border border-zinc-200 rounded-[40px] shadow-xs relative overflow-hidden group"
          >
            <div className="absolute top-10 right-10 text-zinc-100 group-hover:text-zinc-200 transition-colors">
              <Command className="w-20 h-20" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6">
              Manifesto
            </h3>
            <p className="text-2xl font-bold leading-relaxed tracking-tight relative z-10 italic">
              {personal.bio}
            </p>
          </motion.div>

          {/* Skill Pills */}
          <div className="p-8 bg-zinc-900 text-white rounded-[40px] flex flex-col justify-between gap-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Infrastructure
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.slice(0, 6).map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Mini Block */}
          <div className="p-8 bg-white border border-zinc-200 rounded-[40px] flex flex-col justify-between items-start gap-10">
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                Available At
              </span>
              <span className="text-lg font-black">
                {contact.email?.split("@")[0]}@**
              </span>
            </div>
          </div>

          {/* Projects Links */}
          <div className="md:col-span-2 space-y-4 mt-8">
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

        {/* Footer Signature */}
        <footer className="pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-zinc-900" />
            Verified Professional Core 2025
          </div>
        </footer>
      </div>
    </div>
  );
}
