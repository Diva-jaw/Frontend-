import { getAuthUrl } from '../config/api';
import { getApplicantUrl } from '../config/api';

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
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = getAuthUrl(endpoint);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
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
    console.log("reached here");
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
    console.log("reached here 2");
    const data = await response.json();
    console.log("getUserApplications response:", data);
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