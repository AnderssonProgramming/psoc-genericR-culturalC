const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return this.token || localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `Request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(username: string, email: string, password: string) {
    const data = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async login(username: string, password: string) {
    const data = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.request<any>('/auth/me');
  }

  // Scores endpoints
  async submitScore(code: string) {
    return this.request<any>('/scores', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async getMyScores() {
    return this.request<any[]>('/scores/my-scores');
  }

  // Leaderboard endpoints
  async getLeaderboard(limit: number = 50) {
    return this.request<any[]>(`/leaderboard?limit=${limit}`);
  }

  async getMyRank() {
    return this.request<any>('/leaderboard/my-rank');
  }

  async getStats() {
    return this.request<any>('/leaderboard/stats');
  }

  // Chat endpoints
  async sendChatMessage(message: string, sessionId?: string) {
    return this.request<any>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  }

  async getChatHistory(sessionId: string) {
    return this.request<any[]>(`/chat/history/${sessionId}`);
  }

  async getChatSessions() {
    return this.request<any[]>('/chat/sessions');
  }

  // Quiz endpoints
  async getQuizQuestions() {
    return this.request<any[]>('/quiz/questions');
  }

  async getUserAttempts() {
    return this.request<{ count: number; remaining: number }>('/quiz/attempts');
  }

  async submitQuiz(answers: { questionId: number; answer: string }[]) {
    return this.request<any>('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  async validateGameCode(code: string) {
    return this.request<any>('/quiz/validate-code', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  logout() {
    this.setToken(null);
  }
}

export const apiClient = new ApiClient();
