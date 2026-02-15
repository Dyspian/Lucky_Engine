import { StatsResult, StatItem } from "./stats-engine";
import { z } from "zod";

export const GenerateConfigSchema = z.object({
  tickets: z.number().int().min(1).max(10),
  period: z.enum(["2y", "1y", "6m", "all"]).default("all"), // Changed default from "2y" to "all"
  recent: z.number().int().min(10).max(200).default(50),
  riskFactor: z.number().min(0.1).max(5.0).default(1.5), 
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
  flags?: string[]; 
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
 * Weighted selection with Alpha (Risk) control
 */
function weightedPickUnique(
  items: StatItem[], 
  count: number, 
  rng: () => number,
  alpha: number
): number[] {
  const selected: number[] = [];
  
  let pool = items.map(item => ({
    value: item.value,
    weight: Math.pow(item.score + 1e-6, alpha) 
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

function isValidSet(numbers: number[]): { valid: boolean; flags: string[] } {
  const flags: string[] = [];
  
  // 1. Sum Check (Bell Curve)
  const sum = numbers.reduce((a, b) => a + b, 0);
  if (sum < 90 || sum > 180) return { valid: false, flags }; 
  flags.push("Optimale Som");

  // 2. Parity Check (Odd/Even)
  const odds = numbers.filter(n => n % 2 !== 0).length;
  const evens = 5 - odds;
  if (odds === 0 || evens === 0) return { valid: false, flags }; 
  flags.push("Evenwichtige Pariteit");

  // 3. High/Low Check
  const low = numbers.filter(n => n <= 25).length;
  const high = 5 - low;
  if (low === 0 || high === 0) return { valid: false, flags }; 
  flags.push("Gespreid Bereik");

  // 4. Consecutive Check
  let consecutives = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] === numbers[i] + 1) consecutives++;
  }
  if (consecutives > 1) return { valid: false, flags }; 
  
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

  const MAX_ATTEMPTS = 500; 

  for (let i = 0; i < config.tickets; i++) {
    let bestTicket: Ticket | null = null;
    let attempts = 0;

    // Try to generate a statistically "Smart" ticket
    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      
      const numbers = weightedPickUnique(stats.allNumberStats, 5, rng, config.riskFactor);
      const stars = weightedPickUnique(stats.allStarStats, 2, rng, config.riskFactor);

      // Validate Pattern
      const check = isValidSet(numbers);
      if (!check.valid) continue; 

      const serialized = `${numbers.join(',')}|${stars.join(',')}`;
      if (seen.has(serialized)) continue; 

      // Calculate Chance
      const totalNumberScore = numbers.reduce((sum, num) => {
        const item = stats.allNumberStats.find(i => i.value === num);
        return sum + (item?.score || 0);
      }, 0);
      
      const totalStarScore = stars.reduce((sum, star) => {
        const item = stats.allStarStats.find(i => i.value === star);
        return sum + (item?.score || 0);
      }, 0);

      // Normalize score
      const rawScore = totalNumberScore + totalStarScore;
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

    // Fallback
    if (!bestTicket) {
      const numbers = weightedPickUnique(stats.allNumberStats, 5, rng, 1.0); 
      const stars = weightedPickUnique(stats.allStarStats, 2, rng, 1.0);
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