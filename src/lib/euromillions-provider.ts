import { z } from "zod";

// Define the Zod schema for the external API response
const ExternalDrawSchema = z.object({
  date: z.string(),
  numbers: z.array(z.number()),
  stars: z.array(z.number()),
});

const ExternalApiResponseSchema = z.array(ExternalDrawSchema);

// Define our normalized Draw type
export type Draw = {
  date: string;
  numbers: number[];
  stars: number[];
};

const EUROMILLIONS_API_URL = "https://euromillions.api.pedromealha.dev/v1/draws";

export async function fetchEuroMillionsDraws(): Promise<Draw[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(EUROMILLIONS_API_URL, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const rawData = await response.json();
    
    // Validate and parse the response
    const validatedData = ExternalApiResponseSchema.parse(rawData);
    
    // Normalize the data to our Draw type
    return validatedData.map(draw => ({
      date: draw.date,
      numbers: draw.numbers,
      stars: draw.stars,
    }));
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof z.ZodError) {
      console.error("Data validation error:", error.errors);
      throw new Error("Invalid data format from EuroMillions API");
    }
    
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout while fetching EuroMillions data");
    }
    
    throw new Error(`Failed to fetch EuroMillions data: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}