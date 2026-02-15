"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, CalendarDays, Info, Loader2 } from "lucide-react"; // Added Loader2
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { buildStats, StatItem } from "@/lib/stats-engine";
import Ball from "@/components/Ball";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";

const LuckyStarsPage = () => {
  const { data: draws, isLoading } = useQuery<Draw[]>({
    queryKey: ["embedded-draws"],
    queryFn: async () => {
      const result = await fetchDraws();
      return result.draws;
    },
    staleTime: Infinity,
  });

  const statsResult = draws && draws.length > 0 ? buildStats(draws, { period: "all", recentWindow: 50, weightAll: 0.7, weightRecent: 0.3 }) : null;
  const topStars = statsResult?.topStars || [];
  const allStarStats = statsResult?.allStarStats || [];

  const getDaysSinceLastDraw = (star: number) => {
    if (!draws) return -1;
    const lastAppearance = draws.find(d => d.stars.includes(star));
    if (!lastAppearance) return -1;
    return Math.floor((new Date().getTime() - new Date(lastAppearance.date).getTime()) / (1000 * 3600 * 24));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat zijn de meest gevallen Lucky Stars in EuroMillions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De meest gevallen Lucky Stars zijn de sterren die historisch gezien het vaakst zijn getrokken in alle EuroMillions trekkingen. Onze analyse toont een dynamische lijst, aangezien deze statistieken na elke trekking kunnen verschuiven."
        }
      },
      {
        "@type": "Question",
        "name": "Is er een strategie voor het kiezen van Lucky Stars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Net als bij de hoofdnummers zijn Lucky Stars trekkingen volledig willekeurig. Statistieken kunnen inzicht geven in historische frequenties, maar bieden geen garantie voor toekomstige trekkingen. De beste strategie is om nummers te kiezen die u aanspreken en verantwoord te spelen."
        }
      },
      {
        "@type": "Question",
        "name": "Waarom zijn Lucky Stars zo belangrijk voor de jackpot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Om de EuroMillions jackpot te winnen, moet u zowel alle vijf hoofdnummers als beide Lucky Stars correct voorspellen. De Lucky Stars zijn dus essentieel voor de hoogste prijscategorieën en hebben een aanzienlijke invloed op de totale winst."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="Meest Gevallen EuroMillions Lucky Stars Statistiek | Lucky Engine" 
        description="Ontdek de meest gevallen EuroMillions Lucky Stars en hun frequentie. Analyseer historische data en trends met onze gratis statistiek tool."
        canonical="https://lucky-engine.com/lucky-stars"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <BackgroundGrid />
      <div className="radial-spotlight" />

      <Navbar />

      <main className="container mx-auto px-6 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-extra-wide text-foreground">
              EuroMillions <span className="text-gold">Lucky Stars</span> Statistiek
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Een diepgaande analyse van de EuroMillions Lucky Stars die historisch gezien het vaakst zijn getrokken.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Star className="text-gold" size={28} />
              Top 5 Meest Frequente Lucky Stars
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Hieronder vindt u een overzicht van de top 5 'euromillions lucky stars statistiek' op basis van onze uitgebreide 'euromillions historische data'. Deze lijst wordt dynamisch bijgewerkt na elke nieuwe trekking, zodat u altijd de meest actuele 'euromillions sterren statistiek' bij de hand heeft.
            </p>

            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-10 w-10 animate-spin text-gold" />
              </div>
            ) : (
              <Card className="bg-card border border-border/20 shadow-xl rounded-lg overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/20">
                  <CardTitle className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps flex items-center gap-2">
                    <TrendingUp size={16} className="text-gold" />
                    Actuele Frequentie Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto"> {/* Added horizontal scroll */}
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/20 hover:bg-muted/20">
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Ster</TableHead>
                          <TableHead>Frequentie</TableHead>
                          <TableHead className="text-right">Laatst Gezien</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topStars.map((item, i) => (
                          <TableRow key={item.value} className="hover:bg-card/50">
                            <TableCell className="font-medium text-foreground">{i + 1}</TableCell>
                            <TableCell>
                              <Link to={`/sterren/${item.value}`} className="flex items-center gap-2 group">
                                <Ball value={item.value} variant="star" />
                                <span className="text-sm font-semibold group-hover:text-gold transition-colors">{item.value}</span>
                              </Link>
                            </TableCell>
                            <TableCell className="text-secondary-foreground">
                              {(item.freqPeriod * 100).toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {getDaysSinceLastDraw(item.value) === 0 ? "Vandaag!" : `${getDaysSinceLastDraw(item.value)} dagen geleden`}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <CalendarDays className="text-gold" size={28} />
              De Rol van Lucky Stars
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              De Lucky Stars zijn essentieel voor het winnen van de EuroMillions jackpot en de hogere prijscategorieën. Onze 'euromillions sterren statistiek' biedt inzicht in welke sterren historisch gezien vaker zijn getrokken. Hoewel elke trekking willekeurig is, kan het analyseren van de 'euromillions historische data' u helpen bij het maken van uw keuzes.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Voor een complete frequentieanalyse van alle sterren en nummers, bezoek onze <Link to="/wiki" className="text-emerald hover:underline">Getallen Wiki</Link>.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Info className="text-gold" size={28} />
              Veelgestelde Vragen over Lucky Stars
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Wat zijn de meest gevallen Lucky Stars in EuroMillions?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  De meest gevallen Lucky Stars zijn de sterren die historisch gezien het vaakst zijn getrokken in alle EuroMillions trekkingen. Onze analyse toont een dynamische lijst, aangezien deze statistieken na elke trekking kunnen verschuiven.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Is er een strategie voor het kiezen van Lucky Stars?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Net als bij de hoofdnummers zijn Lucky Stars trekkingen volledig willekeurig. Statistieken kunnen inzicht geven in historische frequenties, maar bieden geen garantie voor toekomstige trekkingen. De beste strategie is om nummers te kiezen die u aanspreken en verantwoord te spelen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Waarom zijn Lucky Stars zo belangrijk voor de jackpot?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Om de EuroMillions jackpot te winnen, moet u zowel alle vijf hoofdnummers als beide Lucky Stars correct voorspellen. De Lucky Stars zijn dus essentieel voor de hoogste prijscategorieën en hebben een aanzienlijke invloed op de totale winst.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <div className="p-8 rounded-lg bg-card border border-border/20 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck size={16} className="text-emerald" />
              <h2 className="text-xs font-bold uppercase tracking-extra-wide text-small-caps">Belangrijke Disclaimer</h2>
            </div>
            <p className="text-xs text-secondary-foreground leading-relaxed font-medium">
              EuroMillions trekkingen zijn onafhankelijke gebeurtenissen die worden beheerst door willekeurig toeval. Eerdere prestaties zijn geen indicator voor toekomstige resultaten. Lucky Engine is een statistische analysetool en garandeert geen winnende uitkomst. Speel alstublieft verantwoord.
            </p>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LuckyStarsPage;