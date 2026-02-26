export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends Error {
  constructor(message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network connection failed") {
    super(message);
    this.name = "NetworkError";
  }
}

export const logError = (error: Error, context?: Record<string, unknown>) => {
  if (import.meta.env.DEV) {
    console.error("[Error]", error.name, error.message, context);
    if (error instanceof ApiError) {
      console.error("[API Error Details]", error.details);
    }
  }
  // In production, this would send to Sentry or similar service
};

export const getUserFriendlyMessage = (error: unknown): string => {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      return "Server error. Please try again later.";
    }
    if (error.statusCode === 429) {
      return "Too many requests. Please wait a moment and try again.";
    }
    if (error.statusCode >= 400) {
      return "Invalid request. Please check your input and try again.";
    }
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
