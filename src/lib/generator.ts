import { StatsResult, StatItem } from "./stats-engine";
import { z } from "zod";

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
  chancePercentage: number;
  flags?: string[]; // New: Reasons why this ticket is statistically "good"
};

/**
 * Seeded RNG
 */
function createRNG(seedStr?: string) {
  if (!seedStr) return () => Math.random();
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
 * Weighted selection
 */
function weightedPickUnique(
  items: StatItem[], 
  count: number, 
  rng: () => number,
  alpha: number = 1.2
): number[] {
  const selected: number[] = [];
  // Use a pool copy
  let pool = items.map(item => ({
    value: item.value,
    weight: Math.pow(item.score + 1e-6, alpha) // Power transform to accentuate peaks
  }));

  while (selected.length < count && pool.length > 0) {
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
    
    // Fallback
    if (pickedIndex === -1) pickedIndex = Math.floor(rng() * pool.length);

    selected.push(pool[pickedIndex].value);
    pool.splice(pickedIndex, 1);
  }

  return selected.sort((a, b) => a - b);
}

// --- ADVANCED MATH FILTERS ---

/**
 * Checks if the set of numbers is well-balanced statistically.
 */
function isValidSet(numbers: number[]): { valid: boolean; flags: string[] } {
  const flags: string[] = [];
  
  // 1. Sum Check (Bell Curve)
  // For 5 numbers from 1-50, the sum typically falls between ~100 and ~175
  const sum = numbers.reduce((a, b) => a + b, 0);
  if (sum < 90 || sum > 180) return { valid: false, flags }; // Reject outliers
  flags.push("Optimal Sum");

  // 2. Parity Check (Odd/Even)
  // We want a mix. All Odd (5:0) or All Even (0:5) is rare (prob ~3-4%).
  const odds = numbers.filter(n => n % 2 !== 0).length;
  const evens = 5 - odds;
  if (odds === 0 || evens === 0) return { valid: false, flags }; // Reject mono-parity
  flags.push("Balanced Parity");

  // 3. High/Low Check
  // Split at 25. We don't want all low (1-25) or all high (26-50).
  const low = numbers.filter(n => n <= 25).length;
  const high = 5 - low;
  if (low === 0 || high === 0) return { valid: false, flags }; // Reject mono-range
  flags.push("Distributed Range");

  // 4. Consecutive Check
  // 1,2,3 is rare. We allow pairs (1,2) but try to avoid triplets (1,2,3).
  let consecutives = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] === numbers[i] + 1) consecutives++;
  }
  if (consecutives > 1) return { valid: false, flags }; // Reject triplets or multiple pairs
  
  return { valid: true, flags };
}

export function generateTickets(
  stats: StatsResult, 
  config: GenerateConfig,
  options: { seed?: string } = {}
): { tickets: Ticket[], warnings: string[] } {
  const rng = createRNG(options.seed);
  const tickets: Ticket[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  const MAX_ATTEMPTS = 500; // Prevent infinite loops

  for (let i = 0; i < config.tickets; i++) {
    let bestTicket: Ticket | null = null;
    let attempts = 0;

    // Try to generate a statistically "Smart" ticket
    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      
      const numbers = weightedPickUnique(stats.allNumberStats, 5, rng);
      const stars = weightedPickUnique(stats.allStarStats, 2, rng);

      // Validate Pattern
      const check = isValidSet(numbers);
      if (!check.valid) continue; // Retry if statistical outlier

      const serialized = `${numbers.join(',')}|${stars.join(',')}`;
      if (seen.has(serialized)) continue; // Retry if duplicate

      // Calculate Chance
      const totalNumberScore = numbers.reduce((sum, num) => {
        const item = stats.allNumberStats.find(i => i.value === num);
        return sum + (item?.score || 0);
      }, 0);
      
      const totalStarScore = stars.reduce((sum, star) => {
        const item = stats.allStarStats.find(i => i.value === star);
        return sum + (item?.score || 0);
      }, 0);

      // Normalize score (heuristic max ~6.0 based on weights)
      const rawScore = totalNumberScore + totalStarScore;
      // Map score to percentage (roughly 0-100)
      const chancePercentage = Math.min(99, Math.round((rawScore / 6.5) * 100));

      bestTicket = {
        numbers,
        stars,
        chancePercentage,
        flags: check.flags
      };
      
      seen.add(serialized);
      break;
    }

    // Fallback: If we couldn't find a perfect ticket in time, just give the last one
    // (This is rare, but safe coding)
    if (!bestTicket) {
      const numbers = weightedPickUnique(stats.allNumberStats, 5, rng);
      const stars = weightedPickUnique(stats.allStarStats, 2, rng);
      bestTicket = {
        numbers, 
        stars, 
        chancePercentage: 50,
        flags: ["Fallback"] 
      };
      warnings.push("Optimization Timeout");
    }

    tickets.push(bestTicket);
  }

  return { tickets, warnings };
}