import { PortfolioData } from "@/lib/types/portfolio";
import { ReactNode } from "react";
import CanvasWrapper from "@/components/CanvasWrapper";

/* ====================================================================
   LEGACY PORTFOLIO TEMPLATES — Kept for future use, rendering commented out
   To re-enable a template, uncomment its import and add a case to
   resolveTemplateNode() and getTemplateComponent() below.
   ====================================================================

import MinimalProTemplate from "@/components/templates/MinimalProTemplate";
import GradientProTemplate from "@/components/templates/GradientProTemplate";
import ModernTechTemplate from "@/components/templates/ModernTechTemplate";
import CreativeStudioTemplate from "@/components/templates/CreativeStudioTemplate";
import LuxeHorizonTemplate from "@/components/templates/LuxeHorizonTemplate";
import BrutalistPulseTemplate from "@/components/templates/BrutalistPulseTemplate";
import AeroGlassTemplate from "@/components/templates/AeroGlassTemplate";
import NeonDriveTemplate from "@/components/templates/NeonDriveTemplate";
import ProfessionalCVTemplate from "@/components/templates/ProfessionalCVTemplate";
import OrganicSageTemplate from "@/components/templates/OrganicSageTemplate";
import MonoFocusTemplate from "@/components/templates/MonoFocusTemplate";
import DynamicFlowTemplate from "@/components/templates/DynamicFlowTemplate";
import GridMasterTemplate from "@/components/templates/GridMasterTemplate";

==================================================================== */

// Active portfolio template (kept as default)
import MinimalProTemplate from "@/components/templates/MinimalProTemplate";

/**
 * Normalizes portfolio data to handle legacy and new structures
 */
function normalizeData(data: any): PortfolioData {
  if (!data) return {} as PortfolioData;

  // Handle case where data might be nested inside a 'data' property (legacy structure)
  const baseData = data.data || data;

  const normalized: PortfolioData = {
    personal: baseData.personal || {},
    contact: baseData.contact || {},
    social: baseData.social || baseData.contact || {}, // Fallback social to contact for legacy support
    skills: Array.isArray(baseData.skills)
      ? baseData.skills.map((s: any) =>
          typeof s === "string" ? { name: s, level: 5 } : s,
        )
      : [],
    projects: Array.isArray(baseData.projects) ? baseData.projects : [],
    experience: Array.isArray(baseData.experience) ? baseData.experience : [],
    education: Array.isArray(baseData.education) ? baseData.education : [],
  };

  // Ensure contact fields are present in social if missing
  const platforms = ["linkedin", "github", "twitter", "instagram"];
  platforms.forEach((platform) => {
    if (!normalized.social[platform] && (normalized.contact as any)[platform]) {
      normalized.social[platform] = (normalized.contact as any)[platform];
    }
  });

  return normalized;
}

function resolveTemplateNode(
  templateId: string,
  normalizedData: PortfolioData,
): ReactNode {
  switch (templateId) {
    /* ================================================================
       LEGACY PORTFOLIO TEMPLATE CASES — Kept for future re-activation
       Uncomment the import above and the case here to enable.
       ================================================================

    case "gradient-pro":
      return <GradientProTemplate data={normalizedData} />;
    case "modern-tech":
      return <ModernTechTemplate data={normalizedData} />;
    case "creative-studio":
      return <CreativeStudioTemplate data={normalizedData} />;
    case "luxe-horizon":
      return <LuxeHorizonTemplate data={normalizedData} />;
    case "brutalist-pulse":
      return <BrutalistPulseTemplate data={normalizedData} />;
    case "aero-glass":
      return <AeroGlassTemplate data={normalizedData} />;
    case "neon-drive":
      return <NeonDriveTemplate data={normalizedData} />;
    case "professional-cv":
      return <ProfessionalCVTemplate data={normalizedData} />;
    case "organic-sage":
      return <OrganicSageTemplate data={normalizedData} />;
    case "mono-focus":
      return <MonoFocusTemplate data={normalizedData} />;
    case "dynamic-flow":
      return <DynamicFlowTemplate data={normalizedData} />;
    case "grid-master":
      return <GridMasterTemplate data={normalizedData} />;
    case "studio-elite":
      return <ProfessionalCVTemplate data={normalizedData} />;

    ================================================================ */

    case "minimal-pro":
    default:
      return <MinimalProTemplate data={normalizedData} />;
  }
}

export function renderTemplate(templateId: string, data: any) {
  const normalizedData = normalizeData(data);
  const templateNode = resolveTemplateNode(templateId, normalizedData);

  // Helper to wrap templates in CanvasWrapper
  const wrapTemplate = (template: ReactNode) => (
    <CanvasWrapper>{template}</CanvasWrapper>
  );

  return wrapTemplate(templateNode);
}

export function renderTemplateForExport(templateId: string, data: any) {
  const normalizedData = normalizeData(data);
  return resolveTemplateNode(templateId, normalizedData);
}

/**
 * Get template component by ID
 */
export function getTemplateComponent(templateId: string) {
  // All legacy portfolio templates are commented out.
  // See block comment above for re-activation instructions.
  return MinimalProTemplate;
}

/**
 * Validate template ID
 * NOTE: Only minimal-pro is active for portfolio. Resume templates are in resume-template-renderer.tsx
 */
export function isValidTemplateId(templateId: string): boolean {
  const validIds = [
    "minimal-pro",
    /* Legacy IDs kept for data compatibility — templates are commented out:
    "gradient-pro", "modern-tech", "creative-studio", "professional-cv",
    "luxe-horizon", "brutalist-pulse", "aero-glass", "mono-focus",
    "neon-drive", "organic-sage", "dynamic-flow", "grid-master", "studio-elite",
    */
  ];
  return validIds.includes(templateId);
}
