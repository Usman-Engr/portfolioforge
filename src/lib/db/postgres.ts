import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// Only initialize pool if connectionString is present, or throw when used
let pool: Pool | null = null;

const getPool = () => {
    if (pool) return pool;
    
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

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
    return pool!;
};

export const db = {
    query: (text: string, params?: any[]) => getPool().query(text, params),
};
