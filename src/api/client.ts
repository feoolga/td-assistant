// Базовые настройки API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
      };
      throw error;
    }

    return response.json();
  }
}

// Создаем и экспортируем единственный экземпляр
export const apiClient = new ApiClient(API_BASE_URL);