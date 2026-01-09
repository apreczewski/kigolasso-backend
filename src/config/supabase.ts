import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const nodeEnv = process.env.NODE_ENV || 'development';

// Check if we're using placeholder/development values
const isPlaceholderUrl = !supabaseUrl || 
  supabaseUrl.includes('your-project-id') ||
  supabaseUrl === 'https://your-project-id.supabase.co';

const isPlaceholderKey = !supabaseServiceRoleKey ||
  supabaseServiceRoleKey.includes('your-service-role-key') ||
  supabaseServiceRoleKey === 'your-service-role-key-here';

const isDevelopmentMode = nodeEnv === 'development' && (isPlaceholderUrl || isPlaceholderKey);

// Create mock Supabase client for development mode
const createMockSupabaseClient = (): Partial<SupabaseClient> => {
  console.warn('🚧 DEVELOPMENT MODE: Using mock Supabase client');
  console.warn('   Real Supabase operations will not work until proper credentials are configured');
  console.warn('   Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');

  return {
    auth: {
      // Mock auth methods that might be called
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Mock client - authentication not available' } }),
      signOut: async () => ({ error: null }),
    } as any,
    
    // Mock database methods
    from: (table: string) => ({
      select: () => ({ data: [], error: null, count: 0 }),
      insert: () => ({ data: null, error: { message: 'Mock client - database operations not available' } }),
      update: () => ({ data: null, error: { message: 'Mock client - database operations not available' } }),
      delete: () => ({ data: null, error: { message: 'Mock client - database operations not available' } }),
      upsert: () => ({ data: null, error: { message: 'Mock client - database operations not available' } }),
    }) as any,

    // Mock storage
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: { message: 'Mock client - storage not available' } }),
        download: async () => ({ data: null, error: { message: 'Mock client - storage not available' } }),
        remove: async () => ({ data: null, error: { message: 'Mock client - storage not available' } }),
      })
    } as any,
  };
};

// Create Supabase client
export const supabase: SupabaseClient = (() => {
  if (isDevelopmentMode) {
    return createMockSupabaseClient() as SupabaseClient;
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing required Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  console.log('✅ Initializing Supabase client with real credentials');
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
})();

// Export utility to check if we're in development mode
export const isSupabaseMockMode = isDevelopmentMode;