// API Configuration
export const API_CONFIG = {
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL,
  REQUEST_TIMEOUT: 120000, // 120 seconds - n8n AI workflows can take time
} as const;

// Toast Configuration
export const TOAST_CONFIG = {
  REMOVE_DELAY: 5000, // 5 seconds
  LIMIT: 1,
} as const;

// Validation Limits
export const VALIDATION_LIMITS = {
  PROMPT_MIN_LENGTH: 10,
  PROMPT_MAX_LENGTH: 500,
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  DEBOUNCE_MS: 300,
  MIN_REQUEST_INTERVAL: 5000, // 5 seconds between requests
} as const;
