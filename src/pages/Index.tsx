"use client";

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";
import { buildStats, FrequencyData } from "@/lib/stats-engine";
import { generateTickets, GenerateConfig, Ticket } from "@/lib/generator";
import Navbar from "@/components/Navbar";
import HeroLuck from "@/components/HeroLuck";
import GeneratorPanel from "@/components/GeneratorPanel";
import TicketCard from "@/components/TicketCard";
import { ExplanationSection, DisclaimerSection } from "@/components/InfoSections";
import { showSuccess, showError } from "@/utils/toast";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from '@/components/LoadingScreen';
import TrustStatsStrip from '@/components/TrustStatsStrip';
import LastDraw from '@/components/LastDraw';
import FrequencyChart from '@/components/FrequencyChart';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import BackgroundGrid from '@/components/BackgroundGrid';
import { trackEvent } from "@/utils/analytics"; // Import trackEvent

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const [results, setResults] = useState<{ tickets: Ticket[], explanation: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: drawsData, isLoading: isDataLoading } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const cached = cache.get<Draw[]>(CACHE_KEY);
      if (cached.source === "cache") return cached.value!;
      
      const fetchedResult = await fetchDraws();
      cache.set(CACHE_KEY, fetchedResult.draws, TTL_12H);
      return fetchedResult.draws;
    },
    staleTime: TTL_12H,
  });

  // Derive stats for charts if data is available
  const statsResult = drawsData ? buildStats(drawsData, { period: "all", recentWindow: 50, weightAll: 0.7, weightRecent: 0.3 }) : null;
  const lastDraw = drawsData && drawsData.length > 0 ? drawsData[0] : null;

  // Track "Frequency Charts Viewed" when statsResult becomes available
  React.useEffect(() => {
    if (drawsData && statsResult) {
      trackEvent("Frequency Charts Viewed", {
        period: statsResult.period,
        drawCount: statsResult.drawCount,
      });
    }
  }, [drawsData, statsResult]);

  const handleGenerate = async (config: GenerateConfig) => {
    if (!drawsData) {
      showError("Gegevenslaag niet gereed. Even geduld a.u.b.");
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const stats = buildStats(drawsData, config);
      const { tickets } = generateTickets(stats, config);
      
      setResults({
        tickets,
        explanation: stats.explanation
      });
      
      showSuccess(`${tickets.length} tickets succesvol gegenereerd.`);

      // Track "Ticket Generated" event
      trackEvent("Ticket Generated", {
        numTickets: config.tickets,
        period: config.period,
        recentWindow: config.recent,
        weightAll: config.weights.all,
        weightRecent: config.weights.recent,
        generatedTicketCount: tickets.length,
      });
      
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to results section
      }, 100);
    } catch (err) {
      showError("Generatie mislukt. Controleer de instellingen.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Map StatItem[] to FrequencyData[] for the charts
  const numberFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allNumberStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];
  const starFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allStarStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];

  return (
    <>
      <AnimatePresence>
        {isDataLoading && !drawsData && <LoadingScreen />}
      </AnimatePresence>

      <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
        <BackgroundGrid />
        <BackgroundCanvas />
        <div className="radial-spotlight" />

        <Navbar />
        
        <main className="relative z-10">
          <HeroLuck
            onGenerateClick={() => scrollToSection('generator-section')}
            onHowItWorksClick={() => scrollToSection('explanation-section')}
          />
          
          <TrustStatsStrip />

          <div className="relative my-16 md:my-24 h-px bg-gradient-to-r from-transparent via-emerald/30 to-transparent">
            <div className="absolute inset-x-0 -top-2 h-4 bg-emerald/10 blur-md" />
            <div className="absolute inset-x-0 -bottom-2 h-4 bg-emerald/10 blur-md" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
            {lastDraw && (
              <section id="last-draw-section" className="mb-16">
                <LastDraw draw={lastDraw} />
              </section>
            )}

            {statsResult && (
              <section id="frequency-charts" className="space-y-8">
                <h2 className="text-xl font-bold tracking-extra-wide text-foreground text-center uppercase mb-12 text-small-caps">Frequentie Analyse</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FrequencyChart data={numberFrequencyData} title="Getal Frequentie" color="hsl(var(--emerald))" />
                  <FrequencyChart data={starFrequencyData} title="Ster Frequentie" color="hsl(var(--gold))" />
                </div>
              </section>
            )}

            <section id="generator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16">
              <div className="lg:col-span-5 sticky top-24">
                <GeneratorPanel onGenerate={handleGenerate} isLoading={isGenerating || isDataLoading} />
              </div>
              
              <div className="lg:col-span-7 space-y-8 min-h-[400px]" id="results">
                <AnimatePresence mode="wait">
                  {results ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                          Gegenereerde Resultaten
                        </h2>
                        <span className="text-[10px] font-medium text-emerald/60 italic">
                          Gewogen op basis van statistische score
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {results.tickets.map((ticket, i) => (
                          <TicketCard key={i} ticket={ticket} index={i} />
                        ))}
                      </div>

                      <div className="p-6 rounded-md bg-card border border-border/20 shadow-lg"
                        style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }}
                      >
                        <p className="text-xs text-secondary-foreground leading-relaxed font-medium italic">
                          {results.explanation}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 py-20">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground" />
                      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground text-small-caps">Wachten op Configuratie</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section id="explanation-section" className="pt-16">
              <ExplanationSection />
            </section>
            
            <DisclaimerSection />
          </div>
        </main>

        <footer className="py-12 border-t border-border/10 relative z-10 mt-24">
          <div className="max-w-6xl mx-auto px-6 text-left">
            <p className="text-[10px] font-bold uppercase tracking-extra-wide text-muted-foreground/40 text-small-caps">
              © 2024 Lucky Engine • Analytische Systemen Divisie
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;