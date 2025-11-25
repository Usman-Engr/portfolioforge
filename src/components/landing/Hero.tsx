'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, Zap, Globe, Lock } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 pt-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            No coding required
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Build Your Portfolio
                        <br />
                        In Minutes
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                        Create a stunning professional portfolio with just a few clicks.
                        No design skills needed. Choose a template, fill in your details, and share your unique link.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link href="/builder">
                            <Button size="lg" className="text-lg px-8 py-4">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/p/demo">
                            <Button variant="ghost" size="lg" className="text-lg">
                                View Examples
                            </Button>
                        </Link>
                    </div>

                    {/* Feature highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Zap className="w-6 h-6" />}
                            title="Lightning Fast"
                            description="Create your portfolio in under 5 minutes"
                        />
                        <FeatureCard
                            icon={<Globe className="w-6 h-6" />}
                            title="Instant Sharing"
                            description="Get a shareable link immediately"
                        />
                        <FeatureCard
                            icon={<Lock className="w-6 h-6" />}
                            title="Always Yours"
                            description="Edit and update anytime you want"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                {description}
            </p>
        </div>
    );
};
