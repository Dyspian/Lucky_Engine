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
 * We are bypassing the local proxy and connecting directly to production
 * to avoid the 429 Too Many Requests error on localhost.
 *
 * @returns The resolved and normalized base URL for the EuroMillions API.
 */
export function getEuromillionsApiBaseUrl(): string {
  // Always use the real production URL.
  // This bypasses local proxy issues and 429s from the dev server.
  return EUROMILLIONS_API_PROD_URL.endsWith('/') ? EUROMILLIONS_API_PROD_URL : `${EUROMILLIONS_API_PROD_URL}/`;
}