"use client";

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { buildStats, FrequencyData } from "@/lib/stats-engine";
import { generateTickets, GenerateConfig, Ticket } from "@/lib/generator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import BackgroundGrid from '@/components/BackgroundGrid';
import AdMockup from '@/components/AdMockup';
import { trackEvent } from "@/utils/analytics";
import { Database } from 'lucide-react';
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const Index = () => {
  const [results, setResults] = useState<{ tickets: Ticket[], explanation: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Since data is local, this is virtually instant
  const { data: drawsData, isLoading: isDataLoading } = useQuery<Draw[]>({
    queryKey: ["embedded-draws"],
    queryFn: async () => {
      const result = await fetchDraws();
      return result.draws;
    },
    staleTime: Infinity, // Local data never goes "stale" in the browser session
  });

  const statsResult = drawsData && drawsData.length > 0 ? buildStats(drawsData, { period: "all", recentWindow: 50, weightAll: 0.7, weightRecent: 0.3 }) : null;
  const lastDraw = drawsData && drawsData.length > 0 ? drawsData[0] : null;

  React.useEffect(() => {
    if (drawsData && statsResult) {
      trackEvent("Frequency Charts Viewed", {
        period: statsResult.period,
        drawCount: statsResult.drawCount,
      });
    }
  }, [drawsData, statsResult]);

  const handleGenerate = async (config: GenerateConfig) => {
    if (!drawsData || drawsData.length === 0) {
      showError("Systeem initialisatie fout: Interne database leeg.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate complex calculation time for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const stats = buildStats(drawsData, config);
      const { tickets } = generateTickets(stats, config);
      
      setResults({
        tickets,
        explanation: stats.explanation
      });
      
      showSuccess(`${tickets.length} tickets succesvol gegenereerd.`);

      trackEvent("Ticket Generated", {
        numTickets: config.tickets,
        generatedTicketCount: tickets.length,
      });
      
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const numberFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allNumberStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];
  const starFrequencyData: FrequencyData[] = statsResult 
    ? statsResult.allStarStats.map(item => ({ value: item.value, count: Math.round(item.score * 1000) })) 
    : [];

  return (
    <>
      <AnimatePresence>
        {isDataLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
        <BackgroundGrid />
        <div className="radial-spotlight" />

        <Navbar />
        
        <main className="relative z-10">
          <HeroLuck
            onGenerateClick={() => scrollToSection('generator-section')}
            onHowItWorksClick={() => scrollToSection('explanation-section')}
          />

          {/* Data Freshness Indicator */}
          {lastDraw && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="flex justify-center -mt-8 mb-12 relative z-20 px-4"
             >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background/60 backdrop-blur-md border border-border/40 shadow-sm hover:border-emerald/30 transition-colors duration-300">
                   <div className="flex items-center gap-2">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                     </span>
                     <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Database Status</span>
                   </div>
                   <div className="h-3 w-px bg-border/50"></div>
                   <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Gegevens bijgewerkt t/m <span className="text-foreground font-semibold">{format(new Date(lastDraw.date), "d MMMM yyyy", { locale: nl })}</span>
                   </p>
                </div>
             </motion.div>
          )}
          
          <TrustStatsStrip />

          {/* AD 1: Below Trust Stats */}
          <div className="max-w-6xl mx-auto px-6">
            <AdMockup 
              size="leaderboard" 
              imageUrl="https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/ads1.png"
              linkUrl="https://partner.bybit.com/b/luckyengine"
              label="Partner van Lucky Engine"
            />
          </div>

          <div className="relative my-12 md:my-24 h-px bg-gradient-to-r from-transparent via-emerald/30 to-transparent">
            <div className="absolute inset-x-0 -top-2 h-4 bg-emerald/10 blur-md" />
            <div className="absolute inset-x-0 -bottom-2 h-4 bg-emerald/10 blur-md" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 space-y-12 md:space-y-24">
            
            {drawsData && drawsData.length > 0 && (
              <>
                {lastDraw && (
                  <section id="last-draw-section" className="mb-12 md:mb-16">
                    <LastDraw draw={lastDraw} />
                  </section>
                )}

                {statsResult && (
                  <section id="frequency-charts" className="space-y-8">
                    <h2 className="text-xl font-bold tracking-extra-wide text-foreground text-center uppercase mb-8 md:mb-12 text-small-caps">Historische Analyse</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <FrequencyChart data={numberFrequencyData} title="Getal Frequentie" color="hsl(var(--emerald))" />
                      <FrequencyChart data={starFrequencyData} title="Ster Frequentie" color="hsl(var(--gold))" />
                    </div>
                  </section>
                )}

                <section id="generator-section" className="grid grid-cols-1 lg:col-span-12 gap-6 md:gap-12 items-start pt-12 md:pt-16">
                  {/* Changed to lg:sticky so it doesn't stick on mobile */}
                  <div className="lg:col-span-5 lg:sticky lg:top-24 z-30">
                    <GeneratorPanel onGenerate={handleGenerate} isLoading={isGenerating} />
                  </div>
                  
                  <div className="lg:col-span-7 space-y-6 min-h-[400px] pt-6 md:pt-8" id="results">
                    <AnimatePresence mode="wait">
                      {results ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between px-2">
                            <h2 className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                              Gegenereerde Resultaten
                            </h2>
                            <span className="text-[9px] font-medium text-emerald/60 italic">
                              Lokale Wiskundige Verwerking
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            {results.tickets.map((ticket, i) => (
                              <TicketCard key={i} ticket={ticket} index={i} />
                            ))}
                          </div>

                          <div className="p-4 rounded-md bg-card border border-border/20 shadow-lg"
                            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }}
                          >
                            <p className="text-xs text-secondary-foreground leading-relaxed font-medium italic">
                              {results.explanation}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 py-16 md:py-20">
                          <Database size={48} className="text-muted-foreground/50" />
                          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground text-small-caps">Interne Database Gereed</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </>
            )}

            {/* AD 2: Between Generator and Explanation */}
            <AdMockup 
              size="auto"
              imageUrl="https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/ads2.png"
              linkUrl="https://partner.bybit.com/b/VOKXWXAC47826"
              label="Exclusieve Partner Aanbieding"
            />

            <section id="explanation-section" className="pt-12 md:pt-16">
              <ExplanationSection />
            </section>
            
            <DisclaimerSection />
            
            {/* AD 3: Before Footer */}
            <AdMockup size="leaderboard" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;