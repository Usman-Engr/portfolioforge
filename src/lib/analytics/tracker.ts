// Analytics tracking utilities for client-side

export interface TrackingData {
    portfolioId: string;
    sessionId: string;
    referrer?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
    browser?: string;
    country?: string;
    city?: string;
    timeSpent?: number;
}

// Generate or retrieve session ID
export function getSessionId(): string {
    const SESSION_KEY = 'portfolio_session_id';
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
}

// Detect device type
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;

    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// Get browser name
export function getBrowser(): string {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';

    return 'Unknown';
}

// Track page view
export async function trackPageView(portfolioId: string): Promise<string | null> {
    try {
        const trackingData: TrackingData = {
            portfolioId,
            sessionId: getSessionId(),
            referrer: document.referrer || 'Direct',
            deviceType: getDeviceType(),
            browser: getBrowser(),
        };

        const response = await fetch('/api/analytics/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingData),
        });

        if (!response.ok) {
            console.error('Failed to track page view');
            return null;
        }

        const data = await response.json();
        return data.data?.id || null;
    } catch (error) {
        console.error('Error tracking page view:', error);
        return null;
    }
}

// Update time spent on page
export async function updateTimeSpent(viewId: string, timeSpent: number): Promise<void> {
    try {
        await fetch('/api/analytics/track', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ viewId, timeSpent }),
        });
    } catch (error) {
        console.error('Error updating time spent:', error);
    }
}

// Hook to track time on page
export function usePageTracking(portfolioId: string) {
    if (typeof window === 'undefined') return;

    let viewId: string | null = null;
    let startTime = Date.now();
    let timeSpentInterval: NodeJS.Timeout;

    // Track initial page view
    trackPageView(portfolioId).then((id) => {
        viewId = id;
    });

    // Update time spent every 10 seconds
    timeSpentInterval = setInterval(() => {
        if (viewId) {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            updateTimeSpent(viewId, timeSpent);
        }
    }, 10000);

    // Update on page unload
    const handleUnload = () => {
        if (viewId) {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            // Use sendBeacon for reliable tracking on page unload
            navigator.sendBeacon(
                '/api/analytics/track',
                JSON.stringify({ viewId, timeSpent })
            );
        }
    };

    window.addEventListener('beforeunload', handleUnload);

    // Cleanup
    return () => {
        clearInterval(timeSpentInterval);
        window.removeEventListener('beforeunload', handleUnload);
    };
}

// Format time duration
export function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 60) {
        return remainingSeconds > 0
            ? `${minutes}m ${remainingSeconds}s`
            : `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
}

// Format large numbers
export function formatNumber(num: number): string {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
}
