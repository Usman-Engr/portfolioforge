// Template definitions with metadata
export interface TemplateInfo {
    id: string;
    name: string;
    description: string;
    isPremium: boolean;
    thumbnailUrl: string;
    category: 'minimal' | 'creative' | 'modern' | 'professional' | 'resume' | 'corporate' | 'non-tech';
    targetAudience?: 'developer' | 'designer' | 'all' | 'corporate';
    features: string[];
}

export const templates: TemplateInfo[] = [
    {
        id: 'professional-cv',
        name: 'Executive Resume',
        description: 'Elite, high-impact resume layout for corporate excellence and non-tech leadership.',
        isPremium: false,
        thumbnailUrl: '/templates/professional-cv.png',
        category: 'resume',
        targetAudience: 'corporate',
        features: ['Print-ready (A4)', 'ATS Optimized', 'Executive layout', 'Clean typography']
    },
    {
        id: 'minimal-pro',
        name: 'Minimal Pro',
        description: 'Balanced and clean design perfect for general professionals and designers',
        isPremium: false,
        thumbnailUrl: '/templates/minimal-pro.png',
        category: 'minimal',
        targetAudience: 'all',
        features: ['Versatile', 'Dark mode', 'Responsive', 'SEO optimized']
    },
    {
        id: 'luxe-horizon',
        name: 'Luxe Horizon',
        description: 'Elite luxury aesthetic with metallic accents for high-end designers and creatives.',
        isPremium: false,
        thumbnailUrl: '/templates/luxe-horizon.png',
        category: 'creative',
        targetAudience: 'designer',
        features: ['Premium Serif font', 'Metallic gradients', 'Fluid reveal', 'Dark mode']
    },
    {
        id: 'mono-focus',
        name: 'Mono Focus',
        description: 'Ultra-minimalist monochrome design for writers and non-tech professionals.',
        isPremium: false,
        thumbnailUrl: '/templates/mono.png',
        category: 'non-tech',
        targetAudience: 'all',
        features: ['Grayscale palette', 'Swiss typography', 'Content focus', 'Whitespace']
    },
    {
        id: 'modern-tech',
        name: 'Signature High-Tech',
        description: 'Sleek glassmorphism effects specifically for developers and tech innovators.',
        isPremium: false,
        thumbnailUrl: '/templates/modern-tech.png',
        category: 'modern',
        targetAudience: 'developer',
        features: ['Glassmorphism', 'Smooth animations', 'Grid layouts', 'Dark mode']
    },
    {
        id: 'creative-studio',
        name: 'Signature Studio',
        description: 'Bold and vibrant interactive design for creative studios and designers.',
        isPremium: false,
        thumbnailUrl: '/templates/creative-studio.png',
        category: 'creative',
        targetAudience: 'designer',
        features: ['Animated sections', 'Custom fonts', 'Galleries', 'Interactive']
    },
    {
        id: 'aero-glass',
        name: 'Aero Glass',
        description: 'Next-gen translucent interface for tech-forward professionals.',
        isPremium: false,
        thumbnailUrl: '/templates/aero-glass.png',
        category: 'modern',
        targetAudience: 'developer',
        features: ['Deep glassmorphism', 'Dynamic blurs', 'Floating UI', 'Micro-interactions']
    },
    {
        id: 'brutalist-pulse',
        name: 'Brutalist Pulse',
        description: 'Bold, high-energy bento grid design for modern designers.',
        isPremium: false,
        thumbnailUrl: '/templates/brutalist.png',
        category: 'creative',
        targetAudience: 'designer',
        features: ['Neo-brutalism', 'Bento grid', 'High contrast', 'Staggered motion']
    },
    {
        id: 'neon-drive',
        name: 'Neon Drive',
        description: 'Cyberpunk aesthetic for game designers and night-owl developers.',
        isPremium: false,
        thumbnailUrl: '/templates/neon.png',
        category: 'modern',
        targetAudience: 'developer',
        features: ['Glowing borders', 'Scanline effects', 'CRT flickering', 'Retrowave']
    },
    {
        id: 'organic-sage',
        name: 'Organic Sage',
        description: 'Soft nature-inspired design for lifestyle bloggers and non-tech users.',
        isPremium: false,
        thumbnailUrl: '/templates/organic.png',
        category: 'non-tech',
        targetAudience: 'all',
        features: ['Earthy palette', 'Fluid shapes', 'Soft motion', 'Serif accents']
    },
    {
        id: 'dynamic-flow',
        name: 'Dynamic Flow',
        description: 'High-motion parallax experience for a living portfolio.',
        isPremium: false,
        thumbnailUrl: '/templates/flow.png',
        category: 'modern',
        targetAudience: 'all',
        features: ['Parallax scroll', 'Masked video', 'Animated paths', 'Smooth momentum']
    },
    {
        id: 'grid-master',
        name: 'Grid Master',
        description: 'Structured masonry layout for visual storytelling and photographers.',
        isPremium: false,
        thumbnailUrl: '/templates/grid.png',
        category: 'creative',
        targetAudience: 'designer',
        features: ['Masonry grid', 'Category filters', 'Overlay effects', 'Infinite scroll']
    },
    {
        id: 'gradient-pro',
        name: 'Gradient Pro',
        description: 'Vibrant mesh gradients and fluid typography for modern agencies.',
        isPremium: false,
        thumbnailUrl: '/templates/minimal-pro.png',
        category: 'modern',
        targetAudience: 'all',
        features: ['Mesh gradients', 'Fluid typography', 'Glassmorphism', 'Responsive']
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
