// Global API interceptor to handle session conflicts
export const apiInterceptor = {
  // Store the original fetch function
  originalFetch: window.fetch,
  
  // Initialize the interceptor
  init() {
    const self = this;
    
    // Override the global fetch function
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      try {
        const response = await self.originalFetch.call(window, input, init);
        
        // Check if the response is JSON and contains session conflict error
        if (response.ok === false) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            try {
              const data = await response.clone().json();
              if (data.error === 'SESSION_CONFLICT') {
                // Clear all authentication data
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // Dispatch a custom event to notify the app about session conflict
                window.dispatchEvent(new CustomEvent('sessionConflict', {
                  detail: { message: 'You are logged in on another device. Please login again.' }
                }));
                
                // Return the original response so the calling code can handle it
                return response;
              }
            } catch (e) {
              // If JSON parsing fails, continue with normal flow
              console.warn('Failed to parse response as JSON:', e);
            }
          }
        }
        
        return response;
      } catch (error) {
        // Re-throw the error for normal error handling
        throw error;
      }
    };
  },
  
  // Restore the original fetch function
  restore() {
    window.fetch = this.originalFetch;
  }
}; 