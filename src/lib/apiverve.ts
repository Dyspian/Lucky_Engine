import { z } from "zod";

// TODO: Get a free API Key from https://apiverve.com and paste it here
// If left empty, the app will gracefully fallback to local history.
const API_KEY = ""; 

const ApiVerveResponseSchema = z.object({
  status: z.string(),
  error: z.unknown().nullable(),
  data: z.object({
    date: z.string(),
    numbers: z.array(z.coerce.number()), // Coerce strings to numbers if needed
    stars: z.array(z.coerce.number()).optional().default([]), // Stars might be named differently or missing
    bonus: z.array(z.coerce.number()).optional(), // Sometimes stars are called bonus
    jackpot: z.string().optional(),
    currency: z.string().optional(),
  }).passthrough()
});

export type ApiVerveDraw = z.infer<typeof ApiVerveResponseSchema>;

export async function fetchLatestDrawFromApiVerve() {
  if (!API_KEY) {
    console.warn("[APIVerve] No API Key configured. Skipping live fetch.");
    return null;
  }

  try {
    const response = await fetch('/api/apiverve/lottery?lottery=euromillions', {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    const result = ApiVerveResponseSchema.safeParse(json);

    if (!result.success) {
      console.error("[APIVerve] Schema validation failed:", result.error);
      return null;
    }

    const data = result.data.data;

    // Transform to our internal Draw format
    // Note: APIVerve structure for EuroMillions puts stars in 'stars' or 'bonus'.
    // We try to be robust here.
    const stars = (data.stars && data.stars.length > 0) 
      ? data.stars 
      : (data.bonus || []);

    return {
      id: 99999, // Temporary ID for the latest live draw
      draw_id: 99999,
      date: data.date,
      numbers: data.numbers,
      stars: stars,
      has_winner: false, // API doesn't always strictly say, assume false or unknown
      prizes: []
    };

  } catch (error) {
    console.error("[APIVerve] Fetch failed:", error);
    return null;
  }
}