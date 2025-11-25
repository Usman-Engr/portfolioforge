// Portfolio Data Types
export interface PortfolioData {
  id?: string;
  userId?: string;
  slug: string;
  templateId: string;
  isPublished: boolean;
  views?: number;
  data: {
    personal: PersonalInfo;
    projects: Project[];
    skills: string[];
    education: Education[];
    contact: ContactInfo;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
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
