// Template definitions with metadata
export interface TemplateInfo {
    id: string;
    name: string;
    description: string;
    isPremium: boolean;
    thumbnailUrl: string;
    category: 'minimal' | 'creative' | 'modern' | 'professional';
    features: string[];
}

export const templates: TemplateInfo[] = [
    {
        id: 'minimal-pro',
        name: 'Minimal Pro',
        description: 'Clean and professional design perfect for developers and designers',
        isPremium: false,
        thumbnailUrl: '/templates/minimal-pro.png',
        category: 'minimal',
        features: ['Gradient background', 'Dark mode', 'Responsive', 'SEO optimized']
    },
    {
        id: 'creative-studio',
        name: 'Creative Studio',
        description: 'Bold and vibrant design for creative professionals',
        isPremium: true,
        thumbnailUrl: '/templates/creative-studio.png',
        category: 'creative',
        features: ['Animated sections', 'Custom fonts', 'Image galleries', 'Dark mode']
    },
    {
        id: 'modern-tech',
        name: 'Modern Tech',
        description: 'Sleek and modern design with glassmorphism effects',
        isPremium: true,
        thumbnailUrl: '/templates/modern-tech.png',
        category: 'modern',
        features: ['Glassmorphism', 'Smooth animations', 'Grid layouts', 'Dark mode']
    },
    {
        id: 'professional-cv',
        name: 'Professional CV',
        description: 'Traditional CV-style layout for corporate professionals',
        isPremium: false,
        thumbnailUrl: '/templates/professional-cv.png',
        category: 'professional',
        features: ['Print-friendly', 'PDF export', 'Timeline view', 'Clean typography']
    }
];

export function getTemplateById(id: string): TemplateInfo | undefined {
    return templates.find(t => t.id === id);
}

export function getFreeTemplates(): TemplateInfo[] {
    return templates.filter(t => !t.isPremium);
}

export function getPremiumTemplates(): TemplateInfo[] {
    return templates.filter(t => t.isPremium);
}
