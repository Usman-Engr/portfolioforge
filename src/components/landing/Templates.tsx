'use client';

import React from 'react';
import { motion } from 'framer-motion';

const templates = [
    {
        id: 'minimal-pro',
        name: 'Minimal Pro',
        description: 'Clean and professional design perfect for developers',
        isPremium: false,
    },
    {
        id: 'modern-card',
        name: 'Modern Card',
        description: 'Card-based layout with subtle animations',
        isPremium: false,
    },
    {
        id: 'creative-grid',
        name: 'Creative Grid',
        description: 'Bold design with masonry-style project showcase',
        isPremium: false,
    },
];

export const Templates = () => {
    return (
        <section id="templates" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Beautiful Templates
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Choose from our collection of professionally designed templates
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                                {/* Placeholder for template preview */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-sm">Template Preview</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {template.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {template.description}
                                </p>
                                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
                                    Preview Template →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
