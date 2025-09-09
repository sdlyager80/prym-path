import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock data mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

// Auth helper functions
export const auth = {
  // Sign up with email
  signUp: async (email, password, metadata = {}) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    if (error) throw error;
    return data;
  },

  // Sign in with email
  signIn: async (email, password) => {
    if (!supabase) throw new Error('Supabase not initialized');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    if (!supabase) return;
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getUser: async () => {
    if (!supabase) return null;
    
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get session
  getSession: async () => {
    if (!supabase) return null;
    
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    if (!supabase) return { unsubscribe: () => {} };
    
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};