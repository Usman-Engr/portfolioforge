'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Check, Star, Zap, Layout } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const templates = [
    {
        id: 'minimal-pro',
        name: 'Minimal Pro',
        description: 'Clean, professional design perfect for developers.',
        price: 0,
        features: ['Responsive Design', 'Project Showcase', 'Contact Form', 'SEO Optimized'],
        icon: Layout,
        color: 'blue',
    },
    {
        id: 'gradient-pro',
        name: 'Gradient Pro',
        description: 'Modern, animated gradient design with glassmorphism.',
        price: 9.99,
        features: ['Animated Background', 'Glassmorphism UI', '3D Hover Effects', 'Smooth Scrolling'],
        icon: Zap,
        color: 'purple',
        isPremium: true,
    },
    {
        id: 'creative-studio',
        name: 'Creative Studio',
        description: 'Bold, dark mode design with neon accents.',
        price: 9.99,
        features: ['Dark Mode', 'Neon Effects', 'Masonry Grid', 'Custom Animations'],
        icon: Star,
        color: 'green',
        isPremium: true,
    },
];

export default function TemplatesPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const handleSelectTemplate = async (template: typeof templates[0]) => {
        if (!session) {
            router.push(`/auth/login?callbackUrl=/templates`);
            return;
        }

        if (template.price === 0) {
            // Free template - go straight to builder
            // In a real app, we might save this preference to DB first
            router.push(`/builder?template=${template.id}`);
        } else {
            // Premium template - check if already purchased (mock check for now)
            // In real implementation, we'd check DB here

            // Go to checkout
            router.push(`/checkout?template=${template.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Choose Your Template
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Select a professionally designed template to showcase your work.
                        Switch templates anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 ${template.isPremium
                                    ? 'border-purple-500 dark:border-purple-400'
                                    : 'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {template.isPremium && (
                                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                                    PREMIUM
                                </div>
                            )}

                            <div className={`h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                                <template.icon className={`w-20 h-20 text-${template.color}-500 opacity-50`} />
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {template.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 h-12">
                                    {template.description}
                                </p>

                                <div className="flex items-baseline mb-8">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                        {template.price === 0 ? 'Free' : `$${template.price}`}
                                    </span>
                                    {template.price > 0 && (
                                        <span className="text-gray-500 ml-2">one-time</span>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {template.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Check className="w-5 h-5 text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handleSelectTemplate(template)}
                                    className={`w-full py-4 text-lg ${template.isPremium
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                                            : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                                        }`}
                                >
                                    {template.price === 0 ? 'Start Building' : 'Buy Template'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
