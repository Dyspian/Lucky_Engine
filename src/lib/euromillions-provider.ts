// src/lib/euromillions-provider.ts

import { Draw } from "./euromillions/schemas"; 
import { LOCAL_HISTORY } from "@/data/history";

// Re-export Draw type so consumers can use it
export type { Draw };

export class ProviderError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ProviderError";
  }
}

/**
 * Fetches draw data from the Embedded Archive.
 * This is instantaneous and works offline.
 */
export async function fetchDraws(): Promise<{ draws: Draw[]; source: "embedded" }> {
  // Simulate a very brief delay just to allow UI transitions to feel natural, 
  // but logically this is instant.
  await new Promise(resolve => setTimeout(resolve, 50));

  if (!LOCAL_HISTORY || LOCAL_HISTORY.length === 0) {
    throw new ProviderError("Local history is empty.");
  }

  // Sort by date descending to ensure the latest draw is first
  const sortedDraws = [...LOCAL_HISTORY].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { 
    draws: sortedDraws, 
    source: "embedded" 
  };
}