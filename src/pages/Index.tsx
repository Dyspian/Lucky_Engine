"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchEuroMillionsDraws, Draw } from "@/lib/euromillions-provider";
import { calculateStats, RankedResult } from "@/lib/stats-engine";
import { generateTickets, Ticket } from "@/lib/generator";
import cache from "@/lib/cache";
import TicketCard from "@/components/TicketCard";
import StatsInfo from "@/components/StatsInfo";
import LastDraw from "@/components/LastDraw";
import FrequencyChart from "@/components/FrequencyChart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw, Ticket as TicketIcon, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showError, showSuccess } from "@/utils/toast";

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<RankedResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: draws, isLoading, error } = useQuery({
    queryKey: ['euromillions-draws'],
    queryFn: async () => {
      const cachedData = cache.get<Draw[]>('draws');
      if (cachedData) return cachedData;
      
      const freshData = await fetchEuroMillionsDraws();
      cache.set('draws', freshData);
      return freshData;
    },
    staleTime: 1000 * 60 * 60 * 12,
  });

  useEffect(() => {
    if (draws && draws.length > 0) {
      const calculatedStats = calculateStats(draws);
      setStats(calculatedStats);
      if (tickets.length === 0) {
        setTickets(generateTickets(calculatedStats, 3));
      }
    }
  }, [draws]);

  const handleGenerate = () => {
    if (stats) {
      setIsGenerating(true);
      // Artificial delay for "AI processing" feel
      setTimeout(() => {
        setTickets(generateTickets(stats, 3));
        setIsGenerating(false);
        showSuccess("Nieuwe geluksgetallen gegenereerd!");
      }, 800);
    }
  };

  if (error) {
    showError("Kon gegevens niet ophalen. Probeer het later opnieuw.");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-50/50 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-bold mb-6 shadow-lg shadow-indigo-200"
          >
            <Sparkles size={16} />
            <span>AI-POWERED ANALYSIS</span>
          </motion.div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-slate-900 mb-6"
          >
            Lucky <span className="text-indigo-600">Engine</span>
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Slimme EuroMillions-voorspellingen gebaseerd op historische data en recente trends.
          </motion.p>
        </header>

        <main className="space-y-12">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-40 w-full rounded-3xl" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {draws && draws.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <LastDraw draw={draws[0]} />
                </motion.div>
              )}

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <TicketIcon className="text-indigo-600" />
                    Jouw Geluksgetallen
                  </h2>
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    variant="outline"
                    className="rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 font-bold gap-2 min-w-[160px]"
                  >
                    <RefreshCw size={18} className={isGenerating ? "animate-spin" : ""} />
                    {isGenerating ? "Analyseren..." : "Nieuwe Getallen"}
                  </Button>
                </div>

                <div className="grid gap-4">
                  <AnimatePresence mode="popLayout">
                    {tickets.map((ticket, idx) => (
                      <TicketCard key={`${idx}-${JSON.stringify(ticket)}`} ticket={ticket} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {stats && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-2 px-2">
                    <BarChart3 className="text-indigo-600" />
                    <h2 className="text-2xl font-bold">Data Inzichten</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FrequencyChart 
                      data={stats.numberFrequencies} 
                      title="Getal Frequentie (1-50)" 
                      color="#4f46e5" 
                    />
                    <FrequencyChart 
                      data={stats.starFrequencies} 
                      title="Ster Frequentie (1-12)" 
                      color="#f59e0b" 
                    />
                  </div>

                  <StatsInfo explanation={stats.explanation} />
                </motion.div>
              )}
            </>
          )}
        </main>

        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Lucky Engine. Speel verantwoord. 18+</p>
          <div className="mt-4">
            <a
              href="https://www.elmony.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              Made with Elmony
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;