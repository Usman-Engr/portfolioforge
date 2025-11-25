'use client';

import { TrendingUp, Users, Clock, Activity } from 'lucide-react';
import { formatNumber, formatDuration } from '@/lib/analytics/tracker';

interface OverviewData {
    totalViews: number;
    uniqueVisitors: number;
    avgTimeSpent: number;
    bounceRate: number;
}

interface AnalyticsOverviewProps {
    data: OverviewData;
    isLoading?: boolean;
}

export default function AnalyticsOverview({ data, isLoading }: AnalyticsOverviewProps) {
    const stats = [
        {
            label: 'Total Views',
            value: formatNumber(data.totalViews),
            icon: Activity,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Unique Visitors',
            value: formatNumber(data.uniqueVisitors),
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Avg. Time Spent',
            value: formatDuration(data.avgTimeSpent),
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            label: 'Bounce Rate',
            value: `${data.bounceRate.toFixed(1)}%`,
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
