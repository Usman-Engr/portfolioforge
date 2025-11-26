import { notFound } from 'next/navigation';
import { supabase } from '@/lib/db/supabase';
import { PortfolioData } from '@/lib/types/portfolio';
import { serializePortfolio } from '@/lib/utils/serialization';
import ShareButton from '@/components/portfolio/ShareButton';

// Template components (will be created in Phase 3)
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';

interface PageProps {
    params: { slug: string };
}

async function getPortfolio(slug: string) {
    try {
        const { data, error } = await supabase
            .from('app_portfolios')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single();

        if (error || !data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('[GET_PORTFOLIO]', error);
        return null;
    }
}

async function incrementViewCount(slug: string) {
    try {
        const { data: portfolio } = await supabase
            .from('app_portfolios')
            .select('view_count')
            .eq('slug', slug)
            .single();

        if (portfolio) {
            await supabase
                .from('app_portfolios')
                .update({ view_count: (portfolio.view_count || 0) + 1 })
                .eq('slug', slug);
        }
    } catch (error) {
        console.error('[INCREMENT_VIEW]', error);
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const portfolio = await getPortfolio(slug);

    if (!portfolio) {
        return {
            title: 'Portfolio Not Found',
        };
    }

    const data: PortfolioData = typeof portfolio.data === 'string'
        ? JSON.parse(portfolio.data)
        : portfolio.data;

    return {
        title: `${data.personal.name} - Portfolio`,
        description: data.personal.bio,
        openGraph: {
            title: `${data.personal.name} - ${data.personal.title}`,
            description: data.personal.bio,
            images: data.personal.avatar ? [data.personal.avatar] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.personal.name} - ${data.personal.title}`,
            description: data.personal.bio,
            images: data.personal.avatar ? [data.personal.avatar] : [],
        },
    };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
    const { slug } = await params;
    const rawPortfolio = await getPortfolio(slug);

    if (!rawPortfolio) {
        notFound();
    }

    // Serialize portfolio to convert all Date objects to strings
    const portfolio = serializePortfolio(rawPortfolio);

    // Increment view count (async, don't wait)
    incrementViewCount(slug);

    const data: PortfolioData = typeof portfolio.data === 'string'
        ? JSON.parse(portfolio.data)
        : portfolio.data;

    // Extract ID as separate variable to avoid serializing entire portfolio object
    const portfolioId = portfolio.id;

    // Render template based on template_id
    // For now, we'll use MinimalProTemplate as default
    const TemplateComponent = MinimalProTemplate;

    return (
        <div className="min-h-screen">
            <TemplateComponent data={data} />

            {/* Analytics Tracking */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            const portfolioId = '${portfolioId}';
                            const sessionKey = 'portfolio_session_id';
                            let sessionId = sessionStorage.getItem(sessionKey);
                            
                            if (!sessionId) {
                                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                                sessionStorage.setItem(sessionKey, sessionId);
                            }
                            
                            const getDeviceType = () => {
                                const width = window.innerWidth;
                                if (width < 768) return 'mobile';
                                if (width < 1024) return 'tablet';
                                return 'desktop';
                            };
                            
                            const getBrowser = () => {
                                const ua = navigator.userAgent;
                                if (ua.includes('Firefox')) return 'Firefox';
                                if (ua.includes('Chrome')) return 'Chrome';
                                if (ua.includes('Safari')) return 'Safari';
                                if (ua.includes('Edge')) return 'Edge';
                                return 'Unknown';
                            };
                            
                            let viewId = null;
                            const startTime = Date.now();
                            
                            // Track page view
                            fetch('/api/analytics/track', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    portfolioId: portfolioId,
                                    sessionId: sessionId,
                                    referrer: document.referrer || 'Direct',
                                    deviceType: getDeviceType(),
                                    browser: getBrowser()
                                })
                            })
                            .then(res => res.json())
                            .then(data => {
                                viewId = data.data?.id;
                            })
                            .catch(err => console.error('Tracking error:', err));
                            
                            // Update time spent every 10 seconds
                            setInterval(() => {
                                if (viewId) {
                                    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
                                    fetch('/api/analytics/track', {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ viewId, timeSpent })
                                    });
                                }
                            }, 10000);
                            
                            // Update on page unload
                            window.addEventListener('beforeunload', () => {
                                if (viewId) {
                                    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
                                    navigator.sendBeacon('/api/analytics/track', 
                                        JSON.stringify({ viewId, timeSpent })
                                    );
                                }
                            });
                        })();
                    `,
                }}
            />

            {/* Share button */}
            <ShareButton />
        </div>
    );
}
