"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Layers,
  User,
  Briefcase,
  Code,
  Mail,
  Smartphone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function AeroGlassTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, projects, skills } = data;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Background - Fixed & Optimized */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600')] bg-cover bg-center opacity-30 blur-2xl transform scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      </div>

      {/* MOBILE FIRST LAYOUT (Default) */}
      <div className="lg:hidden relative z-10 pb-24">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            {personal.name || "Studio"}
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-white/10">
            {personal.avatarUrl ? (
              <img
                src={personal.avatarUrl}
                className="w-full h-full object-cover rounded-full"
                alt="Profile"
              />
            ) : (
              <User className="w-4 h-4 text-blue-300" />
            )}
          </div>
        </header>

        {/* Mobile Content Tabs */}
        <div className="p-6 space-y-8">
          {/* Hero Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-black leading-tight mb-2">
                  {personal.name}
                </h1>
                <p className="text-blue-300 font-medium text-sm uppercase tracking-wider">
                  {personal.title}
                </p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {personal.bio}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 w-full py-4 bg-blue-600 rounded-xl text-center font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {["projects", "skills"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-white/5 text-gray-400 border border-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Content Feed */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden active:scale-[0.98] transition-transform"
                >
                  <div className="aspect-video bg-black/40 relative">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        alt={project.name}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase font-bold bg-white/10 px-2 py-1 rounded text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 mb-1">
                    <Code className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">{skill.name}</span>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full mt-auto">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/80 backdrop-blur-xl border-t border-white/10 p-4 pb-8 flex justify-around text-[10px] font-bold uppercase tracking-wide text-gray-500 z-50">
          <div className="flex flex-col items-center gap-1 text-blue-400">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </div>
          <div
            className="flex flex-col items-center gap-1 hover:text-white transition-colors cursor-pointer"
            onClick={() => window.open(`mailto:${contact.email}`)}
          >
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Hidden on Mobile) */}
      <div className="hidden lg:block h-screen w-screen overflow-hidden relative font-sans selection:bg-blue-500/30">
        {/* Top Menu Bar (MacOS style) */}
        <div className="fixed top-0 w-full h-8 bg-white/10 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 text-[11px] font-bold text-white/80">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-white font-bold ml-4">Studio Pro</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
          </div>
          <div className="flex items-center gap-4 opacity-70">
            <span>100% Battery</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Main Desktop Workspace */}
        <main className="h-full pt-16 pb-24 px-10 relative z-10 container mx-auto flex gap-8">
          {/* Floating Profile Panel */}
          <div className="w-1/4 h-full flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl h-fit"
            >
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-400 to-purple-500 mb-6 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/50">
                  {personal.avatarUrl ? (
                    <img
                      src={personal.avatarUrl}
                      alt={personal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-300" />
                  )}
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">{personal.name}</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300/80 mb-6">
                {personal.title}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed max-w-[250px]">
                {personal.bio}
              </p>

              <div className="mt-8 flex gap-3 w-full">
                <button className="flex-1 py-3 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                  Download CV
                </button>
                <button className="flex-1 py-3 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                  Hire Me
                </button>
              </div>
            </motion.div>

            {/* Glass Stats */}
            <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 flex-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                System Status
              </h3>
              <div className="space-y-4">
                {skills.slice(0, 5).map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-[10px] font-bold w-full">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-blue-300">
                          {skill.level * 20}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 20}%` }}
                          className="h-full bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal Project Flow */}
          <div className="flex-1 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 overflow-hidden flex flex-col relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Active Projects</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto h-full pb-4 snap-x snap-mandatory custom-scrollbar items-start"
            >
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="min-w-[400px] bg-white/5 border border-white/5 rounded-3xl p-6 snap-start flex flex-col gap-6 hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-black/40 rounded-2xl overflow-hidden relative">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all font-sans"
                        alt={project.name}
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">
                      v1.0
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.techStack.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full bg-blue-400/50"
                          title={t}
                        />
                      ))}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Desktop Dock */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-2xl z-50">
          {[User, Code, Briefcase, Mail].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2, y: -10 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all shadow-lg"
            >
              <Icon className="w-5 h-5 text-white/90" />
            </motion.button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
