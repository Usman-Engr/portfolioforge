"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Calendar, Download, Loader2 } from "lucide-react";
import AnalyticsOverview from "@/components/analytics/AnalyticsOverview";
import ViewsChart from "@/components/analytics/ViewsChart";
import TrafficSources from "@/components/analytics/TrafficSources";
import DeviceBreakdown from "@/components/analytics/DeviceBreakdown";
import InsightsPanel from "@/components/analytics/InsightsPanel";

interface AnalyticsData {
  overview: {
    totalViews: number;
    uniqueVisitors: number;
    avgTimeSpent: number;
    bounceRate: number;
  };
  chartData: Array<{ date: string; views: number }>;
  deviceBreakdown: Array<{ name: string; value: number }>;
  trafficSources: Array<{ name: string; value: number }>;
  geographicData: Array<{ name: string; value: number }>;
  recentViews: any[];
}

export default function AnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && id) {
      loadAnalytics();
    }
  }, [status, dateRange, id]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analytics/${id}?range=${dateRange}`);

      if (!response.ok) {
        throw new Error("Failed to load analytics");
      }

      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!analyticsData) return;

    const csvContent = [
      ["Metric", "Value"],
      ["Total Views", analyticsData.overview.totalViews],
      ["Unique Visitors", analyticsData.overview.uniqueVisitors],
      ["Avg. Time Spent (seconds)", analyticsData.overview.avgTimeSpent],
      ["Bounce Rate (%)", analyticsData.overview.bounceRate],
      [""],
      ["Date", "Views"],
      ...analyticsData.chartData.map((d) => [d.date, d.views]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${id}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Portfolio Analytics
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track your portfolio performance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Date Range Selector */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {["7", "30", "90"].map((days) => (
                  <button
                    key={days}
                    onClick={() => setDateRange(days)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      dateRange === days
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <AnalyticsOverview
            data={
              analyticsData?.overview || {
                totalViews: 0,
                uniqueVisitors: 0,
                avgTimeSpent: 0,
                bounceRate: 0,
              }
            }
            isLoading={isLoading}
          />

          {/* Views Chart */}
          <ViewsChart
            data={analyticsData?.chartData || []}
            isLoading={isLoading}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TrafficSources
              data={analyticsData?.trafficSources || []}
              isLoading={isLoading}
            />
            <DeviceBreakdown
              data={analyticsData?.deviceBreakdown || []}
              isLoading={isLoading}
            />
          </div>

          {/* Insights */}
          {analyticsData && (
            <InsightsPanel
              data={analyticsData.overview}
              trafficSources={analyticsData.trafficSources}
              deviceBreakdown={analyticsData.deviceBreakdown}
            />
          )}
        </div>
      </div>
    </div>
  );
}
