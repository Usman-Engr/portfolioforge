"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  Loader2,
  Rocket,
  Palette,
  User,
  Briefcase,
  Wrench,
  Layers,
  GraduationCap,
  Phone,
  Share2,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Settings,
  ChevronLeft,
  X,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PortfolioData } from "@/lib/types/portfolio";
import { templates, getTemplateById } from "@/lib/templates";
import { isValidTemplateId } from "@/lib/utils/template-renderer";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import ContactInfoForm from "@/components/builder/ContactInfoForm";
import SocialLinksForm from "@/components/builder/SocialLinksForm";
import SkillsForm from "@/components/builder/SkillsForm";
import ProjectsForm from "@/components/builder/ProjectsForm";
import ExperienceForm from "@/components/builder/ExperienceForm";
import EducationForm from "@/components/builder/EducationForm";
import PublishModal from "@/components/builder/PublishModal";
import TemplateSelector from "@/components/templates/TemplateSelector";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { useAutoSave } from "@/hooks/useAutoSave";
import IFramePreview from "@/components/templates/IFramePreview";

type BuilderSection =
  | "personal"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact"
  | "social";

import { Suspense } from "react";
import { toast } from "sonner";

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personal: { name: "", title: "", location: "", bio: "", avatarUrl: "" },
    contact: { email: "" },
    social: {},
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });

  const [activeSection, setActiveSection] =
    useState<BuilderSection>("personal");
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | undefined>();
  const [portfolioId, setPortfolioId] = useState<string | undefined>();
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>("minimal-pro");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Derived save status
  const saveStatus = lastSaved ? "saved" : "unsaved";

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Handle template selection from URL params
  useEffect(() => {
    const templateParam = searchParams.get("template");
    if (templateParam && isValidTemplateId(templateParam)) {
      setSelectedTemplateId(templateParam);
    }
  }, [searchParams]);

  // Load existing portfolio if editing
  useEffect(() => {
    const loadPortfolio = async () => {
      const id = searchParams.get("id");
      if (!id || !session) return;

      try {
        const response = await fetch(`/api/portfolios/${id}`);
        if (response.ok) {
          const portfolio = await response.json();
          setPortfolioId(portfolio.id);
          setCurrentSlug(portfolio.slug);
          setSelectedTemplateId(portfolio.template_id || "minimal-pro");

          const data =
            typeof portfolio.data === "string"
              ? JSON.parse(portfolio.data)
              : portfolio.data;
          setPortfolioData(data);
        }
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      }
    };

    if (status === "authenticated") {
      loadPortfolio();
    }
  }, [searchParams, session, status]);

  const handleSaveChanges = async () => {
    if (!session) {
      toast.error("You must be logged in to save changes");
      return;
    }

    setIsSaving(true);
    try {
      const method = portfolioId ? "PUT" : "POST";
      const url = portfolioId
        ? `/api/portfolios/${portfolioId}`
        : "/api/portfolios";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: currentSlug || "draft",
          data: portfolioData,
          templateId: selectedTemplateId,
          isPublished: portfolioId ? undefined : false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to save" }));
        throw new Error(errorData.error || "Failed to save changes");
      }

      const saved = await response.json();
      if (!portfolioId) setPortfolioId(saved.id);

      setLastSaved(new Date());
      toast.success("Changes saved successfully!", {
        description: "Your portfolio has been updated.",
      });
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = useCallback(async () => {
    // This is for auto-save - silent save without alert
    if (!session) return;

    try {
      const method = portfolioId ? "PUT" : "POST";
      const url = portfolioId
        ? `/api/portfolios/${portfolioId}`
        : "/api/portfolios";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: currentSlug || "draft",
          data: portfolioData,
          templateId: selectedTemplateId,
          isPublished: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const saved = await response.json();
      if (!portfolioId) setPortfolioId(saved.id);
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save error:", error);
      throw error;
    }
  }, [session, portfolioData, portfolioId, currentSlug, selectedTemplateId]);

  const handlePublish = async (slug: string) => {
    if (!session) return;
    try {
      const method = portfolioId ? "PUT" : "POST";
      const url = portfolioId
        ? `/api/portfolios/${portfolioId}`
        : "/api/portfolios";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          data: portfolioData,
          templateId: selectedTemplateId,
          isPublished: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to publish");
      }

      const published = await response.json();
      setPortfolioId(published.id);
      setCurrentSlug(slug);
      router.push(`/dashboard`);
    } catch (error: any) {
      throw new Error(error.message || "Failed to publish portfolio");
    }
  };

  const sections = [
    { id: "personal", label: "Identity", icon: User },
    { id: "experience", label: "History", icon: Briefcase },
    { id: "skills", label: "Expertise", icon: Wrench },
    { id: "projects", label: "Work", icon: Layers },
    { id: "education", label: "Academics", icon: GraduationCap },
    { id: "contact", label: "Reach", icon: Phone },
    { id: "social", label: "Connect", icon: Share2 },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Top Bar - Premium Studio Header */}
      <header className="h-20 border-b border-white/5 bg-black/60 backdrop-blur-2xl px-10 flex items-center justify-between z-100">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="group">
            <div className="flex items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">
                Studio Workspace
              </span>
            </div>
          </Link>

          <div className="h-8 w-px bg-white/5" />

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
                {portfolioData.personal.name || "UNNAMED CREATION"}
              </h1>
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${
                  saveStatus === "saved"
                    ? "bg-green-500/10 border-green-500/20 text-green-500"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-500 animate-pulse"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    saveStatus === "saved" ? "bg-green-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  {saveStatus === "saved" ? "In Sync" : "Syncing"}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
              {selectedTemplateId.replace(/-/g, " ")} base
            </p>
          </div>
        </div>

        {/* Device Sync Controls */}
        <div className="hidden lg:flex items-center gap-2 px-1.5 py-1.5 bg-white/5 rounded-2xl border border-white/5">
          <PreviewDeviceIcon
            active={previewDevice === "desktop"}
            onClick={() => setPreviewDevice("desktop")}
            icon={<Monitor className="w-4 h-4" />}
          />
          <PreviewDeviceIcon
            active={previewDevice === "tablet"}
            onClick={() => setPreviewDevice("tablet")}
            icon={<Tablet className="w-4 h-4" />}
          />
          <PreviewDeviceIcon
            active={previewDevice === "mobile"}
            onClick={() => setPreviewDevice("mobile")}
            icon={<Smartphone className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Save Status Indicator - Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
            <div className={`w-2 h-2 rounded-full ${
              saveStatus === "saved" || lastSaved
                ? "bg-green-500"
                : "bg-amber-500 animate-pulse"
            }`} />
            <span className="text-xs font-medium text-gray-300 hidden xl:inline">
              {saveStatus === "saved" || lastSaved
                ? `Saved ${lastSaved ? `at ${lastSaved.toLocaleTimeString()}` : ""}`
                : "Saving..."}
            </span>
          </div>

          {/* Mobile Save Status */}
          <div className="flex lg:hidden items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${
              saveStatus === "saved" || lastSaved
                ? "bg-green-500"
                : "bg-amber-500 animate-pulse"
            }`} />
          </div>

          <button
            onClick={() => setShowTemplateSelector(true)}
            className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            <Palette className="w-4 h-4" />
            <span>Switch Base</span>
          </button>

          <div className="hidden md:block h-8 w-px bg-white/10" />

          {/* Save Changes Button - Desktop */}
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="hidden md:flex group relative items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin relative z-10" />
                <span className="relative z-10 text-xs">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10 text-xs">Save Changes</span>
              </>
            )}
          </button>

          {/* Deploy Site Button - Desktop - Only for NEW portfolios */}
          {!portfolioId && (
            <button
              onClick={() => setShowPublishModal(true)}
              className="hidden md:flex group relative items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/25 overflow-hidden"
            >
              <Rocket className="w-3.5 h-3.5 fill-current relative z-10" />
              <span className="relative z-10 text-xs">Deploy Site</span>
            </button>
          )}

          {/* Mobile Deploy Button - Only for NEW portfolios */}
          {!portfolioId && (
            <button
              onClick={() => setShowPublishModal(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-black shadow-lg"
            >
              <Rocket className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Save Button */}
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <nav className="w-24 border-r border-white/5 bg-[#0a0a0a] flex flex-col items-center py-10 gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as BuilderSection)}
              className={`relative group p-4 rounded-[20px] transition-all duration-500 ${
                activeSection === section.id
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-110"
                  : "text-gray-500 hover:text-gray-100"
              }`}
            >
              <section.icon className="w-6 h-6" />
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[60] shadow-2xl">
                {section.label}
              </div>
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              )}
            </button>
          ))}
          <div className="mt-auto pt-8 border-t border-white/5 w-full flex justify-center">
            <button className="p-4 text-gray-600 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Form Editor Panel */}
        <aside className="w-[450px] border-r border-white/5 bg-[#050505] overflow-y-auto custom-scrollbar">
          <div className="p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                {sections.find((s) => s.id === activeSection)?.label}
              </h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
                Studio Configuration / {activeSection}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === "personal" && (
                  <PersonalInfoForm
                    data={portfolioData.personal}
                    onChange={(personal) =>
                      setPortfolioData({ ...portfolioData, personal })
                    }
                  />
                )}

                {activeSection === "contact" && (
                  <ContactInfoForm
                    data={portfolioData.contact}
                    onChange={(contact) =>
                      setPortfolioData({ ...portfolioData, contact })
                    }
                  />
                )}

                {activeSection === "social" && (
                  <SocialLinksForm
                    data={portfolioData.social}
                    onChange={(social) =>
                      setPortfolioData({ ...portfolioData, social })
                    }
                  />
                )}

                {activeSection === "skills" && (
                  <SkillsForm
                    data={portfolioData.skills}
                    onChange={(skills) =>
                      setPortfolioData({ ...portfolioData, skills })
                    }
                  />
                )}

                {activeSection === "projects" && (
                  <ProjectsForm
                    data={portfolioData.projects}
                    onChange={(projects) =>
                      setPortfolioData({ ...portfolioData, projects })
                    }
                  />
                )}

                {activeSection === "experience" && (
                  <ExperienceForm
                    data={portfolioData.experience}
                    onChange={(experience) =>
                      setPortfolioData({ ...portfolioData, experience })
                    }
                  />
                )}

                {activeSection === "education" && (
                  <EducationForm
                    data={portfolioData.education}
                    onChange={(education) =>
                      setPortfolioData({ ...portfolioData, education })
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* Live Preview Display */}
        <section className="flex-1 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-full h-full flex items-center justify-center">
            <motion.div
              layout
              className={`
                                shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                                ${
                                  previewDevice === "mobile"
                                    ? "preview-mobile"
                                    : ""
                                }
                                ${
                                  previewDevice === "tablet"
                                    ? "preview-tablet"
                                    : ""
                                }
                                ${
                                  previewDevice === "desktop"
                                    ? "w-full h-full rounded-2xl"
                                    : ""
                                }
                            `}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <IFramePreview>
                  {renderTemplate(selectedTemplateId, portfolioData)}
                </IFramePreview>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <TemplateSelectorModal
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        portfolioData={portfolioData}
      />

      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublish}
        currentSlug={currentSlug}
        portfolioName={portfolioData.personal.name}
      />
    </div>
  );
}

export default function ModernBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-slate-400 font-medium">Entering Studio...</p>
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}

function PreviewDeviceIcon({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 px-3 rounded-xl transition-all ${
        active
          ? "bg-white text-black shadow-lg"
          : "text-gray-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
    </button>
  );
}

// Sub-component for Template Selector Modal to keep main clean
function TemplateSelectorModal({
  isOpen,
  onClose,
  selectedTemplateId,
  setSelectedTemplateId,
  portfolioData,
}: any) {
  const router = useRouter();

  if (!isOpen) return null;

  const handlePreview = (template: any) => {
    // Save current portfolio data to sessionStorage
    sessionStorage.setItem("builderPreviewData", JSON.stringify(portfolioData));
    // Navigate to preview page with template ID
    router.push(`/preview/template?templateId=${template.id}`);
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/95 backdrop-blur-2xl px-4 py-8 animate-fade-in text-white selection:bg-blue-500/30">
      <div className="bg-[#0a0a0a] rounded-[40px] shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10">
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              Refine Your Style
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">
              Studio Base Selection / V1.0
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-10 bg-[#050505]">
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onSelect={(templateId) => {
              setSelectedTemplateId(templateId);
              onClose();
            }}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </div>
  );
}
