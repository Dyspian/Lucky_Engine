import { StatsResult, StatItem } from "./stats-engine";
import { z } from "zod";

/**
 * Input validation schema for the generator
 */
export const GenerateConfigSchema = z.object({
  tickets: z.number().int().min(1).max(10),
  period: z.enum(["2y", "1y", "6m", "all"]).default("2y"),
  recent: z.number().int().min(10).max(200).default(50),
  weights: z.object({
    all: z.number().min(0).max(1).default(0.7),
    recent: z.number().min(0).max(1).default(0.3),
  }).default({ all: 0.7, recent: 0.3 }),
});

export type GenerateConfig = z.infer<typeof GenerateConfigSchema>;

export type Ticket = {
  numbers: number[];
  stars: number[];
  chancePercentage: number; // Nieuwe eigenschap voor het slaagkans percentage
};

/**
 * Simple seeded RNG (Mulberry32)
 */
function createRNG(seedStr?: string) {
  if (!seedStr) {
    return () => Math.random();
  }
  
  // Simple hash for the seed string
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed << 5) - seed + seedStr.charCodeAt(i);
    seed |= 0;
  }

  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Weighted selection without replacement
 */
function weightedPickUnique(
  items: StatItem[], 
  count: number, 
  rng: () => number,
  alpha: number = 1.2,
  epsilon: number = 1e-6 // Small value to ensure non-zero weight for score=0
): number[] {
  const selected: number[] = [];
  let pool = items.map(item => ({
    value: item.value,
    // Apply temperature smoothing: (score + epsilon) ^ alpha
    weight: Math.pow(item.score + epsilon, alpha)
  }));

  // Check if all weights are effectively zero (or very close)
  const totalInitialWeight = pool.reduce((sum, p) => sum + p.weight, 0);
  const useUniformRandom = totalInitialWeight < epsilon * pool.length; // If sum of weights is tiny

  while (selected.length < count && pool.length > 0) {
    if (useUniformRandom) {
      // Fallback to uniform random selection if all weights are zero
      const randomIndex = Math.floor(rng() * pool.length);
      selected.push(pool[randomIndex].value);
      pool.splice(randomIndex, 1);
    } else {
      const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
      let r = rng() * totalWeight;
      
      let pickedIndex = -1;
      for (let i = 0; i < pool.length; i++) {
        r -= pool[i].weight;
        if (r <= 0) {
          pickedIndex = i;
          break;
        }
      }

      // Fallback if floating point precision issues prevent picking, or if r is still positive due to tiny weights
      if (pickedIndex === -1) {
        pickedIndex = Math.floor(rng() * pool.length);
      }

      selected.push(pool[pickedIndex].value);
      pool.splice(pickedIndex, 1);
    }
  }

  return selected.sort((a, b) => a - b);
}

/**
 * Core generation engine
 */
export function generateTickets(
  stats: StatsResult, 
  config: GenerateConfig,
  options: { seed?: string } = {}
): { tickets: Ticket[], warnings: string[] } {
  const rng = createRNG(options.seed);
  const tickets: Ticket[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  // Use all stats, not just top 10
  const candidatesMain = stats.allNumberStats;
  const candidatesStars = stats.allStarStats;

  for (let i = 0; i < config.tickets; i++) {
    let ticket: Ticket;
    let attempts = 0;
    let serialized: string;

    // Attempt to generate a unique ticket within the batch
    do {
      const numbers = weightedPickUnique(candidatesMain, 5, rng);
      const stars = weightedPickUnique(candidatesStars, 2, rng);

      // Calculate chancePercentage
      const totalNumberScore = numbers.reduce((sum, num) => {
        const statItem = candidatesMain.find(item => item.value === num);
        return sum + (statItem?.score || 0);
      }, 0);

      const totalStarScore = stars.reduce((sum, star) => {
        const statItem = candidatesStars.find(item => item.value === star);
        return sum + (statItem?.score || 0);
      }, 0);

      // Max possible score for 5 numbers + 2 stars is 7 (if all have score 1)
      const maxPossibleScore = 7; 
      const rawChance = (totalNumberScore + totalStarScore) / maxPossibleScore;
      const chancePercentage = Math.round(rawChance * 100); // Scale to 0-100 and round

      ticket = {
        numbers,
        stars,
        chancePercentage,
      };
      serialized = `${ticket.numbers.join(',')}|${ticket.stars.join(',')}`;
      attempts++;
    } while (seen.has(serialized) && attempts < 5); // Retry up to 5 times for uniqueness

    if (seen.has(serialized)) {
      warnings.push("DUPLICATES_POSSIBLE");
    }

    seen.add(serialized);
    tickets.push(ticket);
  }

  return { tickets, warnings };
}