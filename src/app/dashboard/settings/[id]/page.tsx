'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import SEOSettings from '@/components/settings/SEOSettings';
import ThemeSettings from '@/components/settings/ThemeSettings';
import ContentSettings from '@/components/settings/ContentSettings';
import IntegrationSettings from '@/components/settings/IntegrationSettings';
import LinkedInSettings from '@/components/settings/LinkedInSettings';
import LayoutSettings from '@/components/settings/LayoutSettings';
import CustomCSSSettings from '@/components/settings/CustomCSSSettings';

interface PortfolioSettings {
    seo: {
        title: string;
        description: string;
        keywords: string[];
        ogImage: string;
    };
    theme: {
        colorScheme: string;
        font: string;
        darkMode: boolean;
        layout: 'sidebar' | 'topnav';
        customCSS: string;
    };
    content: {
        showTestimonials: boolean;
        showCertifications: boolean;
        videoIntro: string;
    };
}

export default function SettingsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [settings, setSettings] = useState<PortfolioSettings>({
        seo: {
            title: '',
            description: '',
            keywords: [],
            ogImage: '',
        },
        theme: {
            colorScheme: 'blue',
            font: 'Inter',
            darkMode: false,
            layout: 'sidebar' as const,
            customCSS: '',
        },
        content: {
            showTestimonials: false,
            showCertifications: false,
            videoIntro: '',
        },
    });
    const [activeTab, setActiveTab] = useState('seo');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated') {
            loadSettings();
        }
    }, [status, params.id]);

    const loadSettings = async () => {
        try {
            const response = await fetch(`/api/portfolios/${params.id}/settings`);
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`/api/portfolios/${params.id}/settings`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImportProjects = async (projects: any[]) => {
        try {
            // 1. Fetch current portfolio data
            const res = await fetch(`/api/portfolios/${params.id}`);
            if (!res.ok) throw new Error('Failed to fetch portfolio');
            const portfolio = await res.json();

            // 2. Merge projects
            const currentData = portfolio.data || {};
            const currentProjects = currentData.projects || [];

            // Avoid duplicates based on title
            const existingTitles = new Set(currentProjects.map((p: any) => p.title));
            const newProjects = projects.filter(p => !existingTitles.has(p.title));

            if (newProjects.length === 0) {
                alert('No new projects to import (duplicates skipped)');
                return;
            }

            const updatedProjects = [...currentProjects, ...newProjects];

            // 3. Update portfolio
            const updateRes = await fetch(`/api/portfolios/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { ...currentData, projects: updatedProjects }
                })
            });

            if (!updateRes.ok) throw new Error('Failed to update portfolio');

            alert(`Successfully imported ${newProjects.length} projects!`);
        } catch (error) {
            console.error('Import error:', error);
            alert('Failed to save imported projects');
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    const tabs = [
        { id: 'seo', label: 'SEO & Meta Tags', icon: '🔍' },
        { id: 'theme', label: 'Theme & Design', icon: '🎨' },
        { id: 'layout', label: 'Layout Options', icon: '📐' },
        { id: 'customcss', label: 'Custom CSS', icon: '💻' },
        { id: 'content', label: 'Content Options', icon: '📝' },
        { id: 'integrations', label: 'Integrations', icon: '🔌' },
        { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Portfolio Settings</h1>
                                <p className="text-sm text-gray-600 mt-1">Customize your portfolio appearance and SEO</p>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="col-span-3">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Settings Content */}
                    <div className="col-span-9">
                        {activeTab === 'seo' && (
                            <SEOSettings
                                settings={settings.seo}
                                onChange={(seo) => setSettings({ ...settings, seo })}
                            />
                        )}
                        {activeTab === 'theme' && (
                            <ThemeSettings
                                settings={settings.theme}
                                onChange={(theme) => setSettings({ ...settings, theme })}
                            />
                        )}
                        {activeTab === 'layout' && (
                            <LayoutSettings
                                settings={{ layout: settings.theme.layout }}
                                onChange={(layoutSettings) => setSettings({
                                    ...settings,
                                    theme: { ...settings.theme, layout: layoutSettings.layout }
                                })}
                            />
                        )}
                        {activeTab === 'customcss' && (
                            <CustomCSSSettings
                                settings={{ customCSS: settings.theme.customCSS }}
                                onChange={(cssSettings) => setSettings({
                                    ...settings,
                                    theme: { ...settings.theme, customCSS: cssSettings.customCSS }
                                })}
                            />
                        )}
                        {activeTab === 'content' && (
                            <ContentSettings
                                settings={settings.content}
                                onChange={(content) => setSettings({ ...settings, content })}
                            />
                        )}
                        {activeTab === 'integrations' && (
                            <IntegrationSettings
                                portfolioId={params.id}
                                onImportProjects={handleImportProjects}
                            />
                        )}
                        {activeTab === 'linkedin' && (
                            <LinkedInSettings
                                portfolioId={params.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
