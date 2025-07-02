import { getAuthUrl } from '../config/api';

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
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
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
}

export const apiService = new ApiService(); 