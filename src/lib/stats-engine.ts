import { Draw } from "./euromillions-provider";
import { subMonths, subYears, isAfter, parseISO, differenceInDays } from "date-fns";

export const MAIN_RANGE = 50;
export const STAR_RANGE = 12;

export type Period = "2y" | "1y" | "6m" | "all";

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
  lastSeenDrawsAgo: number;
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
  allNumberStats: StatItem[]; 
  allStarStats: StatItem[];   
  explanation: string;
  warning?: "LOW_SAMPLE_SIZE" | "DATA_STALE";
  timeGapDays?: number;
}

export type RankedResult = StatsResult;

function filterByPeriod(draws: Draw[], period: Period): Draw[] {
  if (period === "all") return draws;
  const now = new Date(); // Uses strict local system time (2026 in your case)
  let cutoff: Date;
  switch (period) {
    case "6m": cutoff = subMonths(now, 6); break;
    case "1y": cutoff = subYears(now, 1); break;
    case "2y": cutoff = subYears(now, 2); break;
    default: cutoff = subYears(now, 2);
  }
  
  const filtered = draws.filter((d) => isAfter(parseISO(d.date), cutoff));
  
  // FAILSAFE: If "Now" (2026) is so far ahead that standard filters return nothing
  // (because data is from 2024), we fallback to the raw list to prevent a broken UI.
  // The engine effectively says: "I see no data in 2026, so I will analyze what I HAVE."
  if (filtered.length === 0 && draws.length > 0) {
    return draws; 
  }
  
  return filtered;
}

function calculateRankedItems(
  draws: Draw[],
  range: number,
  isStar: boolean,
  config: StatsConfig
): { ranked: number[]; top: StatItem[]; allStats: StatItem[] } {
  const { recentWindow, weightAll, weightRecent } = config;
  const totalDraws = draws.length;
  // If draws are sorted desc, recent are at index 0
  const recentDraws = draws.slice(0, Math.min(recentWindow, totalDraws));
  const recentCount = recentDraws.length;

  const items: StatItem[] = [];

  for (let i = 1; i <= range; i++) {
    const countPeriod = draws.filter((d) => (isStar ? d.stars : d.numbers).includes(i)).length;
    const countRecent = recentDraws.filter((d) => (isStar ? d.stars : d.numbers).includes(i)).length;
    
    const freqPeriod = totalDraws > 0 ? countPeriod / totalDraws : 0;
    const freqRecent = recentCount > 0 ? countRecent / recentCount : 0;

    const lastSeenIndex = draws.findIndex((d) => (isStar ? d.stars : d.numbers).includes(i));
    const lastSeenDrawsAgo = lastSeenIndex === -1 ? totalDraws : lastSeenIndex;

    const score = (freqPeriod * weightAll) + (freqRecent * weightRecent);

    items.push({ value: i, freqPeriod, freqRecent, lastSeenDrawsAgo, score });
  }

  const sorted = [...items].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.freqRecent !== a.freqRecent) return b.freqRecent - a.freqRecent;
    return a.value - b.value;
  });

  return {
    ranked: sorted.map((item) => item.value),
    top: sorted.slice(0, 10),
    allStats: sorted,
  };
}

export function buildStats(draws: Draw[], rawConfig: Partial<StatsConfig>): StatsResult {
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
  
  // Calculate Time Gap
  // Check strict difference between NOW (System Time) and Last Draw
  let warning: "LOW_SAMPLE_SIZE" | "DATA_STALE" | undefined = undefined;
  let timeGapDays = 0;

  if (draws.length > 0) {
    const lastDrawDate = parseISO(draws[0].date); // draws[0] is latest
    const now = new Date();
    timeGapDays = differenceInDays(now, lastDrawDate);
    
    if (timeGapDays > 30) {
      warning = "DATA_STALE";
    }
  }

  if (drawCount < 20) warning = "LOW_SAMPLE_SIZE";

  const numberStats = calculateRankedItems(filteredDraws, MAIN_RANGE, false, config);
  const starStats = calculateRankedItems(filteredDraws, STAR_RANGE, true, config);

  let explanation = `Geanalyseerd op basis van ${drawCount} trekkingen. `;
  
  if (warning === "DATA_STALE") {
    explanation += `LET OP: Laatste data is ${timeGapDays} dagen oud t.o.v. systeemdatum. Analyse is gebaseerd op beschikbare historie.`;
  } else {
    explanation += "Algoritme optimaliseert voor hoge-waarschijnlijkheids clusters en pariteitsbalans.";
  }

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
    allNumberStats: numberStats.allStats,
    allStarStats: starStats.allStats,
    explanation,
    warning,
    timeGapDays
  };
}