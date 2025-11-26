'use client';

import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
}

export default function LoadingOverlay({ isVisible, message = 'Processing...' }: LoadingOverlayProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Loading content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-200">
                <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {message}
                </p>
            </div>
        </div>
    );
}
