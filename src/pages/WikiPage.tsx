"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, BookOpen, Star, BarChart3 } from "lucide-react";
import Ball from "@/components/Ball";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Helper to calculate stats for a single number
const getNumberStats = (draws: Draw[], num: number, isStar: boolean) => {
  const appearances = draws.filter(d => 
    isStar ? d.stars.includes(num) : d.numbers.includes(num)
  );
  
  const count = appearances.length;
  const lastDraw = appearances[0]; // Assuming draws are sorted desc
  const daysSince = lastDraw 
    ? Math.floor((new Date().getTime() - new Date(lastDraw.date).getTime()) / (1000 * 3600 * 24)) 
    : -1;

  return { count, daysSince };
};

const WikiPage = () => {
  const { data: draws, isLoading } = useQuery<Draw[]>({
    queryKey: ["embedded-draws"],
    queryFn: async () => {
      const result = await fetchDraws();
      return result.draws;
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald" size={48} />
      </div>
    );
  }

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const stars = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="Getallen Wiki & Statistieken" 
        description="Complete database van alle EuroMillions getallen (1-50) en sterren. Bekijk frequentie, laatste trekkingen en statistieken uit 2024-2025."
      />

      <BackgroundGrid />
      <div className="radial-spotlight" />

      <Navbar />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-extra-wide text-foreground">
              Getallen <span className="text-emerald">Wiki</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De complete index van alle EuroMillions getallen en sterren met live statistieken.
            </p>
          </div>

          {/* WARNING BANNER */}
          <div className="max-w-4xl mx-auto mb-12">
            <Alert variant="destructive" className="bg-red-950/30 border-red-500/50 text-red-200 shadow-[0_0_30px_-5px_rgba(220,38,38,0.2)]">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <AlertTitle className="font-bold text-lg ml-2 tracking-wide text-red-100">DATA DISCLAIMER: TIJDVAK 2024-2025</AlertTitle>
              <AlertDescription className="mt-2 ml-2 text-sm md:text-base leading-relaxed text-red-200/80">
                Let op: Alle statistieken op deze Wiki-pagina zijn exclusief berekend op basis van de beschikbare dataset van <strong>2024 tot heden (2025)</strong>. 
                Historische gegevens van vóór 2024 zijn niet opgenomen in deze specifieke frequentieberekeningen. 
                Deze data dient als indicatie van <em>recente</em> trends (Hot/Cold) en garandeert geen toekomstige resultaten.
              </AlertDescription>
            </Alert>
          </div>

          {/* Numbers Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-border/20 pb-4">
              <div className="p-2 bg-emerald/10 rounded-lg">
                <BookOpen className="text-emerald h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Hoofdgetallen (1-50)</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {draws && numbers.map(num => {
                const stats = getNumberStats(draws, num, false);
                return (
                  <Link key={num} to={`/nummers/${num}`} className="group block h-full">
                    <Card className="bg-card/40 border-border/20 hover:border-emerald/50 hover:bg-card/80 transition-all duration-200 hover:-translate-y-1 h-full">
                      <CardContent className="p-4 flex flex-col items-center gap-3 h-full justify-between">
                        <div className="transform group-hover:scale-110 transition-transform duration-200">
                          <Ball value={num} />
                        </div>
                        <div className="text-center w-full space-y-2">
                          <div className="flex justify-between items-center text-xs w-full px-1 border-b border-border/10 pb-1">
                            <span className="text-muted-foreground">Freq</span>
                            <span className="font-bold text-foreground">{stats.count}x</span>
                          </div>
                          <div className={`text-[10px] px-2 py-1 rounded-full w-full font-medium ${
                            stats.daysSince < 30 ? "bg-emerald/10 text-emerald" : "bg-secondary/30 text-muted-foreground"
                          }`}>
                            {stats.daysSince === -1 ? "Nog niet" : stats.daysSince === 0 ? "Vandaag!" : `${stats.daysSince}d geleden`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Stars Grid */}
          <div className="space-y-6 pt-12">
            <div className="flex items-center gap-2 border-b border-border/20 pb-4">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Star className="text-gold h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Sterren (1-12)</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {draws && stars.map(num => {
                const stats = getNumberStats(draws, num, true);
                return (
                  <Link key={num} to={`/sterren/${num}`} className="group block h-full">
                    <Card className="bg-card/40 border-border/20 hover:border-gold/50 hover:bg-card/80 transition-all duration-200 hover:-translate-y-1 h-full">
                      <CardContent className="p-4 flex flex-col items-center gap-3 h-full justify-between">
                         <div className="transform group-hover:scale-110 transition-transform duration-200">
                           <Ball value={num} variant="star" />
                         </div>
                        <div className="text-center w-full space-y-2">
                          <div className="flex justify-between items-center text-xs w-full px-1 border-b border-border/10 pb-1">
                            <span className="text-muted-foreground">Freq</span>
                            <span className="font-bold text-foreground">{stats.count}x</span>
                          </div>
                          <div className={`text-[10px] px-2 py-1 rounded-full w-full font-medium ${
                            stats.daysSince < 30 ? "bg-gold/10 text-gold" : "bg-secondary/30 text-muted-foreground"
                          }`}>
                             {stats.daysSince === -1 ? "Nog niet" : stats.daysSince === 0 ? "Vandaag!" : `${stats.daysSince}d geleden`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default WikiPage;