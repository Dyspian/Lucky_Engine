"use client";

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";
import { buildStats } from "@/lib/stats-engine";
import { generateTickets, Ticket } from "@/lib/generator";
import { Button } from "@/components/ui/button";
import { RefreshCw, Ticket as TicketIcon } from "lucide-react";

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const [generatedTickets, setGeneratedTickets] = useState<Ticket[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const cached = cache.get<Draw[]>(CACHE_KEY);
      let draws: Draw[];
      
      if (cached.source === "cache") {
        draws = cached.value!;
      } else {
        try {
          draws = await fetchDraws();
          cache.set(CACHE_KEY, draws, TTL_12H);
        } catch (err) {
          if (cached.source === "fallback") {
            draws = cached.value!;
          } else {
            throw err;
          }
        }
      }

      const stats = buildStats(draws, { period: "2y", recentWindow: 50 });
      return { stats };
    },
    staleTime: TTL_12H,
  });

  const handleGenerate = () => {
    if (data?.stats) {
      const newTickets = generateTickets(data.stats, 3);
      setGeneratedTickets(newTickets);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lucky Engine</h1>
        <p className="text-slate-500 mb-6">Generator logic initialized.</p>
        
        <div className="pt-6 border-t border-slate-100 space-y-6">
          {isLoading ? (
            <p className="text-sm text-slate-400 animate-pulse">Analyzing & Preparing...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {(error as Error).message}</p>
          ) : (
            <>
              <Button 
                onClick={handleGenerate}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold gap-2"
              >
                <RefreshCw size={18} />
                Generate Lucky Tickets
              </Button>

              {generatedTickets.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <TicketIcon size={14} />
                    Suggested Tickets
                  </h3>
                  {generatedTickets.map((ticket, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-mono flex justify-between items-center">
                      <span className="text-indigo-600 font-bold">{ticket.numbers.join(' ')}</span>
                      <span className="text-amber-500 font-bold">★ {ticket.stars.join(' ')}</span>
                    </div>
                  ))}
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