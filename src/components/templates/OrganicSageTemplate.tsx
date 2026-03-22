"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowDownRight, MoveRight, Leaf, MapPin, Mail, Github, Linkedin, ExternalLink } from "lucide-react";

export default function OrganicSageTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "" } as any,
    social = {} as any,
    projects = [],
    skills = [],
    experience = [],
  } = data || {};

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#E7E5E4] text-[#292524] font-serif selection:bg-[#57534E] selection:text-white overflow-x-hidden flex flex-col lg:flex-row">
      
      {/* ── Left Fixed Panel (Desktop) / Header (Mobile) ──────────────── */}
      <aside className="lg:w-[45%] lg:h-screen lg:sticky lg:top-0 p-6 sm:p-12 xl:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#292524]/10 bg-[#E7E5E4] z-20">
        
        {/* Nav / Minimal Header */}
        <header className="flex justify-between items-center lg:items-start lg:flex-col gap-8 mb-16 lg:mb-0">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#292524]">
            {personal.name?.split(" ")[0] || "SAGE"}
          </span>
          <a href={`mailto:${contact.email}`} className="lg:hidden px-5 py-2.5 bg-[#292524] text-[#E7E5E4] text-xs font-bold uppercase tracking-widest rounded-full">
            Connect
          </a>
        </header>

        {/* Hero Content */}
        <div className="space-y-8 sm:space-y-12 max-w-xl">
          <Leaf className="hidden lg:block w-8 h-8 text-[#57534E] mb-8" />
          <h1 className="text-5xl sm:text-6xl xl:text-[5.5rem] font-medium tracking-tight leading-[1] text-[#292524]">
            {personal.name?.split(" ")[0]} <br className="hidden sm:block" />
            <span className="text-[#A8A29E] italic">{personal.name?.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl leading-relaxed text-[#57534E] font-sans font-light max-w-md">
            {personal.bio}
          </p>
          <div className="hidden lg:flex gap-4 pt-4">
            <a href={`mailto:${contact.email}`} className="px-8 py-4 bg-[#292524] text-[#E7E5E4] rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#44403C] transition-colors flex items-center gap-3">
              Connect <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Meta Info (Desktop) / Footer info (Mobile) */}
        <div className="hidden lg:grid grid-cols-2 gap-8 font-sans text-sm text-[#57534E] mt-16">
          {personal.location && (
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-3">Location</span>
              {personal.location}
            </div>
          )}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-3">Focus</span>
            {personal.title}
          </div>
        </div>
      </aside>

      {/* ── Right Scrollable Panel ─────────────────────────────────────── */}
      <main className="lg:w-[55%] flex-1 bg-white relative">
        <div className="p-6 sm:p-12 xl:p-20 space-y-32 sm:space-y-40 min-h-screen">
          
          {/* Projects Stream */}
          {projects.length > 0 && (
            <section className="space-y-16 sm:space-y-24">
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-[#57534E]" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#57534E] font-sans">
                  Selected Works
                </h2>
              </div>
              
              <div className="space-y-20 sm:space-y-32">
                {projects.map((project, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp as any} custom={i}
                    className="group space-y-6 sm:space-y-8 cursor-pointer relative">
                    <div className="aspect-[4/3] sm:aspect-[16/10] bg-[#E7E5E4] rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative shadow-2xl shadow-[#292524]/5">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E7E5E4] to-[#D6D3D1]" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                          className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#292524] hover:text-white flex items-center gap-2">
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                      <div className="space-y-3 max-w-lg">
                        <h3 className="text-3xl sm:text-4xl font-medium break-words leading-tight">{project.name}</h3>
                        <p className="text-base sm:text-lg text-[#78716C] font-sans font-light leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-4">
                          {project.techStack?.map((tech, t) => (
                            <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] font-sans border-b border-[#E7E5E4] pb-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="hidden sm:flex w-12 h-12 rounded-full border border-[#292524]/10 items-center justify-center group-hover:bg-[#292524] group-hover:text-white transition-all transform group-hover:-rotate-45 shrink-0">
                        <MoveRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Experience List */}
          {experience.length > 0 && (
            <section className="space-y-12">
              <h2 className="text-3xl sm:text-4xl font-medium border-b border-[#E7E5E4] pb-6 sm:pb-8">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp as any} custom={i}
                    className="flex flex-col sm:flex-row justify-between sm:items-baseline group hover:bg-[#FAFAFA] -mx-4 p-4 sm:p-6 rounded-2xl transition-colors gap-2 sm:gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xl sm:text-2xl font-medium break-words">{exp.role}</h4>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#A8A29E] font-sans">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-medium text-[#78716C] uppercase tracking-widest shrink-0 mt-2 sm:mt-0">
                      {exp.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Expertise / Skills */}
          {skills.length > 0 && (
            <section className="space-y-8 sm:space-y-12">
               <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-[#57534E]" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#57534E] font-sans">
                  Expertise
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {skills.map((skill, i) => (
                  <div key={i} className="p-4 sm:p-5 bg-white rounded-2xl text-xs sm:text-sm font-bold text-[#44403C] font-sans border border-[#292524]/5 shadow-sm text-center">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Footer */}
          <footer className="pt-20 sm:pt-32 pb-10 text-center space-y-8 border-t border-[#E7E5E4] mt-32">
            <h2 className="text-3xl sm:text-5xl font-medium leading-tight">Let's Create <br/>Together</h2>
            <p className="text-[#A8A29E] font-sans max-w-sm mx-auto text-sm leading-relaxed pb-4">
              Open for collaborations and new opportunities. Reach out to start a conversation.
            </p>
            <a href={`mailto:${contact.email}`} className="inline-block text-lg sm:text-2xl underline underline-offset-8 decoration-1 hover:text-[#A8A29E] transition-colors break-all">
              {contact.email}
            </a>
            
            <div className="flex justify-center gap-6 sm:gap-8 pt-12">
               {social.github && <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="text-[#A8A29E] hover:text-[#292524] transition-colors"><Github className="w-5 h-5" /></a>}
               {social.linkedin && <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[#A8A29E] hover:text-[#292524] transition-colors"><Linkedin className="w-5 h-5" /></a>}
            </div>
            <div className="pt-16 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-[#A8A29E]">
              © {new Date().getFullYear()} ORGANIC SAGE STUDIO
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
