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
} from "lucide-react";

export default function LuxeHorizonTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, experience, skills } = data;

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-serif selection:bg-[#c1a35f]/30">
      {/* Luxe Navigation */}
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

      {/* Hero Section - Cinematic Reveal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c1a35f]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c1a35f] mb-4 block">
              ESTABLISHED MMXXV
            </span>
            <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-white leading-none">
              {personal.name || "DESIGNED BY LUXE"}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed italic"
          >
            {personal.title ||
              "Crafting digital experiences with precision and prestige."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-10"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-[#c1a35f] hover:text-white transition-all rounded-full group"
            >
              Explore Archive
              <div className="w-px h-4 bg-black/20 group-hover:bg-white/20 transition-colors" />
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-600">
          <div className="w-px h-20 bg-linear-to-b from-[#c1a35f] to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] vertical-text">
            Scroll Elevation
          </span>
        </div>
      </section>

      {/* Experience Section - Curated Timeline */}
      <section id="experience" className="py-32 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase sticky top-32">
              The <br />
              Journey.
            </h2>
          </div>
          <div className="md:w-2/3 space-y-24">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -left-12 top-2 text-[10px] font-black text-[#c1a35f] opacity-40 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-3xl font-black italic tracking-tight group-hover:text-[#c1a35f] transition-colors uppercase">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid - High Fidelity Cards */}
      <section id="work" className="py-32 px-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase inline-block relative">
              Selected Works
              <div className="absolute -right-12 -top-6 text-[#c1a35f]">
                <Sparkles className="w-8 h-8" />
              </div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group cursor-none"
              >
                <div className="aspect-16/10 bg-[#0f0f0f] rounded-[40px] overflow-hidden mb-8 relative group">
                  <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center font-black text-[10px] uppercase tracking-widest scale-0 group-hover:scale-100 transition-transform duration-500">
                      View
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c1a35f] mb-2">
                        {project.techStack[0]}
                      </div>
                      <h3 className="text-3xl font-black italic tracking-tight text-white uppercase">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise - Technical Mastery */}
      <section id="expertise" className="py-32 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2">
            <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-tight">
              Technical <br />
              Mastery.
            </h2>
            <p className="text-xl text-gray-500 mt-8 max-w-md italic">
              A fusion of design intuition and engineering excellence, executed
              with meticulous attention to every pixel.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-[#c1a35f]/20 transition-all group"
              >
                <Award className="w-6 h-6 text-[#c1a35f] mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  {skill.name}
                </span>
                <div className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {skill.level} Proficiency
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Final Impression */}
      <footer className="py-20 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="text-sm font-black text-[#c1a35f] uppercase tracking-[0.4em] mb-2">
              Collaboration
            </div>
            <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
              {contact.email}
            </h3>
          </div>
          <div className="flex gap-8">
            {social.github && (
              <a
                href={`https://github.com/${social.github}`}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Github />
              </a>
            )}
            {social.linkedin && (
              <a
                href={`https://linkedin.com/in/${social.linkedin}`}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Linkedin />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
