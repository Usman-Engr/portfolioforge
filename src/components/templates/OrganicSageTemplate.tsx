"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Leaf,
  Sun,
  Wind,
  Cloud,
  MapPin,
  Instagram,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

export default function OrganicSageTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, social, projects, experience, skills } = data;

  return (
    <div className="h-screen w-screen bg-[#FDFBF7] text-[#4A5D4E] font-serif selection:bg-[#D4E2D4] overflow-hidden flex flex-col md:flex-row">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

      {/* Left Panel: Static Identity */}
      <aside className="w-full md:w-[450px] lg:w-[600px] h-full flex flex-col justify-between p-12 lg:p-24 border-r border-[#4A5D4E]/10 relative bg-white/50 backdrop-blur-3xl shrink-0">
        <nav className="flex justify-between items-center mb-20 md:mb-0">
          <div className="text-3xl font-black lowercase tracking-tighter italic">
            {personal.name?.split(" ")[0]}.
          </div>
        </nav>

        <div className="space-y-12">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#D4E2D4]/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <Leaf className="w-4 h-4 fill-current" />
            Human Nature
          </div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl lg:text-9xl font-black italic tracking-tighter text-[#2D3A2F] leading-[0.85]"
          >
            Natural <br />
            Design.
          </motion.h1>
          <p className="text-xl lg:text-2xl text-[#6D8B74] font-medium leading-relaxed italic max-w-sm">
            {personal.title} — {personal.bio}
          </p>
        </div>

        <div className="space-y-10 pt-20">
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            {social.github && (
              <a
                href={`https://github.com/${social.github}`}
                className="hover:opacity-100 transition-opacity"
              >
                Github
              </a>
            )}
            {social.linkedin && (
              <a
                href={`https://linkedin.com/in/${social.linkedin}`}
                className="hover:opacity-100 transition-opacity"
              >
                LinkedIn
              </a>
            )}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">
            EST. MMXXV / PORTFOLIO_CORE
          </div>
        </div>

        {/* Decorative Shape */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4E2D4]/20 rounded-full blur-3xl pointer-events-none"
        />
      </aside>

      {/* Right Panel: Scrollable Content */}
      <main className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F6F3ED]/30">
        <section className="p-12 lg:p-24 space-y-40">
          {/* Projects Flow */}
          <div className="space-y-40">
            <div className="flex items-baseline justify-between border-b border-[#4A5D4E]/10 pb-10">
              <h2 className="text-4xl font-black italic tracking-tighter lowercase">
                Creations.
              </h2>
              <span className="text-[10px] font-black opacity-20 uppercase tracking-widest">
                001 — 00{projects.length}
              </span>
            </div>

            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-4/3 bg-white rounded-[60px] overflow-hidden mb-10 relative shadow-2xl shadow-[#4A5D4E]/5 border border-[#4A5D4E]/5">
                  <div className="absolute inset-0 bg-[#D4E2D4]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-black uppercase tracking-widest italic">
                      Open Story
                    </div>
                  </div>
                  <div className="absolute top-10 right-10 flex items-center gap-4">
                    {project.techStack.slice(0, 2).map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-[9px] font-black uppercase tracking-widest bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-4 space-y-4">
                  <h3 className="text-5xl font-black italic tracking-tight text-[#2D3A2F] leading-none lowercase group-hover:translate-x-4 transition-transform duration-700">
                    {project.name}
                  </h3>
                  <p className="text-xl text-[#6D8B74] leading-relaxed italic opacity-60 line-clamp-2 max-w-xl">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expertise Section */}
          <div className="space-y-24 pb-40">
            <div className="flex items-baseline justify-between border-b border-[#4A5D4E]/10 pb-10">
              <h2 className="text-4xl font-black italic tracking-tighter lowercase">
                Expertise.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-12 bg-white rounded-[40px] flex justify-between items-center group hover:bg-[#D4E2D4] transition-all duration-700 border border-[#4A5D4E]/5"
                >
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black italic text-[#2D3A2F] lowercase mb-1">
                      {skill.name}
                    </h4>
                    <div className="flex gap-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <div
                          key={si}
                          className={`w-8 h-1 rounded-full ${
                            si < skill.level
                              ? "bg-[#4A5D4E]"
                              : "bg-[#4A5D4E]/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Sun className="w-10 h-10 opacity-10 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-1000" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Bottom */}
          <footer className="pt-20 border-t border-[#4A5D4E]/10 flex flex-col gap-10">
            <h2 className="text-6xl font-black italic tracking-tighter text-[#2D3A2F] lowercase">
              Plant a Seed.
            </h2>
            <a
              href={`mailto:${contact.email}`}
              className="text-4xl font-black italic text-[#4A5D4E] underline decoration-[#D4E2D4] underline-offset-16 decoration-4"
            >
              {contact.email}
            </a>
          </footer>
        </section>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
