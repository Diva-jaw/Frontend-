import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../components/AuthContext';

const EmployersLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await apiService.login(email, password, 'hr');
      
      // Use AuthContext login function to update global state
      if (response.token && response.user) {
        login(response.token, response.user);
        if (response.user.role === 'hr') {
          navigate('/hr');
        } else {
          navigate('/');
        }
        setIsLoading(false);
        return;
      }
      
      setIsLoading(false);
      
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      if (errorMessage.includes('not authorized')) {
        setError('❌ You are not authorized to log in as HR with this account.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 py-8 px-4">
      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-white/30">
        {/* Header with Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 animate-bounce">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Employer Login</h2>
          <p className="text-white/80 text-xs">HR access to user details and information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="group">
            <label htmlFor="email" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
                required
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
            <label htmlFor="password" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
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
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2.5 text-red-200 text-xs text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-white/70 hover:text-white text-xs transition-colors"
            onClick={() => navigate('/employer-forgot-password')}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployersLogin;