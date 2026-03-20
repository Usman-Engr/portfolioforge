import { ResumeData } from "@/lib/types/resume";
import { ReactNode } from "react";
import ClassicProfessional from "@/components/resume-templates/ClassicProfessional";
import ModernTimeline from "@/components/resume-templates/ModernTimeline";
import ExecutiveBold from "@/components/resume-templates/ExecutiveBold";
import MinimalistClean from "@/components/resume-templates/MinimalistClean";
import CreativeAccent from "@/components/resume-templates/CreativeAccent";

export const RESUME_TEMPLATE_IDS = [
  "resume-classic",
  "resume-timeline",
  "resume-executive",
  "resume-minimalist",
  "resume-creative",
] as const;

export function isValidResumeTemplateId(id: string): boolean {
  return RESUME_TEMPLATE_IDS.includes(id as any);
}

function resolveResumeTemplate(templateId: string, data: ResumeData): ReactNode {
  switch (templateId) {
    case "resume-classic":
      return <ClassicProfessional data={data} />;
    case "resume-timeline":
      return <ModernTimeline data={data} />;
    case "resume-executive":
      return <ExecutiveBold data={data} />;
    case "resume-minimalist":
      return <MinimalistClean data={data} />;
    case "resume-creative":
      return <CreativeAccent data={data} />;
    default:
      return <ClassicProfessional data={data} />;
  }
}

/**
 * Renders a resume template for the live preview in the builder
 */
export function renderResumeTemplate(templateId: string, data: ResumeData): ReactNode {
  return resolveResumeTemplate(templateId, data);
}

/**
 * Renders a resume template for PDF export (no wrapper, raw output)
 */
export function renderResumeTemplateForExport(templateId: string, data: ResumeData): ReactNode {
  return resolveResumeTemplate(templateId, data);
}
