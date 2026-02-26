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
      if (error instanceof TypeError) {
        throw new NetworkError("Unable to reach the server. This may be a CORS or network issue.");
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
    console.log("🚀 Starting content generation...", { request });

    try {
      if (!API_CONFIG.WEBHOOK_URL) {
        console.error("❌ Webhook URL not configured");
        throw new Error("Webhook URL is not configured");
      }

      console.log("📡 Webhook URL:", API_CONFIG.WEBHOOK_URL);

      // Use AbortController for better browser compatibility
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log("⏱️ Request timeout triggered");
        controller.abort();
      }, API_CONFIG.REQUEST_TIMEOUT);

      try {
        console.log("📤 Sending request to webhook...");
        const response = await fetch(API_CONFIG.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        console.log("📥 Response received:", {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ API Error:", { status: response.status, errorText });
          throw new ApiError(
            response.status,
            `API request failed: ${response.statusText}`,
            errorText
          );
        }

        const raw = await response.text();
        console.log("📄 Raw response received:", raw.substring(0, 200) + "...");

        // Parse response - handle multiple formats
        let content = raw;
        try {
          const json = JSON.parse(raw);
          console.log("✅ JSON parsed successfully:", Object.keys(json));

          // Handle array response (n8n often returns array of objects)
          const data = Array.isArray(json) ? json[0] : json;

          if (data?.message?.content) {
            content = data.message.content;
            console.log("📝 Using data.message.content");
          } else if (data?.content) {
            content = data.content;
            console.log("📝 Using data.content");
          } else if (data?.output) {
            content = data.output;
            console.log("📝 Using data.output");
          } else if (data?.text) {
            content = data.text;
            console.log("📝 Using data.text");
          } else if (data?.response) {
            content = data.response;
            console.log("📝 Using data.response");
          } else if (typeof data === "string") {
            content = data;
            console.log("📝 Using data as string");
          } else {
            // Fallback: stringify the object for display
            content = typeof data === "object" ? JSON.stringify(data, null, 2) : raw;
            console.log("📝 Using fallback format");
          }
        } catch (parseError) {
          // Not JSON, use raw text - this is fine
          console.log("ℹ️ Response is not JSON, using raw text");
        }

        console.log("✅ Content generation successful, length:", content.length);
        return content;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.error("❌ Fetch error:", fetchError);

        // Handle abort/timeout
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          console.error("⏱️ Request timed out");
          throw new NetworkError("Request timed out. Please try again.");
        }

        // Handle ApiError - re-throw as-is
        if (fetchError instanceof ApiError) {
          throw fetchError;
        }

        // Any TypeError from fetch is a network/CORS issue
        if (fetchError instanceof TypeError) {
          console.error("🌐 Network/CORS error:", fetchError.message);
          throw new NetworkError(
            "Unable to reach the server. This may be a CORS or network issue."
          );
        }

        // Re-throw other errors
        throw fetchError;
      }
    } catch (error) {
      console.error("❌ Content generation error:", error);

      // Re-throw ApiError and NetworkError as-is
      if (error instanceof ApiError || error instanceof NetworkError) {
        throw error;
      }

      // Log unexpected errors
      logError(error as Error, { context: "contentApi.generateContent" });
      throw error;
    }
  },
};
