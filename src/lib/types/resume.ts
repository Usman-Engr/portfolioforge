// Resume-specific data types (separate from PortfolioData)

export interface ResumePersonal {
  fullName: string;
  jobTitle: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
}

export interface ResumeWorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string; // Bullet points separated by newlines
  achievements?: string[];
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  gpa?: string;
  honors?: string;
  description?: string;
}

export interface ResumeSkillGroup {
  category: string; // e.g. "Technical", "Soft Skills", "Design"
  skills: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeLanguage {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface ResumeData {
  personal: ResumePersonal;
  summary: string;
  workExperience: ResumeWorkExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
  // Optional metadata
  templateId?: string;
  accentColor?: string;
}

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [
    { category: 'Technical', skills: [] },
    { category: 'Soft Skills', skills: [] },
  ],
  certifications: [],
  languages: [],
};

// Valid resume template IDs
export const RESUME_TEMPLATE_IDS = [
  'resume-ivy-league',
  'resume-modern-minimalist',
  'resume-europass',
  'resume-tech-stack',
  'resume-executive-leadership',
  'resume-project-based',
  'resume-hybrid-functional',
  'resume-uk-gold',
  'resume-creative-subtle',
  'resume-swiss-design',
] as const;

export type ResumeTemplateId = typeof RESUME_TEMPLATE_IDS[number];
