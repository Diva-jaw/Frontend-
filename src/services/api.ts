import { getAuthUrl } from '../config/api';
import { getApplicantUrl } from '../config/api';
import { isMobileDevice, logMobileNetworkError } from '../utils/errorHandler';

export interface AuthResponse {
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'hr';
  };
}

export interface ErrorResponse {
  error: string;
}

export interface Applicant {
  applicant_id: number;
  user_id: number;
  full_name: string;
  date_of_birth: string;
  gender: string;
  highest_qualification: string;
  round_status: string;
  round_name: string;
  job_title: string;
  job_type: string;
  applied_at: string;
}

class ApiService {
  private async makeRequestWithRetry<T>(
    endpoint: string,
    options: RequestInit = {},
    retries: number = 2
  ): Promise<T> {
    const url = getAuthUrl(endpoint);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          // Check for session conflict error
          if (data.error === 'SESSION_CONFLICT') {
            // Clear local storage and throw session conflict error
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw new Error('SESSION_CONFLICT: You are logged in on another device. Please login again.');
          } else if (data.error === 'TOKEN_EXPIRED') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw new Error('TOKEN_EXPIRED: Your session has expired. Please login again.');
          }
          throw new Error(data.error || 'Something went wrong');
        }

        return data;
      } catch (error) {
        // Enhanced mobile error handling with retry logic
        if (error instanceof TypeError && error.message.includes('fetch')) {
          // Network error - likely mobile network issue
          logMobileNetworkError(error, endpoint);
          
          if (isMobileDevice() && attempt < retries) {
            console.log(`Mobile network retry attempt ${attempt + 1}/${retries + 1}`);
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            continue;
          }
          
          throw new Error('Network connection failed. Please check your internet connection and try again. If the problem persists, try switching between WiFi and mobile data.');
        }
        
        if (error instanceof Error) {
          // Check for SSL/CORS issues common on mobile
          if (error.message.includes('CORS') || error.message.includes('SSL')) {
            throw new Error('Connection security issue. Please try refreshing the page or switching networks.');
          }
          throw error;
        }
        
        throw new Error('Network error - please check your connection and try again.');
      }
    }
    
    throw new Error('All retry attempts failed. Please check your connection and try again.');
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Use retry logic for mobile devices
    if (isMobileDevice()) {
      return this.makeRequestWithRetry<T>(endpoint, options, 2);
    }
    
    // Regular request for desktop
    return this.makeRequestWithRetry<T>(endpoint, options, 0);
  }

  // Send OTP for email verification
  async sendOTP(email: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  // Register user
  async register(name: string, email: string, password: string, isFromEnrollment: boolean = false): Promise<AuthResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (isFromEnrollment) {
      headers['x-from-enrollment'] = 'true';
    }
    
    return this.makeRequest<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers,
    });
  }

  // Login user
  async login(email: string, password: string, role: 'user' | 'hr'): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset password
  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  }

  // Logout
  async logout(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
  }

  async fetchApplicantsByDepartment(
    department: string,
    round: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Applicant[]; pagination: any }> {
    const url = `${getApplicantUrl(department)}?round=${encodeURIComponent(round)}&page=${page}&limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch applicants');
    }
    return response.json();
  }

  async fetchRoundCounts(department: string): Promise<{ 
    active: Record<string, number>;
    rejected: Record<string, number>;
    accepted: Record<string, number>;
  }> {
    const url = `${getApplicantUrl(department)}/counts`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch round counts');
    }
    return response.json();
  }

  async fetchDepartmentCounts(): Promise<{ 
    active: Record<string, number>;
    rejected: Record<string, number>;
    accepted: Record<string, number>;
  }> {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/application/api/applicants/departments/counts`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch department counts');
    }
    return response.json();
  }

  async moveApplicantToRound(
    department: string,
    applicantId: number,
    toRound: string,
    status: 'cleared' | 'rejected'
  ): Promise<any> {
    const url = `${getApplicantUrl(department)}/${applicantId}/move`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
      body: JSON.stringify({ toRound, status }),
    });
    if (!response.ok) {
      throw new Error('Failed to move applicant');
    }
    return response.json();
  }

  // User Profile
  async getUserProfile() {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/user/profile`;
    const token = localStorage.getItem('authToken');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  }

  async updateUserProfile(data: { name: string; phone_no?: string; university?: string; department?: string }) {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/user/profile`;
    const token = localStorage.getItem('authToken');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user profile');
    return response.json();
  }

  // User Applications
  async getUserApplications() {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/application/my-applications`;
    const token = localStorage.getItem('authToken');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user applications');
    const data = await response.json();
    return data || [];
  }

  // User Course Enrollments
  async getUserCourseEnrollments() {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/courses/enrollments/user`;
    const token = localStorage.getItem('authToken');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user course enrollments');
    return response.json();
  }
}

export const apiService = new ApiService(); 