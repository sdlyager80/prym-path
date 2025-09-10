import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, auth } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    auth.getSession().then(session => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        // Redirect to dashboard or return to previous page
        const returnTo = location.state?.from || '/dashboard';
        navigate(returnTo);
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const signUp = async (email, password, fullName) => {
    try {
      const { user, session, error } = await auth.signUp(email, password, {
        full_name: fullName
      });
      
      if (error) throw error;
      
      return { user, session, error: null };
    } catch (error) {
      return { user: null, session: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { user, session, error } = await auth.signIn(email, password);
      
      if (error) throw error;
      
      return { user, session, error: null };
    } catch (error) {
      return { user: null, session: null, error };
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};