"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BarChart3, Lightbulb, TrendingUp, ShieldCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';
import { Loader2 } from "lucide-react";
import ContentImage from '@/components/ContentImage'; // Import ContentImage

const StatistiekPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat is EuroMillions statistiek en waarom is het nuttig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EuroMillions statistiek omvat de analyse van historische trekkingsgegevens om patronen, frequenties en trends van nummers en sterren te identificeren. Hoewel elke trekking willekeurig is, kan het inzicht in deze statistieken spelers helpen bij het maken van meer geïnformeerde keuzes voor hun nummers, of simpelweg hun nieuwsgierigheid bevredigen over de 'warmte' of 'koude' van bepaalde getallen."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe betrouwbaar zijn EuroMillions statistieken voor toekomstige trekkingen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Het is cruciaal om te begrijpen dat EuroMillions trekkingen onafhankelijke gebeurtenissen zijn. Statistieken uit het verleden garanderen geen toekomstige resultaten. De Lucky Engine biedt een wiskundige analyse van historische data, maar dit is geen voorspelling en verhoogt de winstkansen niet. Speel altijd verantwoord."
        }
      },
      {
        "@type": "Question",
        "name": "Welke soorten statistieken zijn het meest relevant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De meest relevante statistieken omvatten de frequentie van getrokken nummers en sterren (hoe vaak ze zijn gevallen), de recentheid (hoe lang geleden ze voor het laatst zijn gevallen), en de analyse van combinaties (bijv. even/oneven verdeling, hoog/laag verdeling). Deze inzichten helpen bij het begrijpen van de historische 'persoonlijkheid' van elk getal."
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <SEO 
        title="EuroMillions Statistiek & Analyse Tool | Lucky Engine" 
        description="Diepgaande EuroMillions statistieken en analyse van meest gevallen nummers, frequenties en patronen. Gebruik onze gratis tool voor inzicht in historische data."
        canonical="https://lucky-engine.com/statistiek"
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
              EuroMillions <span className="text-emerald">Statistiek</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ontdek de diepgaande analyse van EuroMillions trekkingen. Van meest gevallen nummers tot frequentiepatronen, Lucky Engine biedt u alle data.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="text-emerald" size={28} />
              Wat is EuroMillions Statistiek?
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              EuroMillions statistiek is de studie van historische trekkingsresultaten om inzicht te krijgen in de gedragingen van nummers en sterren over tijd. Hoewel elke trekking een onafhankelijke gebeurtenis is, kunnen we door het analyseren van grote datasets interessante frequenties, recentheidstrends en patronen ontdekken. Lucky Engine verzamelt en verwerkt deze data om u een helder overzicht te bieden.
            </p>
            <ContentImage 
              src="https://images.unsplash.com/photo-1518770660439-4636190af367?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Data analysis dashboard with charts and graphs"
              caption="Visualisatie van historische EuroMillions data en statistieken."
              className="max-w-2xl mx-auto"
            />
            <p className="text-secondary-foreground leading-relaxed">
              Onze analyse omvat niet alleen de 'meest gevallen nummers' en 'meest voorkomende nummers', maar ook de 'euromillions lucky stars statistiek'. We kijken naar de 'euromillions frequentie nummers' en hoe deze zich verhouden tot het theoretische gemiddelde. Dit alles helpt u om een beter begrip te krijgen van de 'euromillions cijfers statistiek'.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Lightbulb className="text-emerald" size={28} />
              Hoe Lucky Engine Statistieken Gebruikt
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              De Lucky Engine gebruikt geavanceerde algoritmen om de 'euromillions historische data' te verwerken. We combineren 'frequentie nummers' met 'recentheids weging' om een score te genereren voor elk potentieel nummer en elke ster. Dit resulteert in een 'euromillions analyse tool' die verder gaat dan alleen het tonen van ruwe data. Het is een 'euromillions statistiek tool' die u helpt bij het 'euromillions cijfers analyseren' op een gestructureerde manier.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <TrendingUp size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Frequentie Analyse</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  We berekenen hoe vaak elk nummer en elke ster is getrokken over verschillende tijdsperioden, van de volledige 'euromillions trekkinghistoriek' tot de 'euromillions cijfers laatste 2 jaar'.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald">
                  <ShieldCheck size={16} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">Recentheids Weging</h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  Nummers die recentelijk zijn gevallen, krijgen een lichte boost in onze algoritmen, wat kan duiden op 'euromillions nummers trends'.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="text-emerald" size={28} />
              Verken Meer Statistieken
            </h2>
            <p className="text-secondary-foreground leading-relaxed">
              Duik dieper in specifieke statistieken en ontdek de 'euromillions patronen analyse'. Gebruik onze tool om 'euromillions nummers analyse' uit te voeren en uw eigen 'euromillions kansberekening statistiek' te verkennen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/meest-gevallen-nummers">
                <Button variant="outline" className="bg-card border-border/20 hover:bg-card/50 text-foreground">
                  Meest Gevallen Nummers
                </Button>
              </Link>
              <Link to="/lucky-stars">
                <Button variant="outline" className="bg-card border-border/20 hover:bg-card/50 text-foreground">
                  Lucky Stars Statistiek
                </Button>
              </Link>
              <Link to="/historiek">
                <Button variant="outline" className="bg-card border-border/20 hover:bg-card/50 text-foreground">
                  Trekking Historiek
                </Button>
              </Link>
              <Link to="/generator">
                <Button className="bg-emerald hover:bg-emerald-hover text-primary-foreground">
                  Genereer Tickets
                </Button>
              </Link>
            </div>
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

export default StatistiekPage;