// src/lib/euromillions/client.ts

import { z } from "zod";
import { getEuromillionsApiBaseUrl } from "./config";
import { Draw, DrawArraySchema } from "./schemas";
import { cache } from "@/lib/cache"; // Reusing existing cache layer

/**
 * Custom error class for data unavailability, extending ProviderError for consistency.
 */
export class DataUnavailableError extends Error {
  constructor(message: string, public details?: { source?: string; reason?: string; originalError?: unknown }) {
    super(message);
    this.name = "DataUnavailableError";
  }
}

/**
 * Parameters for fetching EuroMillions draws.
 */
interface FetchDrawsParams {
  year?: number;
  dates?: { start?: string; end?: string };
}

/**
 * Options for controlling fetch behavior, including caching.
 */
interface FetchDrawsOptions {
  cache?: RequestCache; // 'no-store' | 'force-cache' | etc.
  revalidate?: number; // Time in seconds for Next.js revalidate (simulated for React)
}

const API_PATH = "v1/draws";
const FETCH_TIMEOUT_MS = 10000; // 10 seconds timeout for each API attempt

/**
 * Builds the query string for the EuroMillions API.
 *
 * @param params - The parameters for the query.
 * @returns The constructed query string.
 */
function buildQueryString(params?: FetchDrawsParams): string {
  if (!params) return "";

  const queryParts: string[] = [];

  if (params.year) {
    queryParts.push(`year=${params.year}`);
  }

  if (params.dates) {
    const { start, end } = params.dates;
    if (start && end) {
      queryParts.push(`dates=${start},${end}`);
    } else if (start) {
      queryParts.push(`dates=${start}`);
    } else if (end) {
      queryParts.push(`dates=,${end}`);
    }
  }

  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
}

/**
 * Fetches EuroMillions draw data from a given base URL.
 *
 * @param baseUrl - The base URL of the API.
 * @param params - Query parameters for the API.
 * @returns A promise that resolves to an array of validated Draw objects.
 * @throws DataUnavailableError if fetching or validation fails.
 */
async function fetchFromUrl(baseUrl: string, params?: FetchDrawsParams): Promise<Draw[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const queryString = buildQueryString(params);
  const url = `${baseUrl}${API_PATH}${queryString}`;

  try {
    console.log(`[EuroMillions Client] Fetching from: ${url}`);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
      },
      // Simulate Next.js caching options for client-side fetch
      // In a real Next.js app, these would be passed to fetch directly.
      // For this React app, we rely on the custom cache layer.
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[EuroMillions Client] API responded with status ${response.status} from ${baseUrl}. Response body: ${errorText}`);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawData = await response.json();
    const validationResult = DrawArraySchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error(`[EuroMillions Client] Validation failed for data from ${baseUrl}:`, validationResult.error.errors);
      throw new DataUnavailableError("API response format changed: Validation failed.", {
        source: baseUrl,
        reason: "validation_error",
        originalError: validationResult.error,
      });
    }

    // Runtime assertion for dev mode
    if (import.meta.env.MODE !== 'production') {
      validationResult.data.forEach(draw => {
        draw.numbers.forEach(num => {
          if (num < 1 || num > 50) {
            console.warn(`[Dev Warning] Invalid number ${num} found in draw ${draw.id}. Expected 1-50.`);
          }
        });
        draw.stars.forEach(star => {
          if (star < 1 || star > 12) {
            console.warn(`[Dev Warning] Invalid star ${star} found in draw ${draw.id}. Expected 1-12.`);
          }
        });
      });
    }

    return validationResult.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof DataUnavailableError) {
      throw error; // Re-throw our custom validation error
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new DataUnavailableError("Request timed out.", { source: baseUrl, reason: "timeout", originalError: error });
    }
    if (error instanceof Error) {
      throw new DataUnavailableError(`Failed to fetch from ${baseUrl}.`, { source: baseUrl, reason: "network_error", originalError: error });
    }
    throw new DataUnavailableError(`An unknown error occurred while fetching from ${baseUrl}.`, { source: baseUrl, originalError: error });
  }
}

/**
 * Fetches EuroMillions draw data with production/staging fallback and caching.
 *
 * @param params - Query parameters for the API.
 * @param options - Options for controlling fetch behavior.
 * @returns A promise that resolves to an array of validated Draw objects.
 * @throws DataUnavailableError if data cannot be retrieved from any source.
 */
export async function fetchDraws(
  params?: FetchDrawsParams,
  options?: FetchDrawsOptions
): Promise<{ draws: Draw[]; source: "prod" | "staging" }> {
  const prodBaseUrl = getEuromillionsApiBaseUrl(); // This will be the PROD URL in production
  const stagingBaseUrl = EUROMILLIONS_API_STAGING_URL; // Always staging for fallback

  let prodError: DataUnavailableError | null = null;

  // Attempt to fetch from the primary (prod/configured) API
  try {
    const draws = await fetchFromUrl(prodBaseUrl, params);
    return { draws, source: "prod" };
  } catch (error) {
    prodError = error instanceof DataUnavailableError ? error : new DataUnavailableError("Unknown error from PROD API", { source: prodBaseUrl, originalError: error });
    console.warn(`[EuroMillions Client] Primary API failed: ${prodError.message}. Attempting STAGING fallback...`, prodError.details);
  }

  // If primary failed, attempt to fetch from staging
  try {
    const draws = await fetchFromUrl(stagingBaseUrl, params);
    return { draws, source: "staging" };
  } catch (error) {
    const stagingError = error instanceof DataUnavailableError ? error : new DataUnavailableError("Unknown error from STAGING API", { source: stagingBaseUrl, originalError: error });
    console.error(`[EuroMillions Client] STAGING API also failed: ${stagingError.message}. Both APIs failed.`, stagingError.details);
    
    // Re-throw a combined error or the most informative one
    throw new DataUnavailableError("Failed to fetch EuroMillions data from both primary and STAGING APIs.", {
      source: "both",
      reason: "api_unavailable",
      originalError: { primary: prodError, fallback: stagingError }
    });
  }
}