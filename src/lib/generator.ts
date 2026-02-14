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
  alpha: number = 1.2
): number[] {
  const selected: number[] = [];
  const pool = items.map(item => ({
    value: item.value,
    // Apply temperature smoothing: (score + epsilon) ^ alpha
    weight: Math.pow(item.score + 1e-6, alpha)
  }));

  while (selected.length < count && pool.length > 0) {
    const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
    let r = rng() * totalWeight;
    
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight;
      if (r <= 0) {
        selected.push(pool[i].value);
        pool.splice(i, 1);
        break;
      }
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

  for (let i = 0; i < config.tickets; i++) {
    let ticket: Ticket;
    let attempts = 0;
    let serialized: string;

    // Attempt to generate a unique ticket within the batch
    do {
      ticket = {
        numbers: weightedPickUnique(stats.topNumbers, 5, rng),
        stars: weightedPickUnique(stats.topStars, 2, rng)
      };
      serialized = `${ticket.numbers.join(',')}|${ticket.stars.join(',')}`;
      attempts++;
    } while (seen.has(serialized) && attempts < 5);

    if (seen.has(serialized)) {
      warnings.push("DUPLICATES_POSSIBLE");
    }

    seen.add(serialized);
    tickets.push(ticket);
  }

  return { tickets, warnings };
}