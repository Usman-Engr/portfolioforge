"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Languages,
} from "lucide-react";

export default function ProfessionalCVTemplate({
  data,
}: {
  data: PortfolioData;
}) {
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif selection:bg-blue-100 p-4 md:p-12 lg:p-24 flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-gray-100 rounded-px overflow-hidden relative">
        {/* Accent Bar */}
        <div className="h-2 bg-slate-900 w-full" />

        <div className="p-8 md:p-16 lg:p-24 space-y-16">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-gray-100 pb-16">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-none">
                {personal.name || "Full Name"}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-500 italic">
                {personal.title}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {personal.bio}
              </p>
            </div>

            <div className="space-y-4 text-right">
              {contact.email && (
                <div className="flex items-center justify-end gap-3 text-slate-600">
                  <span className="text-sm font-medium">{contact.email}</span>
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center justify-end gap-3 text-slate-600">
                  <span className="text-sm font-medium">{contact.phone}</span>
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
              )}
              {personal.location && (
                <div className="flex items-center justify-end gap-3 text-slate-600">
                  <span className="text-sm font-medium">
                    {personal.location}
                  </span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    className="p-2 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-slate-600" />
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    className="p-2 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-600" />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    className="p-2 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-slate-600" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Primary Column */}
            <div className="lg:col-span-8 space-y-16">
              {/* Professional Experience */}
              <section className="space-y-10">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4 before:h-px before:bg-slate-100 before:flex-1">
                  Professional Experience
                </h2>
                <div className="space-y-12">
                  {experience.map((exp, i) => (
                    <div
                      key={i}
                      className="group flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-32 pt-1 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                        {exp.duration}
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                          {exp.company}
                        </div>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Notable Projects (Condensed for CV) */}
              {projects.length > 0 && (
                <section className="space-y-10">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4 before:h-px before:bg-slate-100 before:flex-1">
                    Key Projects
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                      <div
                        key={i}
                        className="p-6 bg-slate-50 rounded border border-slate-100 space-y-3"
                      >
                        <h3 className="font-bold text-slate-900">
                          {project.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.techStack?.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter bg-white px-2 py-0.5 rounded border border-slate-100"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-16 lg:border-l lg:border-slate-50 lg:pl-12">
              {/* Education */}
              <section className="space-y-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <GraduationCap className="w-4 h-4" /> Education
                </h2>
                <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-xs font-bold text-slate-400">
                        {edu.year}
                      </div>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-sm text-slate-600 italic">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="space-y-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <Award className="w-4 h-4" /> Core Expertise
                </h2>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="space-y-1.5 group">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <span>{skill.name}</span>
                        <span className="text-slate-300 group-hover:text-slate-900 transition-colors">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-1 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-950 transition-all duration-1000"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages (If data exists) or Additional Info */}
              <section className="space-y-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <Globe className="w-4 h-4" /> Digital Presence
                </h2>
                <div className="space-y-3">
                  {Object.entries(social).map(([platform, url], i) => (
                    <a
                      key={i}
                      href={url as string}
                      className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                      <span className="capitalize">{platform}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          {/* Footer Footnote */}
          <footer className="pt-24 text-center border-t border-slate-50">
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.5em]">
              References Available Upon Request
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
