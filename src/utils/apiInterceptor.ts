// Global API interceptor to handle session conflicts and token expiry
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
        
        // Check if the response is JSON and contains session conflict or token expiry error
        if (response.ok === false) {
          const contentType = response.headers.get('content-type');
          
          if (contentType && contentType.includes('application/json')) {
            try {
              // Clone the response so it can be read multiple times
              const responseClone = response.clone();
              const data = await responseClone.json();
              
              // Handle session conflict error
              if (data.error === 'SESSION_CONFLICT') {
                // Clear all authentication data
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // Show the proper session conflict popup
                self.showSessionConflictPopup();
                
                // Dispatch session conflict event for AuthContext to handle logout
                window.dispatchEvent(new CustomEvent('sessionConflict', {
                  detail: { message: 'You are logged in on another device. Please login again.' }
                }));
                
                return response;
              } else if (data.error === 'TOKEN_EXPIRED') {
                // Clear all authentication data
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // Dispatch token expired event
                window.dispatchEvent(new CustomEvent('tokenExpired', {
                  detail: { message: 'Your session has expired. Please login again.' }
                }));
                
                return response;
              }
            } catch (parseError) {
              console.error('[APIInterceptor] Error parsing response:', parseError);
            }
          }
        }
        
        return response;
      } catch (error) {
        console.error('[APIInterceptor] Fetch error:', error);
        throw error;
      }
    };
  },
  
  // Restore the original fetch function
  restore() {
    window.fetch = this.originalFetch;
  },
  
  // Show session conflict popup with proper styling
  showSessionConflictPopup() {
    // Remove any existing popup first
    const existingPopup = document.getElementById('session-conflict-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
    
    // Create and show popup with proper styling
    const popup = document.createElement('div');
    popup.id = 'session-conflict-popup';
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        backdrop-filter: blur(5px);
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          max-width: 400px;
          margin: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        ">
          <div style="
            width: 3.5rem;
            height: 3.5rem;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            animation: bounce 1s infinite;
          ">
            <svg style="width: 1.75rem; height: 1.75rem; color: white;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 style="
            font-size: 1.5rem;
            font-weight: bold;
            color: #111827;
            margin-bottom: 0.5rem;
          ">Session Expired</h2>
          <p style="
            color: #6b7280;
            margin-bottom: 1.5rem;
            line-height: 1.5;
          ">You are logged in on another device. Please login again.</p>
          <button onclick="window.location.href='/signin'" style="
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            transform: scale(1);
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Login
          </button>
        </div>
      </div>
      <style>
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
      </style>
    `;
    
    document.body.appendChild(popup);
    
    // Remove popup after 10 seconds if not clicked
    setTimeout(() => {
      const existingPopup = document.getElementById('session-conflict-popup');
      if (existingPopup) {
        existingPopup.remove();
      }
    }, 10000);
  },
  
  // Test method to manually trigger session conflict popup
  testSessionConflict() {
    console.log('[APIInterceptor] Testing session conflict popup');
    this.showSessionConflictPopup();
  }
}; 