"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Terminal,
  Cpu,
  Database,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Activity,
  Radio,
  Box,
} from "lucide-react";

export default function NeonDriveTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills, experience } = data;
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );

    const logs = [
      `> INITIALIZING_CORE_V2.0...`,
      `> SCANNING_NEURAL_NETWORKS...`,
      `> LOADING_EXPERIENCE_MODULES...`,
      `> [${personal.name || "USER_ID"}] FOUND IN DATABASE`,
      `> SYSTEM_STATUS: OPTIMAL`,
      `> WELCOME_BACK_COMMANDER`,
    ];

    let i = 0;
    const logTimer = setInterval(() => {
      if (i < logs.length) {
        setTerminalOutput((prev) => [...prev.slice(-3), logs[i]]);
        i++;
      } else {
        clearInterval(logTimer);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#050510] text-[#00ffcc] font-mono selection:bg-[#00ffcc]/30 overflow-hidden flex flex-col border-[24px] border-[#0a0a1a]">
      {/* Top Status Bar */}
      <div className="h-10 bg-[#00ffcc] text-black flex items-center justify-between px-6 text-[10px] font-black uppercase tracking-widest z-50">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" /> CPU_LOAD: 2%
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 ml-4" /> LOC:{" "}
            {personal.location || "ENCRYPTED"}
          </div>
        </div>
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-2 h-2 bg-red-600 rounded-full" />
          LIVE_FEED_01 // {currentTime}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 gap-6 relative">
        {/* Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
        <div className="fixed inset-0 pointer-events-none z-40 bg-linear-to-b from-transparent via-[#00ffcc]/5 to-transparent h-[200%] animate-scanline" />

        {/* Left Sidebar: Nav & Console */}
        <div className="w-80 flex flex-col gap-6 h-full">
          {/* Identity Plate */}
          <div className="bg-[#00ffcc]/5 border-2 border-[#00ffcc] p-6 shadow-[0_0_20px_rgba(0,255,204,0.1)]">
            <div className="w-full aspect-square bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center mb-6 relative group overflow-hidden">
              <Box className="w-24 h-24 opacity-20 group-hover:rotate-45 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-br from-[#00ffcc]/20 to-transparent" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic mb-2">
              {personal.name || "UNNAMED"}
            </h1>
            <p className="text-[10px] uppercase font-black text-[#ff00ff] mb-4">
              {personal.title}
            </p>
            <div className="flex gap-4 border-t border-[#00ffcc]/20 pt-4">
              {social.github && (
                <a href={`https://github.com/${social.github}`}>
                  <Github className="w-4 h-4 hover:text-[#ff00ff]" />
                </a>
              )}
              {social.linkedin && (
                <a href={`https://linkedin.com/in/${social.linkedin}`}>
                  <Linkedin className="w-4 h-4 hover:text-[#ff00ff]" />
                </a>
              )}
            </div>
          </div>

          {/* Live Console */}
          <div className="flex-1 bg-black border-2 border-[#00ffcc]/30 p-4 text-[10px] font-bold overflow-hidden flex flex-col gap-2 shadow-inner">
            <h3 className="text-[#00ffcc]/40 uppercase tracking-widest border-b border-[#00ffcc]/10 pb-2 mb-2 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Root_Terminal
            </h3>
            {terminalOutput.map((log, i) => (
              <div key={i} className="animate-fade-in">
                {log}
              </div>
            ))}
            <div className="animate-pulse mt-2">{`> _`}</div>
          </div>
        </div>

        {/* Main Viewport: Projects & Experience */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Large Project Deck */}
          <div className="flex-1 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
            {projects.map((project, i) => (
              <div
                key={i}
                className="min-w-[600px] bg-[#00ffcc]/5 border-2 border-[#00ffcc] p-10 flex flex-col justify-between snap-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">
                  0{i + 1}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff00ff] text-black text-[9px] font-black uppercase mb-6">
                    Active Module
                  </div>
                  <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 text-white">
                    {project.name}
                  </h2>
                  <div className="flex gap-3 mb-8">
                    {project.techStack.map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-bold leading-relaxed opacity-60 max-w-xl italic">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <button className="px-8 py-3 bg-[#00ffcc] text-black font-black uppercase tracking-widest text-[11px] group-hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all">
                    Initiate Launch
                  </button>
                  <ExternalLink className="w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Panels: Stats & Experience */}
          <div className="h-64 flex gap-6">
            {/* Experience Slider */}
            <div className="flex-1 bg-[#00ffcc]/5 border-2 border-[#ff00ff]/30 p-8 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute -right-4 -top-4 opacity-5">
                <Radio className="w-32 h-32" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff00ff] mb-4">
                Chronology_Data
              </h3>
              <div className="flex gap-10 overflow-x-auto no-scrollbar">
                {experience.map((exp, i) => (
                  <div key={i} className="min-w-[300px] space-y-2">
                    <div className="text-xl font-black uppercase italic text-white leading-none">
                      {exp.role}
                    </div>
                    <div className="text-[10px] font-black opacity-40">
                      {exp.company} // {exp.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Grid */}
            <div className="w-80 bg-black border-2 border-[#00ffcc]/20 p-6 grid grid-cols-2 gap-4 overflow-y-auto no-scrollbar">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-[9px] font-black uppercase tracking-widest flex justify-between">
                    <span>{skill.name}</span>
                    <span className="text-[#00ffcc]">{skill.level * 20}%</span>
                  </div>
                  <div className="h-1 bg-[#00ffcc]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.5)]"
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="h-4 bg-[#050510] border-t border-[#00ffcc]/20 flex items-center px-6 text-[8px] font-black uppercase tracking-[1em] text-[#00ffcc]/20">
        SYSTEM_INTEGRITY_CHECK_PASS // PACKET_LOSS_0% // ENCRYPTED_TUNNEL_ACTIVE
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
