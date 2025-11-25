import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/supabase';
import { MinimalProTemplate } from '@/components/templates/MinimalProTemplate';
import { GradientProTemplate } from '@/components/templates/GradientProTemplate';
import { CreativeStudioTemplate } from '@/components/templates/CreativeStudioTemplate';
import { PortfolioData } from '@/types';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PortfolioPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch portfolio from database
    const portfolio = await db.getPortfolioBySlug(slug);

    if (!portfolio) {
        notFound();
    }

    // Increment views
    await db.incrementViews(slug);

    // Transform DB data to PortfolioData type
    const portfolioData: PortfolioData = {
        id: portfolio.id,
        slug: portfolio.slug,
        templateId: portfolio.template_id,
        isPublished: portfolio.is_published,
        data: portfolio.data
    };

    const renderTemplate = () => {
        switch (portfolioData.templateId) {
            case 'gradient-pro':
                return <GradientProTemplate data={portfolioData} />;
            case 'creative-studio':
                return <CreativeStudioTemplate data={portfolioData} />;
            case 'minimal-pro':
            default:
                return <MinimalProTemplate data={portfolioData} />;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {renderTemplate()}

            {/* Footer Credit */}
            <div className="fixed bottom-4 right-4 z-50">
                <a
                    href="/"
                    target="_blank"
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                    Built with PortfolioForge
                </a>
            </div>
        </div>
    );
}
