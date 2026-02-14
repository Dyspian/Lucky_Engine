// src/lib/euromillions-provider.ts

import { Draw } from "./euromillions/schemas"; 
import { LOCAL_HISTORY } from "@/data/history";
import { fetchLatestDrawFromApiVerve } from "@/lib/apiverve";

// Re-export Draw type so consumers can use it
export type { Draw };

export class ProviderError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ProviderError";
  }
}

/**
 * Fetches draw data.
 * Tries to get the LATEST draw from APIVerve (live accuracy).
 * Merges it with the EMBEDDED history (statistical depth).
 */
export async function fetchDraws(): Promise<{ draws: Draw[]; source: "embedded" | "live-mixed" }> {
  // 1. Load Local History (Instant)
  let combinedDraws = [...LOCAL_HISTORY];
  let source: "embedded" | "live-mixed" = "embedded";

  // 2. Try Fetching Live Data (Async)
  // We do this optimistically. If it fails, we just return local.
  try {
    const liveDraw = await fetchLatestDrawFromApiVerve();
    
    if (liveDraw) {
      // Check if we already have this date to avoid duplicates
      const exists = combinedDraws.some(d => d.date === liveDraw.date);
      if (!exists) {
        combinedDraws.unshift(liveDraw as Draw);
        source = "live-mixed";
        console.log("[Provider] Successfully merged live APIVerve data.");
      }
    }
  } catch (err) {
    console.warn("[Provider] Live fetch failed, using local history only.", err);
  }

  // 3. Sort by date descending
  combinedDraws.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { 
    draws: combinedDraws, 
    source: source 
  };
}