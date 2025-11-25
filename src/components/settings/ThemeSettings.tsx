'use client';

import { Palette, Type, Layout, Moon } from 'lucide-react';

interface ThemeSettingsProps {
    settings: {
        colorScheme: string;
        font: string;
        darkMode: boolean;
    };
    onChange: (settings: any) => void;
}

const colorSchemes = [
    { id: 'blue', name: 'Ocean Blue', primary: '#3b82f6', secondary: '#1e40af' },
    { id: 'purple', name: 'Royal Purple', primary: '#8b5cf6', secondary: '#6d28d9' },
    { id: 'green', name: 'Forest Green', primary: '#10b981', secondary: '#047857' },
    { id: 'orange', name: 'Sunset Orange', primary: '#f59e0b', secondary: '#d97706' },
    { id: 'pink', name: 'Rose Pink', primary: '#ec4899', secondary: '#be185d' },
    { id: 'teal', name: 'Ocean Teal', primary: '#14b8a6', secondary: '#0f766e' },
];

const fonts = [
    { id: 'Inter', name: 'Inter', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'Poppins', name: 'Poppins', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'Roboto', name: 'Roboto', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'Montserrat', name: 'Montserrat', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'Open Sans', name: 'Open Sans', preview: 'The quick brown fox jumps over the lazy dog' },
    { id: 'Lato', name: 'Lato', preview: 'The quick brown fox jumps over the lazy dog' },
];

export default function ThemeSettings({ settings, onChange }: ThemeSettingsProps) {
    return (
        <div className="space-y-6">
            {/* Color Scheme */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                    <Palette className="w-4 h-4" />
                    Color Scheme
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {colorSchemes.map((scheme) => (
                        <button
                            key={scheme.id}
                            onClick={() => onChange({ ...settings, colorScheme: scheme.id })}
                            className={`p-4 rounded-lg border-2 transition-all ${settings.colorScheme === scheme.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className="w-8 h-8 rounded-full"
                                    style={{ backgroundColor: scheme.primary }}
                                ></div>
                                <div
                                    className="w-8 h-8 rounded-full"
                                    style={{ backgroundColor: scheme.secondary }}
                                ></div>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{scheme.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Selection */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                    <Type className="w-4 h-4" />
                    Font Family
                </label>
                <div className="space-y-3">
                    {fonts.map((font) => (
                        <button
                            key={font.id}
                            onClick={() => onChange({ ...settings, font: font.id })}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${settings.font === font.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-900">{font.name}</p>
                                {settings.font === font.id && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Selected</span>
                                )}
                            </div>
                            <p
                                className="text-gray-600"
                                style={{ fontFamily: font.id }}
                            >
                                {font.preview}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Dark Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-gray-700" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                            <p className="text-xs text-gray-500">Enable dark theme for your portfolio</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onChange({ ...settings, darkMode: !settings.darkMode })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                    <Layout className="w-4 h-4" />
                    Theme Preview
                </label>
                <div
                    className={`p-6 rounded-lg ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                    style={{ fontFamily: settings.font }}
                >
                    <h2
                        className={`text-2xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                        style={{
                            color: settings.darkMode
                                ? '#ffffff'
                                : colorSchemes.find((s) => s.id === settings.colorScheme)?.primary,
                        }}
                    >
                        Your Portfolio Title
                    </h2>
                    <p className={`mb-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        This is how your portfolio will look with the selected theme settings.
                    </p>
                    <button
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{
                            backgroundColor: colorSchemes.find((s) => s.id === settings.colorScheme)?.primary,
                        }}
                    >
                        Sample Button
                    </button>
                </div>
            </div>
        </div>
    );
}
