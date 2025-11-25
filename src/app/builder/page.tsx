'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PortfolioForm } from '@/components/builder/PortfolioForm';
import { PortfolioData } from '@/types';
import { storage } from '@/lib/storage';
import { MinimalProTemplate } from '@/components/templates/MinimalProTemplate';
import { GradientProTemplate } from '@/components/templates/GradientProTemplate';
import { CreativeStudioTemplate } from '@/components/templates/CreativeStudioTemplate';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuilderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [showPreview, setShowPreview] = useState(false);
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [dbId, setDbId] = useState<string | null>(null);

    const templateId = searchParams.get('template') || 'minimal-pro';
    const paymentStatus = searchParams.get('payment');
    const portfolioId = searchParams.get('portfolioId');

    // Load saved portfolio on mount
    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            // If not logged in, redirect to login
            router.push('/auth/login?callbackUrl=/builder');
            return;
        }

        const loadData = async () => {
            // If we have a portfolioId, fetch from API
            if (portfolioId) {
                try {
                    // We need an API endpoint to get by ID, or we can use the list and find it
                    // But we didn't implement GET /api/portfolios/[id] yet (it returns 501)
                    // Let's implement that endpoint first or use the list endpoint
                    // Using list endpoint for now as it's safer/easier given current state
                    const response = await fetch('/api/portfolios');
                    if (response.ok) {
                        const portfolios = await response.json();
                        const found = portfolios.find((p: any) => p.id === portfolioId);
                        if (found) {
                            setPortfolioData({
                                id: found.id,
                                slug: found.slug,
                                templateId: found.template_id,
                                isPublished: found.is_published,
                                data: found.data
                            });
                            setDbId(found.id);
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Failed to load portfolio:', error);
                }
            }

            // Fallback to local storage or new
            const saved = storage.loadPortfolio();
            if (saved && !portfolioId) {
                if (!searchParams.get('template') && saved.templateId) {
                    const url = new URL(window.location.href);
                    url.searchParams.set('template', saved.templateId);
                    window.history.replaceState({}, '', url);
                }
                setPortfolioData(saved);
                if (saved.id) setDbId(saved.id);
            } else if (!portfolioId) {
                setPortfolioData({
                    slug: '',
                    templateId: templateId,
                    isPublished: false,
                    data: {
                        personal: { name: '', title: '', bio: '', avatarUrl: '', location: '' },
                        projects: [],
                        skills: [],
                        education: [],
                        contact: { email: '', phone: '', linkedin: '', github: '' }
                    }
                } as PortfolioData);
            }
        };

        loadData();

        if (paymentStatus === 'success') {
            setShowPaymentSuccess(true);
            const url = new URL(window.location.href);
            url.searchParams.delete('payment');
            window.history.replaceState({}, '', url);
            setTimeout(() => setShowPaymentSuccess(false), 5000);
        }
    }, [searchParams, templateId, paymentStatus, session, status, router]);

    const handleSave = async (data: PortfolioData) => {
        if (!session) {
            router.push('/auth/login');
            return;
        }

        setIsSaving(true);

        try {
            // Generate slug if not exists
            if (!data.slug) {
                data.slug = storage.generateSlug(data.data.personal.name);
            }

            data.templateId = templateId;
            data.isPublished = true;

            // Save to API
            const method = dbId ? 'PATCH' : 'POST';
            const url = dbId ? `/api/portfolios/${dbId}` : '/api/portfolios';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: data.slug,
                    data: data.data,
                    templateId: data.templateId,
                    isPublished: data.isPublished,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save portfolio');
            }

            const savedPortfolio = await response.json();

            // Update local state with DB ID
            setDbId(savedPortfolio.id);
            const updatedData = { ...data, id: savedPortfolio.id };
            setPortfolioData(updatedData);

            // Also save to local storage as backup
            storage.savePortfolio(updatedData);

            alert(`Portfolio saved! Your link: ${window.location.origin}/p/${data.slug}`);
            router.push(`/p/${data.slug}`);
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save portfolio. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreview = (data: PortfolioData) => {
        data.templateId = templateId;
        setPortfolioData(data);
        setShowPreview(true);
    };

    const renderTemplate = (data: PortfolioData) => {
        switch (templateId) {
            case 'gradient-pro':
                return <GradientProTemplate data={data} />;
            case 'creative-studio':
                return <CreativeStudioTemplate data={data} />;
            case 'minimal-pro':
            default:
                return <MinimalProTemplate data={data} />;
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (showPreview && portfolioData) {
        return (
            <div className="min-h-screen">
                <div className="fixed top-16 left-0 right-0 z-40 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 text-center flex items-center justify-center gap-4">
                    <span className="text-sm font-medium">Preview Mode ({templateId})</span>
                    <button
                        onClick={() => setShowPreview(false)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-bold"
                    >
                        ← Back to Editor
                    </button>
                </div>
                <div className="pt-12">
                    {renderTemplate(portfolioData)}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 pt-24 relative">
            <AnimatePresence>
                {showPaymentSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <h3 className="font-bold">Payment Successful!</h3>
                            <p className="text-sm">You now have access to this premium template.</p>
                        </div>
                        <button
                            onClick={() => setShowPaymentSuccess(false)}
                            className="ml-4 text-green-800 hover:text-green-900"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Build Your Portfolio
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Using template: <span className="font-semibold text-blue-600">{templateId}</span>
                        </p>
                    </div>
                    {isSaving && (
                        <div className="flex items-center text-blue-600">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Saving...
                        </div>
                    )}
                </div>

                <PortfolioForm
                    initialData={portfolioData || undefined}
                    onSave={handleSave}
                    onPreview={handlePreview}
                />
            </div>
        </div>
    );
}
