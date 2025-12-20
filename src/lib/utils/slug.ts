/**
 * Slug utility functions for portfolio URLs
 * Handles slug generation, validation, and sanitization
 */

/**
 * Generate a URL-friendly slug from a name
 * @param name - The name to convert to a slug
 * @returns A URL-safe slug
 */
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        // Replace spaces with hyphens
        .replace(/\s+/g, '-')
        // Remove special characters except hyphens
        .replace(/[^\w\-]+/g, '')
        // Replace multiple hyphens with single hyphen
        .replace(/\-\-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

/**
 * Validate a slug format
 * @param slug - The slug to validate
 * @returns True if slug is valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
    // Slug should only contain lowercase letters, numbers, and hyphens
    // Should not start or end with a hyphen
    // Should be between 3 and 50 characters
    const slugRegex = /^[a-z0-9]([a-z0-9-]{1,48}[a-z0-9])?$/;
    return slugRegex.test(slug);
}

/**
 * Check if a slug is available (not taken)
 * @param slug - The slug to check
 * @param currentPortfolioId - Optional ID of current portfolio (for editing)
 * @returns Promise<boolean> - True if available, false if taken
 */
export async function isSlugAvailable(slug: string, currentPortfolioId?: string): Promise<boolean> {
    try {
        const params = new URLSearchParams({ slug });
        if (currentPortfolioId) {
            params.append('currentId', currentPortfolioId);
        }

        const response = await fetch(`/api/portfolios/check-slug?${params.toString()}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Error checking slug availability:', error);
        return false;
    }
}

/**
 * Generate slug suggestions if the desired slug is taken
 * @param baseSlug - The base slug to generate suggestions from
 * @returns Array of suggested slugs
 */
export function generateSlugSuggestions(baseSlug: string): string[] {
    const suggestions: string[] = [];
    const cleanSlug = generateSlug(baseSlug);

    // Add numbered variations
    for (let i = 1; i <= 5; i++) {
        suggestions.push(`${cleanSlug}-${i}`);
    }

    // Add year variation
    const currentYear = new Date().getFullYear();
    suggestions.push(`${cleanSlug}-${currentYear}`);

    // Add random suffix
    const randomSuffix = Math.floor(Math.random() * 1000);
    suggestions.push(`${cleanSlug}-${randomSuffix}`);

    return suggestions;
}

/**
 * Sanitize a slug to ensure it's safe for use
 * @param slug - The slug to sanitize
 * @returns Sanitized slug
 */
export function sanitizeSlug(slug: string): string {
    const sanitized = generateSlug(slug);

    // Ensure minimum length
    if (sanitized.length < 3) {
        return `portfolio-${sanitized}`;
    }

    // Ensure maximum length
    if (sanitized.length > 50) {
        return sanitized.substring(0, 50).replace(/-+$/, '');
    }

    return sanitized;
}

/**
 * Reserved slugs that cannot be used
 */
const RESERVED_SLUGS = [
    'admin',
    'api',
    'auth',
    'dashboard',
    'builder',
    'templates',
    'settings',
    'profile',
    'checkout',
    'login',
    'signup',
    'logout',
    'help',
    'support',
    'about',
    'contact',
    'terms',
    'privacy',
    'pricing',
    'demo',
    'test',
    'example',
];

/**
 * Check if a slug is reserved
 * @param slug - The slug to check
 * @returns True if reserved, false otherwise
 */
export function isReservedSlug(slug: string): boolean {
    return RESERVED_SLUGS.includes(slug.toLowerCase());
}

/**
 * Validate slug with all checks (format, reserved, length)
 * @param slug - The slug to validate
 * @returns Object with validation result and error message
 */
export function validateSlug(slug: string): { valid: boolean; error?: string } {
    if (!slug || slug.trim().length === 0) {
        return { valid: false, error: 'Slug cannot be empty' };
    }

    if (slug.length < 3) {
        return { valid: false, error: 'Slug must be at least 3 characters long' };
    }

    if (slug.length > 50) {
        return { valid: false, error: 'Slug must be less than 50 characters' };
    }

    if (isReservedSlug(slug)) {
        return { valid: false, error: 'This slug is reserved and cannot be used' };
    }

    if (!isValidSlug(slug)) {
        return {
            valid: false,
            error: 'Slug can only contain lowercase letters, numbers, and hyphens',
        };
    }

    return { valid: true };
}
