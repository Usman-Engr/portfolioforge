"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Maximize2,
  MoveUpRight,
  Sparkles,
  Filter,
  LayoutGrid,
  Camera,
  Image,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function GridMasterTemplate({ data }: { data: PortfolioData }) {
  const { personal, projects, skills, contact } = data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#1a1a1a] font-mono p-4 md:p-12 lg:p-20 overflow-x-hidden relative">
      {/* Mobile Header Toggle */}
      <div className="lg:hidden fixed top-6 right-6 z-60">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-black text-white rounded-full shadow-xl"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Gallery Controls - Desktop Floating / Mobile Overlay */}
      <AnimatePresence>
        {(isMenuOpen ||
          (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-12 left-1/2 z-50 bg-white/90 backdrop-blur-3xl border-2 border-black rounded-full px-6 md:px-8 py-3 md:py-4 fixed-canvas-row items-center gap-6 lg:gap-10 shadow-2xl w-[90%] lg:w-auto transform -translate-x-1/2 lg:transform-none ${
              isMenuOpen ? "flex translate-x-[-50%]!" : "hidden lg:flex"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                {personal.name || "USER"}
              </span>
            </div>
            <div className="w-full h-px md:w-px md:h-6 bg-black/10" />
            <div className="fixed-canvas-row gap-4 md:gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 items-center">
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
          </motion.header>
        )}
      </AnimatePresence>

      {/* Title Section */}
      <div className="mt-24 md:mt-32 mb-12 md:mb-20 space-y-8 max-w-7xl mx-auto fixed-canvas-row items-end justify-between gap-6 md:gap-10">
        <div className="space-y-4 w-full md:w-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest italic rounded-md">
            <Camera className="w-3 h-3" />
            Visual Index // v1.0
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-none break-words w-full">
            GRID_SYS
          </h1>
        </div>
        <p className="max-w-md text-sm md:text-xl font-bold opacity-40 leading-relaxed italic text-left md:text-right">
          {personal.bio}
        </p>
      </div>

      {/* Masonry Polaroids */}
      <main className="max-w-screen-2xl mx-auto pb-20">
        <div className="columns-1 lg:columns-3 gap-8 space-y-8">
          {/* Skills Polaroid */}
          <motion.div
            whileHover={{ scale: 0.98, rotate: -1 }}
            className="break-inside-avoid p-6 md:p-8 bg-zinc-900 text-white rounded-[24px] space-y-8 md:space-y-12 shadow-2xl border-4 border-zinc-900"
          >
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              Resource_Array
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-4 md:px-5 py-2 md:py-3 border-2 border-white/20 rounded-xl hover:bg-white hover:text-black transition-all group flex flex-col gap-2 cursor-default bg-zinc-800/50 hover:bg-white"
                >
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
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
              className="break-inside-avoid bg-white border-2 border-black p-3 md:p-4 pb-10 md:pb-12 shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] space-y-4 md:space-y-6 group cursor-pointer relative"
            >
              <div className="aspect-square bg-zinc-100 relative overflow-hidden flex items-center justify-center p-8 border border-zinc-200">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <Image className="w-16 md:w-20 h-16 md:h-20 text-zinc-300 group-hover:scale-110 transition-transform duration-700" />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all flex items-center justify-center">
                  <button className="px-5 md:px-6 py-2 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Expand Data
                  </button>
                </div>
                <div className="absolute top-4 right-4 text-[9px] md:text-[10px] font-black opacity-20 bg-white/80 px-2 py-1">
                  REF_{i + 102}
                </div>
              </div>
              <div className="px-2 md:px-4 space-y-3 md:space-y-4">
                <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight flex justify-between items-start md:items-center decoration-black group-hover:underline underline-offset-8 gap-4">
                  <span className="line-clamp-2 leading-tight">
                    {project.name}
                  </span>
                  <MoveUpRight className="w-5 h-5 text-zinc-300 group-hover:text-black shrink-0 mt-1 md:mt-0" />
                </h4>
                <p className="text-[10px] md:text-xs font-bold leading-relaxed opacity-40 uppercase tracking-tight italic line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-[8px] font-black px-2 py-1 bg-zinc-100 rounded-sm uppercase tracking-wider"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Card */}
          <div className="break-inside-avoid p-8 md:p-12 bg-[#00FF66] border-4 border-black text-black space-y-8 md:space-y-10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 bg-white/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
            <div className="flex justify-between items-start relative z-10">
              <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                GOT <br />
                IDEAS?
              </h3>
              <Sparkles className="w-10 md:w-12 h-10 md:h-12 animate-pulse" />
            </div>
            <div className="space-y-4 relative z-10">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block opacity-40 italic">
                Open_Frequency
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-xl md:text-2xl font-black uppercase underline decoration-4 underline-offset-8 hover:italic transition-all fixed-canvas-contact-anchor"
              >
                {contact.email}
              </a>
            </div>
            <div className="pt-8 border-t-2 border-black/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-[#00FF66] rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Initialise Protocol
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Aesthetic Footer */}
      <footer className="mt-20 md:mt-40 text-center border-t-2 border-black/10 pt-12 md:pt-20 pb-10">
        <div className="inline-block p-1 bg-black rounded-lg transform hover:rotate-1 transition-transform cursor-default">
          <div className="px-6 md:px-8 py-2 md:py-3 bg-white border border-black rounded-md flex items-center gap-4 md:gap-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
