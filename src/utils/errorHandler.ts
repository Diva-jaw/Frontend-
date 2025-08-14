import { useAuth } from '../components/AuthContext';

// Type declaration for Network Information API (deprecated but still used)
interface NetworkInformation {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  downlink: number;
  rtt: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

// Global error handler for API calls
export const handleApiError = (error: Error, authContext?: ReturnType<typeof useAuth>) => {
  console.error('API Error:', error);
  
  // Check if it's a session conflict error
  if (error.message.includes('SESSION_CONFLICT')) {
    if (authContext) {
      authContext.handleSessionConflict();
    } else {
      // Fallback: clear localStorage and redirect
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    }
    return;
  }
  
  // For other errors, you can add additional handling here
  throw error;
};

// Hook for handling API errors in components
export const useErrorHandler = () => {
  const auth = useAuth();
  
  return {
    handleError: (error: Error) => handleApiError(error, auth)
  };
}; 

// Mobile network detection and error handling utilities

export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isMobileNetwork = (): boolean => {
  // Check if Network Information API is available
  const nav = navigator as NavigatorWithConnection;
  if (!nav.connection) return false;
  
  return nav.connection.effectiveType === 'slow-2g' || 
         nav.connection.effectiveType === '2g' || 
         nav.connection.effectiveType === '3g';
};

export const getNetworkErrorSuggestion = (error: Error): string => {
  if (isMobileDevice()) {
    if (isMobileNetwork()) {
      return 'Slow mobile network detected. Please try switching to WiFi or try again when you have a stronger signal.';
    }
    
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'Mobile network connection issue. Please try:\n1. Switching between WiFi and mobile data\n2. Refreshing the page\n3. Checking if your mobile carrier is blocking the connection';
    }
    
    if (error.message.includes('CORS') || error.message.includes('SSL')) {
      return 'Security connection issue on mobile. Please try:\n1. Refreshing the page\n2. Switching networks\n3. Clearing browser cache';
    }
  }
  
  return 'Please check your internet connection and try again.';
};

export const logMobileNetworkError = (error: Error, endpoint: string): void => {
  if (isMobileDevice()) {
    const nav = navigator as NavigatorWithConnection;
    console.error('Mobile Network Error:', {
      error: error.message,
      endpoint,
      userAgent: navigator.userAgent,
      connection: nav.connection ? {
        effectiveType: nav.connection.effectiveType,
        downlink: nav.connection.downlink,
        rtt: nav.connection.rtt
      } : 'Not available',
      timestamp: new Date().toISOString()
    });
  }
}; 