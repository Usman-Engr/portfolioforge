"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  TrendingUp,
  Users,
  Clock,
  Globe,
  ShieldCheck,
  Layers,
  Info,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface IntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioName: string;
}

const mockData = [
  { name: "Mon", views: 400, retention: 240 },
  { name: "Tue", views: 300, retention: 139 },
  { name: "Wed", views: 200, retention: 980 },
  { name: "Thu", views: 278, retention: 390 },
  { name: "Fri", views: 189, retention: 480 },
  { name: "Sat", views: 239, retention: 380 },
  { name: "Sun", views: 349, retention: 430 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function IntelligenceModal({
  isOpen,
  onClose,
  portfolioName,
}: IntelligenceModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-2xl p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-500 fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Prism Intelligence
                </h2>
                <p className="text-gray-500 text-sm font-medium italic">
                  Analyzing: {portfolioName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Traffic Chart */}
            <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Traffic Flux
                </h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-md">
                    +24% Growth
                  </span>
                </div>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient
                        id="colorViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#ffffff05"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#4b5563"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#4b5563"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#ffffff10",
                        borderRadius: "16px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Design Health Score */}
            <div className="bg-linear-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                  Design Health
                </h3>
                <div className="relative flex justify-center py-4">
                  <div className="text-center">
                    <span className="text-6xl font-black text-white">92</span>
                    <span className="text-purple-500 font-black text-xl">
                      .8
                    </span>
                    <p className="text-gray-500 text-[10px] uppercase font-bold mt-2 tracking-widest">
                      Studio Grade Score
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <ScoreItem label="SEO Optimization" score={85} />
                <ScoreItem label="Visual Balance" score={98} />
                <ScoreItem label="Load Speed" score={94} />
              </div>
            </div>

            {/* Geographic Reach */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-6">
                <Globe className="w-4 h-4 text-blue-400" />
                Global Pulse
              </h3>
              <div className="space-y-4">
                <ProgressItem
                  label="United States"
                  value={45}
                  color="bg-blue-500"
                />
                <ProgressItem label="Europe" value={32} color="bg-purple-500" />
                <ProgressItem label="Asia" value={18} color="bg-pink-500" />
                <ProgressItem label="Other" value={5} color="bg-gray-700" />
              </div>
            </div>

            {/* Retention Stats */}
            <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatMetric
                  icon={<Clock className="w-5 h-5 text-blue-400" />}
                  value="2m 45s"
                  label="Avg. Session"
                />
                <StatMetric
                  icon={<Users className="w-5 h-5 text-purple-400" />}
                  value="68%"
                  label="Return Rate"
                />
                <StatMetric
                  icon={<Layers className="w-5 h-5 text-pink-400" />}
                  value="4.2"
                  label="Pages / Visit"
                />
              </div>
            </div>
          </div>

          {/* AI Suggestion Bar */}
          <div className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs text-blue-100 font-medium">
              <span className="font-black">Prism Insight:</span> Your traffic
              peaked on Wednesday. We recommend updating your "Projects" section
              to maintain this engagement level.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            className="h-full bg-purple-500"
          />
        </div>
        <span className="text-[10px] font-black text-white">{score}%</span>
      </div>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-bold">
        <span className="text-gray-400 uppercase tracking-tight">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

function StatMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
        {icon}
      </div>
      <div>
        <div className="text-sm font-black text-white uppercase tracking-widest">
          {label}
        </div>
        <div className="text-2xl font-black text-gray-500 mt-1">{value}</div>
      </div>
    </div>
  );
}
