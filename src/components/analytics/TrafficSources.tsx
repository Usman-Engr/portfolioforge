'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TrafficSource {
    name: string;
    value: number;
}

interface TrafficSourcesProps {
    data: TrafficSource[];
    isLoading?: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function TrafficSources({ data, isLoading }: TrafficSourcesProps) {
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
                <div className="h-80 flex items-center justify-center text-gray-500">
                    No traffic data available
                </div>
            </div>
        );
    }

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => {
                            const percent = entry.percent || 0;
                            return `${entry.name} ${(percent * 100).toFixed(0)}%`;
                        }}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-6 space-y-2">
                {data.map((source, index) => (
                    <div key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-sm text-gray-700">{source.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-900">{source.value}</span>
                            <span className="text-xs text-gray-500">
                                {((source.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
