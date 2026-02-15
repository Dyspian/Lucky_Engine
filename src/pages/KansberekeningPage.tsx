"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calculator, Lightbulb, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const KansberekeningPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat is de kans om de EuroMillions jackpot te winnen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De kans om de EuroMillions jackpot te winnen (5 hoofdnummers + 2 Lucky Stars) is ongeveer 1 op 139.838.160. Dit is een extreem kleine kans, wat de jackpot zo zeldzaam en waardevol maakt."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe worden de winstkansen berekend?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De winstkansen worden berekend met behulp van combinatoriek, een tak van de wiskunde. Voor EuroMillions gaat het om het aantal manieren waarop 5 nummers uit 50 kunnen worden gekozen, vermenigvuldigd met het aantal manieren waarop 2 sterren uit 12 kunnen worden gekozen."
        }
      },
      {
        "@type": "Question",
        "name": "Kan Lucky Engine mijn winstkansen verhogen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nee, Lucky Engine is een statistische analysetool en kan uw winstkansen niet verhogen. Elke trekking is willekeurig en onafhankelijk. Onze tool helpt u bij het genereren van nummers op basis van historische frequenties en patronen, maar dit is geen garantie voor succes. Speel altijd verantwoord."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="EuroMillions Kansberekening & Winstkansen | Lucky Engine" 
        description="Begrijp de EuroMillions kansberekening en uw winstkansen. Leer hoe de waarschijnlijkheid van elke prijscategorie wordt berekend met onze uitleg."
        canonical="https://lucky-engine.com/kansberekening"
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
              EuroMillions <span className="text-emerald">Kansberekening</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Begrijp de wiskunde achter EuroMillions: hoe worden de winstkansen berekend en wat betekent dit voor uw ticket?
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Calculator className="text-emerald" size={28} />
              De Wiskunde Achter EuroMillions Kansen
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              EuroMillions is een spel van kans, en de 'euromillions kansberekening statistiek' is gebaseerd op combinatoriek. Dit is de tak van de wiskunde die zich bezighoudt met het tellen van combinaties van objecten. Voor EuroMillions betekent dit het berekenen van het aantal unieke manieren waarop de nummers en sterren kunnen worden getrokken.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Om de jackpot te winnen, moet u 5 hoofdnummers correct kiezen uit een reeks van 50 (1-50), én 2 Lucky Stars correct kiezen uit een reeks van 12 (1-12). De totale kans wordt berekend door het aantal combinaties voor de hoofdnummers te vermenigvuldigen met het aantal combinaties voor de Lucky Stars.
            </p>
            <div className="bg-card border border-border/20 p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                <Info size={20} className="text-emerald" />
                Winstkansen per Prijscategorie
              </h3>
              <ul className="list-disc list-inside text-sm text-secondary-foreground space-y-2">
                <li><strong>5 nummers + 2 sterren (Jackpot):</strong> 1 op 139.838.160</li>
                <li><strong>5 nummers + 1 ster:</strong> 1 op 6.991.908</li>
                <li><strong>5 nummers + 0 sterren:</strong> 1 op 3.107.515</li>
                <li><strong>4 nummers + 2 sterren:</strong> 1 op 621.503</li>
                <li><strong>4 nummers + 1 ster:</strong> 1 op 31.076</li>
                <li><strong>3 nummers + 2 sterren:</strong> 1 op 14.125</li>
                <li><strong>4 nummers + 0 sterren:</strong> 1 op 13.812</li>
                <li><strong>2 nummers + 2 sterren:</strong> 1 op 986</li>
                <li><strong>3 nummers + 1 ster:</strong> 1 op 707</li>
                <li><strong>3 nummers + 0 sterren:</strong> 1 op 314</li>
                <li><strong>1 nummer + 2 sterren:</strong> 1 op 188</li>
                <li><strong>2 nummers + 1 ster:</strong> 1 op 49</li>
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Deze kansen zijn vast en veranderen niet per trekking.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Lightbulb className="text-emerald" size={28} />
              Lucky Engine en Kansberekening
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Lucky Engine is een 'euromillions analyse tool' die zich richt op 'euromillions statistiek uitleg' en het genereren van nummers op basis van historische data. Hoewel we geen invloed hebben op de fundamentele 'euromillions kansberekening', kan onze 'euromillions generator gratis' u helpen bij het kiezen van nummers die statistisch gezien vaker zijn gevallen of recentelijk actief waren. Dit is een 'euromillions statistische generator' die u inzicht geeft in de 'euromillions data analyse'.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Onze tool kan u helpen bij het vermijden van veelvoorkomende patronen die door veel spelers worden gekozen (zoals 1-2-3-4-5), wat, in het zeldzame geval van een winnende trekking, kan leiden tot het minder vaak hoeven delen van de pot.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/statistiek">
                <Button variant="outline" className="bg-card border-border/20 hover:bg-card/50 text-foreground">
                  Bekijk Statistieken
                </Button>
              </Link>
              <Link to="/generator">
                <Button className="bg-emerald hover:bg-emerald-hover text-primary-foreground">
                  Genereer Tickets
                </Button>
              </Link>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Info className="text-emerald" size={28} />
              Veelgestelde Vragen over Kansberekening
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Wat is de kans om de EuroMillions jackpot te winnen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  De kans om de EuroMillions jackpot te winnen (5 hoofdnummers + 2 Lucky Stars) is ongeveer 1 op 139.838.160. Dit is een extreem kleine kans, wat de jackpot zo zeldzaam en waardevol maakt.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Hoe worden de winstkansen berekend?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  De winstkansen worden berekend met behulp van combinatoriek, een tak van de wiskunde. Voor EuroMillions gaat het om het aantal manieren waarop 5 nummers uit 50 kunnen worden gekozen, vermenigvuldigd met het aantal manieren waarop 2 sterren uit 12 kunnen worden gekozen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Kan Lucky Engine mijn winstkansen verhogen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Nee, Lucky Engine is een statistische analysetool en kan uw winstkansen niet verhogen. Elke trekking is willekeurig en onafhankelijk. Onze tool helpt u bij het genereren van nummers op basis van historische frequenties en patronen, maar dit is geen garantie voor succes. Speel altijd verantwoord.
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

export default KansberekeningPage;