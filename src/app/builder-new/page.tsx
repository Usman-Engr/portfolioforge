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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import TemplatePreviewModal from "@/components/templates/TemplatePreviewModal";
import { renderTemplate } from "@/lib/utils/template-renderer";
import { useAutoSave } from "@/hooks/useAutoSave";

type BuilderSection =
  | "personal"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact"
  | "social";

export default function ModernBuilderPage() {
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
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [currentSlug, setCurrentSlug] = useState<string | undefined>();
  const [portfolioId, setPortfolioId] = useState<string | undefined>();
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>("minimal-pro");

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/builder-new");
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

  const handleSave = useCallback(async () => {
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
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    }
  }, [session, portfolioData, portfolioId, currentSlug, selectedTemplateId]);

  const { saveStatus, isOnline, markAsChanged, saveNow } = useAutoSave({
    onSave: handleSave,
    delay: 30000,
  });

  useEffect(() => {
    markAsChanged();
  }, [portfolioData, markAsChanged]);

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
      router.push(`/p/${slug}`);
    } catch (error: any) {
      throw new Error(error.message || "Failed to publish portfolio");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          <p className="text-slate-400 font-medium">Entering Studio...</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "social", label: "Social", icon: Share2 },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Top Bar - Premium Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">
              Portfolio Studio
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  saveStatus === "saved"
                    ? "bg-green-500"
                    : "bg-amber-500 animate-pulse"
                }`}
              />
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {saveStatus === "saved" ? "Synced to Cloud" : "Changes Pending"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex border-x border-slate-200 dark:border-slate-800 px-4 gap-2">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-2 rounded-md ${
                previewDevice === "desktop"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-2 rounded-md ${
                previewDevice === "tablet"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-2 rounded-md ${
                previewDevice === "mobile"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Palette className="w-4 h-4" />
            <span>Template</span>
          </button>

          <button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm font-bold"
          >
            <Rocket className="w-4 h-4" />
            <span>Go Live</span>
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <nav className="w-20 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center py-6 gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as BuilderSection)}
              className={`relative group p-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                  : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <section.icon className="w-6 h-6" />
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[60]">
                {section.label}
              </div>
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-blue-400 rounded-r-full"
                />
              )}
            </button>
          ))}
          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
            <button className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Form Editor Panel */}
        <aside className="w-[450px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white capitalize">
                {sections.find((s) => s.id === activeSection)?.label}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Configure your {activeSection} details here.
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
              <div className="w-full h-full overflow-y-auto">
                {renderTemplate(selectedTemplateId, portfolioData)}
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
        setPreviewTemplate={setPreviewTemplate}
        setShowTemplatePreview={setShowTemplatePreview}
      />

      {showTemplatePreview && previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => {
            setShowTemplatePreview(false);
            setPreviewTemplate(null);
          }}
          onUse={() => {
            setSelectedTemplateId(previewTemplate.id);
            setShowTemplatePreview(false);
            setShowTemplateSelector(false);
            setPreviewTemplate(null);
          }}
        />
      )}

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

// Sub-component for Template Selector Modal to keep main clean
function TemplateSelectorModal({
  isOpen,
  onClose,
  selectedTemplateId,
  setSelectedTemplateId,
  setPreviewTemplate,
  setShowTemplatePreview,
}: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Refine Your Style</h2>
            <p className="text-slate-500">
              Pick a template that matches your personality.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950/20">
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onSelect={(templateId) => {
              setSelectedTemplateId(templateId);
              onClose();
            }}
            onPreview={(template) => {
              setPreviewTemplate(template);
              setShowTemplatePreview(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
