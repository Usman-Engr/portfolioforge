"use client";

import { Hero } from "@/components/landing/Hero";
import { templates } from "@/lib/templates";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  FileText,
  Globe,
  Layout,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { Terminal, Palette, Briefcase, LayoutGrid } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "all" | "developer" | "designer" | "corporate"
  >("all");

  const tabs = [
    { id: "all", label: "All Styles", icon: LayoutGrid },
    { id: "developer", label: "Developers", icon: Terminal },
    { id: "designer", label: "Designers", icon: Palette },
    { id: "corporate", label: "Resume/Non-Tech", icon: Briefcase },
  ] as const;

  const filteredTemplates = templates.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "corporate") {
      return (
        t.targetAudience === "corporate" ||
        t.category === "resume" ||
        t.category === "corporate" ||
        t.category === "non-tech"
      );
    }
    return t.targetAudience === (activeTab as any);
  });

  const features = [
    {
      title: "AI-Powered Intelligence",
      description:
        "Generate professional bios and descriptions in seconds with our custom LLM engine.",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-linear-to-br from-purple-900/20 to-black",
    },
    {
      title: "High-Fidelity PDF",
      description:
        "One-click export to 8K print-ready PDFs. Perfect for interviews.",
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      colSpan: "col-span-1",
      bg: "bg-linear-to-br from-blue-900/20 to-black",
    },
    {
      title: "Real-Time Preview",
      description: "See your changes instantly. No reload, no waiting.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      colSpan: "col-span-1",
      bg: "bg-linear-to-br from-yellow-900/20 to-black",
    },
    {
      title: "Global CDN Hosting",
      description:
        "Your portfolio is deployed to the edge. Fast from New York to Tokyo.",
      icon: <Globe className="w-6 h-6 text-green-400" />,
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-linear-to-br from-green-900/20 to-black",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Hero />

      {/* --- STATS TICKER (Social Proof) --- */}
      <div className="w-full bg-[#0a0a0a] border-y border-white/5 overflow-hidden py-4">
        <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 items-center justify-center min-w-full">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 md:gap-32 items-center">
              <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Trusted by
                10,000+ Professionals
              </span>
              <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                <Globe className="w-4 h-4 text-purple-500" /> 500k+ Monthly
                Views
              </span>
              <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                <Zap className="w-4 h-4 text-yellow-500" /> 99.9% Uptime Global
                Edge
              </span>
              <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                <FileText className="w-4 h-4 text-green-500" /> $0 Cost for PDF
                Exports
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3D WORKFLOW SECTION --- */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* 3D Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              THE <span className="text-blue-500">FORGE</span> PROCESS
            </h2>
            <p className="text-xl text-gray-400">Three steps to dominance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {/* Step 1 */}
            <div className="group relative h-[400px] w-full transition-all duration-500 transform-3d hover:transform-[rotateY(10deg)_rotateX(5deg)]">
              <div className="absolute inset-0 bg-[#0f0f0f] border border-white/10 rounded-[32px] p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px]" />
                <span className="text-6xl font-black text-white/5">01</span>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Input Data
                  </h3>
                  <p className="text-gray-400">
                    Drop your messy notes, GitHub link, or old resume. Our
                    system ingests raw chaos.
                  </p>
                </div>
                <div className="w-full h-32 bg-linear-to-t from-blue-900/10 to-transparent rounded-xl border border-white/5 relative overflow-hidden group-hover:bg-blue-900/20 transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent w-full" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative h-[400px] w-full transition-all duration-500 transform-3d hover:transform-[translateZ(20px)_scale(1.05)] z-10">
              <div className="absolute inset-0 bg-linear-to-b from-[#151515] to-black border border-blue-500/30 rounded-[32px] p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 blur-[80px] animate-pulse" />
                <span className="text-6xl font-black text-blue-500/20">02</span>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    AI Synthesis
                  </h3>
                  <p className="text-gray-400">
                    Our LLM engine structures, polishes, and writes your content
                    for maximum impact.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-blue-400 animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative h-[400px] w-full transition-all duration-500 transform-3d hover:transform-[rotateY(-10deg)_rotateX(5deg)]">
              <div className="absolute inset-0 bg-[#0f0f0f] border border-white/10 rounded-[32px] p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[60px]" />
                <span className="text-6xl font-black text-white/5">03</span>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Global Deploy
                  </h3>
                  <p className="text-gray-400">
                    Instant HTTPS hosting on edge networks. Print-ready PDF
                    generated automatically.
                  </p>
                </div>
                <div className="w-full h-32 bg-linear-to-t from-purple-900/10 to-transparent rounded-xl border border-white/5 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-purple-400/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES BENTO GRID (Enhanced) --- */}
      <section className="relative py-32 px-4 bg-[#080808]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 bg-linear-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">
              ENGINEERED FOR PERFECTION
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to build a world-class presence, meticulously
              crafted into one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${feature.colSpan} relative group overflow-hidden rounded-[32px] border border-white/10 p-8 hover:border-white/20 transition-all duration-500`}
              >
                <div
                  className={`absolute inset-0 ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- US VS THEM (Secure Audience) --- */}
      <section className="py-20 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />

          <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
            WHY WE WIN
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 text-gray-400 font-medium uppercase tracking-widest text-xs">
                    Feature
                  </th>
                  <th className="py-6 px-4 text-blue-400 font-bold uppercase tracking-widest text-xs bg-blue-900/10 rounded-t-xl border-x border-t border-blue-500/20">
                    PortfolioForge
                  </th>
                  <th className="py-6 px-4 text-gray-500 font-bold uppercase tracking-widest text-xs opacity-50">
                    Generic Builders
                  </th>
                  <th className="py-6 px-4 text-gray-500 font-bold uppercase tracking-widest text-xs opacity-50">
                    Manual Coding
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "AI Content Generation",
                    us: true,
                    them: false,
                    manual: false,
                  },
                  {
                    name: "Real-Time 3D Preview",
                    us: true,
                    them: true,
                    manual: true,
                  },
                  {
                    name: "One-Click PDF Export",
                    us: true,
                    them: false,
                    manual: false,
                  },
                  {
                    name: "Deployment Time",
                    us: "< 2 Minutes",
                    them: "Hours",
                    manual: "Days",
                  },
                  {
                    name: "ATS Optimization",
                    us: true,
                    them: false,
                    manual: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-6 px-4 font-bold text-white">
                      {row.name}
                    </td>
                    <td className="py-6 px-4 bg-blue-900/5 border-x border-blue-500/10">
                      {row.us === true ? (
                        <Check className="w-6 h-6 text-blue-400" />
                      ) : (
                        <span className="text-blue-400 font-bold">
                          {row.us}
                        </span>
                      )}
                    </td>
                    <td className="py-6 px-4 opacity-50">
                      {row.them === true ? (
                        <Check className="w-5 h-5 text-gray-400" />
                      ) : row.them === false ? (
                        <div className="w-5 h-px bg-gray-600" />
                      ) : (
                        <span>{row.them}</span>
                      )}
                    </td>
                    <td className="py-6 px-4 opacity-50">
                      {row.manual === true ? (
                        <Check className="w-5 h-5 text-gray-400" />
                      ) : row.manual === false ? (
                        <div className="w-5 h-px bg-gray-600" />
                      ) : (
                        <span>{row.manual}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- TEMPLATE SHOWCASE --- */}
      <section id="templates" className="relative py-32 px-4 bg-black">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#050505] via-blue-900/5 to-[#050505]" />

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 px-8 gap-8">
            <div>
              <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                The Collection
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                CHOOSE YOUR
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
                  AESTHETIC
                </span>
              </h2>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-[24px] border border-white/10 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="hidden xl:flex group items-center gap-2 text-white font-bold tracking-widest uppercase text-sm hover:text-blue-400 transition-colors"
            >
              Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#0a0a0a] rounded-[24px] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500"
                >
                  {/* Thumbnail Area */}
                  <div className="relative aspect-4/3 bg-[#111] overflow-hidden">
                    {template.thumbnailUrl ? (
                      <img
                        src={template.thumbnailUrl}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${
                          idx % 2 === 0
                            ? "from-blue-900/20"
                            : "from-purple-900/20"
                        } to-transparent opacity-50`}
                      />
                    )}

                    {/* Mock UI Elements for Thumbnail (only if no image) */}
                    {!template.thumbnailUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity duration-500">
                        <Layout className="w-16 h-16 text-white" />
                      </div>
                    )}

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-gray-300 mb-6 text-sm top-0">
                        {template.description}
                      </p>
                      <div className="flex flex-col gap-3 w-full max-w-[200px]">
                        <Link
                          href={`/templates/preview/${template.id}`}
                          className="w-full px-6 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform text-center"
                        >
                          Live Preview
                        </Link>
                        <Link
                          href={`/dashboard?template=${template.id}`}
                          className="w-full px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
                        >
                          Use Template
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {template.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5">
                            {template.category}
                          </span>
                          {template.isPremium && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-linear-to-r from-yellow-500 to-orange-500 text-black">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {template.features.slice(0, 2).map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold"
                        >
                          <div className="w-1 h-1 bg-blue-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              Explore All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600">
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
          <Cpu className="w-16 h-16 text-white/20 mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            BUILD YOUR
            <br />
            LEGACY.
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 font-light">
            Join thousands of designers, developers, and creators who are
            defining the future of digital identity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              Start Building Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-10 py-5 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/50 transition-colors"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
