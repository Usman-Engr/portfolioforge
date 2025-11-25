'use client';

import { TrendingUp, TrendingDown, Lightbulb, Target } from 'lucide-react';

interface InsightsPanelProps {
    data: {
        totalViews: number;
        uniqueVisitors: number;
        avgTimeSpent: number;
        bounceRate: number;
    };
    trafficSources: Array<{ name: string; value: number }>;
    deviceBreakdown: Array<{ name: string; value: number }>;
}

export default function InsightsPanel({ data, trafficSources, deviceBreakdown }: InsightsPanelProps) {
    const insights = [];

    // Engagement insight
    if (data.avgTimeSpent > 120) {
        insights.push({
            type: 'positive',
            icon: TrendingUp,
            title: 'Great Engagement',
            description: `Visitors spend an average of ${Math.floor(data.avgTimeSpent / 60)} minutes on your portfolio, indicating strong interest.`,
        });
    } else if (data.avgTimeSpent < 30) {
        insights.push({
            type: 'warning',
            icon: TrendingDown,
            title: 'Low Engagement',
            description: 'Visitors are leaving quickly. Consider adding more engaging content or improving your portfolio design.',
        });
    }

    // Bounce rate insight
    if (data.bounceRate < 40) {
        insights.push({
            type: 'positive',
            icon: TrendingUp,
            title: 'Low Bounce Rate',
            description: `Only ${data.bounceRate.toFixed(1)}% of visitors leave immediately. Your portfolio is keeping visitors engaged!`,
        });
    } else if (data.bounceRate > 70) {
        insights.push({
            type: 'warning',
            icon: TrendingDown,
            title: 'High Bounce Rate',
            description: 'Many visitors are leaving quickly. Try improving your introduction or adding a compelling hero section.',
        });
    }

    // Traffic source insight
    const topSource = trafficSources.length > 0 ? trafficSources[0] : null;
    if (topSource && topSource.name !== 'Direct') {
        insights.push({
            type: 'info',
            icon: Lightbulb,
            title: 'Top Traffic Source',
            description: `Most of your traffic comes from ${topSource.name}. Consider optimizing your presence there.`,
        });
    } else if (topSource && topSource.name === 'Direct') {
        insights.push({
            type: 'info',
            icon: Lightbulb,
            title: 'Direct Traffic Dominant',
            description: 'Most visitors come directly to your portfolio. Consider sharing it on social media to increase reach.',
        });
    }

    // Device insight
    const mobileTraffic = deviceBreakdown.find(d => d.name.toLowerCase() === 'mobile');
    const totalDeviceViews = deviceBreakdown.reduce((sum, d) => sum + d.value, 0);
    const mobilePercentage = mobileTraffic ? (mobileTraffic.value / totalDeviceViews) * 100 : 0;

    if (mobilePercentage > 60) {
        insights.push({
            type: 'info',
            icon: Lightbulb,
            title: 'Mobile-First Audience',
            description: `${mobilePercentage.toFixed(0)}% of your visitors use mobile devices. Ensure your portfolio is mobile-optimized.`,
        });
    }

    // Growth opportunity
    if (data.totalViews < 100) {
        insights.push({
            type: 'suggestion',
            icon: Target,
            title: 'Growth Opportunity',
            description: 'Share your portfolio on LinkedIn, Twitter, and other platforms to increase visibility and reach more people.',
        });
    }

    const iconColors = {
        positive: 'text-green-600 bg-green-50',
        warning: 'text-orange-600 bg-orange-50',
        info: 'text-blue-600 bg-blue-50',
        suggestion: 'text-purple-600 bg-purple-50',
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights & Recommendations</h3>

            {insights.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Not enough data yet. Keep sharing your portfolio to get insights!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {insights.map((insight, index) => {
                        const Icon = insight.icon;
                        return (
                            <div
                                key={index}
                                className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[insight.type as keyof typeof iconColors]}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                                    <p className="text-sm text-gray-600">{insight.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
