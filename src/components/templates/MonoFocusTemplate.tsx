"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  ArrowUpRight,
  Copy,
  Menu,
  X,
  ArrowDown,
  ExternalLink,
} from "lucide-react";

export default function MonoFocusTemplate({ data }: { data: PortfolioData }) {
  const { personal, projects, social, contact } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Desktop Snap Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024 && containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        const newActiveSection = Math.round(scrollPosition / windowHeight);
        setActiveSection(newActiveSection);
      }
    };
    const ref = containerRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#EAEAEA] text-[#111] font-sans selection:bg-[#111] selection:text-white w-full overflow-x-hidden">
      {/* MOBILE/TABLET LAYOUT (<1024px) - Native Scroll, No Snapping */}
      <div className="lg:hidden min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 w-full p-5 flex justify-between items-center z-50 bg-[#EAEAEA]/80 backdrop-blur-md border-b border-[#111]/5">
          <span className="text-lg font-bold tracking-tight uppercase truncate max-w-[200px]">
            {personal.name || "Mono"}
          </span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#EAEAEA] flex flex-col justify-center px-10 space-y-8 animate-in fade-in slide-in-from-right-10 duration-200">
            {["Index", "Work", "Connect"].map((item, i) => (
              <button
                key={i}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tight text-left hover:text-zinc-500"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Content Stream */}
        <main className="pt-24 px-5 pb-20 space-y-20 w-full">
          {/* Hero Section */}
          <section className="min-h-[80vh] flex flex-col justify-center gap-6 w-full">
            <div className="space-y-2 w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Introduction
              </span>
              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter break-words w-full">
                {personal.title?.split(" ")[0]} <br />
                <span className="text-zinc-400">
                  {personal.title?.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>
            <p className="text-lg font-medium leading-relaxed max-w-sm wrap-break-word">
              {personal.bio}
            </p>
            <div className="pt-6 border-t border-[#111]/10 w-full">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span>Based in {personal.location}</span>
                <div className="w-2 h-2 bg-[#111] rounded-full animate-pulse" />
              </div>
            </div>
          </section>

          {/* Projects List */}
          <section className="space-y-12 w-full">
            <div className="flex items-center gap-4">
              <div className="w-full h-px bg-[#111]/10" />
              <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                Selected Work
              </span>
            </div>

            {projects.map((project, i) => (
              <div key={i} className="flex flex-col gap-4 w-full">
                <div className="aspect-[4/3] bg-zinc-200 w-full relative overflow-hidden rounded-lg group">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {project.year || "2024"}
                  </div>
                </div>
                <div className="w-full">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2 wrap-break-word">
                    {project.name}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-zinc-600 mb-4">
                    {project.description}
                  </p>
                  <button className="w-full py-4 border border-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors flex items-center justify-center gap-2">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Contact Section */}
          <section className="min-h-[50vh] flex flex-col justify-center items-center text-center gap-8 bg-[#111] text-[#EAEAEA] -mx-5 px-5 py-20 rounded-t-[32px] w-[calc(100%+40px)]">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Ready to
              <br />
              Collaborate?
            </h2>
            <a
              href={`mailto:${contact.email}`}
              className="text-xl font-bold underline underline-offset-8 decoration-2 break-all max-w-full block"
            >
              {contact.email}
            </a>
            <div className="flex gap-6 mt-8 flex-wrap justify-center">
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-50"
                >
                  LinkedIn
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-50"
                >
                  GitHub
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-50"
                >
                  Twitter
                </a>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* DESKTOP LAYOUT (lg+) - Snap Scroll Enabled */}
      <div className="hidden lg:flex h-screen w-full overflow-hidden flex-col relative">
        <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-white">
          <div className="pointer-events-auto">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
              {personal.name}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mt-1">
              Portfolio v2.0
            </p>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {activeSection + 1} / {projects.length + 2}
            </span>
            <div className="w-32 h-[2px] bg-white/20 mt-2">
              <motion.div
                className="h-full bg-white"
                animate={{
                  width: `${
                    ((activeSection + 1) / (projects.length + 2)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </header>

        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar w-full"
        >
          {/* Desktop Hero */}
          <section className="h-screen w-full snap-start flex items-center justify-center p-20 relative">
            <div className="grid grid-cols-12 w-full max-w-screen-2xl items-center">
              <div className="col-span-8 space-y-8">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10vw] font-black uppercase leading-[0.8] tracking-tighter -ml-[0.05em]"
                >
                  {personal.title?.split(" ")[0]} <br />
                  <span className="text-transparent text-stroke-2">
                    {personal.title?.split(" ").slice(1).join(" ")}
                  </span>
                </motion.h1>
                <div className="flex gap-12 items-end">
                  <p className="max-w-md text-xl font-medium leading-relaxed text-zinc-600">
                    {personal.bio}
                  </p>
                  <div className="h-px w-32 bg-[#111]" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {personal.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
          </section>

          {/* Desktop Projects - Horizontal Parallax on Scroll */}
          {projects.map((project, i) => (
            <section
              key={i}
              className="h-screen w-full snap-start flex items-center justify-center p-20 bg-[#EAEAEA] relative overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-center justify-end w-3/5 ml-auto opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <h2 className="text-[40vh] font-black uppercase text-white leading-none tracking-tighter truncate">
                  {project.name}
                </h2>
              </div>

              <div className="grid grid-cols-12 gap-12 w-full max-w-screen-2xl items-center relative z-10">
                <div className="col-span-5 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl font-black opacity-20">
                      0{i + 1}
                    </span>
                    <div className="h-px flex-1 bg-[#111]/20" />
                  </div>
                  <h3 className="text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, t) => (
                      <span
                        key={t}
                        className="px-3 py-1 border border-[#111]/20 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-medium leading-relaxed max-w-md text-zinc-600">
                    {project.description}
                  </p>
                  <button className="px-8 py-4 bg-[#111] text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-4">
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="col-span-7 h-[60vh] bg-white relative overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* Desktop Contact */}
          <section className="h-screen w-full snap-start bg-[#111] text-[#EAEAEA] flex flex-col items-center justify-center p-20 text-center space-y-12">
            <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none">
              Let's Talk
            </h2>
            <div className="flex items-center gap-8">
              <a
                href={`mailto:${contact.email}`}
                className="text-4xl font-bold hover:text-white transition-colors border-b-2 border-white/20 hover:border-white pb-2"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex gap-20 mt-20">
              {["LinkedIn", "GitHub", "Twitter"].map((social, s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm font-bold uppercase tracking-[0.3em] hover:text-white hover:underline underline-offset-8 transition-all opacity-60 hover:opacity-100"
                >
                  {social}
                </a>
              ))}
            </div>
            <footer className="absolute bottom-10 text-[10px] font-bold uppercase tracking-widest opacity-20">
              © 2025 Mono Focus System
            </footer>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .text-stroke-2 {
          -webkit-text-stroke: 2px #111;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
