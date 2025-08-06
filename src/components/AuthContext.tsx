import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'hr';
  // Add other user properties as needed
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  loading: boolean;
  setRedirectPath: (path: string) => void;
  getRedirectPath: () => string | null;
  clearRedirectPath: () => void;
  handleSessionConflict: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutCallback, setLogoutCallback] = useState<(() => void) | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSessionConflictModal, setShowSessionConflictModal] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    console.log('[AuthContext] On mount: authToken =', token, 'userData =', userData);
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
        console.log('[AuthContext] User restored from localStorage:', parsedUser);
      } catch (error) {
        console.error('[AuthContext] Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        console.log('[AuthContext] Cleared invalid user data from localStorage');
      } finally {
        setLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      console.log('[AuthContext] No valid authToken or userData found, user set to null');
      setLoading(false);
    }
  }, []);

  // Listen for session conflict events
  useEffect(() => {
    const handleSessionConflictEvent = () => {
      handleSessionConflict();
    };

    window.addEventListener('sessionConflict', handleSessionConflictEvent);
    return () => {
      window.removeEventListener('sessionConflict', handleSessionConflictEvent);
    };
  }, []);

  const setRedirectPath = (path: string) => {
    console.log('[AuthContext] Setting redirect path:', path);
    localStorage.setItem('redirectPath', path);
  };

  const getRedirectPath = (): string | null => {
    const path = localStorage.getItem('redirectPath');
    console.log('[AuthContext] Getting redirect path:', path);
    return path;
  };

  const clearRedirectPath = () => {
    console.log('[AuthContext] Clearing redirect path');
    localStorage.removeItem('redirectPath');
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Stylized logout confirmation
  const logout = () => {
    setShowLogoutModal(true);
    setLogoutCallback(() => () => {
      // Remove all authentication data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    });
  };

  const handleLogoutConfirm = () => {
    if (logoutCallback) logoutCallback();
    setShowLogoutModal(false);
    setLogoutCallback(null);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
    setLogoutCallback(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSessionConflict = () => {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
    setShowSessionConflictModal(true);
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    updateUser,
    loading,
    setRedirectPath,
    getRedirectPath,
    clearRedirectPath,
    handleSessionConflict,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl animate-fade-in w-full max-w-sm">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Logout</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogoutConfirm}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={handleLogoutCancel}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Session Conflict Modal */}
      {showSessionConflictModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl animate-fade-in w-full max-w-sm">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Session Conflict</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">You are logged in on another device. Please login again.</p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowSessionConflictModal(false);
                    window.location.href = '/';
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}; 