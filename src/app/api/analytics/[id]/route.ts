import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/db/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        const { id: portfolioId } = params;
        const searchParams = request.nextUrl.searchParams;
        const range = searchParams.get('range') || '30'; // days

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify user owns this portfolio
        const { data: portfolio, error: portfolioError } = await supabase
            .from('portfolios')
            .select('id, user_id')
            .eq('id', portfolioId)
            .single();

        if (portfolioError || !portfolio || portfolio.user_id !== user.id) {
            return NextResponse.json(
                { error: 'Portfolio not found or unauthorized' },
                { status: 404 }
            );
        }

        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(range));

        // Get overview stats
        const { data: overviewData, error: overviewError } = await supabase
            .from('portfolio_views')
            .select('*')
            .eq('portfolio_id', portfolioId)
            .gte('viewed_at', startDate.toISOString())
            .lte('viewed_at', endDate.toISOString());

        if (overviewError) {
            console.error('Error fetching overview:', overviewError);
            return NextResponse.json(
                { error: 'Failed to fetch analytics' },
                { status: 500 }
            );
        }

        // Calculate metrics
        const totalViews = overviewData.length;
        const uniqueVisitors = new Set(overviewData.map(v => v.session_id)).size;
        const avgTimeSpent = overviewData.length > 0
            ? Math.round(overviewData.reduce((sum, v) => sum + (v.time_spent || 0), 0) / overviewData.length)
            : 0;
        const bounceRate = overviewData.length > 0
            ? ((overviewData.filter(v => (v.time_spent || 0) < 10).length / overviewData.length) * 100).toFixed(2)
            : '0.00';

        // Group by date for chart
        const viewsByDate = overviewData.reduce((acc: any, view) => {
            const date = new Date(view.viewed_at).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.entries(viewsByDate).map(([date, views]) => ({
            date,
            views
        }));

        // Group by device type
        const deviceBreakdown = overviewData.reduce((acc: any, view) => {
            const device = view.device_type || 'unknown';
            acc[device] = (acc[device] || 0) + 1;
            return acc;
        }, {});

        // Group by referrer
        const trafficSources = overviewData.reduce((acc: any, view) => {
            const referrer = view.referrer || 'Direct';
            const source = referrer === 'Direct' ? 'Direct' : new URL(referrer).hostname;
            acc[source] = (acc[source] || 0) + 1;
            return acc;
        }, {});

        // Group by country
        const geographicData = overviewData.reduce((acc: any, view) => {
            const country = view.country || 'Unknown';
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {});

        // Get daily summary data
        const { data: summaryData, error: summaryError } = await supabase
            .from('portfolio_analytics_summary')
            .select('*')
            .eq('portfolio_id', portfolioId)
            .gte('date', startDate.toISOString().split('T')[0])
            .lte('date', endDate.toISOString().split('T')[0])
            .order('date', { ascending: true });

        // Recent views
        const { data: recentViews, error: recentError } = await supabase
            .from('portfolio_views')
            .select('*')
            .eq('portfolio_id', portfolioId)
            .order('viewed_at', { ascending: false })
            .limit(10);

        return NextResponse.json({
            overview: {
                totalViews,
                uniqueVisitors,
                avgTimeSpent,
                bounceRate: parseFloat(bounceRate)
            },
            chartData,
            deviceBreakdown: Object.entries(deviceBreakdown).map(([name, value]) => ({
                name,
                value
            })),
            trafficSources: Object.entries(trafficSources).map(([name, value]) => ({
                name,
                value
            })),
            geographicData: Object.entries(geographicData).map(([name, value]) => ({
                name,
                value
            })),
            summaryData: summaryData || [],
            recentViews: recentViews || []
        });
    } catch (error) {
        console.error('Error in analytics endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
