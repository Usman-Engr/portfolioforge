'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    illustration?: string; // Optional illustration image URL
}

/**
 * Reusable EmptyState component for displaying empty states
 * Used across dashboard, builder sections, and analytics
 */
export default function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    illustration,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Illustration or Icon */}
            {illustration ? (
                <img
                    src={illustration}
                    alt={title}
                    className="w-64 h-64 object-contain mb-6 opacity-80"
                />
            ) : (
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Icon className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                    </div>
                </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                {description}
            </p>

            {/* Action Button */}
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
