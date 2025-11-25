'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Plus, LogOut, User, Settings, ExternalLink, Edit, Trash2, Loader2 } from 'lucide-react';

interface Portfolio {
    id: string;
    slug: string;
    template_id: string;
    created_at: string;
    data: {
        personal: {
            name: string;
            title: string;
        };
    };
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/auth/login');
            return;
        }

        const fetchPortfolios = async () => {
            try {
                const response = await fetch('/api/portfolios');
                if (response.ok) {
                    const data = await response.json();
                    setPortfolios(data);
                }
            } catch (error) {
                console.error('Failed to fetch portfolios:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolios();
    }, [session, status, router]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this portfolio?')) return;

        try {
            const response = await fetch(`/api/portfolios/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPortfolios(portfolios.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete portfolio:', error);
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                PortfolioForge
                            </h1>
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {session.user?.name}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {session.user?.name?.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your portfolios and create new ones.
                    </p>
                </motion.div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/templates">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer group h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <Plus className="w-12 h-12 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                                        New
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Create Portfolio</h3>
                                <p className="text-blue-100">
                                    Choose from 3 stunning templates
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Settings className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            My Portfolios
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {portfolios.length} portfolios created
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <span className="text-2xl">✨</span>
                            </div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                                {session.user?.subscriptionStatus || 'Free'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Subscription
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Upgrade for premium templates
                        </p>
                    </motion.div>
                </div>

                {/* Portfolios List */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Portfolios</h3>

                {portfolios.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Plus className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                No portfolios yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Get started by creating your first portfolio. Choose from our beautiful templates.
                            </p>
                            <Link href="/templates">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create Your First Portfolio
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolios.map((portfolio, index) => (
                            <motion.div
                                key={portfolio.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-4xl">
                                        {portfolio.template_id === 'gradient-pro' ? '🎨' :
                                            portfolio.template_id === 'creative-studio' ? '⚡' : '📝'}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {portfolio.data.personal.name}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                                        {portfolio.data.personal.title}
                                    </p>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <Link
                                            href={`/p/${portfolio.slug}`}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            View
                                        </Link>
                                        <div className="flex gap-2">
                                            <Link href={`/builder?template=${portfolio.template_id}&portfolioId=${portfolio.id}`}>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(portfolio.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
