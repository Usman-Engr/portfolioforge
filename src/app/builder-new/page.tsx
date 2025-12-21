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

        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            <Palette className="w-4 h-4" />
            <span>Switch Base</span>
          </button>

          <div className="h-8 w-px bg-white/10" />

          <button
            onClick={() => setShowPublishModal(true)}
            className="group relative flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <Rocket className="w-4 h-4 fill-current relative z-10" />
            <span className="relative z-10">Deploy Site</span>
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
  setPreviewTemplate,
  setShowTemplatePreview,
}: any) {
  if (!isOpen) return null;
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
