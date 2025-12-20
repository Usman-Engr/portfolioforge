"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Maximize2,
  MoveUpRight,
  Sparkles,
  Filter,
  LayoutGrid,
  Camera,
  Image,
} from "lucide-react";

export default function GridMasterTemplate({ data }: { data: PortfolioData }) {
  const { personal, projects, skills, contact } = data;

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#1a1a1a] font-mono p-6 md:p-12 lg:p-20 overflow-x-hidden">
      {/* Gallery Controls */}
      <header className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-3xl border-2 border-black rounded-full px-8 py-4 flex items-center gap-10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {personal.name || "USER"}
          </span>
        </div>
        <div className="w-px h-6 bg-black/10" />
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span className="text-black inline-flex items-center gap-2 underline underline-offset-4 decoration-2">
            <LayoutGrid className="w-3 h-3" /> All_Works
          </span>
          <span className="hover:text-black cursor-pointer transition-colors">
            Experience
          </span>
          <span className="hover:text-black cursor-pointer transition-colors">
            Connect
          </span>
        </div>
      </header>

      {/* Title Section */}
      <div className="mt-32 mb-20 space-y-8 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest italic">
            <Camera className="w-3 h-3" />
            Visual Index // v1.0
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
            GRID_SYSTEM
          </h1>
        </div>
        <p className="max-w-md text-xl font-bold opacity-40 leading-relaxed italic text-right">
          {personal.bio}
        </p>
      </div>

      {/* Masonry Polaroids */}
      <main className="max-w-screen-2xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {/* Skills Polaroid */}
          <motion.div
            whileHover={{ scale: 0.98, rotate: -1 }}
            className="break-inside-avoid p-8 bg-zinc-900 text-white rounded-[24px] space-y-12 shadow-2xl"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              Resource_Array
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-5 py-3 border-2 border-white/20 rounded-xl hover:bg-white hover:text-black transition-all group flex flex-col gap-2"
                >
                  <span className="text-xs font-black uppercase tracking-widest">
                    {skill.name}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <div
                        key={si}
                        className={`w-1.5 h-1.5 rounded-full ${
                          si < skill.level
                            ? "bg-white group-hover:bg-black"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Project Polaroids */}
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="break-inside-avoid bg-white border-2 border-black p-4 pb-12 shadow-[12px_12px_0px_#000] space-y-6 group cursor-pointer"
            >
              <div className="aspect-square bg-zinc-100 relative overflow-hidden flex items-center justify-center p-8">
                <Image className="w-20 h-20 text-zinc-200 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all flex items-center justify-center">
                  <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Expand Data
                  </button>
                </div>
                <div className="absolute top-4 right-4 text-[10px] font-black opacity-20">
                  REF_CODE_{i + 102}
                </div>
              </div>
              <div className="px-4 space-y-4">
                <h4 className="text-2xl font-black uppercase italic tracking-tight flex justify-between items-center decoration-black group-hover:underline underline-offset-8">
                  {project.name}
                  <MoveUpRight className="w-5 h-5 text-zinc-300 group-hover:text-black" />
                </h4>
                <p className="text-xs font-bold leading-relaxed opacity-40 uppercase tracking-tight italic">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.techStack.map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-[8px] font-black px-2 py-1 bg-zinc-100 rounded-sm"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Card */}
          <div className="break-inside-avoid p-12 bg-[#00FF66] border-4 border-black text-black space-y-10 group">
            <div className="flex justify-between items-start">
              <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                GOT <br />
                IDEAS?
              </h3>
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest block opacity-40 italic">
                Open_Frequency
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-2xl font-black uppercase underline decoration-4 underline-offset-8 hover:italic transition-all"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Aesthetic Footer */}
      <footer className="mt-40 text-center border-t-2 border-black/10 pt-20">
        <div className="inline-block p-1 bg-black rounded-lg">
          <div className="px-8 py-3 bg-white border border-black rounded-md flex items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400">
              All Systems Operational // 2025
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
