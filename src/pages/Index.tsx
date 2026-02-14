"use client";

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";
import { buildStats } from "@/lib/stats-engine";
import { generateTickets, GenerateConfigSchema } from "@/lib/generator";

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["api:generate:demo"],
    queryFn: async () => {
      // 1. Load Data (Phase 1)
      const cached = cache.get<Draw[]>(CACHE_KEY);
      let draws: Draw[];
      if (cached.source === "cache") {
        draws = cached.value!;
      } else {
        draws = await fetchDraws();
        cache.set(CACHE_KEY, draws, TTL_12H);
      }

      // 2. Validate Config (Phase 3)
      const rawConfig = { tickets: 3, period: "2y", recent: 50 };
      const config = GenerateConfigSchema.parse(rawConfig);

      // 3. Build Stats (Phase 2)
      const stats = buildStats(draws, config);

      // 4. Generate (Phase 3)
      const { tickets, warnings } = generateTickets(stats, config);

      // Return simulated API response
      return {
        ok: true,
        ticketsRequested: config.tickets,
        ticketsGenerated: tickets.length,
        config,
        method: {
          selection: "weighted-random-from-scores",
          notes: [
            "Biases toward historically frequent numbers within selected period and recency window.",
            "Draws are independent; no guarantee."
          ]
        },
        results: tickets,
        warnings,
        explanation: stats.explanation,
        disclaimer: "EuroMillions draws are independent events. Historical data provides no guarantee of future results."
      };
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lucky Engine</h1>
        <p className="text-slate-500 mb-6">Generator engine initialized.</p>
        
        <div className="pt-6 border-t border-slate-100">
          {isLoading ? (
            <p className="text-sm text-slate-400 animate-pulse">Generating tickets...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {(error as Error).message}</p>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-[10px] text-indigo-300 font-mono">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sample Output</h3>
                {data?.results.map((ticket, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-mono flex justify-between items-center">
                    <span className="text-indigo-600 font-bold">{ticket.numbers.join(' ')}</span>
                    <span className="text-amber-500 font-bold">★ {ticket.stars.join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;