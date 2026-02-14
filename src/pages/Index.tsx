"use client";

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      // 1. Check cache
      const cached = cache.get<Draw[]>(CACHE_KEY);
      if (cached.source === "cache") {
        return { draws: cached.value, source: "cache" };
      }

      try {
        // 2. Fetch live
        const freshDraws = await fetchDraws();
        cache.set(CACHE_KEY, freshDraws, TTL_12H);
        return { draws: freshDraws, source: "live" };
      } catch (err) {
        // 3. Fallback to lastGood if fetch fails
        if (cached.source === "fallback") {
          return { draws: cached.value, source: "fallback" };
        }
        throw err;
      }
    },
    staleTime: TTL_12H,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lucky Engine</h1>
        <p className="text-slate-500 mb-6">Data layer initialized.</p>
        
        <div className="pt-6 border-t border-slate-100">
          {isLoading ? (
            <p className="text-sm text-slate-400 animate-pulse">Fetching data...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {(error as Error).message}</p>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700">
                Draws loaded: <span className="text-indigo-600">{data?.draws?.length || 0}</span>
              </p>
              <p className="text-xs text-slate-400">
                Source: <span className="uppercase tracking-wider font-bold">{data?.source}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;