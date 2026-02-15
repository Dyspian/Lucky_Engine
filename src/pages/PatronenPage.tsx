"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Lightbulb, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const PatronenPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Bestaan er echte patronen in EuroMillions trekkingen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wiskundig gezien zijn EuroMillions trekkingen volledig willekeurig, wat betekent dat er geen voorspelbare patronen zijn die toekomstige resultaten kunnen garanderen. Echter, door 'euromillions patronen analyse' van historische data kunnen we wel 'statistische patronen' identificeren, zoals de verdeling van even/oneven nummers of hoog/laag nummers, die vaak voorkomen in willekeurige reeksen."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe helpt Lucky Engine bij het analyseren van patronen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lucky Engine analyseert historische trekkingen om veelvoorkomende 'euromillions nummers trends' en 'euromillions data analyse' te identificeren. Onze generator gebruikt deze inzichten om tickets te creëren die een gebalanceerde mix van nummers bevatten, zoals een goede verhouding tussen even en oneven, en hoge en lage nummers, wat statistisch gezien vaker voorkomt in winnende combinaties."
        }
      },
      {
        "@type": "Question",
        "name": "Moet ik patronen vermijden bij het kiezen van mijn nummers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Het vermijden van overduidelijke patronen (zoals 1-2-3-4-5) kan nuttig zijn, niet omdat het uw winstkansen verhoogt, maar omdat u bij een eventuele winst de pot minder snel hoeft te delen met andere spelers die dezelfde populaire patronen kiezen. Lucky Engine helpt u bij het genereren van unieke en statistisch gebalanceerde combinaties."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="EuroMillions Patronen Analyse & Trends | Lucky Engine" 
        description="Ontdek EuroMillions patronen en nummers trends met onze diepgaande analyse. Leer over even/oneven, hoog/laag verdelingen en andere statistische inzichten."
        canonical="https://lucky-engine.com/patronen"
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
              EuroMillions <span className="text-emerald">Patronen</span> Analyse
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Een diepgaande blik op statistische patronen en trends in EuroMillions trekkingen. Wat vertelt de data ons?
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <LayoutGrid className="text-emerald" size={28} />
              Statistische Patronen in Willekeurige Trekkingen
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Hoewel elke EuroMillions trekking onafhankelijk en willekeurig is, kunnen we door 'euromillions patronen analyse' van duizenden historische resultaten 'statistische patronen' identificeren. Dit zijn geen voorspellende patronen, maar eerder veelvoorkomende kenmerken van willekeurige getallenreeksen. Lucky Engine helpt u deze 'euromillions nummers trends' te begrijpen.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Onze 'euromillions data analyse' richt zich op aspecten zoals de verdeling van even en oneven nummers, de spreiding van hoge en lage nummers, en het voorkomen van opeenvolgende getallen. Deze 'euromillions trekking analyse' geeft inzicht in wat een 'typische' trekking eruitziet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <Info size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Even/Oneven Balans</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  De meeste trekkingen bevatten een mix van even en oneven nummers. Een ticket met alleen even of alleen oneven nummers is statistisch minder waarschijnlijk.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <Info size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Hoog/Laag Spreiding</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  Winnende combinaties zijn vaak een mix van nummers uit de lagere (1-25) en hogere (26-50) reeksen, in plaats van allemaal lage of allemaal hoge nummers.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Lightbulb className="text-emerald" size={28} />
              Lucky Engine en Patroonherkenning
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Onze 'euromillions analyse tool' en 'euromillions generator gratis' zijn ontworpen om tickets te genereren die deze statistisch veelvoorkomende patronen weerspiegelen. Dit betekent dat de 'euromillions combinatie generator' van Lucky Engine streeft naar een gebalanceerde set nummers, wat de kans vergroot dat uw ticket lijkt op historisch getrokken combinaties. Dit is een vorm van 'euromillions statistische generator' die u helpt bij het 'euromillions nummers kiezen tool'.
            </p>
            <p className="text-secondary-foreground leading-relaxed">
              Door gebruik te maken van onze 'euromillions algoritme', kunt u 'euromillions nummers analyse' uitvoeren en tickets genereren die niet alleen gebaseerd zijn op frequentie en recentheid, maar ook op deze structurele patronen.
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
              Veelgestelde Vragen over Patronen
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Bestaan er echte patronen in EuroMillions trekkingen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Wiskundig gezien zijn EuroMillions trekkingen volledig willekeurig, wat betekent dat er geen voorspelbare patronen zijn die toekomstige resultaten kunnen garanderen. Echter, door 'euromillions patronen analyse' van historische data kunnen we wel 'statistische patronen' identificeren, zoals de verdeling van even/oneven nummers of hoog/laag nummers, die vaak voorkomen in willekeurige reeksen."
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Hoe helpt Lucky Engine bij het analyseren van patronen?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Lucky Engine analyseert historische trekkingen om veelvoorkomende 'euromillions nummers trends' en 'euromillions data analyse' te identificeren. Onze generator gebruikt deze inzichten om tickets te creëren die een gebalanceerde mix van nummers bevatten, zoals een goede verhouding tussen even en oneven, en hoge en lage nummers, wat statistisch gezien vaker voorkomt in winnende combinaties."
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border/10">
                <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Moet ik patronen vermijden bij het kiezen van mijn nummers?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Het vermijden van overduidelijke patronen (zoals 1-2-3-4-5) kan nuttig zijn, niet omdat het uw winstkansen verhoogt, maar omdat u bij een eventuele winst de pot minder snel hoeft te delen met andere spelers die dezelfde populaire patronen kiezen. Lucky Engine helpt u bij het genereren van unieke en statistisch gebalanceerde combinaties."
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

export default PatronenPage;