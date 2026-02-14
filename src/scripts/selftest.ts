import { fetchDraws, ProviderError, Draw } from "@/lib/euromillions-provider";
import { buildStats, MAIN_RANGE, STAR_RANGE } from "@/lib/stats-engine";
import { generateTickets, GenerateConfig } from "@/lib/generator";

async function runSelfTest() {
  console.log("Starting backend self-test...");

  let draws: Draw[] = [];
  let providerSource: "prod" | "staging" | "embedded" | "live-mixed" = "embedded"; 
  let drawsCount: number = 0;

  try {
    const result = await fetchDraws();
    draws = result.draws;
    providerSource = result.source;
    drawsCount = draws.length;
    console.log(`Successfully fetched ${drawsCount} draws from ${providerSource} provider.`);
  } catch (error) {
    if (error instanceof ProviderError) {
      console.error("Failed to fetch draws from any provider:", error.message, error.details);
    } else {
      console.error("An unexpected error occurred during draw fetching:", error);
    }
    process.exit(1); // Exit with error code
  }

  const testConfig: GenerateConfig = {
    tickets: 1, // Generate one ticket at a time
    period: "all",
    recent: 50,
    weights: { all: 0.7, recent: 0.3 },
    riskFactor: 1.5 // Added riskFactor to match schema
  };
  const numSamples = 200;

  const stats = buildStats(draws, testConfig);

  let mainMin = MAIN_RANGE + 1;
  let mainMax = 0;
  const mainSeen = new Set<number>();

  let starsMin = STAR_RANGE + 1;
  let starsMax = 0;
  const starsSeen = new Set<number>();

  console.log(`Generating ${numSamples} tickets for distribution check...`);
  for (let i = 0; i < numSamples; i++) {
    // Use a unique seed for each sample to ensure diverse generation
    const { tickets } = generateTickets(stats, testConfig, { seed: `selftest-${i}-${Date.now()}` });
    const ticket = tickets[0]; // Always one ticket per generation

    ticket.numbers.forEach(n => {
      mainMin = Math.min(mainMin, n);
      mainMax = Math.max(mainMax, n);
      mainSeen.add(n);
    });

    ticket.stars.forEach(s => {
      starsMin = Math.min(starsMin, s);
      starsMax = Math.max(starsMax, s);
      starsSeen.add(s);
    });
  }

  const generatorCheck = {
    samples: numSamples,
    mainMin: mainMin,
    mainMax: mainMax,
    starsMin: starsMin,
    starsMax: starsMax,
    mainSeenCount: mainSeen.size,
    starsSeenCount: starsSeen.size,
  };

  const successCriteria = {
    mainMin: generatorCheck.mainMin >= 1,
    mainMax: generatorCheck.mainMax <= MAIN_RANGE,
    starsMin: generatorCheck.starsMin >= 1,
    starsMax: generatorCheck.starsMax <= STAR_RANGE,
    mainSeenCount: generatorCheck.mainSeenCount > 30, // Expect good coverage for main numbers
    starsSeenCount: generatorCheck.starsSeenCount > 8, // Expect good coverage for stars
  };

  const overallOk = Object.values(successCriteria).every(Boolean);

  const result = {
    ok: overallOk,
    provider: providerSource,
    drawsCount: drawsCount,
    generatorCheck: generatorCheck,
    successCriteria: successCriteria, // For debugging/visibility
  };

  console.log("\n--- Self-Test Results ---");
  console.log(JSON.stringify(result, null, 2));
  console.log("-------------------------");

  if (!overallOk) {
    console.error("Self-test FAILED!");
    process.exit(1);
  } else {
    console.log("Self-test PASSED!");
    process.exit(0);
  }
}

runSelfTest();