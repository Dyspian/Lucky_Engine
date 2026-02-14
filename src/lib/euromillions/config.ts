// src/lib/euromillions/config.ts

/**
 * Production EuroMillions API base URL.
 */
const EUROMILLIONS_API_PROD_URL = "https://euromillions.api.pedromealha.dev";

/**
 * Staging EuroMillions API base URL (used as fallback).
 */
export const EUROMILLIONS_API_STAGING_URL = "https://euromillions.staging.api.pedromealha.dev";

/**
 * Resolves the base URL for the EuroMillions API based on the environment.
 * 
 * In development: Uses the local proxy path '/api/euromillions' to avoid CORS.
 * In production: Uses the real production URL.
 *
 * @returns The resolved and normalized base URL for the EuroMillions API.
 */
export function getEuromillionsApiBaseUrl(): string {
  // If explicitly set via env var, prioritize it
  if (import.meta.env.NEXT_PUBLIC_EUROMILLIONS_API_BASE_URL) {
    const url = import.meta.env.NEXT_PUBLIC_EUROMILLIONS_API_BASE_URL;
    return url.endsWith('/') ? url : `${url}/`;
  }

  // In production, use the real domain
  if (import.meta.env.MODE === 'production') {
    return EUROMILLIONS_API_PROD_URL.endsWith('/') ? EUROMILLIONS_API_PROD_URL : `${EUROMILLIONS_API_PROD_URL}/`;
  }

  // In development, use the local proxy configured in vite.config.ts
  return '/api/euromillions/'; 
}