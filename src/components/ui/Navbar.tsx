'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const { data: session, status } = useSession();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

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
                        <Link href="/templates" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                            Templates
                        </Link>
                        {status === 'authenticated' ? (
                            <>
                                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                                            {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {session?.user?.name || session?.user?.email?.split('@')[0]}
                                        </span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {session?.user?.name || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {session?.user?.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    handleSignOut();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                                    Pricing
                                </Link>
                                <Link href="/auth/login">
                                    <Button variant="outline">Sign In</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button>Get Started</Button>
                                </Link>
                            </>
                        )}
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
                            href="/templates"
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Templates
                        </Link>

                        {status === 'authenticated' ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleSignOut();
                                    }}
                                    className="w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/#pricing"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Pricing
                                </Link>
                                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full">Sign In</Button>
                                </Link>
                                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};
