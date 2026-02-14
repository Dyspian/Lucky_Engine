// src/lib/euromillions/config.ts

/**
 * Production EuroMillions API base URL.
 */
const EUROMILLIONS_API_PROD_URL = "https://euromillions.api.pedromealha.dev";

/**
 * Staging EuroMillions API base URL (used as fallback or in development).
 */
const EUROMILLIONS_API_STAGING_URL = "https://euromillions.staging.api.pedromealha.dev";

/**
 * Resolves the base URL for the EuroMillions API based on the environment.
 * In development, it defaults to the staging URL. In production, it uses the production URL.
 * Ensures the URL has a trailing slash for consistent path concatenation.
 *
 * @returns The resolved and normalized base URL for the EuroMillions API.
 */
export function getEuromillionsApiBaseUrl(): string {
  let baseUrl: string;

  // Use environment variable if set, otherwise default based on NODE_ENV
  if (import.meta.env.NEXT_PUBLIC_EUROMILLIONS_API_BASE_URL) {
    baseUrl = import.meta.env.NEXT_PUBLIC_EUROMILLIONS_API_BASE_URL;
  } else if (import.meta.env.MODE === 'production') {
    baseUrl = EUROMILLIONS_API_PROD_URL;
  } else {
    baseUrl = EUROMILLIONS_API_STAGING_URL; // Default to staging in development
  }

  // Normalize trailing slash
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}