import { ResumeData } from "@/lib/types/resume";
import { ReactNode } from "react";
import IvyLeagueAcademic from "@/components/resume-templates/IvyLeagueAcademic";
import ModernMinimalist from "@/components/resume-templates/ModernMinimalist";
import EuropassStandard from "@/components/resume-templates/EuropassStandard";
import TechStackPro from "@/components/resume-templates/TechStackPro";
import ExecutiveLeadership from "@/components/resume-templates/ExecutiveLeadership";
import ProjectBased from "@/components/resume-templates/ProjectBased";
import HybridFunctional from "@/components/resume-templates/HybridFunctional";
import UKGoldStandard from "@/components/resume-templates/UKGoldStandard";
import CreativeSubtle from "@/components/resume-templates/CreativeSubtle";
import SwissDesign from "@/components/resume-templates/SwissDesign";

export const RESUME_TEMPLATE_IDS = [
  "resume-ivy-league",
  "resume-modern-minimalist",
  "resume-europass",
  "resume-tech-stack",
  "resume-executive-leadership",
  "resume-project-based",
  "resume-hybrid-functional",
  "resume-uk-gold",
  "resume-creative-subtle",
  "resume-swiss-design",
] as const;

export type ResumeTemplateId = typeof RESUME_TEMPLATE_IDS[number];

export function isValidResumeTemplateId(id: string): boolean {
  return RESUME_TEMPLATE_IDS.includes(id as ResumeTemplateId);
}

function resolveResumeTemplate(templateId: string, data: ResumeData): ReactNode {
  switch (templateId) {
    case "resume-ivy-league": return <IvyLeagueAcademic data={data} />;
    case "resume-modern-minimalist": return <ModernMinimalist data={data} />;
    case "resume-europass": return <EuropassStandard data={data} />;
    case "resume-tech-stack": return <TechStackPro data={data} />;
    case "resume-executive-leadership": return <ExecutiveLeadership data={data} />;
    case "resume-project-based": return <ProjectBased data={data} />;
    case "resume-hybrid-functional": return <HybridFunctional data={data} />;
    case "resume-uk-gold": return <UKGoldStandard data={data} />;
    case "resume-creative-subtle": return <CreativeSubtle data={data} />;
    case "resume-swiss-design": return <SwissDesign data={data} />;
    default: return <ModernMinimalist data={data} />;
  }
}

export function renderResumeTemplate(templateId: string, data: ResumeData): ReactNode {
  return resolveResumeTemplate(templateId, data);
}

export function renderResumeTemplateForExport(templateId: string, data: ResumeData): ReactNode {
  return resolveResumeTemplate(templateId, data);
}
