import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const db = {
    // Portfolio operations
    async getPortfolioBySlug(slug: string) {
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) return null; // Return null if not found instead of throwing
        return data;
    },

    async getPortfolioById(id: string) {
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getPortfoliosByUserId(userId: string) {
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createPortfolio(portfolio: any) {
        // Ensure snake_case for DB
        const dbPortfolio = {
            user_id: portfolio.user_id,
            slug: portfolio.slug,
            data: portfolio.data,
            template_id: portfolio.template_id || portfolio.templateId,
            is_published: portfolio.is_published || portfolio.isPublished,
        };

        const { data, error } = await supabase
            .from('portfolios')
            .insert([dbPortfolio])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updatePortfolio(id: string, updates: any) {
        // Map camelCase to snake_case if needed
        const dbUpdates: any = { ...updates };
        if (updates.templateId) dbUpdates.template_id = updates.templateId;
        if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;

        // Remove camelCase keys to avoid DB errors
        delete dbUpdates.templateId;
        delete dbUpdates.isPublished;

        const { data, error } = await supabase
            .from('portfolios')
            .update(dbUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deletePortfolio(id: string) {
        const { error } = await supabase
            .from('portfolios')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async incrementViews(slug: string) {
        const { error } = await supabase.rpc('increment_views', { portfolio_slug: slug });
        if (error) console.error('Error incrementing views:', error);
    },

    // User operations
    async getUserById(id: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    },

    async updateUserSubscription(userId: string, status: 'free' | 'premium') {
        const { data, error } = await supabase
            .from('users')
            .update({ subscription_status: status })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};
