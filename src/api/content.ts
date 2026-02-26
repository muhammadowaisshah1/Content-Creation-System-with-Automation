import { ApiError, NetworkError, logError } from "@/lib/errors";
import { API_CONFIG } from "@/constants/config";

export interface ContentGenerationRequest {
  prompt: string;
  platform: string;
  tone: string;
}

export interface ContentGenerationResponse {
  content: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      API_CONFIG.REQUEST_TIMEOUT
    );

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(
          response.status,
          `API request failed: ${response.statusText}`,
          errorText
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new NetworkError("Request timed out. Please try again.");
      }
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new NetworkError();
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_CONFIG.WEBHOOK_URL || "");

export const contentApi = {
  async generateContent(
    request: ContentGenerationRequest
  ): Promise<string> {
    try {
      if (!API_CONFIG.WEBHOOK_URL) {
        throw new Error("Webhook URL is not configured");
      }

      const response = await fetch(API_CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(
          response.status,
          `API request failed: ${response.statusText}`,
          errorText
        );
      }

      const raw = await response.text();

      // Parse response - handle multiple formats
      let content = raw;
      try {
        const json = JSON.parse(raw);
        if (json?.message?.content) {
          content = json.message.content;
        } else if (json?.content) {
          content = json.content;
        } else if (json?.output) {
          content = json.output;
        } else if (typeof json === "string") {
          content = json;
        }
      } catch (parseError) {
        logError(new Error("Failed to parse JSON response"), { raw });
        // Not JSON, use raw text
      }

      return content;
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        throw new NetworkError("Request timed out. Please try again.");
      }
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new NetworkError();
      }
      throw error;
    }
  },
};
