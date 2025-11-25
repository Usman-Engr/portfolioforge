'use client';

import { X } from 'lucide-react';
import { TemplateInfo } from '@/lib/templates';
import { demoPortfolioData } from '@/lib/types/portfolio';
import MinimalProTemplate from './MinimalProTemplate';
import CreativeStudioTemplate from './CreativeStudioTemplate';
import ModernTechTemplate from './ModernTechTemplate';

interface TemplatePreviewModalProps {
    template: TemplateInfo;
    onClose: () => void;
    onUse: () => void;
}

export default function TemplatePreviewModal({ template, onClose, onUse }: TemplatePreviewModalProps) {
    // Render the appropriate template component
    const renderTemplate = () => {
        switch (template.id) {
            case 'minimal-pro':
                return <MinimalProTemplate data={demoPortfolioData} />;
            case 'creative-studio':
                return <CreativeStudioTemplate data={demoPortfolioData} />;
            case 'modern-tech':
                return <ModernTechTemplate data={demoPortfolioData} />;
            case 'professional-cv':
                return <MinimalProTemplate data={demoPortfolioData} />; // Fallback for now
            default:
                return <MinimalProTemplate data={demoPortfolioData} />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div className="relative w-full h-full max-w-7xl max-h-screen m-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {template.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Preview with demo data
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onUse}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${template.isPremium
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {template.isPremium ? 'Upgrade to Use' : 'Use This Template'}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950">
                    {renderTemplate()}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {template.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {template.isPremium ? 'Premium Template - $9/mo' : 'Free Template'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
