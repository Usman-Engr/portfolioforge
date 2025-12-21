"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Terminal,
  Cpu,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Activity,
  Radio,
  Box,
  Menu,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function NeonDriveTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills, experience } = data;
  const [currentTime, setCurrentTime] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );

    const logs = [
      `> INITIALIZING_CORE_V3.1...`,
      `> NEURAL_LINK_ESTABLISHED`,
      `> SCANNING_BIOMETRICS...`,
      `> IDENTITY: [${
        personal.name?.toUpperCase().replace(" ", "_") || "USER_ERR"
      }]`,
      `> CLEARANCE_LEVEL: ADMIN`,
      `> SYSTEM_STATUS: OPTIMAL`,
      `> ACCESS_GRANTED_2025`,
    ];

    let i = 0;
    const logTimer = setInterval(() => {
      if (i < logs.length) {
        setTerminalOutput((prev) => [...prev.slice(-4), logs[i]]);
        i++;
      } else {
        clearInterval(logTimer);
      }
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="lg:h-screen w-screen bg-[#02020a] text-[#00ffcc] font-mono selection:bg-[#00ffcc]/30 overflow-x-hidden lg:overflow-hidden flex flex-col border-0 lg:border-24 border-[#0a0a1a] relative min-h-screen">
      {/* Scanline & Noise Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-linear-to-b from-transparent via-[#00ffcc]/5 to-transparent h-[200%] animate-scanline" />

      {/* Status Bar - Sticky on Mobile */}
      <header className="h-14 lg:h-10 bg-[#00ffcc] text-black flex items-center justify-between px-4 lg:px-6 text-[11px] lg:text-[10px] font-black uppercase tracking-widest z-60 shrink-0 sticky lg:static top-0 shadow-lg lg:shadow-none">
        <div className="flex items-center gap-4 lg:gap-10">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 active:bg-black/10 rounded"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">CORE_LOAD:</span> 4%
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-black text-[#00ffcc] rounded animate-pulse text-xs lg:text-[10px]">
          <div className="w-2 h-2 bg-red-600 rounded-full" />
          LIVE_FEED
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-14 bg-[#02020a]/95 backdrop-blur-xl border-b border-[#00ffcc]/20 z-50 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="text-xl font-bold uppercase tracking-widest text-white hover:text-[#00ffcc]"
              >
                Contact_Link
              </a>
              {social.github && (
                <a
                  href={social.github}
                  className="text-xl font-bold uppercase tracking-widest text-white hover:text-[#00ffcc]"
                >
                  Github_Repo
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  className="text-xl font-bold uppercase tracking-widest text-white hover:text-[#00ffcc]"
                >
                  Linkedin_Pro
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col lg:flex-row overflow-visible lg:overflow-hidden p-0 lg:p-6 gap-0 lg:gap-6 relative">
        {/* Left Sidebar: Mobile=Top Card, Desktop=Fixed Sidebar */}
        <aside className="w-full lg:w-80 bg-[#02020a] lg:bg-transparent p-4 lg:p-0 flex flex-col gap-6 shrink-0 z-10 relative">
          {/* Identity Plate */}
          <div className="bg-[#00ffcc]/5 border-2 border-[#00ffcc] p-6 shadow-[0_0_30px_rgba(0,255,204,0.05)] relative group overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00ffcc]" />

            <div className="flex md:block items-center gap-6">
              <div className="w-24 h-24 md:w-full md:aspect-square bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center mb-0 md:mb-6 relative overflow-hidden shrink-0">
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.name}
                    className="w-full h-full object-cover grayscale brightness-50 md:group-hover:grayscale-0 md:group-hover:brightness-100 transition-all duration-700"
                  />
                ) : (
                  <Box className="w-10 h-10 md:w-20 md:h-20 opacity-20" />
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-xl font-black uppercase tracking-tighter italic mb-1 text-white">
                  {personal.name}
                </h1>
                <p className="text-[10px] md:text-[9px] uppercase font-black text-[#ff00ff] mb-4 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> {personal.title}
                </p>
                <div className="hidden md:flex gap-4 border-t border-[#00ffcc]/10 pt-4">
                  {/* Social Icons Desktop */}
                  {social.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      className="hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      className="hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Live Terminal - Desktop Only for vertical space saving on mobile */}
          <div className="hidden md:flex flex-1 bg-black/40 border-2 border-[#00ffcc]/20 p-4 text-[9px] font-bold overflow-hidden flex-col gap-2 shadow-inner">
            <h3 className="text-[#00ffcc]/40 uppercase tracking-widest border-b border-[#00ffcc]/10 pb-2 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Root_Terminal
              </span>
              <span className="animate-pulse">ONLINE</span>
            </h3>
            <div className="space-y-1">
              {terminalOutput.map((log, i) => (
                <div key={i} className="animate-fade-in text-[#00ffcc]/80">
                  {log}
                </div>
              ))}
              <div className="animate-pulse mt-2 flex items-center gap-1">
                <span className="text-[#ff00ff]">{`admin@studio:~$`}</span>
                <span className="w-2 h-4 bg-[#00ffcc]" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 overflow-visible md:overflow-hidden px-4 md:px-0 pb-20 md:pb-0">
          {/* Projects Deck - Vertical list on mobile, Horizontal Scroll on Desktop */}
          <div className="flex-[2] flex flex-col md:flex-row gap-6 md:gap-6 overflow-visible md:overflow-y-hidden md:overflow-x-auto no-scrollbar snap-y md:snap-x snap-mandatory">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="min-w-full md:min-w-[500px] lg:min-w-[600px] bg-[#00ffcc]/5 border-2 border-[#00ffcc]/30 p-6 md:p-10 flex flex-col justify-between snap-center relative overflow-hidden group hover:bg-[#00ffcc]/10 transition-all shrink-0"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 font-black text-6xl md:text-8xl select-none group-hover:opacity-10 transition-opacity">
                  0{i + 1}
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff00ff] text-black text-[9px] font-black uppercase mb-4 md:mb-6 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                    Active Module
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:translate-x-2 transition-transform duration-500 break-words">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 opacity-40">
                    {project.techStack.map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#00ffcc]/20 pb-1"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-bold leading-relaxed opacity-60 md:max-w-xl italic mb-6 text-white/80">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
                  <button className="flex-1 md:flex-none px-6 py-4 bg-[#00ffcc] text-black font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(0,255,204,0.6)] active:scale-95 transition-all flex items-center justify-center gap-3">
                    <Zap className="w-4 h-4" /> Initiate Launch
                  </button>
                  <a
                    href="#"
                    className="p-4 border border-[#00ffcc]/30 hover:bg-[#00ffcc] hover:text-black transition-all flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Panels: Stats & Experience - Stacked on Mobile */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-6 min-h-[400px] md:min-h-0">
            {/* Experience Slider */}
            <div className="flex-1 bg-[#00ffcc]/5 border-2 border-[#ff00ff]/30 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute -right-6 -top-6 opacity-[0.03] select-none pointer-events-none">
                <Radio className="w-32 md:w-48 h-32 md:h-48" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff00ff] mb-4 flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Chronology_Stream
              </h3>
              <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="min-w-[260px] md:min-w-[300px] space-y-2 group shrink-0"
                  >
                    <div className="text-xl font-black uppercase italic text-white leading-none group-hover:text-[#ff00ff] transition-colors">
                      {exp.role}
                    </div>
                    <div className="text-[10px] font-black opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {exp.company} // {exp.duration}
                    </div>
                    <p className="text-[11px] opacity-40 line-clamp-3 italic leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Cloud - Full Width on Mobile */}
            <div className="w-full lg:w-80 bg-black/60 border-2 border-[#00ffcc]/20 p-6 grid grid-cols-1 gap-4 overflow-y-auto no-scrollbar shadow-inner max-h-[300px] md:max-h-none">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col gap-1.5 group">
                  <div className="text-[10px] font-black uppercase tracking-widest flex justify-between">
                    <span className="group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[#00ffcc] opacity-40 group-hover:opacity-100">
                      {skill.level * 20}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#00ffcc]/10 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 20}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Aesthetic Footer */}
      <footer className="h-6 bg-[#050510] border-t border-[#00ffcc]/10 flex items-center px-4 md:px-6 text-[8px] font-black uppercase tracking-[0.5em] md:tracking-[1em] text-[#00ffcc]/20 overflow-hidden whitespace-nowrap shrink-0">
        INTEGRITY_CHECK: 100% // PACKET_LOSS: 0% // ENCRYPTED_TUNNEL: ACTIVE //
        REFRESH_RATE: 144Hz // 0x2A19_CONNECTED
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
