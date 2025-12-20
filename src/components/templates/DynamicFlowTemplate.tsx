"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  ArrowDown,
  Layers,
  MoveRight,
  Radio,
  Activity,
  Circle,
  Target,
} from "lucide-react";

export default function DynamicFlowTemplate({ data }: { data: PortfolioData }) {
  const { personal, contact, projects, experience, skills } = data;
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white selection:bg-orange-500 overflow-x-hidden"
    >
      {/* Immersive Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)]" />

      {/* Hero Overlay */}
      <section className="h-screen flex items-center justify-center relative z-10 px-6">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-black uppercase tracking-[1em] text-orange-500 mb-8 block">
              Cinematic Presence v1.02
            </span>
            <h1 className="text-[15vw] font-black uppercase tracking-tighter leading-[0.75] italic">
              {personal.name?.split(" ")[0] || "DYNAMIC"} <br />
              <span className="text-outline text-transparent group-hover:text-white transition-colors duration-1000">
                {personal.name?.split(" ")[1] || "FLOW"}
              </span>
            </h1>
          </motion.div>

          <div className="flex flex-col items-center gap-10">
            <p className="text-2xl font-bold uppercase tracking-tight opacity-40 italic max-w-2xl mx-auto">
              {personal.title} — {personal.bio}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Active Signal Found
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-orange-500">
          <div className="w-px h-24 bg-linear-to-b from-orange-500 to-transparent" />
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Staggered Content Blocks */}
      <main className="relative z-10">
        {/* Project Stack */}
        <section className="py-40">
          <div className="max-w-7xl mx-auto px-6 space-y-80">
            {projects.map((project, i) => (
              <ProjectBlock key={i} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Statistics / Skills Orbit */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-white text-black py-40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center w-full">
            <div className="space-y-12">
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-none italic">
                Technical <br />
                Radius.
              </h2>
              <p className="text-xl font-bold italic opacity-40 leading-relaxed max-w-md">
                Mapping technical capabilities across the digital spectrum
                through deep architectural intuition.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 relative">
              {/* Central Orbit Circle */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Target className="w-[600px] h-[600px] animate-spin-slow" />
              </div>

              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-10 border-4 border-black group cursor-pointer bg-white relative z-10"
                >
                  <span className="text-[10px] font-black opacity-20 block mb-4">
                    NODE_0{i + 1}
                  </span>
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                    {skill.name}
                  </h4>
                  <div className="mt-6 h-1 w-full bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 20}%` }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline - Vertical Ribbon */}
        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto space-y-40">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-6xl font-black uppercase tracking-[0.2em] italic">
                Chronology
              </h2>
              <div className="w-20 h-2 bg-orange-500 mx-auto" />
            </div>

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:items-start" : "md:items-end"
                } text-center md:text-left`}
              >
                <div
                  className={`max-w-md p-12 bg-zinc-900 border-l-8 border-orange-500 space-y-6 hover:bg-zinc-800 transition-colors cursor-default`}
                >
                  <span className="text-xs font-black text-orange-500 tracking-[0.3em]">
                    {exp.duration}
                  </span>
                  <h3 className="text-4xl font-black uppercase italic leading-none">
                    {exp.role}
                  </h3>
                  <p className="text-xs font-black opacity-40 uppercase">
                    {exp.company}
                  </p>
                  <p className="text-sm font-bold opacity-60 leading-relaxed italic">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Contact Collision */}
        <footer className="h-screen flex flex-col justify-center items-center text-center p-6 bg-orange-500 text-black">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="space-y-12"
          >
            <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none italic animate-pulse">
              Collide.
            </h2>
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
                Protocol Initialized
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-3xl md:text-5xl font-black uppercase underline decoration-black underline-offset-[12px] decoration-4"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>
          <div className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
            Developed on Gravity Control v1.0
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 2px white;
        }
        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

function ProjectBlock({ project, index }: { project: any; index: number }) {
  const blockRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <div
      ref={blockRef}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-20 items-center group`}
    >
      <motion.div
        style={{ y, rotate }}
        className="md:w-3/5 aspect-[4/3] bg-zinc-900 border-4 border-white overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-orange-500/20 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-20 transition-opacity">
          <Layers className="w-80 h-80" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[20vw] font-black italic opacity-5 leading-none">
            0{index + 1}
          </span>
        </div>
      </motion.div>

      <div className="md:w-2/5 space-y-10">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-orange-500">
            0{index + 1} // CASE_STUDY
          </span>
          <h3 className="text-7xl font-black uppercase tracking-tighter italic leading-[0.85]">
            {project.name}
          </h3>
        </div>
        <div className="space-y-8">
          <p className="text-xl font-bold opacity-40 leading-relaxed italic border-l-4 border-orange-500 pl-8">
            {project.description}
          </p>
          <button className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <MoveRight className="w-8 h-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-orange-500">
              Decrypt Outcome
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
