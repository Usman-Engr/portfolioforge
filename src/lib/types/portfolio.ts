// Portfolio data structure types
export interface PortfolioData {
    personal: PersonalInfo;
    contact: ContactInfo;
    social: SocialLinks;
    skills: Skill[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    bio: string;
    avatar?: string;
    avatarUrl?: string; // Adding this for consistency with the builder
}

export interface ContactInfo {
    email: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
}

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    [key: string]: string | undefined;
}

export interface Skill {
    id?: string;
    name: string;
    level: number; // 1-5
}

export interface Project {
    id?: string;
    name: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    images?: string[];
    imageUrl?: string; // Supporting single image
}

export interface Experience {
    id?: string;
    company: string;
    role: string;
    duration: string; // legacy display string
    startDate?: string; // YYYY-MM
    endDate?: string;   // YYYY-MM
    isCurrent?: boolean;
    description: string;
}

export interface Education {
    id?: string;
    institution: string;
    degree: string;
    year: string; // legacy display string
    startDate?: string; // YYYY-MM
    endDate?: string;   // YYYY-MM
    isCurrent?: boolean;
    fieldOfStudy?: string;
    description?: string;
}

// Demo data for template previews
export const demoPortfolioData: PortfolioData = {
    personal: {
        name: "Alex Johnson",
        title: "Full Stack Developer & UI/UX Designer",
        location: "San Francisco, CA",
        bio: "Passionate developer with 5+ years of experience building scalable web applications. I love creating beautiful, user-friendly interfaces that solve real problems.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    contact: {
        email: "alex@example.com",
        phone: "+1 (555) 123-4567",
        website: "https://alexjohnson.dev"
    },
    social: {
        linkedin: "alexjohnson",
        github: "alexj",
        twitter: "alexjdev",
        instagram: "alexj.codes"
    },
    skills: [
        { name: "React", level: 5 },
        { name: "Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Node.js", level: 4 },
        { name: "PostgreSQL", level: 4 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Figma", level: 4 },
        { name: "AWS", level: 3 }
    ],
    projects: [
        {
            name: "E-commerce Platform",
            description: "Built a scalable e-commerce platform handling 10K+ daily transactions with real-time inventory management and payment processing.",
            techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
            liveUrl: "https://demo-ecommerce.com",
            githubUrl: "https://github.com/demo/ecommerce",
            images: ["https://images.unsplash.com/photo-1557821552-17105176677c?w=800"]
        },
        {
            name: "Task Management App",
            description: "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering capabilities.",
            techStack: ["React", "Firebase", "Material-UI"],
            liveUrl: "https://demo-tasks.com",
            githubUrl: "https://github.com/demo/tasks"
        },
        {
            name: "Analytics Dashboard",
            description: "Real-time analytics dashboard with interactive charts, custom reports, and data export functionality.",
            techStack: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
            liveUrl: "https://demo-analytics.com"
        }
    ],
    experience: [
        {
            company: "Tech Corp",
            role: "Senior Full Stack Developer",
            duration: "2020 - Present",
            description: "Led development of customer-facing web applications serving 100K+ users. Mentored junior developers and established best practices for code quality."
        },
        {
            company: "StartupXYZ",
            role: "Frontend Developer",
            duration: "2018 - 2020",
            description: "Built responsive web applications using React and Redux. Improved page load times by 40% through optimization techniques."
        },
        {
            company: "Digital Agency",
            role: "Web Developer",
            duration: "2017 - 2018",
            description: "Developed custom websites for clients across various industries. Collaborated with designers to implement pixel-perfect UIs."
        }
    ],
    education: [
        {
            institution: "University of California, Berkeley",
            degree: "BS in Computer Science",
            year: "2017",
            description: "Focus on software engineering and human-computer interaction. GPA: 3.8/4.0"
        },
        {
            institution: "Online Courses",
            degree: "Full Stack Web Development",
            year: "2016",
            description: "Completed comprehensive bootcamp covering modern web technologies and best practices."
        }
    ]
};
