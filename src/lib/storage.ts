// Local Storage utility for portfolio data
import { PortfolioData } from '@/types';

const STORAGE_KEY = 'portfolioforge_data';

export const storage = {
    // Save portfolio to local storage
    savePortfolio: (data: PortfolioData): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving portfolio:', error);
        }
    },

    // Load portfolio from local storage
    loadPortfolio: (): PortfolioData | null => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading portfolio:', error);
            return null;
        }
    },

    // Clear portfolio from local storage
    clearPortfolio: (): void => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing portfolio:', error);
        }
    },

    // Generate a unique slug from name
    generateSlug: (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
    },
};
