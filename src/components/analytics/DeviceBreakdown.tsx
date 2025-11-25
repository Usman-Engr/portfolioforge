'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DeviceData {
    name: string;
    value: number;
}

interface DeviceBreakdownProps {
    data: DeviceData[];
    isLoading?: boolean;
}

const deviceIcons: Record<string, any> = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet,
};

export default function DeviceBreakdown({ data, isLoading }: DeviceBreakdownProps) {
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
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h3>
                <div className="h-80 flex items-center justify-center text-gray-500">
                    No device data available
                </div>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h3>

            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        style={{ fontSize: '12px', textTransform: 'capitalize' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        labelStyle={{ color: '#374151', fontWeight: 600, textTransform: 'capitalize' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            {/* Device Stats */}
            <div className="mt-6 space-y-3">
                {data.map((device) => {
                    const Icon = deviceIcons[device.name.toLowerCase()] || Monitor;
                    const percentage = ((device.value / total) * 100).toFixed(1);

                    return (
                        <div key={device.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 capitalize">{device.name}</p>
                                    <p className="text-xs text-gray-500">{percentage}% of traffic</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">{device.value}</p>
                                <p className="text-xs text-gray-500">views</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
