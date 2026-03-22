"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Languages,
  Download,
  ChevronLeft,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Loader2,
  X,
  CircleCheck,
  ChevronDown,
  SlidersHorizontal,
  Eye,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import {
  ResumeData,
  defaultResumeData,
  ResumePersonal,
} from "@/lib/types/resume";
import { resumeTemplates, ResumeTemplateInfo } from "@/lib/resume-templates";
import { renderResumeTemplate } from "@/lib/utils/resume-template-renderer";
import SummaryForm from "@/components/resume-builder/SummaryForm";
import WorkExperienceForm from "@/components/resume-builder/WorkExperienceForm";
import ResumeEducationForm from "@/components/resume-builder/ResumeEducationForm";
import ResumeSkillsForm from "@/components/resume-builder/ResumeSkillsForm";
import CertificationsForm from "@/components/resume-builder/CertificationsForm";
import LanguagesForm from "@/components/resume-builder/LanguagesForm";
import { downloadResumePDF } from "@/lib/utils/pdf-service";

type Section =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "languages";

const SECTIONS: { id: Section; label: string; Icon: any }[] = [
  { id: "personal", label: "Personal Info", Icon: User },
  { id: "summary", label: "Summary", Icon: FileText },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "skills", label: "Skills", Icon: Wrench },
  { id: "certifications", label: "Certifications", Icon: Award },
  { id: "languages", label: "Languages", Icon: Languages },
];

