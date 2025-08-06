import { useAuth } from '../components/AuthContext';

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