// Resume template definitions with metadata
export interface ResumeTemplateInfo {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'modern' | 'executive' | 'minimalist' | 'creative' | 'academic' | 'technical' | 'functional';
  accentColor: string;
  features: string[];
  thumbnailUrl?: string;
  bestFor: string;
}

export const resumeTemplates: ResumeTemplateInfo[] = [
  {
    id: 'resume-ivy-league',
    name: 'Ivy League Academic',
    description: 'Traditional centered header with serif fonts. Trusted by law, academia, and research professionals worldwide.',
    category: 'academic',
    accentColor: '#1a1a2e',
    features: ['ATS Optimized', 'Serif typography', 'Centered header', 'Academic style'],
    bestFor: 'Graduates, Researchers, Law',
    thumbnailUrl: '',
  },
  {
    id: 'resume-modern-minimalist',
    name: 'Modern Minimalist',
    description: 'High white space, pure vertical flow. 100% ATS-safe with zero columns. Top choice for corporate and HR roles.',
    category: 'minimalist',
    accentColor: '#1f2937',
    features: ['100% ATS-safe', 'Single column', 'Clean typography', 'Corporate ready'],
    bestFor: 'Corporate, HR, Admin',
    thumbnailUrl: '',
  },
  {
    id: 'resume-europass',
    name: 'Standard Europass',
    description: 'Official EU standardized layout with CEFR language scale and digital skills grid. Required for EU job applications.',
    category: 'classic',
    accentColor: '#003399',
    features: ['EU Standard', 'CEFR Languages', 'Digital Skills', 'Open Sans font'],
    bestFor: 'EU Job Applications',
    thumbnailUrl: '',
  },
  {
    id: 'resume-tech-stack',
    name: 'Tech Stack Pro',
    description: 'Two-column layout with a dedicated skills sidebar. Built for software engineers and data scientists.',
    category: 'technical',
    accentColor: '#0f172a',
    features: ['Skills sidebar', 'Tech-focused', 'ATS friendly', 'Developer style'],
    bestFor: 'Software Engineers, Data Scientists',
    thumbnailUrl: '',
  },
  {
    id: 'resume-executive-leadership',
    name: 'Executive Leadership',
    description: 'Sophisticated layout with a dominant Executive Summary. Navy blue headers, Georgia serif. Built for C-suite.',
    category: 'executive',
    accentColor: '#000080',
    features: ['Executive Summary', 'Navy palette', 'Serif font', 'Leadership focus'],
    bestFor: 'Managers, Directors, CEOs',
    thumbnailUrl: '',
  },
  {
    id: 'resume-project-based',
    name: 'Project Portfolio',
    description: 'Leads with project names over job titles. Includes Key Impact bullets. Perfect for freelancers and engineers.',
    category: 'creative',
    accentColor: '#1e293b',
    features: ['Project-first', 'Key Impact bullets', 'Montserrat font', 'Freelancer ready'],
    bestFor: 'Freelancers, Architects, Engineers',
    thumbnailUrl: '',
  },
  {
    id: 'resume-hybrid-functional',
    name: 'Hybrid Functional',
    description: 'Groups skills by category at the top, condensed work history below. Ideal for career changers and gap fillers.',
    category: 'functional',
    accentColor: '#374151',
    features: ['Skills-first', 'Career change', 'Gap friendly', 'Lato font'],
    bestFor: 'Career Changers, Employment Gaps',
    thumbnailUrl: '',
  },
  {
    id: 'resume-uk-gold',
    name: 'UK Gold Standard',
    description: 'No photo, no DOB, purely merit-based. Calibri 10.5pt, all-caps bold headers. UK finance and business standard.',
    category: 'classic',
    accentColor: '#1e3a5f',
    features: ['UK Standard', 'No photo', 'Key Achievements', 'Calibri font'],
    bestFor: 'UK Finance, Business Roles',
    thumbnailUrl: '',
  },
  {
    id: 'resume-creative-subtle',
    name: 'Creative Subtle',
    description: 'Soft slate header with Poppins font and teal accents. Includes Social Proof section for portfolio links.',
    category: 'creative',
    accentColor: '#0d9488',
    features: ['Teal accents', 'Social Proof', 'Poppins font', 'Marketing ready'],
    bestFor: 'Marketing, Social Media, PR',
    thumbnailUrl: '',
  },
  {
    id: 'resume-swiss-design',
    name: 'Swiss Design',
    description: 'Strict grid system, Helvetica, zero icons. Font weight hierarchy only. The designer\'s designer resume.',
    category: 'minimalist',
    accentColor: '#000000',
    features: ['Grid system', 'Helvetica', 'No icons', 'Weight hierarchy'],
    bestFor: 'Designers, High-end Consultants',
    thumbnailUrl: '',
  },
];

export function getResumeTemplateById(id: string): ResumeTemplateInfo | undefined {
  return resumeTemplates.find((t) => t.id === id);
}
