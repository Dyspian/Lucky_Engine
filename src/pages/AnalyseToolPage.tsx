"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Settings, BarChart3, Lightbulb, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const AnalyseToolPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat is de Lucky Engine Analyse Tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De Lucky Engine Analyse Tool is een gratis online platform dat diepgaande statistische analyse biedt van EuroMillions trekkingen. Het helpt u bij het 'euromillions cijfers analyseren' door historische data te verwerken en inzichten te bieden in frequenties, recentheid en patronen van nummers en sterren."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe werkt de EuroMillions Analyse Tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Onze 'euromillions analyse tool' gebruikt een geavanceerd 'euromillions algoritme' dat historische 'euromillions data analyse' uitvoert. Het combineert 'euromillions frequentie nummers' met 'recentheids weging' om een score te genereren voor elk potentieel nummer en elke ster, en genereert vervolgens gebalanceerde tickets op basis van deze inzichten."
        }
      },
      {
        "@type": "Question",
        "name": "Kan ik de analyse tool gebruiken om mijn winstkansen te verhogen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nee, de Lucky Engine Analyse Tool kan uw winstkansen niet verhogen. EuroMillions trekkingen zijn onafhankelijke en willekeurige gebeurtenissen. De tool is ontworpen om statistisch inzicht te bieden en u te helpen bij het genereren van nummers op basis van historische data, niet om toekomstige resultaten te voorspellen. Speel altijd verantwoord."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="EuroMillions Analyse Tool & Statistieken | Lucky Engine" 
        description="Gebruik de Lucky Engine Analyse Tool voor diepgaande EuroMillions statistieken, frequentieanalyse en slimme nummergeneratie. Gratis en transparant."
        canonical="https://lucky-engine.com/analyse-tool"
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
              EuroMillions <span className="text-emerald">Analyse Tool</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              De Lucky Engine is uw gratis online tool voor diepgaande EuroMillions statistieken en slimme nummergeneratie.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Settings className="text-emerald" size={28} />
              Hoe de Lucky Engine Analyse Tool Werkt
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              De Lucky Engine is een geavanceerde 'euromillions analyse tool' die is ontworpen om u te helpen bij het 'euromillions cijfers analyseren' op basis van historische data. Onze tool maakt gebruik van een krachtig 'euromillions algoritme' dat de 'euromillions trekkinghistoriek' doorzoekt om 'euromillions frequentie nummers' en 'euromillions lucky stars statistiek' te identificeren.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Met de 'euromillions analyse tool' kunt u niet alleen de 'euromillions meest gevallen nummers' bekijken, maar ook tickets genereren die statistisch gebalanceerd zijn. Dit is een 'euromillions statistiek tool' die u inzicht geeft in de 'euromillions data analyse' zonder complexe berekeningen van uw kant.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <BarChart3 size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Statistische Analyse</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  Diepgaande analyse van frequentie, recentheid en patronen van alle EuroMillions nummers en sterren.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <Lightbulb size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Slimme Nummergeneratie</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  Genereer tickets die rekening houden met statistische balans, zoals even/oneven en hoog/laag verdelingen.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Info className="text-emerald" size={28} />
              Voordelen van de Lucky Engine Analyse Tool
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Als 'euromillions analyse gratis' tool biedt Lucky Engine een transparante blik op de data. U krijgt toegang tot 'euromillions historische data' en kunt 'euromillions nummers analyse' uitvoeren zonder kosten. Onze 'euromillions statistische generator' is een 'euromillions combinatie generator' die u helpt bij het 'euromillions nummers kiezen tool' op een geïnformeerde manier.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Of u nu geïnteresseerd bent in 'euromillions nummers trends' of de 'euromillions kansberekening statistiek', de Lucky Engine biedt de tools om uw inzicht te verdiepen.
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
              Veelgestelde Vragen over de Analyse Tool
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Wat is de Lucky Engine Analyse Tool?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  De Lucky Engine Analyse Tool is een gratis online platform dat diepgaande statistische analyse biedt van EuroMillions trekkingen. Het helpt u bij het 'euromillions cijfers analyseren' door historische data te verwerken en inzichten te bieden in frequenties, recentheid en patronen van nummers en sterren.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Hoe werkt de EuroMillions Analyse Tool?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Onze 'euromillions analyse tool' gebruikt een geavanceerd 'euromillions algoritme' dat historische 'euromillions data analyse' uitvoert. Het combineert 'euromillions frequentie nummers' met 'recentheids weging' om een score te genereren voor elk potentieel nummer en elke ster, en genereert vervolgens gebalanceerde tickets op basis van deze inzichten.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Kan ik de analyse tool gebruiken om mijn winstkansen te verhogen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Nee, de Lucky Engine Analyse Tool kan uw winstkansen niet verhogen. EuroMillions trekkingen zijn onafhankelijke en willekeurige gebeurtenissen. De tool is ontworpen om statistisch inzicht te bieden en u te helpen bij het genereren van nummers op basis van historische data, niet om toekomstige resultaten te voorspellen. Speel altijd verantwoord.
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

export default AnalyseToolPage;