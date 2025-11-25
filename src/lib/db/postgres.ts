import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}

// Use a global variable to prevent multiple pools in development (hot reloading)
let pool: Pool;

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false // Required for Supabase
        }
    });
} else {
    if (!(global as any).postgresPool) {
        (global as any).postgresPool = new Pool({
            connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    pool = (global as any).postgresPool;
}

export const db = {
    query: (text: string, params?: any[]) => pool.query(text, params),
};
