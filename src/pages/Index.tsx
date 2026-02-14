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
  const [hasDrawsError, setHasDrawsError] = useState(false); // New state for error

  // Explicitly type useQuery to ensure drawsData is correctly typed as Draw[] | undefined
  const { data: drawsData, isLoading: isDataLoading } = useQuery<Draw[], Error, Draw[], string[]>({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const cached = cache.get<Draw[]>(CACHE_KEY);
      if (cached.source === "cache") {
        if (cached.value && cached.value.length > 0) {
          setHasDrawsError(false);
          return cached.value;
        }
      }
      
      try {
        const fetchedResult = await fetchDraws();
        if (fetchedResult.draws.length === 0) {
          console.warn("[Index] Fetched 0 draws from API.");
          setHasDrawsError(true); // No draws found
          showError("Geen EuroMillions trekkinggegevens gevonden. Probeer later opnieuw.");
        } else {
          cache.set(CACHE_KEY, fetchedResult.draws, TTL_12H);
          setHasDrawsError(false);
        }
        return fetchedResult.draws;
      } catch (error) {
        console.error("[Index] Error fetching draws:", error);
        setHasDrawsError(true); // Error during fetch
        showError("Fout bij het laden van EuroMillions trekkinggegevens. Controleer uw internetverbinding of probeer later opnieuw.");
        return []; // Return empty array on error to satisfy type Draw[]
      }
    },
    staleTime: TTL_12H,
    // The onError callback is removed because errors are handled within the queryFn's try-catch block.
    // If an error is caught, hasDrawsError is set and an empty array is returned,
    // so useQuery itself does not see a 'failed' query that would trigger onError.
  });

  // Derive stats for charts if data is available and not empty
  const statsResult = drawsData && drawsData.length > 0 ? buildStats(drawsData, { period: "all", recentWindow: 50, weightAll: 0.7, weightRecent: 0.3 }) : null;
  const lastDraw = drawsData && drawsData.length > 0 ? drawsData[0] : null;

  // Track "Frequency Charts Viewed" when statsResult becomes available
  React.useEffect(() => {
    if (drawsData && statsResult) { // drawsData is already checked for existence by statsResult
      trackEvent("Frequency Charts Viewed", {
        period: statsResult.period,
        drawCount: statsResult.drawCount,
      });
    }
  }, [drawsData, statsResult]);

  const handleGenerate = async (config: GenerateConfig) => {
    // drawsData is now Draw[] | undefined. Need to check for undefined.
    if (!drawsData || drawsData.length === 0) { // Check for empty array too
      showError("Gegevenslaag niet gereed of geen trekkinggegevens beschikbaar.");
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // drawsData is guaranteed to be Draw[] here due to the check above
      const stats = buildStats(drawsData, config);
      if (stats.drawCount === 0) { // Explicitly check drawCount from stats
        showError("Geen geldige trekkinggegevens om tickets te genereren. Pas de analyseperiode aan.");
        setIsGenerating(false);
        return;
      }
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
      console.error("Generatie mislukt:", err);
      showError("Generatie mislukt. Controleer de instellingen.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Map StatItem[] to FrequencyData[] for the charts
  // drawsData is now Draw[] | undefined. Need to check for undefined.
  const numberFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allNumberStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];
  const starFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allStarStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];

  // Conditional rendering for GeneratorPanel and charts
  // drawsData is now Draw[] | undefined. Need to check for undefined.
  const showGeneratorAndCharts = !isDataLoading && !hasDrawsError && drawsData && drawsData.length > 0;

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

          <div className="relative my-12 md:my-24 h-px bg-gradient-to-r from-transparent via-emerald/30 to-transparent"> {/* Kleinere my op mobiel */}
            <div className="absolute inset-x-0 -top-2 h-4 bg-emerald/10 blur-md" />
            <div className="absolute inset-x-0 -bottom-2 h-4 bg-emerald/10 blur-md" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 space-y-12 md:space-y-24"> {/* Kleinere space-y op mobiel */}
            {hasDrawsError && (
              <section className="text-center py-16 bg-red-900/20 border border-red-700/50 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-red-400 mb-4">Fout bij het laden van gegevens</h2>
                <p className="text-red-200">
                  We konden de EuroMillions trekkinggegevens niet laden. Dit kan komen door een netwerkprobleem of de API is tijdelijk niet beschikbaar. Probeer het later opnieuw.
                </p>
              </section>
            )}

            {!hasDrawsError && isDataLoading && (
              <section className="text-center py-16">
                <p className="text-muted-foreground">Laden van trekkinggegevens...</p>
              </section>
            )}

            {showGeneratorAndCharts && (
              <>
                {lastDraw && (
                  <section id="last-draw-section" className="mb-12 md:mb-16"> {/* Kleinere mb op mobiel */}
                    <LastDraw draw={lastDraw} />
                  </section>
                )}

                {statsResult && (
                  <section id="frequency-charts" className="space-y-8">
                    <h2 className="text-xl font-bold tracking-extra-wide text-foreground text-center uppercase mb-8 md:mb-12 text-small-caps">Frequentie Analyse</h2> {/* Kleinere mb op mobiel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> {/* Kleinere gap op mobiel */}
                      <FrequencyChart data={numberFrequencyData} title="Getal Frequentie" color="hsl(var(--emerald))" />
                      <FrequencyChart data={starFrequencyData} title="Ster Frequentie" color="hsl(var(--gold))" />
                    </div>
                  </section>
                )}

                <section id="generator-section" className="grid grid-cols-1 lg:col-span-12 gap-6 md:gap-12 items-start pt-12 md:pt-16"> {/* Kleinere gap en pt op mobiel */}
                  <div className="lg:col-span-5 sticky top-24">
                    <GeneratorPanel onGenerate={handleGenerate} isLoading={isGenerating || isDataLoading} />
                  </div>
                  
                  <div className="lg:col-span-7 space-y-6 min-h-[400px] pt-6 md:pt-8" id="results"> {/* Kleinere space-y en pt op mobiel */}
                    <AnimatePresence mode="wait">
                      {results ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-4" /* Kleinere space-y */
                        >
                          <div className="flex items-center justify-between px-2">
                            <h2 className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                              Gegenereerde Resultaten
                            </h2>
                            <span className="text-[9px] font-medium text-emerald/60 italic"> {/* Kleinere tekst */}
                              Gewogen op basis van statistische score
                            </span>
                          </div>
                          
                          <div className="space-y-3"> {/* Kleinere space-y */}
                            {results.tickets.map((ticket, i) => (
                              <TicketCard key={i} ticket={ticket} index={i} />
                            ))}
                          </div>

                          <div className="p-4 rounded-md bg-card border border-border/20 shadow-lg" /* Kleinere padding */
                            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }}
                          >
                            <p className="text-xs text-secondary-foreground leading-relaxed font-medium italic">
                              {results.explanation}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 py-16 md:py-20"> {/* Kleinere py op mobiel */}
                          <div className="w-14 h-14 rounded-full border-2 border-dashed border-muted-foreground" /> {/* Kleinere placeholder */}
                          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground text-small-caps">Wachten op Configuratie</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </>
            )}

            <section id="explanation-section" className="pt-12 md:pt-16"> {/* Kleinere pt op mobiel */}
              <ExplanationSection />
            </section>
            
            <DisclaimerSection />
          </div>
        </main>

        <footer className="py-8 border-t border-border/10 relative z-10 mt-16 md:mt-24"> {/* Kleinere py en mt op mobiel */}
          <div className="max-w-6xl mx-auto px-6 text-left">
            <p className="text-[9px] font-bold uppercase tracking-extra-wide text-muted-foreground/40 text-small-caps"> {/* Kleinere tekst */}
              © 2024 Lucky Engine • Analytische Systemen Divisie
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;