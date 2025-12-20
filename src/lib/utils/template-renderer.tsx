import { PortfolioData } from '@/lib/types/portfolio';
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';
import GradientProTemplate from '@/components/templates/GradientProTemplate';
import ModernTechTemplate from '@/components/templates/ModernTechTemplate';
import CreativeStudioTemplate from '@/components/templates/CreativeStudioTemplate';

/**
 * Template renderer utility
 * Dynamically renders the appropriate template component based on template ID
 * Note: Some templates may expect different data structures - handle accordingly
 */
export function renderTemplate(templateId: string, data: PortfolioData) {
    switch (templateId) {
        case 'minimal-pro':
            return <MinimalProTemplate data={data} />;
        case 'gradient-pro':
            // GradientProTemplate expects wrapped data structure
            // @ts-ignore - Template uses different data structure
            return <GradientProTemplate data={{ data }} />;
        case 'modern-tech':
            // ModernTechTemplate expects wrapped data structure
            // @ts-ignore - Template uses different data structure
            return <ModernTechTemplate data={{ data }} />;
        case 'creative-studio':
            // CreativeStudioTemplate expects wrapped data structure
            // @ts-ignore - Template uses different data structure
            return <CreativeStudioTemplate data={{ data }} />;
        case 'professional-cv':
            // Using MinimalPro as fallback for professional-cv until we create it
            return <MinimalProTemplate data={data} />;
        default:
            // Default to MinimalPro for unknown templates
            return <MinimalProTemplate data={data} />;
    }
}

/**
 * Get template component by ID
 * Returns the template component class for dynamic rendering
 */
export function getTemplateComponent(templateId: string) {
    switch (templateId) {
        case 'minimal-pro':
            return MinimalProTemplate;
        case 'gradient-pro':
            return GradientProTemplate;
        case 'modern-tech':
            return ModernTechTemplate;
        case 'creative-studio':
            return CreativeStudioTemplate;
        case 'professional-cv':
            return MinimalProTemplate;
        default:
            return MinimalProTemplate;
    }
}

/**
 * Validate template ID
 * Checks if the template ID is valid and exists
 */
export function isValidTemplateId(templateId: string): boolean {
    const validIds = ['minimal-pro', 'gradient-pro', 'modern-tech', 'creative-studio', 'professional-cv'];
    return validIds.includes(templateId);
}
