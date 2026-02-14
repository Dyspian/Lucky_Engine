// src/lib/euromillions-provider.ts

import { Draw } from "./euromillions/schemas"; // Import Draw from new schemas
import { fetchDraws as fetchDrawsClient, DataUnavailableError } from "./euromillions/client"; // Import new client fetchDraws

/**
 * Custom error class for provider failures, now extending DataUnavailableError.
 */
export class ProviderError extends DataUnavailableError {
  constructor(message: string, public details?: { source?: string; reason?: string; originalError?: unknown }) {
    super(message, details);
    this.name = "ProviderError";
  }
}

/**
 * Fetches, validates, and normalizes EuroMillions draw data with PROD/STAGING failover.
 * This function now acts as the public provider interface, delegating to the new client.
 *
 * @returns A promise that resolves to an array of validated Draw objects and the source.
 * @throws ProviderError if data cannot be retrieved.
 */
export async function fetchDraws(): Promise<{ draws: Draw[]; source: "prod" | "staging" }> {
  try {
    // Delegate to the new, hardened client.ts fetchDraws
    const result = await fetchDrawsClient();
    return result;
  } catch (error) {
    if (error instanceof DataUnavailableError) {
      // Wrap DataUnavailableError in ProviderError for consistency with existing app
      throw new ProviderError(error.message, error.details);
    }
    // Catch any other unexpected errors
    throw new ProviderError("An unexpected error occurred in the EuroMillions provider.", { originalError: error });
  }
}

// Re-export MAIN_RANGE and STAR_RANGE if they were originally here and needed elsewhere
// Assuming they are defined in stats-engine.ts, so no need to re-export from here.