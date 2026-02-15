"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, CalendarDays, Info, Loader2, ShieldCheck } from "lucide-react"; // Added Loader2 and ShieldCheck
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Added Accordion components

const MeestGevallenNummersPage = () => {
  const { data: draws, isLoading } = useQuery<Draw[]>({
    queryKey: ["embedded-draws"],
    queryFn: async () => {
      const result = await fetchDraws();
      return result.draws;
    },
    staleTime: Infinity,
  });

  const statsResult = draws && draws.length > 0 ? buildStats(draws, { period: "all", recentWindow: 50, weightAll: 0.7, weightRecent: 0.3 }) : null;
  const topNumbers = statsResult?.topNumbers || [];
  const allNumberStats = statsResult?.allNumberStats || [];

  const getDaysSinceLastDraw = (num: number) => {
    if (!draws) return -1;
    const lastAppearance = draws.find(d => d.numbers.includes(num));
    if (!lastAppearance) return -1;
    return Math.floor((new Date().getTime() - new Date(lastAppearance.date).getTime()) / (1000 * 3600 * 24));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat zijn de meest gevallen EuroMillions nummers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De meest gevallen EuroMillions nummers zijn de hoofdgetallen die historisch gezien het vaakst zijn getrokken in alle EuroMillions trekkingen. Onze analyse toont een dynamische lijst, aangezien deze statistieken na elke trekking kunnen verschuiven."
        }
      },
      {
        "@type": "Question",
        "name": "Verhoogt het spelen van 'hete' nummers mijn winstkansen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nee, elke EuroMillions trekking is een onafhankelijke gebeurtenis. Het feit dat een nummer in het verleden vaker is gevallen, heeft geen invloed op de kans dat het in de toekomst opnieuw valt. Onze tool biedt statistisch inzicht, geen voorspellingen. Speel altijd verantwoord."
        }
      },
      {
        "@type": "Question",
        "name": "Waar kan ik de frequentie van alle EuroMillions nummers vinden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Op deze pagina vindt u een overzicht van de meest gevallen nummers. Voor een complete frequentieanalyse van alle nummers en sterren kunt u onze 'Getallen Wiki' bezoeken, waar elk nummer zijn eigen detailpagina heeft met uitgebreide statistieken."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="Meest Gevallen EuroMillions Nummers & Frequentie | Lucky Engine" 
        description="Ontdek de meest gevallen EuroMillions nummers en hun frequentie. Analyseer historische data en trends met onze gratis statistiek tool."
        canonical="https://lucky-engine.com/meest-gevallen-nummers"
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
              Meest Gevallen <span className="text-emerald">Nummers</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Een diepgaande analyse van de EuroMillions hoofdgetallen die historisch gezien het vaakst zijn getrokken.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <BarChart2 className="text-emerald" size={28} />
              Top 10 Meest Frequente Nummers
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Hieronder vindt u een overzicht van de top 10 'euromillions meest gevallen nummers' en 'euromillions meest voorkomende nummers' op basis van onze uitgebreide 'euromillions historische data'. Deze lijst wordt dynamisch bijgewerkt na elke nieuwe trekking, zodat u altijd de meest actuele 'euromillions frequentie nummers' bij de hand heeft.
            </p>

            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-10 w-10 animate-spin text-emerald" />
              </div>
            ) : (
              <Card className="bg-card border border-border/20 shadow-xl rounded-lg overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/20">
                  <CardTitle className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald" />
                    Actuele Frequentie Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/20 hover:bg-muted/20">
                        <TableHead className="w-[60px]">Rank</TableHead>
                        <TableHead>Nummer</TableHead>
                        <TableHead>Frequentie</TableHead>
                        <TableHead className="text-right">Laatst Gezien</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topNumbers.map((item, i) => (
                        <TableRow key={item.value} className="hover:bg-card/50">
                          <TableCell className="font-medium text-foreground">{i + 1}</TableCell>
                          <TableCell>
                            <Link to={`/nummers/${item.value}`} className="flex items-center gap-2 group">
                              <Ball value={item.value} />
                              <span className="text-sm font-semibold group-hover:text-emerald transition-colors">{item.value}</span>
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
                </CardContent>
              </Card>
            )}
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <CalendarDays className="text-emerald" size={28} />
              Frequentie over Tijd
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              De 'euromillions nummer frequentie tool' op Lucky Engine stelt u in staat om de 'euromillions cijfers analyseren' over verschillende perioden. Hoewel de 'euromillions trekking analyse' op lange termijn een evenwicht toont, kunnen er op kortere termijn 'euromillions nummers trends' ontstaan. Onze algoritmen houden rekening met zowel de algehele frequentie als de recentheid om een gebalanceerd beeld te geven.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Bezoek onze <Link to="/wiki" className="text-emerald hover:underline">Getallen Wiki</Link> voor een gedetailleerde analyse van elk individueel nummer, inclusief de volledige 'euromillions data statistiek' en 'euromillions nummer calculator' functionaliteit.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Info className="text-emerald" size={28} />
              Veelgestelde Vragen over Nummers
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Wat zijn de meest gevallen EuroMillions nummers?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  De meest gevallen EuroMillions nummers zijn de hoofdgetallen die historisch gezien het vaakst zijn getrokken in alle EuroMillions trekkingen. Onze analyse toont een dynamische lijst, aangezien deze statistieken na elke trekking kunnen verschuiven.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Verhoogt het spelen van 'hete' nummers mijn winstkansen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Nee, elke EuroMillions trekking is een onafhankelijke gebeurtenis. Het feit dat een nummer in het verleden vaker is gevallen, heeft geen invloed op de kans dat het in de toekomst opnieuw valt. Onze tool biedt statistisch inzicht, geen voorspellingen. Speel altijd verantwoord.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Waar kan ik de frequentie van alle EuroMillions nummers vinden?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Op deze pagina vindt u een overzicht van de meest gevallen nummers. Voor een complete frequentieanalyse van alle nummers en sterren kunt u onze <Link to="/wiki" className="text-emerald hover:underline">Getallen Wiki</Link> bezoeken, waar elk nummer zijn eigen detailpagina heeft met uitgebreide statistieken.
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

export default MeestGevallenNummersPage;