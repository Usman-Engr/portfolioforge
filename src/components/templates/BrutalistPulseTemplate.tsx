"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowRight, Zap, Target, Globe, Star, Menu, X } from "lucide-react";
import { useState } from "react";

export default function BrutalistPulseTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const { personal, contact, projects, experience, skills } = data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-400 border-8 md:border-16 border-black overflow-x-hidden relative">
      {/* Mobile Header Toggle */}
      <div className="md:hidden fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-yellow-400 border-4 border-black text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F0F0F0] flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-200">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter border-b-8 border-black pb-4">
            {personal.name}
          </h1>
          <nav className="flex flex-col gap-6 text-2xl font-black uppercase tracking-widest text-center">
            <a href="#work" onClick={() => setIsMenuOpen(false)}>
              Work
            </a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-purple-600 underline decoration-4"
            >
              Contact
            </a>
          </nav>
        </div>
      )}

      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 w-full z-50 p-6 justify-between items-center pointer-events-none">
        <div className="pointer-events-auto bg-black text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair">
          <span className="text-2xl font-black uppercase italic tracking-tighter">
            {personal.name || "UNNAMED"}
          </span>
        </div>
        <div className="pointer-events-auto flex gap-4">
          <button className="bg-yellow-400 p-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Zap className="w-6 h-6 fill-current" />
          </button>
          <a
            href={`mailto:${contact.email}`}
            className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all block"
          >
            <Star className="w-6 h-6" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-20 lg:pt-32 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-6 lg:auto-rows-[250px]">
          {/* Intro Block - Full Width Mobile */}
          <div className="col-span-1 lg:col-span-3 lg:row-span-1 bg-white border-4 lg:border-8 border-black p-6 lg:p-10 flex flex-col justify-center relative overflow-hidden group min-h-[300px] lg:min-h-0">
            <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
              01 / IDENTITY
            </div>
            <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] lg:leading-none mb-4 break-words">
              {personal.title?.split(" ")[0]} <br className="lg:hidden" />{" "}
              {personal.title?.split(" ").slice(1).join(" ") || "DEV"}
            </h1>
            <p className="text-lg lg:text-xl font-bold max-w-2xl leading-tight">
              {personal.bio ||
                "Breaking rules, building pixels, and shipping fast."}
            </p>
          </div>

          {/* Stats Block - Mobile Square */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-2 bg-yellow-400 border-4 lg:border-8 border-black p-6 lg:p-10 flex flex-col justify-end gap-6 lg:gap-10 min-h-[250px]">
            <div className="space-y-2">
              <span className="text-5xl lg:text-6xl font-black block leading-none">
                10+
              </span>
              <span className="text-xs font-black uppercase tracking-widest block">
                Global Clients
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl lg:text-6xl font-black block leading-none">
                05
              </span>
              <span className="text-xs font-black uppercase tracking-widest block">
                Years Depth
              </span>
            </div>
            <Target className="w-12 h-12 lg:w-16 lg:h-16 opacity-20" />
          </div>

          {/* Contact Pin - Mobile: Stacked */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-1 bg-purple-500 border-4 lg:border-8 border-black p-6 lg:p-8 flex flex-col justify-between group min-h-[200px]">
            <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-white" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80 text-white">
                Let's Talk
              </span>
              <span className="text-lg font-black break-all uppercase italic text-white line-clamp-1">
                {contact.email}
              </span>
            </div>
          </div>

          {/* Project Spotlight - Mobile: Single Column */}
          {projects.slice(0, 1).map((project, i) => (
            <div
              key={i}
              className="col-span-1 lg:col-span-2 lg:row-span-2 bg-blue-500 border-4 lg:border-8 border-black relative group overflow-hidden min-h-[400px]"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden p-6 h-full flex flex-col justify-between text-white">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-black inline-block w-fit px-2 py-1">
                  Featured Work
                </span>
                <div className="space-y-4">
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none break-words">
                    {project.name}
                  </h3>
                  <p className="text-sm font-bold leading-tight">
                    {project.description}
                  </p>
                  <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    View Case
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex p-10 h-full flex-col justify-between text-white relative z-10 transition-transform group-hover:scale-105">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 bg-black w-fit px-2 py-1">
                    Featured Work
                  </div>
                  <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                    {project.name}
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold max-w-sm bg-black/20 p-4 backdrop-blur-sm">
                    {project.description}
                  </p>
                  <Globe className="w-12 h-12" />
                </div>
              </div>
            </div>
          ))}

          {/* Tech Stack Block */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-2 bg-white border-4 lg:border-8 border-black p-6 lg:p-10 space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              02 / ARSENAL
            </div>
            <div className="flex flex-wrap gap-2 text-white">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-black text-[10px] font-black uppercase italic hover:bg-yellow-400 hover:text-black transition-colors cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Banner - Mobile: Stacked / Desktop: Marquee */}
          <div className="col-span-1 lg:col-span-3 lg:row-span-1 border-4 lg:border-8 border-black bg-white overflow-hidden flex flex-col lg:flex-row lg:items-center min-h-[200px] lg:min-h-0">
            {/* Mobile List */}
            <div className="lg:hidden p-6 space-y-6">
              {experience.slice(0, 2).map((exp, i) => (
                <div
                  key={i}
                  className="border-b-4 border-black pb-4 last:border-0"
                >
                  <div className="text-2xl font-black uppercase italic leading-none">
                    {exp.role}
                  </div>
                  <div className="text-xs font-black uppercase text-gray-400">
                    {exp.company}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Marquee */}
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hidden lg:flex items-center gap-20 py-8 px-10 whitespace-nowrap"
            >
              {experience.map((exp, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="text-4xl font-black uppercase tracking-tighter">
                    {exp.role} @ {exp.company}
                  </span>
                  <div className="w-4 h-4 bg-black rounded-full" />
                </div>
              ))}
              {experience.map((exp, i) => (
                <div key={`clone-${i}`} className="flex items-center gap-10">
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

      <footer className="p-6 md:p-12 text-center pb-24 md:pb-12">
        <div className="inline-block bg-black text-white p-6 md:p-10 border-4 md:border-8 border-black shadow-[10px_10px_0px_#A855F7] md:shadow-[20px_20px_0px_#A855F7] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
          <a
            href={`mailto:${contact.email}`}
            className="text-2xl md:text-4xl font-black uppercase italic tracking-tight"
          >
            Hire The Maverick
          </a>
        </div>
      </footer>
    </div>
  );
}
