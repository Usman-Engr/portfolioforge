"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function LuxeHorizonTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, experience, skills } = data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-serif selection:bg-[#c1a35f]/30 overflow-x-hidden">
      {/* MOBILE/TABLET LAYOUT (<1024px) - Simplified Luxury */}
      <div className="lg:hidden flex flex-col">
        <header className="p-6 flex justify-between items-center sticky top-0 bg-[#050505]/90 backdrop-blur-xl z-50 border-b border-white/5">
          <span className="text-xl font-black italic tracking-tighter text-white">
            {personal.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "LH"}
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#c1a35f]"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 space-y-8 animate-in slide-in-from-top-10">
            {["Work", "Experience", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-4xl font-black italic text-white uppercase tracking-tight"
              >
                {link}
              </a>
            ))}
          </div>
        )}

        <main className="px-6 py-12 space-y-20">
          {/* Mobile Hero */}
          <div className="text-center space-y-6">
            <div className="w-20 h-px bg-[#c1a35f] mx-auto" />
            <h1 className="text-5xl font-black italic tracking-tighter text-white leading-none">
              {personal.name?.split(" ")[0]}
              <br />
              <span className="text-[#c1a35f]">
                {personal.name?.split(" ")[1]}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed italic">
              {personal.title}
            </p>
          </div>

          {/* Mobile Projects Stack */}
          <section id="work" className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#c1a35f] text-center mb-8">
              Selected Archive
            </h2>
            {projects.map((project, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/3] bg-[#111] rounded-2xl overflow-hidden mb-4 relative border border-white/10">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="object-cover w-full h-full opacity-80"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-[#c1a35f]">
                    {project.techStack[0]}
                  </div>
                </div>
                <h3 className="text-3xl font-black italic text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-sans">
                  {project.description}
                </p>
              </div>
            ))}
          </section>

          {/* Mobile Experience List */}
          <section
            id="experience"
            className="space-y-8 pt-10 border-t border-white/10"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#c1a35f] text-center mb-4">
              Chronology
            </h2>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1a35f] block">
                  {exp.duration}
                </span>
                <h3 className="text-xl font-black italic text-white">
                  {exp.role}
                </h3>
                <div className="text-xs font-bold uppercase text-gray-500">
                  {exp.company}
                </div>
              </div>
            ))}
          </section>

          {/* Mobile Contact */}
          <footer id="contact" className="py-20 text-center space-y-6">
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
              Let's Talk
            </h2>
            <a
              href={`mailto:${contact.email}`}
              className="block text-lg font-bold text-[#c1a35f] break-all border-b border-[#c1a35f]/20 pb-2 mx-10"
            >
              {contact.email}
            </a>
          </footer>
        </main>
      </div>

      {/* DESKTOP LAYOUT (lg+) - Full Experience */}
      <div className="hidden lg:block">
        <nav className="fixed top-0 w-full z-50 px-10 py-8 flex justify-between items-center bg-linear-to-b from-black/80 to-transparent backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter text-white italic"
          >
            {personal.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "LH"}
          </motion.div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            {["Experience", "Work", "Expertise"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#c1a35f] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c1a35f]/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 text-center space-y-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c1a35f] mb-4 block">
                ESTABLISHED MMXXV
              </span>
              <h1 className="text-9xl font-black italic tracking-tighter text-white leading-none">
                {personal.name || "LUXE HORIZON"}
              </h1>
            </motion.div>
            <p className="text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed italic">
              {personal.title}
            </p>
          </div>
        </section>

        {/* Desktop Experience */}
        <section id="experience" className="py-40 px-10 max-w-7xl mx-auto">
          <div className="flex gap-20">
            <div className="w-1/3">
              <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase sticky top-32">
                The <br /> Journey.
              </h2>
            </div>
            <div className="w-2/3 space-y-24">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="group relative pl-12 border-l border-white/10"
                >
                  <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-[#050505] border border-[#c1a35f] rounded-full group-hover:bg-[#c1a35f] transition-colors" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-4xl font-black italic tracking-tight group-hover:text-[#c1a35f] transition-colors uppercase">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-600">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Projects */}
        <section id="work" className="py-40 px-10 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="text-7xl font-black italic tracking-tighter text-white uppercase inline-block relative">
                Selected Works
                <Sparkles className="absolute -right-12 -top-6 text-[#c1a35f] w-12 h-12" />
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-20">
              {projects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-[#0f0f0f] rounded-[40px] overflow-hidden mb-8 relative">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-end px-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-[#c1a35f] mb-2">
                        {project.techStack[0]}
                      </div>
                      <h3 className="text-4xl font-black italic tracking-tight text-white uppercase">
                        {project.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-20 px-10 border-t border-white/5 text-center">
          <h2 className="text-2xl font-black text-[#c1a35f] uppercase tracking-[0.4em] mb-4">
            Collaboration
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="text-6xl font-black italic text-white uppercase tracking-tighter hover:text-[#c1a35f] transition-colors"
          >
            {contact.email}
          </a>
        </footer>
      </div>
    </div>
  );
}
