"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowRight, Zap, Target, Layers, Globe, Star } from "lucide-react";

export default function BrutalistPulseTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const { personal, contact, projects, experience, skills } = data;

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-400">
      {/* Ultra-Bold Header */}
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto bg-black text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair">
          <span className="text-2xl font-black uppercase italic tracking-tighter">
            {personal.name || "UNNAMED"}
          </span>
        </div>

        <div className="pointer-events-auto flex gap-4">
          <button className="bg-yellow-400 p-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Zap className="w-6 h-6 fill-current" />
          </button>
          <button className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Star className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Bento Grid Hero */}
      <main className="pt-32 p-6 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[250px]">
          {/* Intro Block */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="md:col-span-3 md:row-span-1 bg-white border-8 border-black p-10 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
              01 / IDENTITY
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-4">
              {personal.title || "Full Stack Maverick"}
            </h1>
            <p className="text-xl font-bold max-w-2xl">
              {personal.bio ||
                "Breaking rules, building pixels, and shipping fast."}
            </p>
          </motion.div>

          {/* Contact Pin */}
          <div className="md:col-span-1 md:row-span-1 bg-purple-500 border-8 border-black p-8 flex flex-col justify-between group hover:bg-black hover:text-white transition-colors">
            <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">
                Let's Talk
              </span>
              <span className="text-lg font-black break-all uppercase italic">
                {contact.email}
              </span>
            </div>
          </div>

          {/* Stats Block */}
          <div className="md:col-span-1 md:row-span-2 bg-yellow-400 border-8 border-black p-10 flex flex-col justify-end gap-10">
            <div className="space-y-2">
              <span className="text-6xl font-black block leading-none">
                10+
              </span>
              <span className="text-xs font-black uppercase tracking-widest">
                Global Clients
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-6xl font-black block leading-none">05</span>
              <span className="text-xs font-black uppercase tracking-widest">
                Years Depth
              </span>
            </div>
            <Target className="w-16 h-16 opacity-20" />
          </div>

          {/* Project Spotlight */}
          {projects.slice(0, 1).map((project, i) => (
            <div
              key={i}
              className="md:col-span-2 md:row-span-2 bg-blue-500 border-8 border-black relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="p-10 h-full flex flex-col justify-between text-white relative z-10">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Featured Work
                  </div>
                  <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                    {project.name}
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold max-w-sm">
                    {project.description}
                  </p>
                  <Globe className="w-12 h-12" />
                </div>
              </div>
            </div>
          ))}

          {/* Tech Stack Block */}
          <div className="md:col-span-1 md:row-span-2 bg-white border-8 border-black p-10 space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              02 / ARSENAL
            </div>
            <div className="flex flex-wrap gap-2 text-white">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-black text-[10px] font-black uppercase italic hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Banner */}
          <div className="md:col-span-3 md:row-span-1 border-8 border-black bg-white overflow-hidden flex whitespace-nowrap group">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-20 py-8 px-10"
            >
              {experience.map((exp, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="text-4xl font-black uppercase tracking-tighter">
                    {exp.role} @ {exp.company}
                  </span>
                  <div className="w-4 h-4 bg-black rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Cursors / Decorators */}
      <footer className="p-12 text-center">
        <div className="inline-block bg-black text-white p-10 border-8 border-black shadow-[20px_20px_0px_#A855F7] animate-bounce-subtle">
          <h4 className="text-4xl font-black uppercase italic tracking-tight">
            Hire The Maverick
          </h4>
        </div>
      </footer>
    </div>
  );
}
