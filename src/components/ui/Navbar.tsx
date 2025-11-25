'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            PortfolioForge
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/#templates" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                            Templates
                        </Link>
                        <Link href="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                            Pricing
                        </Link>
                        <Link href="/p/demo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                            Demo
                        </Link>
                        <Link href="/builder">
                            <Button>Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <Link
                            href="/#templates"
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Templates
                        </Link>
                        <Link
                            href="/#pricing"
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/p/demo"
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Demo
                        </Link>
                        <Link href="/builder" onClick={() => setIsOpen(false)}>
                            <Button className="w-full">Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
