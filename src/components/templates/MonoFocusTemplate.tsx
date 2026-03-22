"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  ArrowUpRight,
  MapPin,
  ArrowDown,
} from "lucide-react";

export default function MonoFocusTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-[#EAEAEA] text-[#111] font-sans selection:bg-[#111] selection:text-white overflow-x-hidden scroll-smooth flex flex-col items-center">
      
      {/* ── Dynamic Navigation ────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 md:p-10 flex justify-between items-start pointer-events-none no-print">
        <div className="pointer-events-auto bg-[#EAEAEA]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-[#111]/10 shadow-sm flex flex-col items-start gap-1">
          <h1 className="text-lg sm:text-xl font-black tracking-tighter uppercase leading-none">
            {personal.name?.split(" ")[0] || "MONO"}
          </h1>
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-[#111] before:rounded-full before:animate-pulse">
            System v2.5
          </p>
        </div>
        <div className="pointer-events-auto hidden sm:flex flex-col items-end gap-2 bg-[#EAEAEA]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-[#111]/10 shadow-sm">
          <div className="flex gap-4">
            {Object.entries(social).map(([platform, url], i) => (
              <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                className="text-[10px] sm:text-xs font-black uppercase tracking-widest hover:text-[#555] transition-colors border-b-2 border-transparent hover:border-[#111] pb-1">
                {platform}
              </a>
            ))}
          </div>
        </div>
        
        {/* Mobile connect simple icon */}
        <a href={`mailto:${contact.email}`} className="pointer-events-auto sm:hidden bg-[#111] text-white p-3 rounded-xl shadow-lg hover:bg-[#333] transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </nav>

      {/* ── Main Layout Constraint ────────────────────────────────── */}
      <main className="w-full max-w-[1920px]">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-10 lg:px-20 xl:px-40 py-32 sm:py-48 relative">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 sm:space-y-16 lg:space-y-20 relative z-10">
            {personal.imageUrl && (
              <img src={personal.imageUrl} alt={personal.name} className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-cover rounded-2xl mb-8 border border-[#111]/10 shadow-xl" />
            )}
            <h2 className="text-5xl sm:text-7xl md:text-[9vw] lg:text-[10vw] font-black uppercase leading-[0.9] tracking-tighter break-words">
              {personal.title?.split(" ")[0]} <br className="hidden sm:block" />
              <span className="text-transparent text-stroke-1 sm:text-stroke-2">
                {personal.title?.split(" ").slice(1).join(" ") || "CREATOR"}
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-start lg:items-end w-full">
              <p className="text-lg sm:text-2xl lg:text-3xl font-medium leading-relaxed max-w-2xl text-zinc-600">
                {personal.bio}
              </p>
              <div className="flex flex-col gap-5 border-l-2 border-[#111]/20 pl-6 sm:pl-8">
                {personal.location && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[#111]">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> Based in {personal.location}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#111] rounded-full animate-pulse" /> Available for Hire
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-12 animate-bounce flex justify-center w-full right-0 text-[#111]/40">
            <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </section>

        {/* Selected Work */}
        {projects.length > 0 && (
          <section id="work" className="px-4 sm:px-10 lg:px-20 xl:px-40 py-20 sm:py-32 lg:py-40 space-y-24 sm:space-y-32 lg:space-y-48">
            <div className="flex items-center gap-6 sm:gap-10">
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                Selected_Work
              </h3>
              <div className="h-0.5 sm:h-1 flex-1 bg-[#111]/10 rounded-full" />
            </div>

            <div className="space-y-40 sm:space-y-56 lg:space-y-72">
              {projects.map((project, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Image side */}
                  <div className={`w-full lg:w-[60%] relative group overflow-hidden bg-zinc-200 aspect-[4/3] sm:aspect-video rounded-3xl lg:rounded-[40px] border border-[#111]/5 shadow-2xl`}>
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    )}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 bg-white/95 backdrop-blur px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] border border-[#111]/10 shadow-lg text-[#111]">
                      Project_0{i + 1}
                    </div>
                  </div>
                  
                  {/* Content side */}
                  <div className="w-full lg:w-[40%] space-y-8 sm:space-y-10 lg:space-y-12">
                    <h4 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black uppercase tracking-tight leading-[0.9] break-words">
                      {project.name}
                    </h4>
                    <p className="text-base sm:text-xl lg:text-2xl text-zinc-600 leading-relaxed font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.techStack?.map((tech, idx) => (
                        <span key={idx} className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-[#111]/10 rounded-full bg-white text-zinc-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {(project.liveUrl || project.githubUrl) && (
                      <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-between sm:justify-center w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-[#111] text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors gap-6 sm:gap-8 rounded-2xl sm:rounded-full">
                        Explore Case <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Core Stack */}
        <section className="px-4 sm:px-10 lg:px-20 xl:px-40 py-24 sm:py-32 lg:py-48 border-t-2 border-[#111]/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 lg:gap-40">
            
            {/* Experience */}
            {experience.length > 0 && (
               <div className="space-y-12 sm:space-y-20 lg:space-y-24">
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight flex items-center gap-6">
                  Experience_ <div className="h-1 flex-1 bg-[#111]/10 hidden sm:block" />
                </h3>
                <div className="space-y-12 sm:space-y-16 lg:space-y-20 border-l-2 border-[#111]/20 pl-6 sm:pl-10 relative">
                  {experience.map((exp, i) => (
                    <div key={i} className="space-y-3 sm:space-y-4 group relative">
                      <div className="absolute -left-[30px] sm:-left-[47px] top-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#EAEAEA] border-4 sm:border-[6px] border-[#111] rounded-full group-hover:scale-125 transition-transform" />
                      <span className="text-[10px] sm:text-xs font-black text-zinc-400 uppercase tracking-[0.2em] bg-white px-3 py-1 rounded-md border border-[#111]/5 inline-block">
                        {exp.duration}
                      </span>
                      <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight group-hover:text-zinc-600 transition-colors leading-[1.1] pt-2 break-words">
                        {exp.role}
                      </h4>
                      <p className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-widest text-[#111]">
                        {exp.company}
                      </p>
                      <p className="text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mt-4 font-medium">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Stack */}
            {skills.length > 0 && (
              <div className="space-y-12 sm:space-y-20 lg:space-y-24">
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight flex items-center gap-6">
                  Core_Stack_ <div className="h-1 flex-1 bg-[#111]/10 hidden sm:block" />
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                  {skills.map((skill, i) => (
                    <div key={i} className="p-6 sm:p-8 lg:p-10 bg-white border border-[#111]/10 rounded-[20px] sm:rounded-[24px] space-y-6 sm:space-y-8 hover:-translate-y-1 transition-transform shadow-xl hover:shadow-2xl hover:border-[#111]/20">
                      <div className="flex justify-between items-center font-black text-sm lg:text-base uppercase tracking-widest">
                        <span className="text-[#111]">{skill.name}</span>
                        <span className="text-zinc-400">{skill.level}/5</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-zinc-100 rounded-full overflow-hidden border border-[#111]/5">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(skill.level / 5) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "circOut" }}
                          className="h-full bg-[#111]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="bg-[#111] text-[#EAEAEA] px-4 sm:px-10 lg:px-20 xl:px-40 py-24 sm:py-32 lg:py-56 rounded-t-[40px] sm:rounded-t-[80px] lg:rounded-t-[120px] mt-20 relative overflow-hidden">
          {/* subtle noise texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
          
           <div className="max-w-7xl mx-auto space-y-20 sm:space-y-32 relative z-10 w-full">
            <h2 className="text-6xl sm:text-8xl md:text-[11vw] lg:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter w-full">
              Ready_to <br className="hidden sm:block" />
              <span className="text-transparent text-stroke-1 sm:text-stroke-2 italic border-b-[8px] sm:border-b-[16px] lg:border-b-[24px] border-[#EAEAEA]/20 pb-4 inline-block w-full">
                Collaborate?
              </span>
            </h2>
            
            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-16 lg:gap-24 pt-20 border-t-2 border-white/10 w-full">
              <div className="space-y-6 sm:space-y-10">
                <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] lg:tracking-widest text-white/40">
                  Direct Contact
                </p>
                <a href={`mailto:${contact.email}`}
                  className="block text-3xl sm:text-5xl lg:text-7xl font-black text-white hover:text-white/60 transition-colors break-all leading-none focus:outline-hidden">
                  {contact.email}
                </a>
              </div>
              <div className="flex flex-wrap lg:grid lg:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-6 sm:gap-y-8">
                {Object.entries(social).map(([platform, url], i) => (
                  <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                     className="text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-[0.3em] hover:opacity-50 transition-opacity border-b border-white/20 pb-1">
                    {platform}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-20 sm:pt-32 flex flex-col sm:flex-row justify-between sm:items-center gap-8 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-white/20 w-full border-t border-white/5">
              <span>© {new Date().getFullYear()} MONO FOCUS SYSTEM</span>
              {personal.location && <span>Based in {personal.location?.toUpperCase()}</span>}
            </div>
          </div>
        </footer>

      </main>

      <style jsx global>{`
        .text-stroke-1 { -webkit-text-stroke: 1px #111; }
        .text-stroke-2 { -webkit-text-stroke: 2px #111; }
        .text-stroke-white { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2); }
      `}</style>
    </div>
  );
}
