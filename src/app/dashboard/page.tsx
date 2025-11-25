'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, Eye, Edit, Trash2, ExternalLink, Copy, Loader2, MoreVertical, Activity, Settings } from 'lucide-react';

interface Portfolio {
    id: string;
    slug: string;
    template_id: string;
    is_published: boolean;
    view_count: number;
    data: any;
    created_at: string;
    updated_at: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/dashboard');
            return;
        }

        if (status === 'authenticated') {
            loadPortfolios();
        }
    }, [status, router]);

    const loadPortfolios = async () => {
        try {
            const response = await fetch('/api/portfolios');
            if (response.ok) {
                const data = await response.json();
                setPortfolios(data);
            }
        } catch (error) {
            console.error('Failed to load portfolios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/portfolios/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPortfolios(portfolios.filter(p => p.id !== id));
            } else {
                alert('Failed to delete portfolio');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete portfolio');
        } finally {
            setDeletingId(null);
        }
    };

    const handleTogglePublish = async (portfolio: Portfolio) => {
        try {
            const response = await fetch(`/api/portfolios/${portfolio.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...portfolio,
                    is_published: !portfolio.is_published,
                }),
            });

            if (response.ok) {
                loadPortfolios();
            }
        } catch (error) {
            console.error('Toggle publish error:', error);
        }
    };

    const handleDuplicate = async (portfolio: Portfolio) => {
        try {
            const response = await fetch('/api/portfolios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: `${portfolio.slug}-copy`,
                    data: portfolio.data,
                    templateId: portfolio.template_id,
                    isPublished: false,
                }),
            });

            if (response.ok) {
                loadPortfolios();
            }
        } catch (error) {
            console.error('Duplicate error:', error);
        }
    };

    const copyLink = (slug: string) => {
        const url = `${window.location.origin}/p/${slug}`;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            My Portfolios
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and track your portfolio websites
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/templates')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Portfolio
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        label="Total Portfolios"
                        value={portfolios.length}
                        icon="📁"
                    />
                    <StatCard
                        label="Published"
                        value={portfolios.filter(p => p.is_published).length}
                        icon="🚀"
                    />
                    <StatCard
                        label="Total Views"
                        value={portfolios.reduce((sum, p) => sum + (p.view_count || 0), 0)}
                        icon="👁️"
                    />
                    <StatCard
                        label="Drafts"
                        value={portfolios.filter(p => !p.is_published).length}
                        icon="📝"
                    />
                </div>

                {/* Portfolio Grid */}
                {portfolios.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📁</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No portfolios yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Create your first portfolio to get started
                        </p>
                        <button
                            onClick={() => router.push('/templates')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Create Portfolio
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolios.map((portfolio) => (
                            <PortfolioCard
                                key={portfolio.id}
                                portfolio={portfolio}
                                onEdit={() => router.push(`/builder-new?portfolioId=${portfolio.id}`)}
                                onDelete={() => handleDelete(portfolio.id)}
                                onTogglePublish={() => handleTogglePublish(portfolio)}
                                onDuplicate={() => handleDuplicate(portfolio)}
                                onCopyLink={() => copyLink(portfolio.slug)}
                                isDeleting={deletingId === portfolio.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
                <div className="text-4xl">{icon}</div>
            </div>
        </div>
    );
}

// Portfolio Card Component
function PortfolioCard({
    portfolio,
    onEdit,
    onDelete,
    onTogglePublish,
    onDuplicate,
    onCopyLink,
    isDeleting
}: {
    portfolio: Portfolio;
    onEdit: () => void;
    onDelete: () => void;
    onTogglePublish: () => void;
    onDuplicate: () => void;
    onCopyLink: () => void;
    isDeleting: boolean;
}) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <div className="text-center">
                        <div className="text-5xl mb-2">🎨</div>
                        <p className="text-sm">{portfolio.template_id}</p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    {portfolio.is_published ? (
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                            Published
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-semibold">
                            Draft
                        </span>
                    )}
                </div>

                {/* Actions Menu */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-10">
                            <button
                                onClick={() => { onEdit(); setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => { window.location.href = `/dashboard/settings/${portfolio.id}`; setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                            <button
                                onClick={() => { window.location.href = `/dashboard/analytics/${portfolio.id}`; setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Activity className="w-4 h-4" />
                                View Analytics
                            </button>
                            <button
                                onClick={() => { onDuplicate(); setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Duplicate
                            </button>
                            <button
                                onClick={() => { onTogglePublish(); setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {portfolio.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <hr className="my-2 border-gray-200 dark:border-gray-700" />
                            <button
                                onClick={() => { onDelete(); setShowMenu(false); }}
                                disabled={isDeleting}
                                className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2 disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {portfolio.data?.personal?.name || 'Untitled Portfolio'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    /{portfolio.slug}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{portfolio.view_count || 0} views</span>
                    </div>
                    <div>
                        Updated {new Date(portfolio.updated_at).toLocaleDateString()}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onEdit}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                    {portfolio.is_published && (
                        <button
                            onClick={onCopyLink}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            title="Copy link"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
