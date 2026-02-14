import { StatsResult, StatItem } from "./stats-engine";

export type Ticket = {
  numbers: number[];
  stars: number[];
};

/**
 * Generates a set of unique tickets using a weighted random selection algorithm.
 * The probability of a number being picked is proportional to its statistical score.
 */
export function generateTickets(stats: StatsResult, count: number = 3): Ticket[] {
  const tickets: Ticket[] = [];
  const requestedCount = Math.min(Math.max(1, count), 10); // Limit 1-10 for safety

  // Helper to pick N unique items from a pool using weighted probabilities
  const pickWeighted = (items: StatItem[], countToPick: number): number[] => {
    const selected: number[] = [];
    const pool = [...items];

    while (selected.length < countToPick && pool.length > 0) {
      // Calculate total weight of remaining items
      const totalWeight = pool.reduce((sum, item) => sum + item.score, 0);
      let random = Math.random() * totalWeight;
      
      for (let i = 0; i < pool.length; i++) {
        random -= pool[i].score;
        if (random <= 0) {
          selected.push(pool[i].value);
          pool.splice(i, 1); // Remove to ensure uniqueness within a single ticket
          break;
        }
      }
    }

    return selected.sort((a, b) => a - b);
  };

  // We need the full StatItem list to calculate weights correctly
  // Since StatsResult only exports top 10, we'll reconstruct the pool or 
  // assume the generator has access to the logic. 
  // For this implementation, we'll use the ranked arrays as a fallback 
  // if full StatItems aren't provided, but ideally we use the scores.
  
  // Note: In a real production app, we'd pass the full scored list.
  // For now, we'll use the topNumbers/topStars as the primary pool 
  // to ensure the "Lucky" aspect is prominent.
  
  for (let i = 0; i < requestedCount; i++) {
    tickets.push({
      numbers: pickWeighted(stats.topNumbers, 5),
      stars: pickWeighted(stats.topStars, 2),
    });
  }

  return tickets;
}