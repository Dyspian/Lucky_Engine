import { z } from "zod";

// TODO: Get a free API Key from https://apiverve.com and paste it here
// If left empty, the app will gracefully fallback to local history.
const API_KEY = ""; 

const ApiVerveResponseSchema = z.object({
  status: z.string(),
  error: z.unknown().nullable(),
  data: z.object({
    date: z.string(),
    numbers: z.array(z.coerce.number()), 
    stars: z.array(z.coerce.number()).optional().default([]), 
    bonus: z.array(z.coerce.number()).optional(), 
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
    // Specifically fetching EuroMillions
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

    // Handle the stars/bonus ambiguity
    // EuroMillions always has 2 stars. APIVerve might put them in 'stars' or 'bonus'.
    let stars = (data.stars && data.stars.length > 0) ? data.stars : (data.bonus || []);
    
    // Sort numbers for display consistency
    const sortedNumbers = [...data.numbers].sort((a, b) => a - b);
    const sortedStars = [...stars].sort((a, b) => a - b);

    console.log(`[APIVerve] Fetched Live Draw: ${data.date}`);

    return {
      id: 999999, // High ID to ensure it appears as recent/unique
      draw_id: 999999, // Placeholder ID
      date: data.date, // Should be YYYY-MM-DD
      numbers: sortedNumbers,
      stars: sortedStars,
      has_winner: false, // API doesn't provide this specific boolean reliably
      prizes: []
    };

  } catch (error) {
    console.error("[APIVerve] Fetch failed:", error);
    return null;
  }
}