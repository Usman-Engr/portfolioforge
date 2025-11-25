'use client';

import { useState } from 'react';
import { Search, Image, Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface SEOSettingsProps {
    settings: {
        title: string;
        description: string;
        keywords: string[];
        ogImage: string;
    };
    onChange: (settings: any) => void;
}

export default function SEOSettings({ settings, onChange }: SEOSettingsProps) {
    const [keywordInput, setKeywordInput] = useState('');

    const addKeyword = () => {
        if (keywordInput.trim() && !settings.keywords.includes(keywordInput.trim())) {
            onChange({
                ...settings,
                keywords: [...settings.keywords, keywordInput.trim()],
            });
            setKeywordInput('');
        }
    };

    const removeKeyword = (keyword: string) => {
        onChange({
            ...settings,
            keywords: settings.keywords.filter((k) => k !== keyword),
        });
    };

    // SEO Score Calculation
    const calculateSEOScore = () => {
        let score = 0;
        const checks = [];

        // Title check
        if (settings.title && settings.title.length >= 30 && settings.title.length <= 60) {
            score += 25;
            checks.push({ label: 'Title length optimal (30-60 chars)', status: 'good' });
        } else if (settings.title) {
            checks.push({ label: 'Title length should be 30-60 characters', status: 'warning' });
        } else {
            checks.push({ label: 'Title is missing', status: 'error' });
        }

        // Description check
        if (settings.description && settings.description.length >= 120 && settings.description.length <= 160) {
            score += 25;
            checks.push({ label: 'Description length optimal (120-160 chars)', status: 'good' });
        } else if (settings.description) {
            checks.push({ label: 'Description should be 120-160 characters', status: 'warning' });
        } else {
            checks.push({ label: 'Description is missing', status: 'error' });
        }

        // Keywords check
        if (settings.keywords.length >= 5 && settings.keywords.length <= 10) {
            score += 25;
            checks.push({ label: 'Keywords count optimal (5-10)', status: 'good' });
        } else if (settings.keywords.length > 0) {
            checks.push({ label: 'Add 5-10 keywords for better SEO', status: 'warning' });
        } else {
            checks.push({ label: 'No keywords added', status: 'error' });
        }

        // OG Image check
        if (settings.ogImage) {
            score += 25;
            checks.push({ label: 'Open Graph image set', status: 'good' });
        } else {
            checks.push({ label: 'Add Open Graph image for social sharing', status: 'warning' });
        }

        return { score, checks };
    };

    const { score, checks } = calculateSEOScore();

    return (
        <div className="space-y-6">
            {/* SEO Score Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">SEO Score</h3>
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-blue-600">{score}</div>
                        <div className="text-sm text-gray-500">/100</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className={`h-3 rounded-full transition-all ${score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>

                {/* Checks */}
                <div className="space-y-2">
                    {checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {check.status === 'good' ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                                <AlertCircle className={`w-5 h-5 ${check.status === 'warning' ? 'text-yellow-500' : 'text-red-500'}`} />
                            )}
                            <span className="text-sm text-gray-700">{check.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meta Title */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Search className="w-4 h-4" />
                    Meta Title
                </label>
                <input
                    type="text"
                    value={settings.title}
                    onChange={(e) => onChange({ ...settings, title: e.target.value })}
                    placeholder="Your Name - Portfolio | Web Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={60}
                />
                <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">Optimal: 30-60 characters</p>
                    <p className={`text-xs ${settings.title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                        {settings.title.length}/60
                    </p>
                </div>
            </div>

            {/* Meta Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Search className="w-4 h-4" />
                    Meta Description
                </label>
                <textarea
                    value={settings.description}
                    onChange={(e) => onChange({ ...settings, description: e.target.value })}
                    placeholder="Experienced web developer specializing in React, Node.js, and modern web technologies. View my portfolio to see my latest projects."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    maxLength={160}
                />
                <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">Optimal: 120-160 characters</p>
                    <p className={`text-xs ${settings.description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                        {settings.description.length}/160
                    </p>
                </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4" />
                    Keywords
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        placeholder="Add keyword (e.g., web developer)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={addKeyword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {settings.keywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                        >
                            {keyword}
                            <button
                                onClick={() => removeKeyword(keyword)}
                                className="hover:text-blue-900"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Recommended: 5-10 keywords</p>
            </div>

            {/* Open Graph Image */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Image className="w-4 h-4" />
                    Open Graph Image
                </label>
                <input
                    type="url"
                    value={settings.ogImage}
                    onChange={(e) => onChange({ ...settings, ogImage: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">Recommended size: 1200x630px</p>
                {settings.ogImage && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <img
                            src={settings.ogImage}
                            alt="OG Preview"
                            className="w-full max-w-md rounded-lg border border-gray-300"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Invalid+Image+URL';
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
