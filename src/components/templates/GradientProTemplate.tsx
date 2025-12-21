"use client";

import React from "react";
import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Phone,
  Globe,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function GradientProTemplate({ data }: { data: PortfolioData }) {
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 overflow-x-hidden scroll-smooth">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-purple-950 to-slate-950 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10">
        {/* Floating Header */}
        <nav className="sticky top-6 mx-auto max-w-5xl px-6 py-4 z-50">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 flex items-center justify-between shadow-2xl">
            <span className="text-xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
              {personal.name?.split(" ")[0] || "PRO"}
            </span>
            <div className="flex gap-6 items-center">
              <div className="hidden md:flex gap-4">
                {Object.entries(social).map(([platform, url], i) => (
                  <a
                    key={i}
                    href={url as string}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="bg-white text-slate-950 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-32 space-y-10 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {personal.imageUrl && (
              <img
                src={personal.imageUrl}
                alt={personal.name}
                className="w-40 h-40 rounded-[40px] border-2 border-white/20 shadow-2xl mb-12 rotate-3 group-hover:rotate-0 transition-transform duration-500"
              />
            )}
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
              {personal.name}
            </h1>
            <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300">
              {personal.title}
            </p>
          </motion.div>
          <p className="max-w-3xl text-lg md:text-2xl text-white/60 leading-relaxed font-medium">
            {personal.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-8 py-4">
            <div className="flex items-center gap-3 text-white/40">
              <MapPin className="w-5 h-5" />{" "}
              <span className="text-sm font-bold uppercase tracking-widest">
                {personal.location}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <Mail className="w-5 h-5" />{" "}
              <span className="text-sm font-bold uppercase tracking-widest">
                {contact.email}
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 space-y-40 pb-40">
          {/* Projects - Large Interactive Cards */}
          <section id="work" className="space-y-20">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                Selected Projects_
              </h2>
              <div className="h-1 w-20 bg-indigo-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-md rounded-[48px] border border-white/10 overflow-hidden group p-4"
                >
                  <div className="relative aspect-video rounded-[36px] overflow-hidden bg-slate-900 mb-8">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
                  </div>
                  <div className="px-8 pb-8 space-y-6">
                    <h3 className="text-3xl font-black group-hover:text-indigo-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-white/50 leading-relaxed line-clamp-3 font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.liveUrl || "#"}
                      className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 pt-4"
                    >
                      Explore Case <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience & Core Capabilities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-20">
              <section className="space-y-12">
                <h3 className="text-4xl font-black uppercase flex items-center gap-6">
                  <Briefcase className="w-10 h-10 text-indigo-500" /> History
                </h3>
                <div className="space-y-16">
                  {experience.map((exp, i) => (
                    <div
                      key={i}
                      className="relative pl-12 border-l border-white/10 space-y-4"
                    >
                      <div className="absolute -left-1.5 top-0 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-2xl font-black uppercase">
                            {exp.role}
                          </h4>
                          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-3 py-1 rounded-full">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-white/40 leading-relaxed max-w-2xl">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-12">
                <h3 className="text-4xl font-black uppercase flex items-center gap-6">
                  <GraduationCap className="w-10 h-10 text-purple-500" />{" "}
                  Academy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {education.map((edu, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-2"
                    >
                      <h4 className="text-xl font-black uppercase">
                        {edu.degree}
                      </h4>
                      <p className="text-white/40 font-bold text-xs uppercase tracking-widest">
                        {edu.institution}
                      </p>
                      <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 space-y-20">
              <section className="bg-white/5 p-12 rounded-[64px] border border-white/10 space-y-12">
                <h3 className="text-4xl font-black uppercase italic">
                  Arsenal_
                </h3>
                <div className="space-y-8">
                  {skills.map((skill, i) => (
                    <div key={i} className="group space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-bold uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          className="h-full bg-linear-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <footer className="py-40 bg-white text-slate-950 rounded-t-[100px] text-center px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-7xl md:text-[12vw] font-black leading-none tracking-tighter uppercase italic">
              Let's <span className="text-indigo-500">Scale</span>.
            </h2>
            <div className="flex flex-col items-center gap-8">
              <a
                href={`mailto:${contact.email}`}
                className="text-3xl md:text-5xl font-black underline underline-offset-8 decoration-slate-200 hover:decoration-indigo-500 transition-colors"
              >
                {contact.email}
              </a>
              <div className="flex gap-12 pt-12">
                {Object.entries(social).map(([platform, url], i) => (
                  <a
                    key={i}
                    href={url as string}
                    className="text-xs font-black uppercase tracking-[0.4em] hover:text-indigo-600 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
            <div className="pt-40 text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
              © 2025 ALL RIGHTS RESERVED / DESIGNED FOR GROWTH
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
