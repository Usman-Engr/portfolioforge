'use client';

import { useState } from 'react';
import { Layout, Columns, Menu } from 'lucide-react';

interface LayoutSettingsProps {
    settings: {
        layout: 'sidebar' | 'topnav';
    };
    onChange: (settings: { layout: 'sidebar' | 'topnav' }) => void;
}

export default function LayoutSettings({ settings, onChange }: LayoutSettingsProps) {
    const layouts = [
        {
            id: 'sidebar' as const,
            name: 'Sidebar Navigation',
            description: 'Classic sidebar layout with navigation on the left',
            icon: Layout,
        },
        {
            id: 'topnav' as const,
            name: 'Top Navigation',
            description: 'Modern top navigation bar layout',
            icon: Menu,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Layout</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Choose how navigation is displayed on your portfolio
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {layouts.map((layout) => (
                        <button
                            key={layout.id}
                            onClick={() => onChange({ layout: layout.id })}
                            className={`p-6 rounded-lg border-2 transition-all text-left ${settings.layout === layout.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${settings.layout === layout.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <layout.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{layout.name}</h4>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{layout.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {settings.layout === 'sidebar' ? (
                        <div className="flex gap-4 h-48">
                            <div className="w-16 bg-gray-800 rounded"></div>
                            <div className="flex-1 bg-white rounded"></div>
                        </div>
                    ) : (
                        <div className="space-y-4 h-48">
                            <div className="h-12 bg-gray-800 rounded"></div>
                            <div className="flex-1 bg-white rounded"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
