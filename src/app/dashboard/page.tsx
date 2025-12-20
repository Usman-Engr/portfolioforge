"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Loader2,
  Zap,
  Layout,
  Globe,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface Portfolio {
  id: string;
  slug: string;
  template_id: string;
  is_published: boolean;
  view_count: number;
  data: any;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<Portfolio | null>(
    null
  );
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/dashboard");
      return;
    }

    if (status === "authenticated") {
      loadPortfolios();
    }
  }, [status, router]);

  const loadPortfolios = async () => {
    try {
      const response = await fetch("/api/portfolios");
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (portfolio: Portfolio) => {
    setPortfolioToDelete(portfolio);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!portfolioToDelete) return;

    setDeletingId(portfolioToDelete.id);
    try {
      const response = await fetch(`/api/portfolios/${portfolioToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPortfolios(portfolios.filter((p) => p.id !== portfolioToDelete.id));
        setShowDeleteModal(false);
        setPortfolioToDelete(null);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (portfolio: Portfolio) => {
    setPublishingId(portfolio.id);
    try {
      const response = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: portfolio.slug,
          data: portfolio.data,
          templateId: portfolio.template_id,
          isPublished: !portfolio.is_published,
        }),
      });

      if (response.ok) {
        await loadPortfolios();
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
    } finally {
      setPublishingId(null);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-medium animate-pulse">
            Entering the Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-500 font-medium">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-sm uppercase tracking-wider">
                Workspace Dashboard
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {session?.user?.name || "Creator"}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              {portfolios.length > 0
                ? `You have ${portfolios.length} active projects in your studio.`
                : "Ready to build something amazing today?"}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/templates")}
            className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus className="w-5 h-5" />
            Create New Project
          </motion.button>
        </motion.div>

        {/* Quick Stats Grid */}
        {portfolios.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard
              label="Total Views"
              value={portfolios.reduce(
                (sum, p) => sum + (p.view_count || 0),
                0
              )}
              icon={<Eye className="w-5 h-5 text-blue-400" />}
              trend="+12%"
              color="blue"
            />
            <StatCard
              label="Active Sites"
              value={portfolios.filter((p) => p.is_published).length}
              icon={<Globe className="w-5 h-5 text-green-400" />}
              trend="Live"
              color="green"
            />
            <StatCard
              label="Studio Projects"
              value={portfolios.length}
              icon={<Layout className="w-5 h-5 text-purple-400" />}
              trend="Growth"
              color="purple"
            />
          </div>
        )}

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {portfolios.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-12 text-center"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]" />
              </div>

              <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
                <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Layout className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your Creative Journey Begins Here
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  PortfolioForge helps you craft professional sites in minutes.
                  Choose a template and start your world-class presence today.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push("/templates")}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Explore Templates
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  index={index}
                  portfolio={portfolio}
                  onEdit={() => router.push(`/builder-new?id=${portfolio.id}`)}
                  onDelete={() => handleDelete(portfolio)}
                  onTogglePublish={() => handleTogglePublish(portfolio)}
                  onCopyLink={() => copyLink(portfolio.slug)}
                  isDeleting={deletingId === portfolio.id}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPortfolioToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Archiving Project"
        message={`Are you sure you want to remove "${
          portfolioToDelete?.data?.personal?.name || "this project"
        }" from your studio? This action cannot be reversed.`}
        confirmText="Archive Project"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={deletingId !== null}
      />

      <LoadingOverlay
        isVisible={publishingId !== null}
        message="Syncing with cloud..."
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  trend,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-transparent border-blue-500/20",
    green: "from-green-500/10 to-transparent border-green-500/20",
    purple: "from-purple-500/10 to-transparent border-purple-500/20",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-6 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-900 rounded-lg border border-gray-800">
          {icon}
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            color === "green"
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-4xl font-black mt-1">{value}</p>
      </div>
    </div>
  );
}

function PortfolioCard({
  portfolio,
  index,
  onEdit,
  onDelete,
  onTogglePublish,
  onCopyLink,
  isDeleting,
}: {
  portfolio: Portfolio;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
  onCopyLink: () => void;
  isDeleting: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-[#121212] border border-gray-800 rounded-[32px] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
    >
      {/* Project Preview Area */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
        />

        {/* Visual Representation */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center gap-4 group-hover:border-blue-500/30 transition-colors">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Layout className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
              {portfolio.template_id} Template
            </p>
          </div>
        </div>

        {/* Top Badge */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
              portfolio.is_published
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
            }`}
          >
            {portfolio.is_published ? "Live" : "Draft"}
          </div>
        </div>

        {/* Preview Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={onEdit}
            className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl"
          >
            <Edit className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold truncate group-hover:text-blue-400 transition-colors">
              {portfolio.data?.personal?.name || "Untitled Concept"}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">/{portfolio.slug}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-black text-white">
              {portfolio.view_count || 0}
            </span>
            <span className="text-[10px] uppercase tracking-tighter text-gray-600 font-bold">
              Impressions
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl text-sm font-bold transition-all border border-gray-700"
          >
            <Settings className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onTogglePublish}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${
              portfolio.is_published
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            {portfolio.is_published ? "Offline" : "Publish"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-red-500 transition-colors p-2"
            title="Delete Portfolio"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {portfolio.is_published && (
            <button
              onClick={onCopyLink}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              Copy Live Link
              <Copy className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
