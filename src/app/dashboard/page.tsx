"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Copy,
  Loader2,
  Globe,
  Sparkles,
  Download,
  FileText,
  Briefcase,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
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
  const [downloadingResumeId, setDownloadingResumeId] = useState<string | null>(null);

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
      description: "Share your website with this link.",
    });
  };

  const downloadResumePDF = async (resume: Resume) => {
    setDownloadingResumeId(resume.id);
    try {
      const response = await fetch(`/api/resumes/${resume.id}/pdf`, {
        method: "POST",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${resume.title.replace(/\s+/g, "-")}-resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Resume downloaded!", {
          description: "Your PDF is ready to share.",
        });
      } else {
        toast.error("Failed to download resume.");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume.");
    } finally {
      setDownloadingResumeId(null);
    }
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
        {/* Analytics Stats Cards */}
        {portfolios.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <StatCard
              label="Total Views"
              value={portfolios.reduce(
                (sum, p) => sum + (p.view_count || 0),
                0,
              )}
              icon={<Eye className="w-5 h-5 text-blue-400" />}
              trend="All time"
              color="blue"
            />
            <StatCard
              label="Live Websites"
              value={portfolios.filter((p) => p.is_published).length}
              icon={<Globe className="w-5 h-5 text-green-400" />}
              trend="Published"
              color="green"
            />
            <StatCard
              label="Total Projects"
              value={portfolios.length + resumes.length}
              icon={<Briefcase className="w-5 h-5 text-purple-400" />}
              trend="Created"
              color="purple"
            />
          </div>
        )}

        {/* ────── WEBSITES & PORTFOLIOS SECTION ────── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all hover:scale-105 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Website</span>
            </button>
          </div>

          {portfolios.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No websites yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
                Create your first website to showcase your work online. Choose from beautiful templates.
              </p>
              <button
                onClick={() => router.push("/templates")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all hover:scale-105 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Resume</span>
            </button>
          </div>

          {resumes.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No resumes yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
                Create a professional PDF resume for job applications. Choose from clean, professional templates.
              </p>
              <button
                onClick={() => router.push("/resume-builder")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onEdit={() => router.push(`/resume-builder?id=${resume.id}`)}
                  onDownload={() => downloadResumePDF(resume)}
                  onDelete={() => handleDeleteResume(resume)}
                  isDeleting={deletingResumeId === resume.id}
                  isDownloading={downloadingResumeId === resume.id}
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

// Portfolio Card Component - Fully Responsive
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
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg mb-1 truncate">
              {portfolio.data?.personal?.name || "Untitled Website"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {portfolio.data?.personal?.title || "Your portfolio"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {portfolio.is_published ? (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-[10px] sm:text-xs rounded-full whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                <span>Live</span>
              </span>
            ) : (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-[10px] sm:text-xs rounded-full whitespace-nowrap">
                Draft
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{portfolio.view_count || 0} views</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="truncate max-w-[80px] sm:max-w-25">
              {portfolio.slug}.pf.com
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <button
            onClick={onEdit}
            disabled={isDeleting}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] sm:text-xs font-medium transition-all disabled:opacity-50"
          >
            <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={onPreview}
            disabled={isDeleting}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] sm:text-xs font-medium transition-all disabled:opacity-50"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Preview</span>
          </button>

          {/* Desktop secondary actions */}
          <div className="hidden sm:flex gap-2">
            {portfolio.is_published && (
              <button
                onClick={onCopyLink}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all group relative"
                title="Copy website link to share"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            )}
            <button
              onClick={onTogglePublish}
              disabled={isPublishing || isDeleting}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50"
              title={portfolio.is_published ? "Take offline" : "Publish to internet"}
            >
              {isPublishing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : portfolio.is_published ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              <span>{portfolio.is_published ? "Offline" : "Publish"}</span>
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
              title="Delete website permanently"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Mobile secondary actions - stacked */}
          <div className="flex sm:hidden gap-2 col-span-2">
            {portfolio.is_published && (
              <button
                onClick={onCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-medium transition-all"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Link</span>
              </button>
            )}
            <button
              onClick={onTogglePublish}
              disabled={isPublishing || isDeleting}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-medium transition-all disabled:opacity-50"
            >
              {isPublishing ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : portfolio.is_published ? (
                <Lock className="w-3 h-3" />
              ) : (
                <Globe className="w-3 h-3" />
              )}
              <span>{portfolio.is_published ? "Hide" : "Show"}</span>
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
              title="Delete"
            >
              {isDeleting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>

        {/* Help text for mobile */}
        <div className="mt-3 pt-3 border-t border-white/5 sm:hidden">
          <p className="text-[9px] text-gray-500 text-center">
            💡 Tip: Share your website by copying the link
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Resume Card Component - Fully Responsive with Download
function ResumeCard({
  resume,
  onEdit,
  onDownload,
  onDelete,
  isDeleting,
  isDownloading,
}: {
  resume: Resume;
  onEdit: () => void;
  onDownload: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isDownloading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg mb-1 truncate">
              {resume.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {resume.data?.personal?.name || "Your resume"}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          </div>
        </div>

        {/* Info Badge */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 mb-4">
          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>PDF Resume • Ready to download</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <button
            onClick={onEdit}
            disabled={isDeleting || isDownloading}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] sm:text-xs font-medium transition-all disabled:opacity-50"
          >
            <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={onDownload}
            disabled={isDeleting || isDownloading}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[10px] sm:text-xs font-medium transition-all disabled:opacity-50"
            title="Download as PDF file"
          >
            {isDownloading ? (
              <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
            ) : (
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
            <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
          </button>

          {/* Desktop delete button */}
          <button
            onClick={onDelete}
            disabled={isDeleting || isDownloading}
            className="hidden sm:block p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50 ml-auto"
            title="Delete resume permanently"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Mobile delete button */}
          <button
            onClick={onDelete}
            disabled={isDeleting || isDownloading}
            className="sm:hidden p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50 justify-center"
            title="Delete"
          >
            {isDeleting ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Help text for mobile */}
        <div className="mt-3 pt-3 border-t border-white/5 sm:hidden">
          <p className="text-[9px] text-gray-500 text-center">
            💡 Tip: Download PDF to use in job applications
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Stat Card Component
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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400">{trend}</span>
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold mb-1">{value}</h3>
      <p className="text-xs sm:text-sm text-gray-400">{label}</p>
    </div>
  );
}
