import { Draw } from "./euromillions-provider";
import { subMonths, subYears, isAfter, parseISO } from "date-fns";

export const MAIN_RANGE = 50;
export const STAR_RANGE = 12;

export type Period = "2y" | "1y" | "6m" | "all";

/**
 * Frequency data structure for charts
 */
export type FrequencyData = {
  value: number;
  count: number;
};

export interface StatsConfig {
  period: Period;
  recentWindow: number;
  weightAll: number;
  weightRecent: number;
}

export interface StatItem {
  value: number;
  freqPeriod: number;
  freqRecent: number;
  score: number;
}

export interface StatsResult {
  ok: boolean;
  period: Period;
  recent: number;
  weights: { all: number; recent: number };
  drawCount: number;
  rankedNumbers: number[];
  rankedStars: number[];
  topNumbers: StatItem[];
  topStars: StatItem[];
  explanation: string;
  warning?: "LOW_SAMPLE_SIZE";
}

/**
 * Alias for StatsResult to support legacy imports
 */
export type RankedResult = StatsResult;

/**
 * Filters draws based on the selected period relative to now.
 */
function filterByPeriod(draws: Draw[], period: Period): Draw[] {
  if (period === "all") return draws;

  const now = new Date();
  let cutoff: Date;

  switch (period) {
    case "6m": cutoff = subMonths(now, 6); break;
    case "1y": cutoff = subYears(now, 1); break;
    case "2y": cutoff = subYears(now, 2); break;
    default: cutoff = subYears(now, 2);
  }

  return draws.filter((d) => isAfter(parseISO(d.date), cutoff));
}

/**
 * Calculates weighted statistics for a range of numbers.
 */
function calculateRankedItems(
  draws: Draw[],
  range: number,
  isStar: boolean,
  config: StatsConfig
): { ranked: number[]; top: StatItem[] } {
  const { recentWindow, weightAll, weightRecent } = config;
  const totalDraws = draws.length;
  const recentDraws = draws.slice(0, Math.min(recentWindow, totalDraws));
  const recentCount = recentDraws.length;

  const items: StatItem[] = [];

  for (let i = 1; i <= range; i++) {
    const countPeriod = draws.filter((d) => 
      (isStar ? d.stars : d.numbers).includes(i)
    ).length;
    
    const countRecent = recentDraws.filter((d) => 
      (isStar ? d.stars : d.numbers).includes(i)
    ).length;

    const freqPeriod = totalDraws > 0 ? countPeriod / totalDraws : 0;
    const freqRecent = recentCount > 0 ? countRecent / recentCount : 0;
    const score = (freqPeriod * weightAll) + (freqRecent * weightRecent);

    items.push({ value: i, freqPeriod, freqRecent, score });
  }

  // Stable sort: Score (desc) -> Recent Freq (desc) -> Period Freq (desc) -> Value (asc)
  const sorted = [...items].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.freqRecent !== a.freqRecent) return b.freqRecent - a.freqRecent;
    if (b.freqPeriod !== a.freqPeriod) return b.freqPeriod - a.freqPeriod;
    return a.value - b.value;
  });

  return {
    ranked: sorted.map((item) => item.value),
    top: sorted.slice(0, 10),
  };
}

export function buildStats(draws: Draw[], rawConfig: Partial<StatsConfig>): StatsResult {
  // Normalize weights
  const wAll = rawConfig.weightAll ?? 0.7;
  const wRecent = rawConfig.weightRecent ?? 0.3;
  const sum = wAll + wRecent;
  const config: StatsConfig = {
    period: rawConfig.period ?? "2y",
    recentWindow: Math.max(10, Math.min(200, rawConfig.recentWindow ?? 50)),
    weightAll: sum > 0 ? wAll / sum : 0.7,
    weightRecent: sum > 0 ? wRecent / sum : 0.3,
  };

  const filteredDraws = filterByPeriod(draws, config.period);
  const drawCount = filteredDraws.length;

  const numberStats = calculateRankedItems(filteredDraws, MAIN_RANGE, false, config);
  const starStats = calculateRankedItems(filteredDraws, STAR_RANGE, true, config);

  const explanation = `
    Analysis based on ${drawCount} draws from the last ${config.period === 'all' ? 'available history' : config.period}. 
    We apply a ${Math.round(config.weightAll * 100)}% weight to long-term frequency and ${Math.round(config.weightRecent * 100)}% 
    to the last ${config.recentWindow} draws. 
    Disclaimer: EuroMillions draws are independent events. Historical data provides no guarantee of future results.
  `.trim();

  return {
    ok: true,
    period: config.period,
    recent: config.recentWindow,
    weights: { all: config.weightAll, recent: config.weightRecent },
    drawCount,
    rankedNumbers: numberStats.ranked,
    rankedStars: starStats.ranked,
    topNumbers: numberStats.top,
    topStars: starStats.top,
    explanation,
    warning: drawCount < 20 ? "LOW_SAMPLE_SIZE" : undefined,
  };
}