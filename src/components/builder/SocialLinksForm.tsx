'use client';

import { SocialLinks } from '@/lib/types/portfolio';
import { Linkedin, Github, Twitter, Instagram, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface SocialLinksFormProps {
    data: SocialLinks;
    onChange: (data: SocialLinks) => void;
}

export default function SocialLinksForm({ data, onChange }: SocialLinksFormProps) {
    const [customLinks, setCustomLinks] = useState<Array<{ key: string; value: string }>>(
        Object.entries(data)
            .filter(([key]) => !['linkedin', 'github', 'twitter', 'instagram'].includes(key))
            .map(([key, value]) => ({ key, value: value || '' }))
    );

    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    const addCustomLink = () => {
        const newLinks = [...customLinks, { key: '', value: '' }];
        setCustomLinks(newLinks);
    };

    const updateCustomLink = (index: number, field: 'key' | 'value', value: string) => {
        const newLinks = [...customLinks];
        newLinks[index][field] = value;
        setCustomLinks(newLinks);

        // Update data
        const newData = { ...data };
        if (newLinks[index].key && newLinks[index].value) {
            newData[newLinks[index].key] = newLinks[index].value;
        }
        onChange(newData);
    };

    const removeCustomLink = (index: number) => {
        const linkToRemove = customLinks[index];
        const newLinks = customLinks.filter((_, i) => i !== index);
        setCustomLinks(newLinks);

        // Remove from data
        const newData = { ...data };
        delete newData[linkToRemove.key];
        onChange(newData);
    };

    return (
        <div className="space-y-4">
            {/* LinkedIn */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Linkedin className="inline w-4 h-4 mr-2 text-blue-600" />
                    LinkedIn Username
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">linkedin.com/in/</span>
                    <input
                        type="text"
                        value={data.linkedin || ''}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                        placeholder="yourname"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* GitHub */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Github className="inline w-4 h-4 mr-2" />
                    GitHub Username
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">github.com/</span>
                    <input
                        type="text"
                        value={data.github || ''}
                        onChange={(e) => handleChange('github', e.target.value)}
                        placeholder="yourname"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Twitter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Twitter className="inline w-4 h-4 mr-2 text-blue-400" />
                    Twitter Username
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">twitter.com/</span>
                    <input
                        type="text"
                        value={data.twitter || ''}
                        onChange={(e) => handleChange('twitter', e.target.value)}
                        placeholder="yourname"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Instagram */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Instagram className="inline w-4 h-4 mr-2 text-pink-600" />
                    Instagram Username
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">instagram.com/</span>
                    <input
                        type="text"
                        value={data.instagram || ''}
                        onChange={(e) => handleChange('instagram', e.target.value)}
                        placeholder="yourname"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Custom Links */}
            {customLinks.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Links</h4>
                    {customLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={link.key}
                                onChange={(e) => updateCustomLink(index, 'key', e.target.value)}
                                placeholder="Platform name"
                                className="w-1/3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="url"
                                value={link.value}
                                onChange={(e) => updateCustomLink(index, 'value', e.target.value)}
                                placeholder="https://..."
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                onClick={() => removeCustomLink(index)}
                                className="px-3 py-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={addCustomLink}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Custom Link
            </button>
        </div>
    );
}
