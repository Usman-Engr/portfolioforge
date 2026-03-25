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
  Briefcase,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Info,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
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
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingResumeId, setDeletingResumeId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDeleteResume = async (resume: Resume) => {
    setResumeToDelete(resume);
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
          toast.success("Website deleted successfully.");
        } else {
          toast.error("Failed to delete website.");
        }
      } catch (error) {
        toast.error("A system error occurred.");
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
        toast.error("A system error occurred.");
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
            ? "Website taken offline."
            : "Website published live!",
          {
            description: portfolio.is_published
              ? "Only you can see it now."
              : "It's now live on the internet!",
          },
        );
      } else {
        toast.error("Failed to update website status.");
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      toast.error("Network error.");
    } finally {
      setPublishingId(null);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied!", {
      description: "Share your website with others.",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-medium animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Section */}
      <div className="border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400 font-medium">
                  Welcome to your workspace
                </span>
              </div>
              <h1 className="text-4xl font-bold">
                {greeting},{" "}
                <span className="text-blue-400">{session?.user?.name || "Creator"}</span>
              </h1>
              <p className="text-gray-400 max-w-xl">
                Create and manage your professional websites and resumes in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Quick Start Guide for New Users */}
        {(portfolios.length === 0 && resumes.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Getting Started</h3>
                <p className="text-gray-400 mb-4">
                  Welcome! Let's create your first project. Choose what you'd like to build:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => router.push("/templates")}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all hover:scale-[1.02]"
                  >
                    <Briefcase className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-bold mb-1">Create a Website</h4>
                    <p className="text-sm text-gray-400">
                      Build a stunning online portfolio to showcase your work
                    </p>
                  </button>
                  <button
                    onClick={() => router.push("/resume-builder")}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all hover:scale-[1.02]"
                  >
                    <FileText className="w-8 h-8 text-purple-400 mb-3" />
                    <h4 className="font-bold mb-1">Create a Resume</h4>
                    <p className="text-sm text-gray-400">
                      Make a professional PDF resume for job applications
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ────── WEBSITES & PORTFOLIOS SECTION ────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Websites & Portfolios</h2>
                <p className="text-sm text-gray-400">
                  Your online presence - Share your work with the world
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/templates")}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Create New Website
            </button>
          </div>

          {portfolios.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No websites yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Create your first website to showcase your work online. Choose from beautiful templates.
              </p>
              <button
                onClick={() => router.push("/templates")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Your First Website
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  onEdit={() => router.push(`/builder?id=${portfolio.id}`)}
                  onPreview={() => router.push(`/portfolio/${portfolio.id}/preview`)}
                  onDelete={() => handleDelete(portfolio)}
                  onTogglePublish={() => handleTogglePublish(portfolio)}
                  onCopyLink={() => copyLink(portfolio.slug)}
                  isPublishing={publishingId === portfolio.id}
                  isDeleting={deletingId === portfolio.id}
                />
              ))}
            </div>
          )}
        </section>

        {/* ────── PDF RESUMES SECTION ────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">PDF Resumes</h2>
                <p className="text-sm text-gray-400">
                  Professional resumes - Download and share for job applications
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/resume-builder")}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Create New Resume
            </button>
          </div>

          {resumes.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No resumes yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Create a professional PDF resume for job applications. Choose from clean, professional templates.
              </p>
              <button
                onClick={() => router.push("/resume-builder")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Your First Resume
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onEdit={() => router.push(`/resume-builder?id=${resume.id}`)}
                  onDelete={() => handleDeleteResume(resume)}
                  isDeleting={deletingResumeId === resume.id}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={portfolioToDelete ? "Delete Website?" : "Delete Resume?"}
        message="This action cannot be undone."
      />

      {loading && <LoadingOverlay />}
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({
  portfolio,
  onEdit,
  onPreview,
  onDelete,
  onTogglePublish,
  onCopyLink,
  isPublishing,
  isDeleting,
}: {
  portfolio: Portfolio;
  onEdit: () => void;
  onPreview: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
  onCopyLink: () => void;
  isPublishing: boolean;
  isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {portfolio.data?.personal?.name || "Untitled Website"}
            </h3>
            <p className="text-sm text-gray-400">
              {portfolio.data?.personal?.title || "Your portfolio"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {portfolio.is_published ? (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                <CheckCircle className="w-3 h-3" />
                Live
              </span>
            ) : (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                Draft
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{portfolio.view_count || 0} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span className="truncate max-w-25">
              {portfolio.slug}.portfolioforge.com
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onPreview}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          {portfolio.is_published && (
            <button
              onClick={onCopyLink}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              title="Copy link"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onTogglePublish}
            disabled={isPublishing || isDeleting}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50"
            title={portfolio.is_published ? "Take offline" : "Publish"}
          >
            {isPublishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : portfolio.is_published ? (
              <Globe className="w-3.5 h-3.5" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
            title="Delete"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Resume Card Component
function ResumeCard({
  resume,
  onEdit,
  onDelete,
  isDeleting,
}: {
  resume: Resume;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{resume.title}</h3>
            <p className="text-sm text-gray-400">
              {resume.data?.personal?.name || "Your resume"}
            </p>
          </div>
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>PDF Resume</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
            title="Delete"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Stat Card Component (not used but kept for reference)
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
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs text-gray-400">{trend}</span>
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
