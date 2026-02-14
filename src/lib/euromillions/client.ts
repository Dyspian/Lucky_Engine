// src/lib/euromillions/client.ts

import { z } from "zod";
import { getEuromillionsApiBaseUrl, EUROMILLIONS_API_STAGING_URL } from "./config";
import { Draw, DrawArraySchema } from "./schemas";
import { cache } from "@/lib/cache";

export class DataUnavailableError extends Error {
  constructor(message: string, public details?: { source?: string; reason?: string; originalError?: unknown }) {
    super(message);
    this.name = "DataUnavailableError";
  }
}

interface FetchDrawsParams {
  year?: number;
  dates?: { start?: string; end?: string };
}

interface FetchDrawsOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const API_PATH = "v1/draws";
const FETCH_TIMEOUT_MS = 10000;

function buildQueryString(params?: FetchDrawsParams): string {
  if (!params) return "";
  const queryParts: string[] = [];
  if (params.year) queryParts.push(`year=${params.year}`);
  if (params.dates) {
    const { start, end } = params.dates;
    if (start && end) queryParts.push(`dates=${start},${end}`);
    else if (start) queryParts.push(`dates=${start}`);
    else if (end) queryParts.push(`dates=,${end}`);
  }
  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
}

async function fetchFromUrl(baseUrl: string, params?: FetchDrawsParams): Promise<Draw[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  
  // Clean up double slashes if they occur (e.g. proxy path + v1/draws)
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const queryString = buildQueryString(params);
  const url = `${cleanBase}${API_PATH}${queryString}`;

  try {
    console.log(`[EuroMillions Client] Fetching from: ${url}`);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Accept": "application/json" },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response body");
      console.error(`[EuroMillions Client] Status ${response.status} from ${url}. Body: ${errorText}`);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawData = await response.json();
    const validationResult = DrawArraySchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error(`[EuroMillions Client] Validation failed for data from ${url}:`, validationResult.error.errors);
      throw new DataUnavailableError("API response format mismatch.", {
        source: url,
        reason: "validation_error",
        originalError: validationResult.error,
      });
    }

    return validationResult.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof DataUnavailableError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new DataUnavailableError("Request timed out.", { source: url, reason: "timeout", originalError: error });
    }
    throw new DataUnavailableError(`Failed to fetch from ${url}.`, { source: url, reason: "network_error", originalError: error });
  }
}

export async function fetchDraws(
  params?: FetchDrawsParams,
  options?: FetchDrawsOptions
): Promise<{ draws: Draw[]; source: "prod" | "staging" }> {
  const prodBaseUrl = getEuromillionsApiBaseUrl();
  const stagingBaseUrl = EUROMILLIONS_API_STAGING_URL; 

  let prodError: DataUnavailableError | null = null;

  // 1. Try Primary
  try {
    const draws = await fetchFromUrl(prodBaseUrl, params);
    return { draws, source: "prod" };
  } catch (error) {
    prodError = error instanceof DataUnavailableError ? error : new DataUnavailableError("Unknown error from PROD API", { source: prodBaseUrl, originalError: error });
    console.warn(`[EuroMillions Client] Primary API failed: ${prodError.message}`);
  }

  // 2. Try Staging (Fallback)
  try {
    const draws = await fetchFromUrl(stagingBaseUrl, params);
    return { draws, source: "staging" };
  } catch (error) {
    const stagingError = error instanceof DataUnavailableError ? error : new DataUnavailableError("Unknown error from STAGING API", { source: stagingBaseUrl, originalError: error });
    
    // 3. Determine best error to show
    // If BOTH failed due to validation, report validation error, not just 'api_unavailable'
    if (prodError?.details?.reason === "validation_error" && stagingError.details?.reason === "validation_error") {
       throw new DataUnavailableError("EuroMillions API returned invalid data format from all sources.", {
        source: "both",
        reason: "validation_error",
        originalError: { primary: prodError, fallback: stagingError }
      });
    }

    throw new DataUnavailableError("Failed to fetch EuroMillions data from both primary and STAGING APIs.", {
      source: "both",
      reason: "api_unavailable",
      originalError: { primary: prodError, fallback: stagingError }
    });
  }
}