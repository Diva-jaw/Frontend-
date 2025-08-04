import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useAuth } from '../AuthContext';

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };



  const handleSendOTP = async () => {
    if (!formData.email) {
      setError('Please enter your email address first.');
      return;
    }

    setIsSendingOTP(true);
    setError(null);

    try {
      await apiService.sendOTP(formData.email);
      setOtpSent(true);
      setSuccess('✅ OTP sent successfully! Check your email inbox (and spam folder) for the 6-digit code.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('already registered')) {
        setError('❌ This email is already registered. Please try logging in instead.');
      } else if (errorMessage.includes('Failed to send OTP')) {
        setError('❌ Unable to send OTP. Please check your email address and try again.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (formData.otp.length !== 6) {
      setError('OTP must be 6 digits long.');
      return;
    }

    setIsVerifyingOTP(true);
    setError(null);

    try {
      await apiService.verifyOTP(formData.email, formData.otp);
      setOtpVerified(true);
      setSuccess('✅ Email verified successfully! You can now complete your registration.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify OTP';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('Invalid or expired OTP')) {
        setError('❌ Invalid or expired OTP. Please check the code and try again. OTPs expire after 10 minutes.');
      } else if (errorMessage.includes('Failed to verify OTP')) {
        setError('❌ Verification failed. Please try again or request a new OTP.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    
    if (!formData.email) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!formData.password) {
      setError('Please create a password.');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!otpVerified) {
      setError('Please verify your email with OTP first.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Check if there's pending enrollment data for auto-login ONLY if coming from specific enrollment route
      const pendingEnrollmentData = localStorage.getItem('pendingEnrollmentData');
      const isFromEnrollment = pendingEnrollmentData && (() => {
        try {
          const storedData = JSON.parse(pendingEnrollmentData);
          // Only generate JWT for the specific route /course/6/module/11/level/31/enroll
          return storedData.courseId === '6' && 
                 storedData.moduleId === '11' && 
                 storedData.levelId === '31';
        } catch {
          return false;
        }
      })();
      
      // Call register with enrollment flag if coming from specific enrollment route
      const response = await apiService.register(formData.fullName, formData.email, formData.password, isFromEnrollment);
      setIsLoading(false);
      setShowSuccessPopup(true);
      
      if (pendingEnrollmentData && isFromEnrollment) {
        try {
          const storedData = JSON.parse(pendingEnrollmentData);
          const currentTime = Date.now();
          const timeDiff = currentTime - storedData.timestamp;
          
          // If data is less than 1 hour old and coming from specific enrollment route, auto-login and redirect
          if (timeDiff < 3600000) {
            // Use the token from registration response for auto-login
            if (response.token && response.user) {
              login(response.token, response.user);
              
              // Redirect to the specific enrollment page
              const redirectPath = `/course/${storedData.courseId}/module/${storedData.moduleId}/level/${storedData.levelId}/enroll`;
              navigate(redirectPath);
            } else {
              // Fallback to manual login if token not in response
              setTimeout(async () => {
                try {
                  const loginResponse = await apiService.login(formData.email, formData.password, 'user');
                  if (loginResponse.token && loginResponse.user) {
                    login(loginResponse.token, loginResponse.user);
                    
                    // Redirect to the specific enrollment page
                    const redirectPath = `/course/${storedData.courseId}/module/${storedData.moduleId}/level/${storedData.levelId}/enroll`;
                    navigate(redirectPath);
                  }
                } catch (loginErr) {
                  console.error('Auto-login failed:', loginErr);
                  // Fallback to normal flow
                  setShowSuccessPopup(false);
                  navigate('/signin');
                }
              }, 2000);
            }
          } else {
            // Clear old data and redirect to login
            localStorage.removeItem('pendingEnrollmentData');
            setTimeout(() => {
              setShowSuccessPopup(false);
              navigate('/signin');
            }, 3000);
          }
        } catch (error) {
          console.error('Error parsing stored enrollment data:', error);
          localStorage.removeItem('pendingEnrollmentData');
          setTimeout(() => {
            setShowSuccessPopup(false);
            navigate('/signin');
          }, 3000);
        }
      } else {
        // Normal flow - redirect to login
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/signin');
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('Email not verified')) {
        setError('❌ Please verify your email with OTP before registering.');
      } else if (errorMessage.includes('already registered')) {
        setError('❌ This email is already registered. Please try logging in instead.');
      } else if (errorMessage.includes('Registration failed')) {
        setError('❌ Registration failed. Please try again or contact support.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 py-8 px-4 pt-24">
      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-white/30">
        {/* Header with Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 animate-bounce">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
          <p className="text-white/80 text-xs">Join us and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name Input */}
          <div className="group">
            <label htmlFor="fullName" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="group">
            <label htmlFor="email" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isSendingOTP || !formData.email}
            className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSendingOTP ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending OTP...
              </div>
            ) : (
              'Send OTP'
            )}
          </button>

          {/* OTP Input */}
          {otpSent && (
            <div className="group">
              <label htmlFor="otp" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Verify OTP Button */}
          {otpSent && !otpVerified && (
            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={isVerifyingOTP || !formData.otp}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isVerifyingOTP ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>
          )}

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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

          {/* Confirm Password Input */}
          <div className="group">
            <label htmlFor="confirmPassword" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(v => !v)}>
                {showConfirmPassword ? (
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.216 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 2.25a9.956 9.956 0 002.625-2.25c-1.5-2.5-4.5-6-9-6s-7.5 3.5-9 6c1.5 2.5 4.5 6 9 6a9.956 9.956 0 004.575-1.125" /></svg>
                )}
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-green-200 text-sm text-center animate-pulse">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-b from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white rounded-lg font-semibold text-base border border-blue-700 dark:border-indigo-900 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-950 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            Create Account
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-center">
          <p className="text-blue-900 dark:text-blue-100 text-xs">
            Already have an account?{' '}
            <button 
              className="text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl animate-fade-in transform scale-110">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <div className="text-white text-2xl">✓</div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-white/80 mb-4">
                {localStorage.getItem('pendingEnrollmentData') && JSON.parse(localStorage.getItem('pendingEnrollmentData') || '{}').courseId
                  ? "Your account has been created successfully. You'll be automatically logged in and redirected to complete your enrollment."
                  : "Your account has been created successfully."
                }
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Continue
              </button>
            </div>
          </div>
                </div>
      )}
    </div>
  );
};

export default NewUser;