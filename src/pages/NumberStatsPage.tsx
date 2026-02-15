"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import Ball from "@/components/Ball";
import { motion } from "framer-motion";

interface NumberStatsPageProps {
  type: 'number' | 'star';
}

const NumberStatsPage = ({ type }: NumberStatsPageProps) => {
  const { id } = useParams();
  const numId = parseInt(id || "0");
  const isStar = type === 'star';
  const rangeMax = isStar ? 12 : 50;

  // Validate ID
  const isValid = !isNaN(numId) && numId >= 1 && numId <= rangeMax;

  const { data: draws } = useQuery<Draw[]>({
    queryKey: ["embedded-draws"],
    queryFn: async () => {
      const result = await fetchDraws();
      return result.draws;
    },
    staleTime: Infinity,
  });

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ongeldig Nummer</h1>
          <Link to="/">
             <Button variant="outline">Terug naar Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- STATISTICAL ANALYSIS ENGINE ---
  if (!draws) return <div className="min-h-screen bg-background" />;

  const totalDraws = draws.length;
  const appearances = draws.filter(d => 
    isStar ? d.stars.includes(numId) : d.numbers.includes(numId)
  );
  
  const count = appearances.length;
  const frequency = (count / totalDraws) * 100;
  
  const lastDrawnDraw = appearances[0]; // Recent is first
  const lastDrawnDate = lastDrawnDraw ? new Date(lastDrawnDraw.date) : null;
  
  // Calculate "Days Since"
  const daysSince = lastDrawnDate 
    ? Math.floor((new Date().getTime() - lastDrawnDate.getTime()) / (1000 * 3600 * 24)) 
    : -1;

  // Determine "Temperature" (Advanced Content Logic)
  // Average frequency for numbers (5/50 = 10%)
  // Average frequency for stars (2/12 = ~16.6%)
  const avgFreq = isStar ? 16.6 : 10;
  const deviation = frequency - avgFreq;
  
  let tempStatus = "Neutraal";
  let tempColor = "text-muted-foreground";
  if (deviation > 1.5) { tempStatus = "Heet (Boven Gemiddelde)"; tempColor = "text-red-400"; }
  if (deviation < -1.5) { tempStatus = "Koud (Onder Gemiddelde)"; tempColor = "text-blue-400"; }

  // Dynamic SEO Title
  const entityName = isStar ? `Ster ${numId}` : `Nummer ${numId}`;
  const seoTitle = `EuroMillions ${entityName} Statistieken & Frequentie`;
  const seoDesc = `Hoe vaak valt ${entityName}? ${entityName} is ${count} keer getrokken. Laatste keer: ${lastDrawnDate ? format(lastDrawnDate, "d MMM yyyy", { locale: nl }) : "Onbekend"}. Bekijk de volledige analyse.`;

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title={seoTitle}
        description={seoDesc}
        type="article"
      />

      <BackgroundGrid />
      <div className="radial-spotlight" />

      <Navbar />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Terug naar Generator
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Header Card */}
          <div className="md:col-span-4 space-y-6">
            <Card className="bg-card border-border/20 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald/50 via-emerald to-emerald/50" />
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center space-y-4">
                <div className="scale-150 mb-4">
                   <Ball value={numId} variant={isStar ? 'star' : 'number'} />
                </div>
                <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
                  {entityName}
                </h1>
                <div className={`px-3 py-1 rounded-full bg-secondary/30 border border-border/10 text-xs font-bold uppercase tracking-wider ${tempColor}`}>
                  Status: {tempStatus}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/20 shadow-lg">
               <CardHeader className="pb-2">
                 <CardTitle className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps flex items-center gap-2">
                    <AlertCircle size={14} /> Belangrijke Data
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between items-center border-b border-border/10 pb-2">
                    <span className="text-secondary-foreground">Totaal Getrokken:</span>
                    <span className="font-bold text-foreground">{count}x</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/10 pb-2">
                    <span className="text-secondary-foreground">Frequentie:</span>
                    <span className="font-bold text-foreground">{frequency.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-secondary-foreground">Laatst Gezien:</span>
                    <span className="font-bold text-emerald">
                      {daysSince === 0 ? "Vandaag!" : `${daysSince} dagen geleden`}
                    </span>
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* Main Content / Analysis */}
          <div className="md:col-span-8 space-y-8">
            <div className="space-y-4">
               <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                 <BarChart3 className="text-emerald" size={24} />
                 Diepgaande Analyse
               </h2>
               <p className="text-secondary-foreground leading-relaxed">
                 Op basis van onze database van <strong>{totalDraws} trekkingen</strong>, 
                 is {entityName.toLowerCase()} een {deviation > 0 ? "bovengemiddeld vaak voorkomend" : "minder vaak voorkomend"} getal.
                 Statistisch gezien heeft elk {isStar ? "ster" : "hoofdgetal"} een theoretische kans van ongeveer {avgFreq.toFixed(1)}% om te vallen in een willekeurige trekking.
               </p>
               <p className="text-secondary-foreground leading-relaxed">
                 De huidige frequentie van {entityName.toLowerCase()} ligt op <strong>{frequency.toFixed(2)}%</strong>. 
                 Dit betekent dat het {Math.abs(deviation).toFixed(2)}% afwijkt van het statistische gemiddelde.
                 In de wereld van de kansberekening ("Law of Large Numbers") neigen resultaten over een oneindig lange periode naar het gemiddelde, 
                 maar op korte termijn zijn "clusters" en "droogtes" heel normaal.
               </p>
            </div>

            <div className="space-y-4">
               <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                 <Calendar className="text-emerald" size={24} />
                 Recentheid & Trends
               </h2>
               <p className="text-secondary-foreground leading-relaxed">
                 De laatste keer dat {entityName.toLowerCase()} viel was op <strong>{lastDrawnDate ? format(lastDrawnDate, "d MMMM yyyy", { locale: nl }) : "Onbekend"}</strong>.
                 {daysSince > 100 
                   ? " Dit getal heeft zich al lange tijd niet laten zien, wat het voor sommige spelers een interessant 'cold number' maakt." 
                   : " Dit is een relatief recent getal."}
               </p>
            </div>

            <div className="bg-emerald/5 border border-emerald/10 p-6 rounded-lg">
               <h3 className="font-bold text-emerald mb-2 flex items-center gap-2">
                 <TrendingUp size={18} />
                 Strategisch Inzicht
               </h3>
               <p className="text-xs text-muted-foreground">
                 Hoewel de Lucky Engine rekening houdt met zowel frequentie als recentheid, onthoud dat elke trekking onafhankelijk is. 
                 Het feit dat {entityName.toLowerCase()} {tempStatus.toLowerCase()} is, biedt geen garantie voor de volgende trekking.
               </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NumberStatsPage;