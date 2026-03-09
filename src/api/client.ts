/**
 * 🚀 API КЛИЕНТ
 * 
 * Как использовать:
 * 1. Создайте файл .env в корне проекта
 * 2. Укажите там VITE_API_URL = https://ваш-бэкенд.ком
 * 3. Если .env нет - по умолчанию используется http://localhost:5000
 * 
 * Все готово к работе! Эндпоинты описаны в endpoints.ts
 */

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
    const headers: HeadersInit = {};
    
    // Если это не FormData, устанавливаем Content-Type
    if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    // Если data это объект и не FormData - преобразуем в JSON
    const body = data instanceof FormData ? data : JSON.stringify(data);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body,
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