"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ArrowRight,
  GraduationCap,
  Award
} from "lucide-react";

export default function ProfessionalCVTemplate({ data }: { data: PortfolioData }) {
  const {
    personal = { name: "", title: "", bio: "", location: "" } as any,
    contact = { email: "", phone: "" } as any,
    social = {} as any,
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif selection:bg-blue-100 p-4 sm:p-6 md:p-12 lg:p-24 flex justify-center w-full">
      <div className="max-w-[1000px] w-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-gray-100 rounded-sm overflow-hidden relative">
        
        {/* Accent Bar */}
        <div className="h-2 sm:h-3 bg-slate-900 w-full" />

        <div className="p-6 sm:p-10 md:p-16 space-y-12 sm:space-y-16">
          
          {/* ── Header Section ────────────────────────────────────────── */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12 border-b border-gray-100 pb-12 sm:pb-16">
            <div className="space-y-4 max-w-2xl w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-none break-words">
                {personal.name || "Full Name"}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-500 italic">
                {personal.title}
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {personal.bio}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 text-left md:text-right w-full md:w-auto min-w-0">
              {contact.email && (
                <div className="flex items-center justify-start md:justify-end gap-3 text-slate-600 min-w-0 w-full">
                  <span className="text-sm font-medium truncate shrink">
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors">{contact.email}</a>
                  </span>
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center justify-start md:justify-end gap-3 text-slate-600 min-w-0 w-full">
                  <span className="text-sm font-medium truncate shrink">
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600 transition-colors">{contact.phone}</a>
                  </span>
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              )}
              {personal.location && (
                <div className="flex items-center justify-start md:justify-end gap-3 text-slate-600 min-w-0 w-full">
                  <span className="text-sm font-medium truncate shrink">
                    {personal.location}
                  </span>
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              )}
              <div className="flex justify-start md:justify-end gap-3 pt-4 sm:pt-6">
                {social.linkedin && (
                  <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-slate-50 rounded hover:bg-slate-100 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 inherit" />
                  </a>
                )}
                {social.github && (
                  <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-slate-50 rounded hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 inherit" />
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-slate-50 rounded hover:bg-slate-100 hover:text-blue-600 transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 inherit" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* ── Core Content Grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            
            {/* ── Primary Column (Left on Desktop) ────────────────────── */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">
              
              {/* Professional Experience */}
              {experience.length > 0 && (
                <section className="space-y-8 sm:space-y-10">
                  <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 flex items-center gap-4 before:h-px before:bg-slate-200 before:flex-1">
                    Professional Experience
                  </h2>
                  <div className="space-y-10 sm:space-y-12">
                    {experience.map((exp, i) => (
                      <div key={i} className="group flex flex-col sm:flex-row items-start gap-2 sm:gap-6">
                        <div className="sm:w-32 sm:pt-1 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest sm:whitespace-nowrap shrink-0 mb-2 sm:mb-0 bg-slate-50 px-3 py-1 sm:p-0 sm:bg-transparent rounded-sm">
                          {exp.duration}
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-3 w-full">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors break-words">
                            {exp.role}
                          </h3>
                          <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
                            {exp.company}
                          </div>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Notable Projects */}
              {projects.length > 0 && (
                <section className="space-y-8 sm:space-y-10">
                  <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 flex items-center gap-4 before:h-px before:bg-slate-200 before:flex-1">
                    Key Projects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {projects.map((project, i) => (
                      <div key={i} className="p-6 bg-slate-50 border border-slate-200 space-y-3 hover:shadow-md transition-shadow">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-3">
                          {project.techStack?.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter sm:tracking-widest bg-white px-2 py-0.5 rounded-sm border border-slate-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {(project.liveUrl || project.githubUrl) && (
                          <div className="pt-3">
                             <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                               View Project <ArrowRight className="w-3 h-3" />
                             </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Sidebar Column (Right on Desktop) ─────────────────────── */}
            <aside className="lg:col-span-4 space-y-12 sm:space-y-16 lg:border-l lg:border-slate-100 lg:pl-12 pt-12 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              
              {/* Education */}
              {education && education.length > 0 && (
                <section className="space-y-6 sm:space-y-8">
                  <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-widest text-slate-900 flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-slate-400" /> Education
                  </h2>
                  <div className="space-y-6 sm:space-y-8">
                    {education.map((edu, i) => (
                      <div key={i} className="space-y-1.5 p-4 sm:p-0 bg-slate-50 sm:bg-transparent rounded-sm sm:rounded-none">
                        <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest inline-block px-2 py-0.5 sm:p-0 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 sm:border-none rounded-sm mb-1 sm:mb-0">
                          {edu.year}
                        </div>
                        <h3 className="font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 italic">
                          {edu.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section className="space-y-6 sm:space-y-8">
                  <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-widest text-slate-900 flex items-center gap-3">
                    <Award className="w-4 h-4 text-slate-400" /> Core Expertise
                  </h2>
                  <div className="space-y-4">
                    {skills.map((skill, i) => (
                      <div key={i} className="space-y-2 group">
                        <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                          <span>{skill.name}</span>
                          <span className="text-slate-300 group-hover:text-slate-900 transition-colors">
                            {skill.level}/5
                          </span>
                        </div>
                        <div className="h-1 sm:h-1.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 transition-all duration-1000" style={{ width: `${(skill.level / 5) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Digital Presence */}
              {(social.github || social.twitter || social.linkedin || contact.website) && (
                <section className="space-y-6 sm:space-y-8">
                  <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-widest text-slate-900 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-slate-400" /> Web Presence
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(social).map(([platform, url], i) => (
                      <a key={i} href={url as string} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors group p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-sm sm:rounded-none">
                        <span>{platform}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 sm:opacity-100 group-hover:opacity-100 transition-all sm:-translate-x-2 sm:group-hover:translate-x-0" />
                      </a>
                    ))}
                  </div>
                </section>
              )}

            </aside>
          </div>

          {/* ── Footer Footnote ───────────────────────────────────────── */}
          <footer className="pt-16 sm:pt-24 text-center border-t border-slate-100">
            <p className="text-[8px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] sm:tracking-[0.5em]">
              References Available Upon Request
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
