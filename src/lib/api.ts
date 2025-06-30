const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'company' | 'interviewer' | 'candidate' | 'admin';
  skills?: string[];
  portfolio?: string;
  resumeUploaded?: boolean;
  resumeScore?: number;
  jobDescription?: string;
  profileCompletion?: number;
  interviewsTaken?: number;
  successRate?: number;
  aiScore?: number;
  mockInterviews?: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: 'company' | 'interviewer' | 'candidate' | 'admin';
}

export interface ResumeScoreResponse {
  message: string;
  score: number;
  analysis: string;
  description: string;
  recommendations: string;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/me');
  }

  async logout(): Promise<void> {
    this.clearToken();
  }

  // Candidate dashboard endpoints
  async uploadResume(file: File): Promise<{ message: string; resumePath: string; profileCompletion: number }> {
    const formData = new FormData();
    formData.append('resume', file);

    const url = `${API_BASE_URL}/candidate/upload-resume`;
    const token = this.getToken();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload resume');
    }

    return data;
  }

  async addSkills(skills: string[]): Promise<{ message: string; skills: string[]; profileCompletion: number }> {
    return this.request<{ message: string; skills: string[]; profileCompletion: number }>('/candidate/add-skills', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    });
  }

  async addPortfolio(portfolio: string): Promise<{ message: string; portfolio: string; profileCompletion: number }> {
    return this.request<{ message: string; portfolio: string; profileCompletion: number }>('/candidate/add-portfolio', {
      method: 'POST',
      body: JSON.stringify({ portfolio }),
    });
  }

  async addJobDescription(jobDescription: string): Promise<{ message: string; jobDescription: string; profileCompletion: number }> {
    return this.request<{ message: string; jobDescription: string; profileCompletion: number }>('/candidate/add-job-description', {
      method: 'POST',
      body: JSON.stringify({ jobDescription }),
    });
  }

  async getResumeScore(): Promise<ResumeScoreResponse> {
    return this.request<ResumeScoreResponse>('/candidate/get-resume-score');
  }

  async getCandidateProfile(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/candidate/profile');
  }

  async startInterview(): Promise<{ message: string; mockInterviews: number }> {
    return this.request<{ message: string; mockInterviews: number }>('/candidate/start-interview', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService(); 