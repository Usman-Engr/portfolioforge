'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChevronDown, ChevronUp, Save, Eye, Loader2, Rocket } from 'lucide-react';
import { PortfolioData } from '@/lib/types/portfolio';
import ContactInfoForm from '@/components/builder/ContactInfoForm';
import SocialLinksForm from '@/components/builder/SocialLinksForm';
import SkillsForm from '@/components/builder/SkillsForm';
import ProjectsForm from '@/components/builder/ProjectsForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import EducationForm from '@/components/builder/EducationForm';
import PublishModal from '@/components/builder/PublishModal';
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';
import { useAutoSave } from '@/hooks/useAutoSave';

export default function ModernBuilderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    const [portfolioData, setPortfolioData] = useState<PortfolioData>({
        personal: { name: '', title: '', location: '', bio: '' },
        contact: { email: '' },
        social: {},
        skills: [],
        projects: [],
        experience: [],
        education: []
    });

    const [expandedSections, setExpandedSections] = useState({
        personal: true,
        contact: false,
        social: false,
        skills: false,
        projects: false,
        experience: false,
        education: false
    });

    const [showPublishModal, setShowPublishModal] = useState(false);
    const [currentSlug, setCurrentSlug] = useState<string | undefined>();
    const [portfolioId, setPortfolioId] = useState<string | undefined>();

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/builder-new');
        }
    }, [status, router]);

    // Save function for auto-save
    const handleSave = useCallback(async () => {
        if (!session) return;

        try {
            const method = portfolioId ? 'PUT' : 'POST';
            const url = portfolioId ? `/api/portfolios/${portfolioId}` : '/api/portfolios';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: currentSlug || 'draft',
                    data: portfolioData,
                    templateId: 'minimal-pro',
                    isPublished: false, // Draft save
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save');
            }

            const saved = await response.json();
            if (!portfolioId) {
                setPortfolioId(saved.id);
            }
        } catch (error) {
            console.error('Save error:', error);
            throw error;
        }
    }, [session, portfolioData, portfolioId, currentSlug]);

    // Auto-save hook
    const { saveStatus, isOnline, markAsChanged, saveNow } = useAutoSave({
        onSave: handleSave,
        delay: 30000, // 30 seconds
    });

    // Mark as changed when data updates
    useEffect(() => {
        markAsChanged();
    }, [portfolioData, markAsChanged]);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handlePublish = async (slug: string) => {
        if (!session) return;

        try {
            const method = portfolioId ? 'PUT' : 'POST';
            const url = portfolioId ? `/api/portfolios/${portfolioId}` : '/api/portfolios';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    data: portfolioData,
                    templateId: 'minimal-pro',
                    isPublished: true,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to publish');
            }

            const published = await response.json();
            setPortfolioId(published.id);
            setCurrentSlug(slug);

            // Redirect to published portfolio
            router.push(`/p/${slug}`);
        } catch (error: any) {
            throw new Error(error.message || 'Failed to publish portfolio');
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Top Bar */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Builder</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {!isOnline && '⚠️ Offline - '}
                                {saveStatus === 'saved' && '✓ All changes saved'}
                                {saveStatus === 'saving' && 'Saving...'}
                                {saveStatus === 'unsaved' && 'Unsaved changes'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => saveNow()}
                                disabled={saveStatus === 'saving'}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {saveStatus === 'saving' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Draft
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setShowPublishModal(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Rocket className="w-5 h-5" />
                                Publish
                            </button>
                        </div>
                    </div>
                </div>

                {/* Split Screen Layout */}
                <div className="pt-24 flex">
                    {/* Left: Form Sections */}
                    <div className="w-2/5 h-screen overflow-y-auto p-6 space-y-4">
                        {/* Personal Info Section */}
                        <Section
                            title="Personal Information"
                            isExpanded={expandedSections.personal}
                            onToggle={() => toggleSection('personal')}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.name}
                                        onChange={(e) => setPortfolioData({
                                            ...portfolioData,
                                            personal: { ...portfolioData.personal, name: e.target.value }
                                        })}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Title/Role *
                                    </label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.title}
                                        onChange={(e) => setPortfolioData({
                                            ...portfolioData,
                                            personal: { ...portfolioData.personal, title: e.target.value }
                                        })}
                                        placeholder="Full Stack Developer"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.location || ''}
                                        onChange={(e) => setPortfolioData({
                                            ...portfolioData,
                                            personal: { ...portfolioData.personal, location: e.target.value }
                                        })}
                                        placeholder="San Francisco, CA"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bio *
                                    </label>
                                    <textarea
                                        value={portfolioData.personal.bio}
                                        onChange={(e) => setPortfolioData({
                                            ...portfolioData,
                                            personal: { ...portfolioData.personal, bio: e.target.value }
                                        })}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Contact Info Section */}
                        <Section
                            title="Contact Information"
                            isExpanded={expandedSections.contact}
                            onToggle={() => toggleSection('contact')}
                        >
                            <ContactInfoForm
                                data={portfolioData.contact}
                                onChange={(contact) => setPortfolioData({ ...portfolioData, contact })}
                            />
                        </Section>

                        {/* Social Links Section */}
                        <Section
                            title="Social Links"
                            isExpanded={expandedSections.social}
                            onToggle={() => toggleSection('social')}
                        >
                            <SocialLinksForm
                                data={portfolioData.social}
                                onChange={(social) => setPortfolioData({ ...portfolioData, social })}
                            />
                        </Section>

                        {/* Skills Section */}
                        <Section
                            title="Skills"
                            isExpanded={expandedSections.skills}
                            onToggle={() => toggleSection('skills')}
                        >
                            <SkillsForm
                                data={portfolioData.skills}
                                onChange={(skills) => setPortfolioData({ ...portfolioData, skills })}
                            />
                        </Section>

                        {/* Projects Section */}
                        <Section
                            title="Projects"
                            isExpanded={expandedSections.projects}
                            onToggle={() => toggleSection('projects')}
                        >
                            <ProjectsForm
                                data={portfolioData.projects}
                                onChange={(projects) => setPortfolioData({ ...portfolioData, projects })}
                            />
                        </Section>

                        {/* Experience Section */}
                        <Section
                            title="Experience"
                            isExpanded={expandedSections.experience}
                            onToggle={() => toggleSection('experience')}
                        >
                            <ExperienceForm
                                data={portfolioData.experience}
                                onChange={(experience) => setPortfolioData({ ...portfolioData, experience })}
                            />
                        </Section>

                        {/* Education Section */}
                        <Section
                            title="Education"
                            isExpanded={expandedSections.education}
                            onToggle={() => toggleSection('education')}
                        >
                            <EducationForm
                                data={portfolioData.education}
                                onChange={(education) => setPortfolioData({ ...portfolioData, education })}
                            />
                        </Section>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="w-3/5 h-screen overflow-y-auto bg-gray-100 dark:bg-gray-950 border-l border-gray-200 dark:border-gray-700">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 z-10">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h2>
                        </div>
                        <div className="p-6">
                            <MinimalProTemplate data={portfolioData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Publish Modal */}
            <PublishModal
                isOpen={showPublishModal}
                onClose={() => setShowPublishModal(false)}
                onPublish={handlePublish}
                currentSlug={currentSlug}
                portfolioName={portfolioData.personal.name}
            />
        </>
    );
}

// Collapsible Section Component
function Section({ title, isExpanded, onToggle, children }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {isExpanded && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
}
