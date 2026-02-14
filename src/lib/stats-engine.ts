import { Draw } from "./euromillions-provider";

export type RankedResult = {
  rankedNumbers: number[];
  rankedStars: number[];
  explanation: string;
};

export function calculateStats(draws: Draw[]): RankedResult {
  const allTimeNumbers = new Map<number, number>();
  const allTimeStars = new Map<number, number>();
  const recentNumbers = new Map<number, number>();
  const recentStars = new Map<number, number>();

  const recentWindow = 50;
  const recentDraws = draws.slice(0, recentWindow);

  // Initialize maps for all possible numbers (1-50) and stars (1-12)
  for (let i = 1; i <= 50; i++) {
    allTimeNumbers.set(i, 0);
    recentNumbers.set(i, 0);
  }
  for (let i = 1; i <= 12; i++) {
    allTimeStars.set(i, 0);
    recentStars.set(i, 0);
  }

  // Calculate all-time frequencies
  draws.forEach((draw) => {
    draw.numbers.forEach((n) => allTimeNumbers.set(n, (allTimeNumbers.get(n) || 0) + 1));
    draw.stars.forEach((s) => allTimeStars.set(s, (allTimeStars.get(s) || 0) + 1));
  });

  // Calculate recent frequencies
  recentDraws.forEach((draw) => {
    draw.numbers.forEach((n) => recentNumbers.set(n, (recentNumbers.get(n) || 0) + 1));
    draw.stars.forEach((s) => recentStars.set(s, (recentStars.get(s) || 0) + 1));
  });

  const calculateScores = (
    allTimeMap: Map<number, number>,
    recentMap: Map<number, number>,
    totalDraws: number,
    recentCount: number
  ) => {
    const scores: { item: number; score: number }[] = [];
    
    allTimeMap.forEach((count, item) => {
      const freqAllTime = count / totalDraws;
      const freqRecent = (recentMap.get(item) || 0) / recentCount;
      
      // Formula: score = (freq_all_time * 0.7) + (freq_recent * 0.3)
      const score = (freqAllTime * 0.7) + (freqRecent * 0.3);
      scores.push({ item, score });
    });

    return scores
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
  };

  const rankedNumbers = calculateScores(allTimeNumbers, recentNumbers, draws.length, recentDraws.length);
  const rankedStars = calculateScores(allTimeStars, recentStars, draws.length, recentDraws.length);

  const explanation = `
    De Lucky Engine analyseert historische EuroMillions-trekkingen met behulp van een gewogen frequentiemodel. 
    De berekening is gebaseerd op twee hoofdfactoren: de totale frequentie sinds het begin (70% weging) 
    en de recente frequentie over de laatste 50 trekkingen (30% weging). 
    
    Dit model identificeert getallen die historisch gezien vaker voorkomen, terwijl het ook rekening houdt 
    met recente trends. Belangrijk: EuroMillions-trekkingen zijn onafhankelijke gebeurtenissen. 
    Historische data biedt geen garantie voor toekomstige resultaten en verhoogt de feitelijke winkans niet.
  `.trim();

  return {
    rankedNumbers,
    rankedStars,
    explanation,
  };
}