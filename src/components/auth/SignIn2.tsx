import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useAuth } from '../AuthContext';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn, getRedirectPath, clearRedirectPath } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && !hasLoggedIn) {
      // Only redirect if we haven't just logged in (prevents automatic redirect)
      const redirectPath = getRedirectPath();
      if (!redirectPath) {
        navigate('/', { replace: true });
      }
    }
  }, [isLoggedIn, navigate, hasLoggedIn, getRedirectPath]);

  // Check for pending enrollment data and show popup ONLY if coming from enrollment form
  useEffect(() => {
    const pendingEnrollmentData = localStorage.getItem('pendingEnrollmentData');
    
    if (pendingEnrollmentData) {
      try {
        const storedData = JSON.parse(pendingEnrollmentData);
        const currentTime = Date.now();
        const timeDiff = currentTime - storedData.timestamp;
        
        // Only show popup if data is less than 1 hour old AND has courseId (coming from enrollment)
        if (timeDiff < 3600000 && storedData.courseId) {
          setShowEnrollmentPopup(true);
        } else {
          // Clear old data
          localStorage.removeItem('pendingEnrollmentData');
        }
      } catch (error) {
        console.error('Error parsing stored enrollment data:', error);
        localStorage.removeItem('pendingEnrollmentData');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.login(formData.email, formData.password, 'user');
      
      // Use AuthContext login function to update global state
      if (response.token && response.user) {
        login(response.token, response.user);
        setHasLoggedIn(true); // Mark that we just logged in
        
        // Add a small delay to ensure login state is updated
        setTimeout(() => {
          // Check for stored redirect path
          const redirectPath = getRedirectPath();
          console.log('Redirect path found:', redirectPath); // Debug log
          if (redirectPath) {
            clearRedirectPath(); // Clear the stored path
            console.log('Navigating to:', redirectPath); // Debug log
            navigate(redirectPath);
          } else {
            // Default navigation based on user role
            if (response.user && response.user.role === 'hr') {
              navigate('/hr');
            } else {
              navigate('/');
            }
          }
        }, 100);
      }
      
      setIsLoading(false);
      
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      if (errorMessage.includes('not authorized')) {
        setError('❌ You are not authorized to log in as a User with this account.');
      } else if (errorMessage.includes('Invalid credentials')) {
        setError('❌ Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage.includes('Login failed')) {
        setError('❌ Login failed. Please try again or contact support if the problem persists.');
      } else if (errorMessage.includes('Network error')) {
        setError('❌ Network error. Please check your internet connection and try again.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 py-4 sm:py-8 px-3 sm:px-4 pt-16 sm:pt-24">
      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md border border-white/30 mx-2">
        {/* Header with Icon */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-2 sm:mb-3 animate-bounce">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-white/80 text-xs sm:text-sm">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Email Input */}
          <div className="group">
            <label htmlFor="email" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-xs sm:text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-3 py-2 sm:py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-xs sm:text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 sm:py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? (
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.216 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 2.25a9.956 9.956 0 002.625-2.25c-1.5-2.5-4.5-6-9-6s-7.5 3.5-9 6c1.5 2.5 4.5 6 9 6a9.956 9.956 0 004.575-1.125" /></svg>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 sm:p-3 text-red-200 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors text-xs sm:text-sm"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-2.5 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-lg font-semibold hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-navy-blue text-xs sm:text-sm">
            Don't have an account?{' '}
                         <button 
               className="text-navy-blue hover:text-blue-800 font-bold transition-colors underline"
               onClick={() => navigate('/signup')}
             >
               Register for free
             </button>
          </p>
        </div>
      </div>

      {/* Enrollment Popup */}
      {showEnrollmentPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
                         <div className="text-center">
               <p className="text-gray-600 text-sm mb-6 font-bold">
                 Before enrollment, first login or Register
               </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEnrollmentPopup(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;