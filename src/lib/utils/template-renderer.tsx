import { PortfolioData } from "@/lib/types/portfolio";
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

/**
 * Template renderer utility
 * Dynamically renders the appropriate template component based on template ID
 */
export function renderTemplate(templateId: string, data: PortfolioData) {
  switch (templateId) {
    case "minimal-pro":
      return <MinimalProTemplate data={data} />;
    case "gradient-pro":
      // @ts-ignore - Template uses different data structure
      return <GradientProTemplate data={{ data }} />;
    case "modern-tech":
      // @ts-ignore - Template uses different data structure
      return <ModernTechTemplate data={{ data }} />;
    case "creative-studio":
      // @ts-ignore - Template uses different data structure
      return <CreativeStudioTemplate data={{ data }} />;
    case "luxe-horizon":
      return <LuxeHorizonTemplate data={data} />;
    case "brutalist-pulse":
      return <BrutalistPulseTemplate data={data} />;
    case "aero-glass":
      return <AeroGlassTemplate data={data} />;
    case "neon-drive":
      return <NeonDriveTemplate data={data} />;
    case "professional-cv":
      return <ProfessionalCVTemplate data={data} />;
    case "organic-sage":
      return <OrganicSageTemplate data={data} />;
    case "mono-focus":
      return <MonoFocusTemplate data={data} />;
    case "dynamic-flow":
      return <DynamicFlowTemplate data={data} />;
    case "grid-master":
      return <GridMasterTemplate data={data} />;
    default:
      return <MinimalProTemplate data={data} />;
  }
}

/**
 * Get template component by ID
 */
export function getTemplateComponent(templateId: string) {
  switch (templateId) {
    case "minimal-pro":
      return MinimalProTemplate;
    case "gradient-pro":
      return GradientProTemplate;
    case "modern-tech":
      return ModernTechTemplate;
    case "creative-studio":
      return CreativeStudioTemplate;
    case "luxe-horizon":
      return LuxeHorizonTemplate;
    case "brutalist-pulse":
      return BrutalistPulseTemplate;
    case "aero-glass":
      return AeroGlassTemplate;
    case "neon-drive":
      return NeonDriveTemplate;
    case "professional-cv":
      return ProfessionalCVTemplate;
    case "organic-sage":
      return OrganicSageTemplate;
    case "mono-focus":
      return MonoFocusTemplate;
    case "dynamic-flow":
      return DynamicFlowTemplate;
    case "grid-master":
      return GridMasterTemplate;
    default:
      return MinimalProTemplate;
  }
}

/**
 * Validate template ID
 */
export function isValidTemplateId(templateId: string): boolean {
  const validIds = [
    "minimal-pro",
    "gradient-pro",
    "modern-tech",
    "creative-studio",
    "professional-cv",
    "luxe-horizon",
    "brutalist-pulse",
    "aero-glass",
    "mono-focus",
    "neon-drive",
    "organic-sage",
    "dynamic-flow",
    "grid-master",
  ];
  return validIds.includes(templateId);
}
