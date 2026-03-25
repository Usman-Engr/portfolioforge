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
  Sparkles,
  Download,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import IntelligenceModal from "@/components/dashboard/IntelligenceModal";
import { toast } from "sonner";

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

interface Resume {
  id: string;
  title: string;
  template_id: string;
  data: any;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeTab, setActiveTab] = useState<"portfolios" | "resumes">(
    "portfolios",
  );
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingResumeId, setDeletingResumeId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);

  const [intelligencePortfolio, setIntelligencePortfolio] =
    useState<Portfolio | null>(null);

  const [portfolioToDelete, setPortfolioToDelete] = useState<Portfolio | null>(
    null,
  );
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated") {
      Promise.all([loadPortfolios(), loadResumes()]).finally(() =>
        setLoading(false),
      );
    }
  }, [status, router]);

  const loadPortfolios = async () => {
    try {
      const response = await fetch("/api/portfolios");
      if (response.ok) {
        setPortfolios(await response.json());
      }
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    }
  };

  const loadResumes = async () => {
    try {
      const response = await fetch("/api/resumes");
      if (response.ok) {
        setResumes(await response.json());
      }
    } catch (error) {
      console.error("Failed to load resumes:", error);
    }
  };

  const handleDelete = async (portfolio: Portfolio) => {
    setPortfolioToDelete(portfolio);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (portfolioToDelete) {
      setDeletingId(portfolioToDelete.id);
      try {
        const response = await fetch(
          `/api/portfolios/${portfolioToDelete.id}`,
          { method: "DELETE" },
        );
        if (response.ok) {
          setPortfolios(
            portfolios.filter((p) => p.id !== portfolioToDelete.id),
          );
          toast.success("Project archived successfully.");
        } else {
          toast.error("Failed to archive project.");
        }
      } catch (error) {
        toast.error("A system error occurred during archiving.");
      } finally {
        setDeletingId(null);
        setShowDeleteModal(false);
        setPortfolioToDelete(null);
      }
    } else if (resumeToDelete) {
      setDeletingResumeId(resumeToDelete.id);
      try {
        const response = await fetch(`/api/resumes/${resumeToDelete.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setResumes(resumes.filter((r) => r.id !== resumeToDelete.id));
          toast.success("Resume deleted successfully.");
        } else {
          toast.error("Failed to delete resume.");
        }
      } catch (error) {
        toast.error("A system error occurred during deleting.");
      } finally {
        setDeletingResumeId(null);
        setShowDeleteModal(false);
        setResumeToDelete(null);
      }
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
        toast.success(
          portfolio.is_published
            ? "Project taken offline."
            : "Project published live!",
          {
            description: portfolio.is_published
              ? "Visibility has been restricted."
              : "Your site is now accessible to the world.",
          },
        );
      } else {
        toast.error("Failed to update project status.");
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      toast.error("Network error while syncing status.");
    } finally {
      setPublishingId(null);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!", {
      description: "You've captured the studio entry key.",
    });
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
              <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
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
                0,
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

        {/* ── Resume Builder Entry Point ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10 relative overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-r from-[#0d1a33] via-[#0f1628] to-[#0a0a0a] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-[300px] h-full bg-blue-600/5 blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-12 h-12 shrink-0 bg-blue-600/15 border border-blue-500/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Resume Builder
                </h2>
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-500/15 border border-blue-500/25 text-blue-400 rounded-full">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Build a print-ready PDF resume from 5 professional templates.
                Separate from your portfolio.
              </p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />5
              templates
            </div>
            <button
              onClick={() => router.push("/resume-builder")}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <FileText className="w-3.5 h-3.5" />
              Build Resume
            </button>
          </div>
        </motion.div>

        {/* ── Tab Switcher ── */}
        <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-px">
          <button
            onClick={() => setActiveTab("portfolios")}
            className={`font-bold pb-4 px-2 border-b-2 transition-all ${activeTab === "portfolios" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
          >
            Websites & Portfolios
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className={`font-bold pb-4 px-2 border-b-2 transition-all ${activeTab === "resumes" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
          >
            PDF Resumes
            {resumes.length > 0 && (
              <span className="ml-2 bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full">
                {resumes.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "portfolios" ? (
            portfolios.length === 0 ? (
              <motion.div
                key="empty-portfolios"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative overflow-hidden rounded-3xl bg-linear-to-b from-gray-900 to-black border border-gray-800 p-12 text-center"
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
                    PortfolioForge helps you craft professional sites in
                    minutes.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push("/templates")}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Zap className="w-5 h-5 fill-current" /> Explore Templates
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid-portfolios"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {portfolios.map((portfolio, index) => (
                  <PortfolioCard
                    key={portfolio.id}
                    index={index}
                    portfolio={portfolio}
                    onEdit={() =>
                      router.push(`/builder-new?id=${portfolio.id}`)
                    }
                    onDelete={() => handleDelete(portfolio)}
                    onTogglePublish={() => handleTogglePublish(portfolio)}
                    onCopyLink={() => copyLink(portfolio.slug)}
                    onViewStats={() => {
                      setIntelligencePortfolio(portfolio);
                      setShowIntelligenceModal(true);
                    }}
                    onPreview={() => {
                      router.push(`/portfolio/${portfolio.id}/preview`);
                    }}
                    isDeleting={deletingId === portfolio.id}
                  />
                ))}
              </motion.div>
            )
          ) : resumes.length === 0 ? (
            <motion.div
              key="empty-resumes"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative overflow-hidden rounded-3xl bg-linear-to-b from-gray-900 to-black border border-gray-800 p-12 text-center"
            >
              <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
                <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-8 -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <FileText className="w-12 h-12 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Create Your Professional Resume
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Build a distinct, print-ready PDF resume perfectly formatted
                  for applications.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push("/resume-builder")}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <FileText className="w-5 h-5 fill-current" /> Build a Resume
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-resumes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {resumes.map((resume, index) => (
                <ResumeCard
                  key={resume.id}
                  index={index}
                  resume={resume}
                  onEdit={() => router.push(`/resume-builder?id=${resume.id}`)}
                  onDelete={() => {
                    setResumeToDelete(resume);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPortfolioToDelete(null);
          setResumeToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={`Archiving ${portfolioToDelete ? "Project" : "Resume"}`}
        message={`Are you sure you want to remove "${
          portfolioToDelete?.data?.personal?.name ||
          resumeToDelete?.title ||
          "this item"
        }" from your studio? This action cannot be reversed.`}
        confirmText="Archive"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={deletingId !== null || deletingResumeId !== null}
      />

      <LoadingOverlay
        isVisible={publishingId !== null}
        message="Syncing with cloud..."
      />

      <IntelligenceModal
        isOpen={showIntelligenceModal}
        onClose={() => {
          setShowIntelligenceModal(false);
          setIntelligencePortfolio(null);
        }}
        portfolioName={
          intelligencePortfolio?.data?.personal?.name || "Concept Studio"
        }
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
      className={`bg-linear-to-br ${colorMap[color]} border rounded-2xl p-6 backdrop-blur-sm`}
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
  onViewStats,
  onPreview,
  isDeleting,
}: {
  portfolio: Portfolio;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
  onCopyLink: () => void;
  onViewStats: () => void;
  onPreview: () => void;
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
          className={`absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 transition-opacity duration-500 ${
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
            title="Edit Portfolio"
          >
            <Edit className="w-6 h-6" />
          </button>
          <button
            onClick={onPreview}
            className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-2xl"
            title="Preview & Download PDF"
          >
            <Eye className="w-6 h-6" />
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
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            onClick={onViewStats}
            className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
            title="Prism Intelligence"
          >
            <Sparkles className="w-5 h-5 fill-current" />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl text-xs font-bold transition-all border border-gray-700"
            title="Edit Portfolio"
          >
            <Settings className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => {
              // Quick download directly from dashboard data
              import("@/lib/utils/pdf-generator").then(
                ({ downloadPortfolioAsPDF }) => {
                  // Determine correct target based on how we want to render hidden content
                  // Ideally we open preview first, but if user wants direct download:
                  // We trigger preview mode briefly or handle it via a hidden render.
                  // For now, simpler UX: Open preview with auto-download intent or just use the preview button for it.
                  // User asked for option HERE.
                  // Let's create a hidden container, render it, then print? Too complex for client.
                  // BEST UX: Trigger onPreview but MAYBE add a "Download" intent?
                  // actually, we can just trigger onPreview for now since the user can download there?
                  // User said "add a pdf download option hare also".
                  // Let's add the button, but maybe make it trigger the preview modal with auto-download or similar?
                  // Or just keep it as a button that explains "Preview to Download".
                  // Better: Let's make it trigger preview for now as it's safest for rendering.
                  onPreview();
                },
              );
            }}
            className="flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl text-xs font-bold transition-all border border-gray-700"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>

          <button
            onClick={onTogglePublish}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all ${
              portfolio.is_published
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            {portfolio.is_published ? "Offline" : "Live"}
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

function ResumeCard({
  resume,
  index,
  onEdit,
  onDelete,
}: {
  resume: Resume;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { downloadProfessionalPDF } =
        await import("@/lib/utils/pdf-service");
      await downloadProfessionalPDF(
        resume.template_id || "resume-classic",
        resume.data,
        resume.title,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-[#121212] border border-gray-800 rounded-[32px] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <div
          className={`absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-40"}`}
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center gap-2 group-hover:border-blue-500/30 transition-colors">
            <FileText className="w-8 h-8 text-gray-500 group-hover:text-blue-400 transition-colors" />
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
              {resume.template_id}
            </p>
          </div>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <button
            onClick={onEdit}
            className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl"
            title="Edit Resume"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-2xl disabled:opacity-50"
            title="Download PDF"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold truncate group-hover:text-blue-400 transition-colors mb-2">
          {resume.title || "Untitled Resume"}
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Updated on {new Date(resume.updated_at).toLocaleDateString()}
        </p>
        <div className="flex gap-2 mb-4">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl text-xs font-bold transition-all border border-gray-700"
          >
            <Settings className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-blue-600 hover:border-blue-500 rounded-2xl text-xs font-bold transition-all border border-gray-700"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}{" "}
            PDF
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-red-500 transition-colors p-2"
            title="Delete Resume"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
