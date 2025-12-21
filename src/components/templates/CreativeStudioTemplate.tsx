"use client";

import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  MapPin,
  Globe,
} from "lucide-react";

export default function CreativeStudioTemplate({
  data,
}: {
  data: PortfolioData;
}) {
  const { personal, contact, social, projects, experience, skills } = data;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden md:overflow-visible">
      {/* MOBILE/TABLET LAYOUT (<1024px) - Clean Vertical Feed */}
      <div className="lg:hidden flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/40">
        <header className="p-6 pt-12 space-y-6">
          <h1 className="text-5xl font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
            {personal.name || "Creative"}
          </h1>
          <p className="text-xl font-bold text-gray-300 leading-tight border-l-4 border-pink-500 pl-4 py-1">
            {personal.title}
          </p>
          {personal.location && (
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium bg-white/5 py-2 px-4 rounded-full w-fit">
              <MapPin className="w-4 h-4" /> {personal.location}
            </div>
          )}
        </header>

        <main className="px-6 pb-20 space-y-16">
          {/* Bio Card */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-gray-200">
              {personal.bio}
            </p>
          </div>

          {/* Mobile Projects */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-white mb-8">
              Work
            </h2>
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-[32px] overflow-hidden border border-white/10"
              >
                <div className="h-48 bg-black/40 relative">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-pink-400">
                    2024
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-black text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.liveUrl || "#"}
                    className="block w-full text-center py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-sm uppercase tracking-widest mt-4"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </section>

          {/* Mobile Skills - Wrappable Tags */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-white">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Mobile Connect */}
          <footer className="text-center space-y-8 pt-8">
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
              Let's Connect
            </h2>
            <div className="flex justify-center gap-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 rounded-full border border-white/10"
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest pb-10">
              Designed in Studio
            </div>
          </footer>
        </main>
      </div>

      {/* DESKTOP LAYOUT (lg+) - Animated & Extravagant */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-orange-200 animate-fade-in leading-none px-4 pb-4">
              {personal.name}
            </h1>
            <p className="text-4xl font-bold text-pink-200 tracking-tight">
              {personal.title}
            </p>
            <p className="text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {personal.bio}
            </p>
            <div className="flex justify-center gap-4 flex-wrap pt-8">
              {/* Social Buttons */}
              {Object.values(social).map((url, i) => (
                <a
                  key={i}
                  href={url}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110"
                >
                  <Globe className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Projects */}
        <section className="py-32 px-10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-7xl font-black mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-300">
              work.
            </h2>
            <div className="grid grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-md rounded-[40px] p-10 border border-white/10 hover:border-pink-400/50 transition-all hover:scale-[1.02]"
                >
                  <h3 className="text-4xl font-black mb-4 text-pink-200 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full font-bold shadow-lg shadow-pink-500/30 flex items-center gap-2 hover:gap-4 transition-all">
                      View Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Skills */}
        <section className="py-32 px-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-6xl font-black mb-16 text-white tracking-tighter">
              capability stack.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-10 py-5 bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl border border-pink-400/30 text-2xl font-bold hover:scale-110 transition-transform cursor-default"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
