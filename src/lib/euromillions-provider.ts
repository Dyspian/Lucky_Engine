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

const API_URL = "https://euromillions.api.pedromealha.dev/v1/draws";
const FETCH_TIMEOUT_MS = 10000;

/**
 * Fetches, validates, and normalizes EuroMillions draw data.
 * Malformed draws are dropped, and a summary is logged.
 */
export async function fetchDraws(): Promise<Draw[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`EuroMillions API responded with status: ${response.status}`);
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
      console.warn(`[Provider] Dropped ${droppedCount} malformed draws during normalization.`);
    }

    return validatedDraws;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof z.ZodError) {
      throw new Error("API response format changed: Validation failed.");
    }
    
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out while fetching EuroMillions data.");
    }

    throw error;
  }
}