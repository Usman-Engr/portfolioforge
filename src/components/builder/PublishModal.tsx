'use client';

import { useState, useEffect } from 'react';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import { validateSlug, sanitizeSlug, checkSlugAvailability } from '@/lib/utils/slugValidation';

interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPublish: (slug: string) => Promise<void>;
    currentSlug?: string;
    portfolioName: string;
}

export default function PublishModal({
    isOpen,
    onClose,
    onPublish,
    currentSlug,
    portfolioName
}: PublishModalProps) {
    const [slug, setSlug] = useState(currentSlug || '');
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState('');

    // Auto-generate slug from portfolio name
    useEffect(() => {
        if (!currentSlug && portfolioName) {
            const generated = sanitizeSlug(portfolioName);
            setSlug(generated);
        }
    }, [portfolioName, currentSlug]);

    // Check slug availability
    useEffect(() => {
        if (!slug || slug === currentSlug) {
            setIsAvailable(null);
            return;
        }

        const checkAvailability = async () => {
            setIsChecking(true);
            setError('');

            if (!validateSlug(slug)) {
                setError('Slug must be 3-50 characters, lowercase letters, numbers, and hyphens only');
                setIsAvailable(false);
                setIsChecking(false);
                return;
            }

            try {
                const available = await checkSlugAvailability(slug);
                setIsAvailable(available);
                if (!available) {
                    setError('This slug is already taken');
                }
            } catch (err) {
                setError('Failed to check availability');
                setIsAvailable(false);
            } finally {
                setIsChecking(false);
            }
        };

        const timer = setTimeout(checkAvailability, 500);
        return () => clearTimeout(timer);
    }, [slug, currentSlug]);

    const handlePublish = async () => {
        if (!isAvailable && slug !== currentSlug) {
            setError('Please choose an available slug');
            return;
        }

        setIsPublishing(true);
        setError('');

        try {
            await onPublish(slug);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to publish portfolio');
        } finally {
            setIsPublishing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Publish Your Portfolio
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Choose your portfolio URL
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(sanitizeSlug(e.target.value))}
                                placeholder="your-name"
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {isChecking && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                            {!isChecking && isAvailable === true && (
                                <Check className="w-5 h-5 text-green-500" />
                            )}
                            {!isChecking && isAvailable === false && slug !== currentSlug && (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            portfolioforge.com/p/<span className="font-semibold text-blue-600">{slug || 'your-slug'}</span>
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            What happens when you publish?
                        </h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>✓ Your portfolio will be live at the URL above</li>
                            <li>✓ Anyone can view it by visiting the link</li>
                            <li>✓ You can still edit it anytime from your dashboard</li>
                            <li>✓ You can unpublish it later if needed</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing || (!isAvailable && slug !== currentSlug) || !slug}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPublishing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            'Publish Now'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
