"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowDown, Layers, MoveRight, Target, Activity } from "lucide-react";

export default function DynamicFlowTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, projects, experience, skills } = data;
  const containerRef = useRef(null);

  // Disable complex Parallax on Mobile via CSS/Media Queries or conditional JS
  // For now, we use responsive classes to simplify content on small screens.

  return (
    <div
      ref={containerRef}
      className="bg-black text-white selection:bg-orange-500 overflow-x-hidden w-full"
    >
      {/* Immersive Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)]" />

      {/* Hero Overlay */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-6 block">
            Cinematic Presence v1.02
          </span>
          <h1 className="text-[16vw] md:text-[15vw] font-black uppercase tracking-tighter leading-[0.85] italic mb-6">
            {personal.name?.split(" ")[0] || "DYNAMIC"} <br />
            <span className="text-outline text-transparent">
              {personal.name?.split(" ")[1] || "FLOW"}
            </span>
          </h1>
        </motion.div>

        <p className="text-sm md:text-2xl font-bold uppercase tracking-tight opacity-40 italic max-w-sm md:max-w-2xl mx-auto leading-relaxed">
          {personal.title} — {personal.bio}
        </p>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-orange-500">
          <div className="w-px h-16 bg-linear-to-b from-orange-500 to-transparent" />
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      <main className="relative z-10 w-full">
        {/* Project Stack - Mobile: Vertical Stack / Desktop: Staggered */}
        <section className="py-20 md:py-40">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-24 md:space-y-80">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-20 items-center w-full`}
              >
                {/* Image Container - Full Width Mobile */}
                <div className="w-full lg:w-3/5 aspect-square lg:aspect-4/3 bg-zinc-900 border-4 border-white overflow-hidden relative group">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[25vw] font-black italic opacity-5 leading-none text-white mix-blend-overlay">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Text Container */}
                <div className="w-full lg:w-2/5 space-y-6 text-center lg:text-left">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-2">
                      0{i + 1} // CASE_STUDY
                    </span>
                    <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic leading-none">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm lg:text-xl font-bold opacity-40 leading-relaxed italic lg:border-l-4 border-orange-500 lg:pl-8">
                    {project.description}
                  </p>
                  <button className="flex items-center justify-center lg:justify-start gap-4 group w-full lg:w-auto">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <MoveRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-orange-500">
                      Decrypt Outcome
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section - Mobile: Grid / Desktop: Orbit */}
        <section className="py-20 bg-white text-black overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-center md:text-left space-y-6">
              <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none italic">
                Technical
                <br />
                Radius.
              </h2>
              <p className="text-lg opacity-40 font-bold italic max-w-sm mx-auto md:mx-0">
                Mapping technical capabilities across the digital spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reduced animation complexity for mobile */}
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-8 border-4 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  <span className="text-[10px] font-black opacity-40 block mb-2">
                    NODE_0{i + 1}
                  </span>
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter">
                    {skill.name}
                  </h4>
                  <div className="mt-4 h-1 w-full bg-black/10">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="min-h-[80vh] flex flex-col justify-center items-center text-center p-6 bg-orange-500 text-black relative">
          <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none italic animate-pulse mb-8">
            Collide.
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="text-2xl md:text-5xl font-black uppercase underline decoration-black decoration-4 break-all"
          >
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
      `}</style>
    </div>
  );
}
