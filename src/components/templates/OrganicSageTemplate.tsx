"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { ArrowDownRight, MoveRight, Loader2, Leaf } from "lucide-react";

export default function OrganicSageTemplate({ data }: { data: PortfolioData }) {
  const { personal, projects, experience, skills, contact } = data;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="bg-[#E7E5E4] text-[#292524] font-serif selection:bg-[#57534E] selection:text-white">
      {/* MOBILE/TABLET LAYOUT (<1024px) - Linear Feed */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <header className="p-6 sticky top-0 bg-[#E7E5E4]/90 backdrop-blur-xl z-50 border-b border-[#292524]/10 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight text-[#292524]">
            {personal.name || "SAGE"}
          </span>
          <a
            href={`mailto:${contact.email}`}
            className="px-4 py-2 bg-[#292524] text-[#E7E5E4] text-xs font-bold uppercase tracking-widest rounded-full"
          >
            Connect
          </a>
        </header>

        <main className="px-6 py-12 space-y-20">
          <section className="space-y-6">
            <Leaf className="w-8 h-8 text-[#57534E]" />
            <h1 className="text-5xl font-medium leading-[1.1] tracking-tight">
              {personal.title}
            </h1>
            <p className="text-lg leading-relaxed text-[#57534E] font-sans">
              {personal.bio}
            </p>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#57534E]" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#57534E] font-sans">
                Selected Works
              </h2>
            </div>
            {projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-[#D6D3D1] rounded-2xl overflow-hidden mb-4 relative">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans">
                    2024
                  </div>
                </div>
                <h3 className="text-3xl font-medium mb-2">{project.name}</h3>
                <p className="text-sm text-[#57534E] line-clamp-3 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#57534E]" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#57534E] font-sans">
                Expertise
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/50 rounded-xl text-sm font-bold text-[#44403C] font-sans border border-[#292524]/5"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="p-6 bg-[#292524] text-[#E7E5E4] py-20 text-center space-y-8">
          <h2 className="text-4xl font-medium">Let's Create Together</h2>
          <p className="text-[#A8A29E] font-sans max-w-xs mx-auto text-sm leading-relaxed">
            Open for collaborations and new opportunities. Reach out to start a
            conversation.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-block text-xl underline underline-offset-4 decoration-1"
          >
            {contact.email}
          </a>
        </footer>
      </div>

      {/* DESKTOP LAYOUT (lg+) - Split Screen Scroll */}
      <div className="hidden lg:flex h-screen w-screen overflow-hidden">
        {/* Left Fixed Panel */}
        <aside className="w-1/2 h-full p-20 flex flex-col justify-between border-r border-[#292524]/10 relative bg-[#E7E5E4]">
          <div className="space-y-12 max-w-xl">
            <h1 className="text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] text-[#292524]">
              {personal.name?.split(" ")[0]} <br />
              <span className="text-[#A8A29E] italic">
                {personal.name?.split(" ")[1]}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-[#57534E] font-sans font-light max-w-md">
              {personal.bio}
            </p>
            <div className="flex gap-4 pt-8">
              <button className="px-8 py-4 bg-[#292524] text-[#E7E5E4] rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#44403C] transition-colors flex items-center gap-2">
                Connect <ArrowDownRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 font-sans text-sm text-[#57534E]">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-4">
                Location
              </span>
              {personal.location}
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-4">
                Focus
              </span>
              {personal.title}
            </div>
          </div>
        </aside>

        {/* Right Scrollable Panel */}
        <main
          ref={containerRef}
          className="w-1/2 h-full overflow-y-auto custom-scrollbar bg-white"
        >
          <div className="p-20 space-y-40 min-h-screen">
            {/* Projects Stream */}
            <div className="space-y-20">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="group space-y-8 cursor-pointer"
                >
                  <div className="aspect-[16/10] bg-[#E7E5E4] rounded-[2rem] overflow-hidden relative shadow-2xl shadow-[#292524]/5">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 max-w-md">
                      <h3 className="text-4xl font-medium">{project.name}</h3>
                      <p className="text-lg text-[#78716C] font-sans font-light leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex gap-4 pt-2">
                        {project.techStack.map((tech, t) => (
                          <span
                            key={t}
                            className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] font-sans border-b border-[#E7E5E4] pb-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-[#292524]/10 flex items-center justify-center group-hover:bg-[#292524] group-hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                      <MoveRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience List */}
            <div className="space-y-12">
              <h2 className="text-3xl font-medium border-b border-[#E7E5E4] pb-8">
                Experience
              </h2>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline group hover:bg-[#FAFAFA] -mx-4 p-4 rounded-xl transition-colors"
                >
                  <div>
                    <h4 className="text-xl font-medium mb-2">{exp.role}</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#A8A29E] font-sans">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm font-sans font-medium text-[#78716C]">
                    {exp.duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-40" />
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d6d3d1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
