'use client';

import { ContactInfo } from '@/lib/types/portfolio';
import { Mail, Phone, Globe } from 'lucide-react';

interface ContactInfoFormProps {
    data: ContactInfo;
    onChange: (data: ContactInfo) => void;
}

export default function ContactInfoForm({ data, onChange }: ContactInfoFormProps) {
    const handleChange = (field: keyof ContactInfo, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email *
                </label>
                <input
                    type="email"
                    value={data.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone
                </label>
                <input
                    type="tel"
                    value={data.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Globe className="inline w-4 h-4 mr-2" />
                    Website
                </label>
                <input
                    type="url"
                    value={data.website || ''}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                * Required field
            </p>
        </div>
    );
}
