// Resume template definitions with metadata
export interface ResumeTemplateInfo {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'modern' | 'executive' | 'minimalist' | 'creative';
  accentColor: string;
  features: string[];
  thumbnailUrl?: string;
}

export const resumeTemplates: ResumeTemplateInfo[] = [
  {
    id: 'resume-classic',
    name: 'Classic Professional',
    description: 'A timeless two-column layout trusted by hiring managers worldwide. Perfect for corporate roles.',
    category: 'classic',
    accentColor: '#1e3a5f',
    features: ['ATS Optimized', 'Two-column layout', 'Professional navy', 'Print-ready A4'],
    thumbnailUrl: '',
  },
  {
    id: 'resume-timeline',
    name: 'Modern Timeline',
    description: 'Clean timeline design with a left accent bar. Popular on Canva for tech and creative roles.',
    category: 'modern',
    accentColor: '#2563eb',
    features: ['Timeline sidebar', 'Clean typography', 'Skills progress', 'Modern design'],
    thumbnailUrl: '',
  },
  {
    id: 'resume-executive',
    name: 'Executive Bold',
    description: 'Bold header with strong section separators. Inspired by Wix Resume Builder executive templates.',
    category: 'executive',
    accentColor: '#111827',
    features: ['Bold header', 'Executive style', 'Achievement focused', 'Professional sections'],
    thumbnailUrl: '',
  },
  {
    id: 'resume-minimalist',
    name: 'Minimalist Clean',
    description: 'Ultra-clean whitespace design. 100% ATS-safe, perfect for Google, Meta, and FAANG applications.',
    category: 'minimalist',
    accentColor: '#374151',
    features: ['100% ATS-safe', 'Single column', 'Max whitespace', 'Clean typography'],
    thumbnailUrl: '',
  },
  {
    id: 'resume-creative',
    name: 'Creative Accent',
    description: 'Colored sidebar with icon accents. Popular on Zety and Canva for creative professionals.',
    category: 'creative',
    accentColor: '#7c3aed',
    features: ['Color sidebar', 'Icon accents', 'Creative layout', 'Visual hierarchy'],
    thumbnailUrl: '',
  },
];

export function getResumeTemplateById(id: string): ResumeTemplateInfo | undefined {
  return resumeTemplates.find((t) => t.id === id);
}
