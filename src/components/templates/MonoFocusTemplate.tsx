"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  ArrowDown,
  ArrowUp,
  Square,
  Circle,
  Triangle,
  Minus,
} from "lucide-react";

export default function MonoFocusTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, projects, experience, skills } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = projects.length + 2; // Intro + Projects + Outro

  const nextSlide = () =>
    setActiveIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="h-screen w-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden relative">
      {/* Global UI */}
      <nav className="fixed top-10 left-10 right-10 z-50 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-black uppercase tracking-tighter italic">
          {personal.name?.split(" ")[0] || "MONO"}.
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activeIndex === i ? "bg-black w-8" : "bg-black/20"
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest hidden md:block">
          SLIDE_0{activeIndex + 1} // 0{totalSlides}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeIndex === 0 && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full flex flex-col items-center justify-center p-10 text-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-[18vw] font-black uppercase tracking-tighter leading-[0.8] italic mb-10">
                {personal.name?.split(" ")[0] || "USER"} <br />
                {personal.name?.split(" ")[1] || "01"}
              </h1>
              <div className="flex flex-col items-center gap-10">
                <p className="text-2xl font-bold uppercase tracking-tight italic max-w-xl opacity-40">
                  {personal.title} — Architecting the visual void.
                </p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="cursor-pointer"
                  onClick={nextSlide}
                >
                  <ArrowDown className="w-12 h-12" />
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {activeIndex > 0 && activeIndex <= projects.length && (
          <motion.section
            key={`project-${activeIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full flex items-center justify-center p-10 md:p-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center w-full max-w-7xl">
              <div className="md:col-span-1 hidden md:flex flex-col gap-10 text-[10px] font-black opacity-20 uppercase tracking-[0.5em] h-full justify-between py-20">
                <div className="rotate-90 origin-left whitespace-nowrap">
                  PROJECT_MODULE
                </div>
                <div className="rotate-90 origin-left whitespace-nowrap">
                  0{activeIndex}
                </div>
                <div className="rotate-90 origin-left whitespace-nowrap">
                  VER_2.5.0
                </div>
              </div>

              <div className="md:col-span-6 aspect-square bg-zinc-100 relative group overflow-hidden border-4 border-black box-content">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Square className="w-32 h-32 text-zinc-200" />
                </div>
                <motion.div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.76, 0, 0.24, 1] flex items-center justify-center text-white p-12 overflow-y-auto">
                  <p className="text-xl font-bold italic leading-relaxed uppercase">
                    {projects[activeIndex - 1].description}
                  </p>
                </motion.div>
              </div>

              <div className="md:col-span-5 space-y-12">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
                    Selected Work // 0{activeIndex}
                  </span>
                  <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">
                    {projects[activeIndex - 1].name}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {projects[activeIndex - 1].techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-10 flex gap-4">
                  <button className="flex-1 py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:italic transition-all">
                    Launch Case
                  </button>
                  <button
                    onClick={nextSlide}
                    className="px-8 border-2 border-black hover:bg-zinc-100 transition-colors"
                  >
                    <ArrowDown className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeIndex === totalSlides - 1 && (
          <motion.section
            key="outro"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full flex flex-col justify-between p-24"
          >
            <div className="max-w-4xl space-y-20">
              <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none italic">
                Let's <br />
                Focus.
              </h2>
              <div className="space-y-10">
                <div className="space-y-4 border-l-8 border-black pl-10">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Direct_Access
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-4xl font-black uppercase italic hover:bg-black hover:text-white transition-all px-2"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                  {skills.slice(0, 4).map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <span className="text-[10px] font-black opacity-20">
                        SKILL_0{i + 1}
                      </span>
                      <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">
                        {skill.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end border-t-8 border-black pt-10">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
                Built on Primary Principles 2025
              </div>
              <div className="flex gap-4">
                <Minus className="rotate-90 w-10 h-10" />
                <button
                  onClick={() => setActiveIndex(0)}
                  className="text-xs font-black uppercase tracking-widest underline underline-offset-8"
                >
                  Return to Origin
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Global Controls */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
        <button
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className="w-16 h-16 bg-black text-white flex items-center justify-center hover:bg-zinc-800 disabled:opacity-20 transition-all shadow-2xl"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={activeIndex === totalSlides - 1}
          className="w-16 h-16 bg-black text-white flex items-center justify-center hover:bg-zinc-800 disabled:opacity-20 transition-all shadow-2xl"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>

      {/* Geometric Aesthetics */}
      <div className="fixed top-0 right-0 p-20 opacity-5 pointer-events-none">
        <Circle
          className="w-96 h-96 transition-transform duration-[2000ms]"
          style={{ transform: `rotate(${activeIndex * 90}deg)` }}
        />
      </div>
      <div className="fixed bottom-0 left-0 p-20 opacity-5 pointer-events-none">
        <Triangle
          className="w-96 h-96 transition-transform duration-[2000ms]"
          style={{ transform: `rotate(${activeIndex * -90}deg)` }}
        />
      </div>
    </div>
  );
}
