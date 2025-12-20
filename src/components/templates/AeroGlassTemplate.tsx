"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Layers,
  Apple,
  Command,
  Wifi,
  Battery,
  Search,
  User,
  Briefcase,
  Code,
  Mail,
} from "lucide-react";

export default function AeroGlassTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, projects, experience, skills } = data;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useScroll({
    container: scrollContainerRef,
  });

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600')] bg-cover bg-center font-sans">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[100px]" />

      {/* Top Menu Bar (MacOS style) */}
      <div className="fixed top-0 w-full h-8 bg-white/10 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 text-[11px] font-bold text-white/80">
        <div className="flex items-center gap-4">
          <Apple className="w-3.5 h-3.5" />
          <span className="text-white font-black">Studio</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="flex items-center gap-4">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
          <Search className="w-3.5 h-3.5" />
          <Command className="w-3.5 h-3.5" />
          <span>Sat Dec 20 8:41 PM</span>
        </div>
      </div>

      {/* Desktop Content */}
      <main className="h-full pt-20 pb-24 px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          {/* Left Panel: Profile Island */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-2xl flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mb-6 p-1 shadow-inner shadow-white/50">
                <div className="w-full h-full bg-black/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-2">
                {personal.name}
              </h1>
              <p className="text-sm font-bold text-blue-200/60 uppercase tracking-widest mb-6">
                {personal.title}
              </p>
              <div className="w-full h-px bg-white/10 mb-6" />
              <p className="text-sm text-white/70 leading-relaxed italic mb-8">
                "{personal.bio}"
              </p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white transition-all">
                Connect Protocol
              </button>
            </div>

            {/* Skills Dock */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 shadow-2xl overflow-hidden">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 px-2">
                System Resources
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white/80 whitespace-nowrap"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Project Horizontal Flow */}
          <div className="md:col-span-9 flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-10 shadow-2xl h-full flex flex-col">
              <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                  Selected Work
                </h2>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-400/50" />
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex-1 flex gap-8 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing snap-x snap-mandatory no-scrollbar"
              >
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className="min-w-[450px] bg-white/5 border border-white/10 rounded-[28px] p-8 snap-center flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-video bg-black/40 rounded-2xl mb-8 flex items-center justify-center p-12 overflow-hidden relative">
                        <Layers className="w-20 h-20 text-white/5 group-hover:scale-125 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-purple-500/20" />
                      </div>
                      <h3 className="text-3xl font-black text-white italic mb-2">
                        {project.name}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        {project.techStack.map((tech, ti) => (
                          <span
                            key={ti}
                            className="text-[9px] font-black uppercase tracking-widest text-blue-300/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed italic">
                        {project.description}
                      </p>
                    </div>
                    <button className="mt-8 self-start px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Application
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom App Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[24px] shadow-2xl z-50">
        <div className="group relative">
          <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center hover:scale-125 transition-transform duration-300 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-[10px] font-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Profile
          </div>
        </div>
        <div className="w-px h-8 bg-white/10 mx-2" />
        <div className="group relative">
          <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center hover:scale-125 transition-transform duration-300 shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="group relative">
          <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center hover:scale-125 transition-transform duration-300 shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="w-px h-8 bg-white/10 mx-2" />
        <div className="group relative">
          <a
            href={`mailto:${contact.email}`}
            className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center hover:scale-125 transition-transform duration-300 shadow-lg"
          >
            <Mail className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
