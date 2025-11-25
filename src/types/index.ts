// NEW Portfolio Types (from @/lib/types/portfolio)
// These are used by the new modern builder (/builder-new)
export type {
  PortfolioData as NewPortfolioData,
  PersonalInfo,
  ContactInfo,
  SocialLinks,
  Skill,
  Project,
  Experience,
  Education
} from '@/lib/types/portfolio';

// LEGACY Portfolio Types (for old builder /builder)
// Kept for backward compatibility
export interface PortfolioData {
  id?: string;
  userId?: string;
  slug: string;
  templateId: string;
  isPublished: boolean;
  views?: number;
  data: {
    personal: {
      name: string;
      title: string;
      bio: string;
      avatarUrl?: string;
      location?: string;
    };
    projects: Array<{
      id: string;
      name: string;
      description: string;
      techStack: string[];
      liveUrl?: string;
      githubUrl?: string;
      imageUrl?: string;
    }>;
    skills: string[];
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      year: string;
      description?: string;
    }>;
    contact: {
      email: string;
      phone?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
      website?: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: 'free' | 'premium';
  stripeCustomerId?: string;
  createdAt: string;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  thumbnailUrl?: string;
  previewUrl?: string;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  stripePaymentId: string;
  amount: number;
  status: string;
  createdAt: string;
}
