'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Pricing = () => {
    return (
        <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Start for free, upgrade when you need more
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700"
                    >
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Free
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                    $0
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    /forever
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <Feature text="2 Basic Templates" />
                            <Feature text="Shareable Portfolio Link" />
                            <Feature text="Basic Analytics" />
                            <Feature text="Unlimited Edits" />
                            <Feature text="Mobile Responsive" />
                        </ul>

                        <Link href="/builder" className="block">
                            <Button variant="secondary" className="w-full">
                                Get Started Free
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Premium Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                            Popular
                        </div>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Premium
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-white">
                                    $--
                                </span>
                                <span className="text-blue-100">
                                    /month
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <Feature text="All Premium Templates" light />
                            <Feature text="Custom Domain Support" light />
                            <Feature text="Advanced Analytics" light />
                            <Feature text="Remove Branding" light />
                            <Feature text="Priority Support" light />
                            <Feature text="Animated Components" light />
                        </ul>

                        <Link href="/builder" className="block">
                            <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-100">
                                Upgrade to Premium
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Feature = ({ text, light = false }: { text: string; light?: boolean }) => {
    return (
        <li className="flex items-center gap-3">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${light ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900'
                }`}>
                <Check className={`w-3 h-3 ${light ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
            </div>
            <span className={light ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                {text}
            </span>
        </li>
    );
};
