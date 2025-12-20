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
        id: 'professional-cv',
        name: 'Executive CV',
        description: 'Traditional high-impact CV layout for corporate excellence',
        isPremium: false,
        thumbnailUrl: '/templates/professional-cv.png',
        category: 'professional',
        features: ['Print-ready', 'Chronological timeline', 'Skill metrics', 'Clean typography']
    },
    {
        id: 'luxe-horizon',
        name: 'Luxe Horizon',
        description: 'Elite luxury aesthetic with metallic accents and serif elegance',
        isPremium: false,
        thumbnailUrl: '/templates/luxe-horizon.png',
        category: 'creative',
        features: ['Premium Serif font', 'Metallic gradients', 'Fluid reveal animations', 'Dark mode']
    },
    {
        id: 'brutalist-pulse',
        name: 'Brutalist Pulse',
        description: 'Bold, high-energy design with stark borders and offset grids',
        isPremium: false,
        thumbnailUrl: '/templates/brutalist.png',
        category: 'creative',
        features: ['Neo-brutalism', 'Bento grid', 'High contrast', 'Staggered motion']
    },
    {
        id: 'aero-glass',
        name: 'Aero Glass',
        description: 'Next-gen translucent interface inspired by Vision Pro immersion',
        isPremium: false,
        thumbnailUrl: '/templates/aero-glass.png',
        category: 'modern',
        features: ['Deep glassmorphism', 'Dynamic blurs', 'Floating UI elements', 'Micro-interactions']
    },
    {
        id: 'mono-focus',
        name: 'Mono Focus',
        description: 'Ultra-minimalist monochrome design focusing on pure content',
        isPremium: false,
        thumbnailUrl: '/templates/mono.png',
        category: 'minimal',
        features: ['Grayscale palette', 'Swiss typography', 'Line-art icons', 'Whitespace focus']
    },
    {
        id: 'neon-drive',
        name: 'Neon Drive',
        description: 'Cyberpunk aesthetic with glowing borders and tech-noir vibes',
        isPremium: false,
        thumbnailUrl: '/templates/neon.png',
        category: 'modern',
        features: ['Glowing borders', 'Scanline effects', 'CRT flickering', 'Retrowave colors']
    },
    {
        id: 'organic-sage',
        name: 'Organic Sage',
        description: 'Nature-inspired soft design with earthy tones and fluid shapes',
        isPremium: false,
        thumbnailUrl: '/templates/organic.png',
        category: 'creative',
        features: ['Earthy palette', 'Fluid SVG shapes', 'Soft motion', 'Serif accents']
    },
    {
        id: 'dynamic-flow',
        name: 'Dynamic Flow',
        description: 'High-motion parallax experience for a living portfolio',
        isPremium: false,
        thumbnailUrl: '/templates/flow.png',
        category: 'modern',
        features: ['Parallax scroll', 'Masked video support', 'Animated paths', 'Smooth momentum']
    },
    {
        id: 'grid-master',
        name: 'Grid Master',
        description: 'Highly structured masonry layout for visual storytelling',
        isPremium: false,
        thumbnailUrl: '/templates/grid.png',
        category: 'modern',
        features: ['Masonry grid', 'Category filters', 'Overlay effects', 'Infinite scroll feel']
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
