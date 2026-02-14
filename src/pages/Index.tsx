"use client";

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";
import { buildStats, StatsResult } from "@/lib/stats-engine";

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const cached = cache.get<Draw[]>(CACHE_KEY);
      let draws: Draw[];
      let source: "cache" | "live" | "fallback";

      if (cached.source === "cache") {
        draws = cached.value!;
        source = "cache";
      } else {
        try {
          draws = await fetchDraws();
          cache.set(CACHE_KEY, draws, TTL_12H);
          source = "live";
        } catch (err) {
          if (cached.source === "fallback") {
            draws = cached.value!;
            source = "fallback";
          } else {
            throw err;
          }
        }
      }

      // Compute stats for Phase 2 validation
      const stats = buildStats(draws, { period: "2y", recentWindow: 50 });
      return { draws, stats, source };
    },
    staleTime: TTL_12H,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lucky Engine</h1>
        <p className="text-slate-500 mb-6">Statistics engine initialized.</p>
        
        <div className="pt-6 border-t border-slate-100 space-y-4">
          {isLoading ? (
            <p className="text-sm text-slate-400 animate-pulse">Analyzing data...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {(error as Error).message}</p>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700">
                  Draws analyzed: <span className="text-indigo-600">{data?.stats.drawCount}</span>
                </p>
                <p className="text-sm font-medium text-slate-700">
                  Top number: <span className="text-indigo-600 font-bold">#{data?.stats.rankedNumbers[0]}</span>
                </p>
                <p className="text-xs text-slate-400">
                  Source: <span className="uppercase tracking-wider font-bold">{data?.source}</span>
                </p>
              </div>
              
              {data?.stats.warning && (
                <div className="p-2 bg-amber-50 border border-amber-100 rounded text-[10px] text-amber-700 font-bold uppercase tracking-tight">
                  Warning: {data.stats.warning}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;