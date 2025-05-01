import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, signInWithGoogle, logOut, useAuth } from '@/lib/firebase';
import { User } from 'firebase/auth';

// Define Auth Context type
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signIn: async () => null,
  signOut: async () => {}
});

// Export the hook for using the auth context
export const useAuthContext = () => useContext(AuthContext);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    try {
      return await signInWithGoogle();
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  const signOut = async () => {
    try {
      await logOut();
    } catch (err) {
      setError(err as Error);
    }
  };

  // Value object for the context provider
  const value = {
    currentUser,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};