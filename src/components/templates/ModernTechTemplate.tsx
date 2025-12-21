"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";

export default function ModernTechTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, skills, experience } = data;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* MOBILE/TABLET LAYOUT (<1024px) - High Contrast & Stacked */}
      <div className="lg:hidden flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black">
        <header className="px-6 py-12 flex flex-col gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {personal.name?.[0]}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
              {personal.name}
            </h1>
            <p className="text-lg font-medium text-cyan-400">
              {personal.title}
            </p>
          </div>
          <div className="flex gap-4">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="p-3 bg-white/5 border border-white/10 rounded-xl"
              >
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </header>

        <main className="px-6 pb-20 space-y-16">
          {/* Bio */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-base leading-relaxed text-gray-300">
              {personal.bio}
            </p>
          </div>

          {/* Projects Stack */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-[24px] overflow-hidden border border-white/5 shadow-2xl"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-3 mt-4 bg-white/10 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2">
                    View Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Experience List - Simple Timeline */}
          <section className="space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
              History
            </h2>
            <div className="space-y-8 border-l-2 border-white/10 ml-2 pl-6">
              {experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-medium text-purple-400">
                      {exp.company}
                    </div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                      {exp.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile Contact */}
          <footer className="pt-8 pb-12">
            <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-3xl p-8 border border-white/5 text-center space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Let's Work Together
              </h2>
              <a
                href={`mailto:${contact.email}`}
                className="block text-lg font-bold text-cyan-400 underline decoration-cyan-500/30 underline-offset-4"
              >
                {contact.email}
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* DESKTOP LAYOUT (lg+) - Glassmorphism & Grids */}
      <div className="hidden lg:block">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="backdrop-blur-xl bg-white/5 rounded-[40px] p-16 border border-white/10 shadow-2xl">
              <h1 className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                {personal.name}
              </h1>
              <p className="text-4xl font-semibold text-cyan-300 mb-8">
                {personal.title}
              </p>
              <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed mb-12">
                {personal.bio}
              </p>
              <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          {/* Projects Grid */}
          <section>
            <h2 className="text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Featured Projects
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="group bg-white/5 rounded-[32px] p-8 border border-white/10 hover:border-cyan-500/50 transition-all hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed h-20 overflow-hidden">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Grid */}
          <section className="bg-white/5 rounded-[40px] p-16 border border-white/10">
            <h2 className="text-5xl font-bold mb-16 text-white">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-black/20 p-6 rounded-2xl border border-white/5 text-center"
                >
                  <div className="text-xl font-bold text-cyan-200 mb-2">
                    {skill.name}
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
