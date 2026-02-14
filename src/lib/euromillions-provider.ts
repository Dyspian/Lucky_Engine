import { z } from "zod";

/**
 * Internal Draw type definition
 */
export const DrawSchema = z.object({
  date: z.string(),
  numbers: z.array(z.number().min(1).max(50)).length(5),
  stars: z.array(z.number().min(1).max(12)).length(2),
});

export type Draw = z.infer<typeof DrawSchema>;

/**
 * External API response schema (array of unknown objects)
 */
const ExternalApiResponseSchema = z.array(z.unknown());

const PROD_BASE_URL = "https://euromillions.api.pedromealha.dev";
const STAGING_BASE_URL = "https://euromillions.staging.api.pedromealha.dev";
const API_PATH = "/v1/draws";
const FETCH_TIMEOUT_MS = 20000; // Increased to 20 seconds per attempt

/**
 * Custom error class for provider failures, with structured details.
 */
export class ProviderError extends Error {
  constructor(message: string, public details?: { source?: string; reason?: string; originalError?: unknown }) {
    super(message);
    this.name = "ProviderError";
  }
}

/**
 * Helper function to fetch and validate draws from a single URL.
 */
async function fetchFromUrl(baseUrl: string): Promise<Draw[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const url = `${baseUrl}${API_PATH}`;

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Provider] API responded with status ${response.status} from ${baseUrl}. Response body: ${errorText}`);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawData = await response.json();
    
    // Validate that we received an array
    const parsedArray = ExternalApiResponseSchema.parse(rawData);

    let droppedCount = 0;
    const validatedDraws: Draw[] = [];

    for (const item of parsedArray) {
      const result = DrawSchema.safeParse(item);
      if (result.success) {
        validatedDraws.push(result.data);
      } else {
        droppedCount++;
      }
    }

    if (droppedCount > 0) {
      console.warn(`[Provider] Dropped ${droppedCount} malformed draws from ${baseUrl} during normalization.`);
    }

    return validatedDraws;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof z.ZodError) {
      throw new ProviderError("API response format changed: Validation failed.", { source: baseUrl, reason: "validation_error", originalError: error });
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new ProviderError("Request timed out.", { source: baseUrl, reason: "timeout", originalError: error });
    }
    if (error instanceof Error) {
      throw new ProviderError(`Failed to fetch from ${baseUrl}.`, { source: baseUrl, reason: "network_error", originalError: error });
    }
    throw new ProviderError(`An unknown error occurred while fetching from ${baseUrl}.`, { source: baseUrl, originalError: error });
  }
}

/**
 * Fetches, validates, and normalizes EuroMillions draw data with PROD/STAGING failover.
 * Returns the draws and the source (prod/staging) from which they were successfully fetched.
 */
export async function fetchDraws(): Promise<{ draws: Draw[]; source: "prod" | "staging" }> {
  let prodError: ProviderError | null = null;

  try {
    console.log("[Provider] Attempting to fetch from PROD API...");
    const draws = await fetchFromUrl(PROD_BASE_URL);
    return { draws, source: "prod" };
  } catch (error) {
    prodError = error instanceof ProviderError ? error : new ProviderError("Unknown error from PROD API", { source: PROD_BASE_URL, originalError: error });
    console.warn(`[Provider] PROD API failed: ${prodError.message}. Attempting STAGING...`, prodError.details);
  }

  try {
    console.log("[Provider] Attempting to fetch from STAGING API...");
    const draws = await fetchFromUrl(STAGING_BASE_URL);
    return { draws, source: "staging" };
  } catch (error) {
    const stagingError = error instanceof ProviderError ? error : new ProviderError("Unknown error from STAGING API", { source: STAGING_BASE_URL, originalError: error });
    console.error(`[Provider] STAGING API also failed: ${stagingError.message}. Both APIs failed.`, stagingError.details);
    
    // Re-throw a combined error or the most informative one
    throw new ProviderError("Failed to fetch EuroMillions data from both PROD and STAGING APIs.", {
      source: "both",
      reason: "api_unavailable",
      originalError: { prod: prodError, staging: stagingError }
    });
  }
}