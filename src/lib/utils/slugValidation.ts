// Slug validation utilities
export const validateSlug = (slug: string): boolean => {
    // Only lowercase letters, numbers, and hyphens
    const regex = /^[a-z0-9-]+$/;
    const isValidFormat = regex.test(slug);
    const isValidLength = slug.length >= 3 && slug.length <= 50;

    return isValidFormat && isValidLength;
};

export const sanitizeSlug = (input: string): string => {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-') // Replace invalid chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

export const checkSlugAvailability = async (slug: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/portfolios/check-slug?slug=${encodeURIComponent(slug)}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Error checking slug availability:', error);
        return false;
    }
};
