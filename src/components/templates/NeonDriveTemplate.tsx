"use client";

import { motion } from "framer-motion";
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
  Zap,
} from "lucide-react";

export default function NeonDriveTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};
  
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      `> INITIALIZING_CORE_V3.1...`,
      `> NEURAL_LINK_ESTABLISHED`,
      `> SCANNING_BIOMETRICS...`,
      `> IDENTITY: [${personal.name?.toUpperCase().replace(" ", "_") || "USER_ERR"}]`,
      `> CLEARANCE_LEVEL: ADMIN`,
      `> SYSTEM_STATUS: OPTIMAL`,
      `> ACCESS_GRANTED`,
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

    return () => clearInterval(logTimer);
  }, [personal.name]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#02020a] text-[#00ffcc] font-mono selection:bg-[#00ffcc]/30 overflow-x-hidden flex flex-col sm:border-8 md:border-[16px] xl:border-[24px] border-[#0a0a1a] relative">
      {/* ── Overlays ──────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#00ffcc]/5 to-transparent h-[200%] animate-[scanline_8s_linear_infinite]" />

      {/* ── Top Bar ───────────────────────────────────────────────── */}
      <header className="sticky top-0 h-10 sm:h-12 bg-[#00ffcc] text-black flex items-center justify-between px-3 sm:px-6 text-[10px] sm:text-[11px] font-black uppercase tracking-widest z-50 shrink-0 shadow-lg">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" /> <span className="hidden sm:inline">CORE_LOAD:</span> 4%
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black text-[#00ffcc] rounded animate-pulse text-[9px]">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            LIVE_FEED
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {social.github && <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GH</a>}
          {social.linkedin && <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IN</a>}
          <a href={`mailto:${contact.email}`} className="bg-black text-[#00ffcc] px-3 py-1 rounded hover:bg-white hover:text-black transition-colors">
            PING_ROOT
          </a>
        </div>
      </header>

      {/* ── Main Layout (Left Col fixed-like desktop, Right Col scrollable) ─ */}
      <div className="flex-1 flex flex-col xl:flex-row p-4 sm:p-6 lg:p-8 gap-6 xl:gap-8 relative z-10 w-full max-w-[1600px] mx-auto">
        
        {/* ── Left Sidebar (Identity) ─────────────────────────────── */}
        <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-[#00ffcc]/5 border-2 border-[#00ffcc] p-6 shadow-[0_0_30px_rgba(0,255,204,0.05)] relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00ffcc]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00ffcc]" />

            <div className="flex flex-col sm:flex-row xl:flex-col items-center sm:items-start xl:items-stretch gap-6 text-center sm:text-left xl:text-left">
              <div className="w-24 h-24 sm:w-32 sm:h-32 xl:w-full xl:aspect-square bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center relative overflow-hidden shrink-0">
                {personal.imageUrl ? (
                  <img src={personal.imageUrl} alt={personal.name}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                ) : (
                  <Activity className="w-10 h-10 opacity-20" />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,204,0.1),transparent)] pointer-events-none" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl xl:text-3xl font-black uppercase tracking-tighter italic mb-1 text-white break-words">
                  {personal.name}
                </h1>
                <p className="text-[10px] sm:text-xs xl:text-[9px] uppercase font-black text-[#ff00ff] mb-4 flex items-center justify-center sm:justify-start xl:justify-start gap-2 break-words">
                  <Activity className="w-3 h-3 shrink-0" /> {personal.title}
                </p>
                <p className="text-xs sm:text-sm xl:text-xs text-[#00ffcc]/60 leading-relaxed mb-6">
                  {personal.bio}
                </p>
                
                <div className="flex flex-wrap justify-center sm:justify-start xl:justify-start gap-4 border-t border-[#00ffcc]/10 pt-4">
                  {social.github && (
                    <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#00ffcc]/20 hover:bg-[#00ffcc] hover:text-black transition-colors rounded">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#00ffcc]/20 hover:bg-[#00ffcc] hover:text-black transition-colors rounded">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {contact.website && (
                    <a href={contact.website} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#00ffcc]/20 hover:bg-[#00ffcc] hover:text-black transition-colors rounded">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col bg-black/40 border-2 border-[#00ffcc]/20 p-4 text-[9px] sm:text-[10px] uppercase font-bold text-[#00ffcc]/80 h-40 shadow-inner">
            <div className="border-b border-[#00ffcc]/10 pb-2 mb-2 flex justify-between items-center text-[#00ffcc]/40">
              <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> ROOT_TERMINAL</span>
              <span className="animate-pulse">ONLINE</span>
            </div>
            <div className="space-y-1 flex-1 flex flex-col justify-end">
              {terminalOutput.map((log, i) => (
                <div key={i} className="animate-[fade-in_0.2s_ease-out]">{log}</div>
              ))}
              <div className="animate-pulse mt-2 flex items-center gap-1 text-[#ff00ff]">
                <span>admin@sys:~$</span> <span className="w-2 h-4 bg-[#00ffcc]" />
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content Area ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-6 xl:gap-8 min-w-0">
          
          {/* Projects Deck */}
          {projects.length > 0 && (
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 xl:gap-8">
              {projects.map((project, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                  className="bg-[#00ffcc]/5 border-2 border-[#00ffcc]/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-[#00ffcc]/10 transition-all min-h-[350px]">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none font-black text-6xl sm:text-8xl select-none group-hover:opacity-10 transition-opacity">
                    0{i + 1}
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff00ff] text-black text-[9px] font-black uppercase mb-4 shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                      Active Module
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:translate-x-2 transition-transform duration-500 break-words line-clamp-2">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6 opacity-60">
                      {project.techStack?.map((tech, ti) => (
                        <span key={ti} className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#00ffcc]/20 pb-0.5">
                          #{tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-bold leading-relaxed opacity-70 italic mb-8 text-white/80 line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {(project.liveUrl || project.githubUrl) && (
                      <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-[#00ffcc] text-black font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(0,255,204,0.6)] active:scale-95 transition-all w-fit text-center flex items-center justify-center gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" /> Initialize
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="p-3 border border-[#00ffcc]/30 hover:bg-[#00ffcc] hover:text-black transition-all flex items-center justify-center shrink-0">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom Panels (History & Skills) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            
            {/* Experience */}
            {experience.length > 0 && (
              <div className="bg-[#00ffcc]/5 border-2 border-[#ff00ff]/30 p-6 sm:p-8 flex flex-col relative overflow-hidden group min-h-[300px]">
                <div className="absolute -right-6 -top-6 opacity-[0.03] select-none pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Radio className="w-32 h-32 sm:w-48 sm:h-48" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff00ff] mb-6 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Chronology_Stream
                </h3>
                <div className="flex flex-col gap-6 relative z-10">
                  {experience.map((exp, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                      className="border-l-2 border-[#ff00ff]/30 pl-4 hover:border-[#ff00ff] transition-colors">
                      <div className="text-xl sm:text-2xl font-black uppercase italic text-white leading-none hover:text-[#ff00ff] transition-colors break-words mb-2">
                        {exp.role}
                      </div>
                      <div className="text-[10px] font-black opacity-60 flex flex-wrap gap-2 mb-2">
                        <span className="text-[#00ffcc]">{exp.company}</span>
                        <span>//</span>
                        <span className="whitespace-nowrap">{exp.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm opacity-50 italic leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Array */}
            {skills.length > 0 && (
              <div className="bg-black/60 border-2 border-[#00ffcc]/20 p-6 sm:p-8 shadow-inner relative">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ffcc] mb-6 flex items-center gap-2">
                  <Cpu className="w-3 h-3" /> System_Capabilities
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex flex-col gap-1.5 group">
                      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex justify-between">
                        <span className="group-hover:text-white transition-colors text-[#00ffcc]/80">{skill.name}</span>
                        <span className="text-[#ff00ff] opacity-60 group-hover:opacity-100 transition-opacity">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-2 bg-[#00ffcc]/10 overflow-hidden border border-[#00ffcc]/20">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.4)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="mt-6 sm:mt-12 h-6 sm:h-8 bg-[#050510] border-t border-[#00ffcc]/20 flex items-center px-4 sm:px-6 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#00ffcc]/30 shrink-0 select-none no-print overflow-hidden relative group cursor-default">
         <div className="flex animate-[marquee_20s_linear_infinite] group-hover:text-[#00ffcc] transition-colors whitespace-nowrap">
          <span className="pr-10">INTEGRITY_CHECK: 100% // PACKET_LOSS: 0% // ENCRYPTED_TUNNEL: ACTIVE // REFRESH_RATE: 144Hz // 0x2A19_CONNECTED</span>
          <span className="pr-10">INTEGRITY_CHECK: 100% // PACKET_LOSS: 0% // ENCRYPTED_TUNNEL: ACTIVE // REFRESH_RATE: 144Hz // 0x2A19_CONNECTED</span>
         </div>
      </footer>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
