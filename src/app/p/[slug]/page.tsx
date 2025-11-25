import { notFound } from 'next/navigation';
import { db } from '@/lib/db/postgres';
import { PortfolioData } from '@/lib/types/portfolio';

// Template components (will be created in Phase 3)
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';

interface PageProps {
    params: { slug: string };
}

async function getPortfolio(slug: string) {
    try {
        const result = await db.query(
            `SELECT id, user_id, slug, data, template_id, is_published, view_count
       FROM public.app_portfolios 
       WHERE slug = $1 AND is_published = true
       LIMIT 1`,
            [slug]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('[GET_PORTFOLIO]', error);
        return null;
    }
}

async function incrementViewCount(slug: string) {
    try {
        await db.query(
            'UPDATE public.app_portfolios SET view_count = view_count + 1 WHERE slug = $1',
            [slug]
        );
    } catch (error) {
        console.error('[INCREMENT_VIEW]', error);
    }
}

export async function generateMetadata({ params }: PageProps) {
    const portfolio = await getPortfolio(params.slug);

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
    const portfolio = await getPortfolio(params.slug);

    if (!portfolio) {
        notFound();
    }

    // Increment view count (async, don't wait)
    incrementViewCount(params.slug);

    const data: PortfolioData = typeof portfolio.data === 'string'
        ? JSON.parse(portfolio.data)
        : portfolio.data;

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
                            const portfolioId = '${portfolio.id}';
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

            {/* Share buttons */}
            <div className="fixed bottom-8 right-8 flex gap-2">
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                    }}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:scale-110 transition-transform"
                    title="Copy link"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
