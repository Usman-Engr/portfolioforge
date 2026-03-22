"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowDown, MoveRight } from "lucide-react";

export default function DynamicFlowTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};
  
  const containerRef = useRef(null);

  // We keep a simplified motion approach for mobile performance 
  // while ensuring grid and text scaling works everywhere.

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-orange-500 overflow-x-hidden w-full font-sans">
      
      {/* Immersive Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] pointer-events-none" />

      {/* ── Hero Overlay ──────────────────────────────────────────── */}
      <section className="min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-500 mb-6 block">
            Cinematic Presence v1.02
          </span>
          <h1 className="text-6xl sm:text-[12vw] md:text-[15vw] font-black uppercase tracking-tighter leading-[0.85] italic mb-6 break-words">
            {personal.name?.split(" ")[0] || "DYNAMIC"} <br />
            <span className="text-outline text-transparent">
              {personal.name?.split(" ").slice(1).join(" ") || "FLOW"}
            </span>
          </h1>
        </motion.div>

        <p className="text-sm sm:text-lg md:text-2xl font-bold uppercase tracking-tight opacity-40 italic max-w-sm sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {personal.title} — {personal.bio}
        </p>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-orange-500">
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-orange-500 to-transparent" />
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      <main className="relative z-10 w-full">
        
        {/* ── Project Stack ───────────────────────────────────────── */}
        {projects.length > 0 && (
          <section className="py-20 sm:py-32 md:py-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-32 sm:space-y-48 md:space-y-64">
              {projects.map((project, i) => (
                <div key={i} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 sm:gap-12 lg:gap-20 items-center w-full`}>
                  
                  {/* Image Container */}
                  <div className="w-full lg:w-3/5 aspect-square sm:aspect-video lg:aspect-[4/3] bg-zinc-900 border-2 sm:border-4 border-white overflow-hidden relative group">
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <span className="text-[6rem] sm:text-[15vw] lg:text-[20vw] font-black italic opacity-5 leading-none text-white mix-blend-overlay select-none">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="w-full lg:w-2/5 space-y-6 sm:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-3 sm:mb-4">
                        0{i + 1} // CASE_STUDY
                      </span>
                      <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter italic leading-none break-words">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base lg:text-xl font-bold opacity-40 leading-relaxed italic lg:border-l-4 border-orange-500 lg:pl-6 max-w-md lg:max-w-none">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                       {project.techStack?.map((tech, ti) => (
                          <span key={ti} className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 text-white rounded-full">
                            {tech}
                          </span>
                       ))}
                    </div>
                    {(project.liveUrl || project.githubUrl) && (
                      <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center justify-center lg:justify-start gap-4 group w-full sm:w-auto mt-4 px-6 py-3 lg:p-0 bg-white/10 lg:bg-transparent rounded-full lg:rounded-none hover:bg-white/20 lg:hover:bg-transparent transition-colors">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors shrink-0">
                          <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
                          Decrypt Outcome
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Experience History ──────────────────────────────────── */}
        {experience.length > 0 && (
          <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
            <div className="space-y-16 sm:space-y-20">
               <h2 className="text-4xl sm:text-5xl lg:text-[6vw] font-black uppercase tracking-tighter leading-none italic text-center lg:text-left">
                Career <br className="hidden lg:block"/>Trajectory.
              </h2>
              <div className="space-y-12 sm:space-y-16 border-l-2 border-orange-500/30 pl-6 sm:pl-10">
                {experience.map((exp, i) => (
                   <div key={i} className="relative space-y-3 sm:space-y-4 group">
                     <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 sm:top-2 w-3 h-3 sm:w-4 sm:h-4 bg-black border-2 sm:border-4 border-orange-500 rounded-full group-hover:bg-orange-500 transition-colors" />
                     <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 tabular-nums">
                       {exp.duration}
                     </span>
                     <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tight break-words">
                       {exp.role}
                     </h4>
                     <p className="text-sm sm:text-base font-bold uppercase tracking-widest opacity-60">
                       {exp.company}
                     </p>
                     <p className="text-sm sm:text-base opacity-40 leading-relaxed max-w-2xl font-medium">
                       {exp.description}
                     </p>
                   </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Skills Section ──────────────────────────────────────── */}
        {skills.length > 0 && (
          <section className="py-20 sm:py-32 bg-white text-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center relative z-10">
              <div className="text-center lg:text-left space-y-6">
                <h2 className="text-5xl sm:text-[8vw] lg:text-[6vw] font-black uppercase tracking-tighter leading-[0.9] italic">
                  Technical<br />
                  Radius.
                </h2>
                <p className="text-base sm:text-lg opacity-40 font-bold italic max-w-sm mx-auto lg:mx-0">
                  Mapping technical capabilities across the digital spectrum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skill, i) => (
                  <div key={i} className="p-6 sm:p-8 border-2 sm:border-4 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-default group">
                    <span className="text-[9px] sm:text-[10px] font-black opacity-40 group-hover:opacity-100 transition-opacity text-orange-500 block mb-2 sm:mb-3">
                      NODE_0{i + 1}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter break-words">
                      {skill.name}
                    </h4>
                    <div className="mt-4 sm:mt-6 h-1 w-full bg-black/10 group-hover:bg-white/20 transition-colors">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(skill.level / 5) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }}
                        className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Contact Footer ──────────────────────────────────────── */}
        <footer className="min-h-[60vh] sm:min-h-[80vh] flex flex-col justify-center items-center text-center p-6 bg-orange-500 text-black relative border-t-[16px] xl:border-t-[24px] border-black">
          <h2 className="text-[12vw] sm:text-[15vw] font-black uppercase tracking-tighter leading-none italic animate-pulse mb-8 sm:mb-12 break-words">
            Collide.
          </h2>
          <a href={`mailto:${contact.email}`}
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase underline decoration-black decoration-2 sm:decoration-4 hover:decoration-white hover:text-white transition-colors break-all">
            {contact.email}
          </a>
        </footer>
      </main>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1px white;
        }
        @media (min-width: 768px) {
          .text-outline {
            -webkit-text-stroke: 2px white;
          }
        }
        @media (min-width: 1024px) {
          .text-outline {
            -webkit-text-stroke: 3px white;
          }
        }
      `}</style>
    </div>
  );
}
