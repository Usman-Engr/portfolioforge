'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { templates, TemplateInfo } from '@/lib/templates';
import { demoPortfolioData } from '@/lib/types/portfolio';
import { Eye, Sparkles, Lock, Check, Loader2 } from 'lucide-react';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';

export default function TemplatesPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
        router.push('/auth/login?callbackUrl=/templates');
        return null;
    }

    const handleUseTemplate = async (template: TemplateInfo) => {
        if (template.isPremium) {
            // Check if user has premium subscription
            const userSubscription = (session?.user as any)?.subscriptionStatus;

            if (userSubscription === 'premium') {
                // User has premium, allow access
                router.push(`/builder-new?template=${template.id}`);
                return;
            }

            // Redirect to Stripe checkout
            setIsCheckingOut(true);
            try {
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        templateId: template.id,
                        templateName: template.name,
                        price: 29.99 // Premium template price
                    })
                });

                const data = await response.json();

                if (data.url) {
                    // Redirect to Stripe checkout
                    window.location.href = data.url;
                } else {
                    alert('Failed to initiate checkout. Please try again.');
                    setIsCheckingOut(false);
                }
            } catch (error) {
                console.error('Checkout error:', error);
                alert('Failed to initiate checkout. Please try again.');
                setIsCheckingOut(false);
            }
            return;
        }

        // Navigate to builder with template
        router.push(`/builder-new?template=${template.id}`);
    };

    const handlePreview = (template: TemplateInfo) => {
        setSelectedTemplate(template);
        setShowPreview(true);
    };

    if (isCheckingOut) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-700 dark:text-gray-300">Redirecting to checkout...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Choose Your Template
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Select a stunning template to showcase your work. All templates are fully customizable and responsive.
                    </p>
                </div>

                {/* Free Templates */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Free Templates</h2>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                            No credit card required
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.filter(t => !t.isPremium).map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onPreview={() => handlePreview(template)}
                                onUse={() => handleUseTemplate(template)}
                            />
                        ))}
                    </div>
                </section>

                {/* Premium Templates */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Premium Templates</h2>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            Premium
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.filter(t => t.isPremium).map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onPreview={() => handlePreview(template)}
                                onUse={() => handleUseTemplate(template)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Preview Modal */}
            {showPreview && selectedTemplate && (
                <TemplatePreviewModal
                    template={selectedTemplate}
                    onClose={() => setShowPreview(false)}
                    onUse={() => handleUseTemplate(selectedTemplate)}
                />
            )}
        </div>
    );
}

// Template Card Component
function TemplateCard({
    template,
    onPreview,
    onUse
}: {
    template: TemplateInfo;
    onPreview: () => void;
    onUse: () => void;
}) {
    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Thumbnail */}
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
                {/* Placeholder for template thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <div className="text-center">
                        <div className="text-6xl mb-2">🎨</div>
                        <p className="text-sm">Template Preview</p>
                    </div>
                </div>

                {/* Premium Badge */}
                {template.isPremium && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                        <Lock className="w-3 h-3" />
                        Premium
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                        onClick={onPreview}
                        className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform"
                    >
                        <Eye className="w-5 h-5" />
                        Preview
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {template.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {template.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                    <ul className="space-y-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="w-4 h-4 text-green-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Button */}
                <button
                    onClick={onUse}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${template.isPremium
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {template.isPremium ? 'Upgrade to Use ($29.99)' : 'Use Template'}
                </button>
            </div>
        </div>
    );
}