/* ------------------------------------------------------------
   Personal Info Form (inline - no separate file needed)
------------------------------------------------------------- */
function PersonalInfoResumeForm({
  data,
  onChange,
}: {
  data: ResumePersonal;
  onChange: (d: ResumePersonal) => void;
}) {
  const field = (k: keyof ResumePersonal, v: string) =>
    onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            key: "fullName" as const,
            label: "Full Name *",
            placeholder: "Alexandra Johnson",
          },
          {
            key: "jobTitle" as const,
            label: "Job Title *",
            placeholder: "Senior Product Designer",
          },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
              {label}
            </label>
            <input
              type="text"
              value={data[key] || ""}
              onChange={(e) => field(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            key: "email" as const,
            label: "Email *",
            placeholder: "alex@example.com",
            type: "email",
          },
          {
            key: "phone" as const,
            label: "Phone",
            placeholder: "+1 (555) 000-0000",
            type: "tel",
          },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key}>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
              {label}
            </label>
            <input
              type={type}
              value={data[key] || ""}
              onChange={(e) => field(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
          Location
        </label>
        <input
          type="text"
          value={data.location || ""}
          onChange={(e) => field("location", e.target.value)}
          placeholder="New York, NY"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            key: "linkedin" as const,
            label: "LinkedIn",
            placeholder: "linkedin.com/in/alex",
          },
          {
            key: "website" as const,
            label: "Website / Portfolio",
            placeholder: "alex.dev",
          },
          {
            key: "github" as const,
            label: "GitHub",
            placeholder: "github.com/alex",
          },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
              {label}
            </label>
            <input
              type="text"
              value={data[key] || ""}
              onChange={(e) => field(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Template Picker Modal
------------------------------------------------------------- */
function TemplatePicker({
  selectedId,
  onSelect,
  onClose,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
    >
      <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
              Choose Template
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              5 professional resume designs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumeTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onSelect(t.id);
                onClose();
              }}
              className={`text-left p-4 rounded-2xl border transition-all group hover:-translate-y-1 duration-300 ${selectedId === t.id ? "border-blue-500 bg-blue-500/10" : "border-white/8 bg-white/3 hover:border-white/20"}`}
            >
              {/* Preview swatch */}
              <div
                className="w-full h-28 rounded-xl mb-3 overflow-hidden relative"
                style={{ backgroundColor: t.accentColor }}
              >
                <div className="absolute inset-0 flex flex-col p-3 gap-1.5 opacity-40">
                  <div className="h-3 bg-white/60 rounded w-2/3" />
                  <div className="h-2 bg-white/40 rounded w-1/3" />
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 bg-white/30 rounded w-full" />
                    <div className="h-1.5 bg-white/30 rounded w-4/5" />
                    <div className="h-1.5 bg-white/30 rounded w-3/4" />
                  </div>
                </div>
                {selectedId === t.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <CircleCheck className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </div>
              <h3
                className={`text-sm font-bold mb-1 transition-colors ${selectedId === t.id ? "text-blue-400" : "text-white group-hover:text-blue-400"}`}
              >
                {t.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {t.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {t.features.slice(0, 2).map((f, i) => (
                  <span
                    key={i}
                    className="text-[9px] px-2 py-0.5 bg-white/5 rounded-full text-gray-400"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------
   Main Builder Content
------------------------------------------------------------- */
function ResumeBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [resumeId, setResumeId] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...defaultResumeData,
  });
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [selectedTemplateId, setSelectedTemplateId] =
    useState("resume-classic");
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">(
    "saved",
  );
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Auth guard
  useEffect(() => {
    if (status === "unauthenticated")
      router.push("/auth/login?callbackUrl=/resume-builder");
  }, [status, router]);

  // Load from DB if ID exists
  useEffect(() => {
    const id = searchParams.get("id");
    const t = searchParams.get("template");
    if (t) setSelectedTemplateId(t);

    if (id && status === "authenticated") {
      setResumeId(id);
      setIsLoadingData(true);
      fetch(`/api/resumes/${id}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to load");
        })
        .then((data) => {
          if (data.data) setResumeData(data.data);
          if (data.template_id) setSelectedTemplateId(data.template_id);
          setIsLoadingData(false);
        })
        .catch(() => {
          setIsLoadingData(false);
        });
    } else if (status === "authenticated" || status === "unauthenticated") {
      setIsLoadingData(false);
    }
  }, [searchParams, status]);

  // Marking as unsaved when data changes
  useEffect(() => {
    if (!isLoadingData) {
      setSaveStatus("unsaved");
    }
  }, [resumeData, selectedTemplateId, isLoadingData]);

  // Handle scrolling to top of form panel
  const scrollToTopOfForm = () => {
    const formPanel = document.getElementById("resume-form-panel");
    if (formPanel) {
      formPanel.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleManualSave = async () => {
    if (status !== "authenticated") return;

    setSaveStatus("saving");
    const payload = {
      title: resumeData.personal.fullName || "Untitled Resume",
      templateId: selectedTemplateId,
      data: resumeData,
    };

    try {
      if (resumeId) {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to update resume");
        }
        setSaveStatus("saved");
        toast.success("Resume updated!");
        router.push("/dashboard");
      } else {
        const res = await fetch("/api/resumes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to create resume");
        }

        setSaveStatus("saved");
        toast.success("Resume saved successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Manual save error:", error);
      setSaveStatus("unsaved");
      toast.error(error.message || "Failed to save progress");
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePDF(
        selectedTemplateId,
        resumeData,
        `${resumeData.personal.fullName || "resume"}-resume`,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  if (status === "loading" || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const currentSection = SECTIONS.find((s) => s.id === activeSection)!;

  const previewWidth =
    previewDevice === "mobile"
      ? "w-[390px]"
      : previewDevice === "tablet"
        ? "w-[768px]"
        : "w-full";

  return (
    <div className="h-[100dvh] max-h-[100dvh] flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* ─── TOP BAR ─── */}
      <header className="h-16 border-b border-white/5 bg-black/70 backdrop-blur-2xl px-4 md:px-8 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest hidden sm:block">
              Dashboard
            </span>
          </Link>
          <div className="h-6 w-px bg-white/5 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-white uppercase italic tracking-tight hidden md:block">
                {resumeData.personal.fullName || "Resume Builder"}
              </h1>
              <span
                className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${saveStatus === "saved" ? "bg-green-500/10 border-green-500/20 text-green-400" : saveStatus === "saving" ? "bg-blue-500/10 border-blue-500/20 text-blue-400 animate-pulse" : "bg-amber-500/10 border-amber-500/20 text-amber-400"}`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${saveStatus === "saved" ? "bg-green-400" : saveStatus === "saving" ? "bg-blue-400" : "bg-amber-400"}`}
                />
                {saveStatus === "saved"
                  ? "Saved"
                  : saveStatus === "saving"
                    ? "Saving..."
                    : "Unsaved"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Device preview toggle (desktop only) */}
          <div className="hidden xl:flex items-center gap-1 px-1.5 py-1.5 bg-white/5 rounded-xl border border-white/5">
            {[
              { d: "desktop" as const, Icon: Monitor },
              { d: "tablet" as const, Icon: Tablet },
              { d: "mobile" as const, Icon: Smartphone },
            ].map(({ d, Icon }) => (
              <button
                key={d}
                onClick={() => setPreviewDevice(d)}
                className={`p-2 rounded-lg transition-all ${previewDevice === d ? "bg-white text-black shadow" : "text-gray-500 hover:text-white"}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* Mobile preview button no longer an overlay, it toggles tab, but since we have tabs, we can still use this as a shortcut */}
          <button
            onClick={() => setMobileTab("preview")}
            className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Preview</span>
          </button>

          <button
            onClick={handleManualSave}
            disabled={saveStatus === "saving" || status !== "authenticated"}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:border-white/25 transition-all disabled:opacity-50"
            title="Save Draft"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:block">Save</span>
          </button>

          <button
            onClick={() => setShowTemplatePicker(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:border-white/25 transition-all"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Design</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:block">
              {isDownloading ? "Generating..." : "Download PDF"}
            </span>
          </button>
        </div>
      </header>

      {/* ─── MAIN AREA ─── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Mobile-only Persistent Toggle Bar */}
        <div className="lg:hidden flex items-center p-2 bg-[#0a0a0a] border-b border-white/5 shrink-0 z-40">
          <div className="flex bg-white/5 rounded-xl p-1 w-full relative">
            <button
              onClick={() => setMobileTab("form")}
              className={`flex-1 flex justify-center py-2 text-xs font-bold rounded-lg transition-all z-10 ${mobileTab === "form" ? "text-white" : "text-gray-500"}`}
            >
              Edit Details
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all z-10 ${mobileTab === "preview" ? "text-white" : "text-gray-500"}`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </button>
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-lg transition-all duration-300 pointer-events-none"
              style={{ left: mobileTab === "form" ? "4px" : "calc(50%)" }}
            />
          </div>
        </div>

        {/* ── Section Nav (desktop sidebar) ── */}
        <nav className="hidden lg:flex w-20 xl:w-24 border-r border-white/5 bg-[#0a0a0a] flex-col items-center py-6 gap-2 shrink-0">
          {SECTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              title={label}
              className={`relative group w-14 h-14 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                activeSection === id
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[8px] font-bold uppercase tracking-wide leading-none">
                {label.split(" ")[0]}
              </span>
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                {label}
              </div>
            </button>
          ))}
        </nav>

        <aside
          className={`w-full lg:w-[380px] xl:w-[420px] shrink-0 border-r border-white/5 bg-[#070707] min-h-0 flex flex-col ${mobileTab === "preview" ? "hidden lg:flex" : "flex"}`}
        >
          {/* Mobile nav bar (horizontal sections) - Moved OUT of scrollable area for robustness */}
          <div className="lg:hidden border-b border-white/5 bg-[#0a0a0a] flex items-center gap-1 px-3 py-2 overflow-x-auto shrink-0 scrollbar-hide">
            {SECTIONS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  scrollToTopOfForm();
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeSection === id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div
            id="resume-form-panel"
            className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 flex flex-col scrollbar-hide overscroll-contain"
          >
            <div className="p-5 md:p-7 pb-60">
              <div className="mb-6">
                <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
                  {currentSection.label}
                </h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">
                  Resume Section
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* ... forms ... */}
                  {activeSection === "personal" && (
                    <PersonalInfoResumeForm
                      data={resumeData.personal}
                      onChange={(personal) =>
                        setResumeData({ ...resumeData, personal })
                      }
                    />
                  )}
                  {activeSection === "summary" && (
                    <SummaryForm
                      data={resumeData.summary}
                      onChange={(summary) =>
                        setResumeData({ ...resumeData, summary })
                      }
                    />
                  )}
                  {activeSection === "experience" && (
                    <WorkExperienceForm
                      data={resumeData.workExperience}
                      onChange={(workExperience) =>
                        setResumeData({ ...resumeData, workExperience })
                      }
                    />
                  )}
                  {activeSection === "education" && (
                    <ResumeEducationForm
                      data={resumeData.education}
                      onChange={(education) =>
                        setResumeData({ ...resumeData, education })
                      }
                    />
                  )}
                  {activeSection === "skills" && (
                    <ResumeSkillsForm
                      data={resumeData.skills}
                      onChange={(skills) =>
                        setResumeData({ ...resumeData, skills })
                      }
                    />
                  )}
                  {activeSection === "certifications" && (
                    <CertificationsForm
                      data={resumeData.certifications}
                      onChange={(certifications) =>
                        setResumeData({ ...resumeData, certifications })
                      }
                    />
                  )}
                  {activeSection === "languages" && (
                    <LanguagesForm
                      data={resumeData.languages}
                      onChange={(languages) =>
                        setResumeData({ ...resumeData, languages })
                      }
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between">
                {SECTIONS.findIndex((s) => s.id === activeSection) > 0 ? (
                  <button
                    onClick={() => {
                      setActiveSection(
                        SECTIONS[
                          SECTIONS.findIndex((s) => s.id === activeSection) - 1
                        ].id,
                      );
                      scrollToTopOfForm();
                    }}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {
                      SECTIONS[
                        SECTIONS.findIndex((s) => s.id === activeSection) - 1
                      ].label
                    }
                  </button>
                ) : (
                  <div />
                )}
                {SECTIONS.findIndex((s) => s.id === activeSection) <
                  SECTIONS.length - 1 && (
                  <button
                    onClick={() => {
                      setActiveSection(
                        SECTIONS[
                          SECTIONS.findIndex((s) => s.id === activeSection) + 1
                        ].id,
                      );
                      scrollToTopOfForm();
                    }}
                    className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-bold uppercase tracking-widest ml-auto"
                  >
                    {
                      SECTIONS[
                        SECTIONS.findIndex((s) => s.id === activeSection) + 1
                      ].label
                    }
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Live Preview ── */}
        <section
          className={`flex-1 bg-[#111111] flex flex-col items-center justify-start py-8 xl:py-12 overflow-auto ${mobileTab === "preview" ? "flex" : "hidden lg:flex"}`}
        >
          <div className="w-full max-w-full flex justify-center px-4">
            <div
              className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 shrink-0"
              style={{
                // Enhanced scaling for readability
                transform:
                  typeof window !== "undefined" && window.innerWidth < 1024
                    ? `scale(${Math.min(1, (window.innerWidth - 48) / 794)})` // Fit to width with padding
                    : previewDevice !== "desktop"
                      ? "scale(0.85)"
                      : "scale(1)",
                transformOrigin: "top center",
                width: "210mm",
                minHeight: "297mm",
                overflow: "hidden",
              }}
            >
              <div className="h-full w-full">
                {renderResumeTemplate(selectedTemplateId, resumeData)}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showTemplatePicker && (
          <TemplatePicker
            selectedId={selectedTemplateId}
            onSelect={setSelectedTemplateId}
            onClose={() => setShowTemplatePicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <ResumeBuilderContent />
    </Suspense>
  );
}
