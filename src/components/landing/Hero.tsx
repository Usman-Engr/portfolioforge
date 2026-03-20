"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  Play,
  Layout,
  Star,
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-16">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-10 shadow-2xl">
              <Sparkles className="w-4 h-4 text-blue-400 fill-current" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                The Future of Personal Branding
              </span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-9xl font-black mb-7 tracking-tighter text-white leading-[0.9]">
              DESIGN FOR <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
                DISTINCTION.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto font-medium leading-relaxed">
              Stop using generic builders. Experience the first cinematic
              portfolio engine designed for creators who demand high-fidelity
              results in minutes.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-gray-200 font-black text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Launch Your Studio
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-2xl border-white/10 text-white hover:bg-white/5 font-black text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <Play className="w-4 h-4 fill-current ml-1" />
                  Browse Gallery
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Impact Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto"
          >
            <Metric item="10k+" sub="Active Creators" />
            <Metric item="0.2s" sub="Load Speeds" />
            <Metric item="24/7" sub="AI Support" />
            <Metric item="4K" sub="Image Quality" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Metric = ({ item, sub }: { item: string; sub: string }) => (
  <div className="text-center group">
    <div className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
      {item}
    </div>
    <div className="text-[10px] uppercase font-black tracking-widest text-gray-600 mt-1">
      {sub}
    </div>
  </div>
);
