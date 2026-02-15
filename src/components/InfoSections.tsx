"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle2, ShieldCheck, BrainCircuit } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

export const ExplanationSection = () => {
  const points = [
    { title: "Historische Frequentie", desc: "Analyseert de frequentie van elk getal binnen de geselecteerde tijdsperiode." },
    { title: "Recentheids Weging", desc: "Past extra wiskundig gewicht toe op getallen die in de meest recente trekkingen voorkomen." },
    { title: "Gewogen Randomisatie", desc: "Gebruikt een temperatuur-geëgaliseerd algoritme om de selectie te beïnvloeden naar kandidaten met een hoge score." },
    { title: "Onafhankelijke Trekkingen", desc: "Handhaaft de integriteit van het systeem door te erkennen dat elke trekking een unieke gebeurtenis is." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Bestaan er \"Warme\" en \"Koude\" nummers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wiskundig gezien heeft elke bal bij elke trekking exact dezelfde kans om te vallen. Echter, statistici analyseren vaak 'deviaties' op korte termijn. Een 'warm' nummer is een getal dat recent vaker is gevallen dan het gemiddelde, terwijl een 'koud' nummer achterblijft. Lucky Engine visualiseert deze trends, maar voorspelt de toekomst niet."
        }
      },
      {
        "@type": "Question",
        "name": "Kan een generator mijn winstkans verhogen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nee. De loterij is puur toeval. Wat een statistische generator wél doet, is u helpen bij het kiezen van een evenwichtige selectie (mix van hoog/laag, even/oneven) en het vermijden van patronen die door duizenden anderen worden gespeeld."
        }
      },
      {
        "@type": "Question",
        "name": "Waarom zijn deze statistieken gratis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lucky Engine is een passieproject om data-transparantie te bieden in de loterijwereld. Wij geloven dat spelers recht hebben op eerlijke, wiskundige inzichten zonder betaalmuren of valse beloftes."
        }
      }
    ]
  };

  return (
    <section className="space-y-8">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-emerald-depth flex items-center justify-center text-emerald shadow-md">
          <Info size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-extra-wide text-foreground uppercase text-small-caps">Hoe de Engine Werkt</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <div key={i} className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg"
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }} 
          >
            <div className="flex items-center gap-2 text-emerald">
              <CheckCircle2 size={16} />
              <h3 className="font-bold text-sm uppercase tracking-wider text-foreground text-small-caps">{p.title}</h3>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
      
      {/* New Educational / Trust Block */}
      <div className="mt-12 bg-card/50 border border-border/10 rounded-lg p-6 md:p-8">
         <div className="flex items-center gap-2 mb-6">
            <BrainCircuit size={20} className="text-emerald" />
            <h3 className="text-lg font-bold text-foreground">Veelgestelde Vragen & Mythes</h3>
         </div>
         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border/10">
              <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Bestaan er "Warme" en "Koude" nummers?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Wiskundig gezien heeft elke bal bij elke trekking exact dezelfde kans om te vallen. Echter, statistici analyseren vaak 'deviaties' op korte termijn. Een 'warm' nummer is een getal dat recent vaker is gevallen dan het gemiddelde, terwijl een 'koud' nummer achterblijft. Lucky Engine visualiseert deze trends, maar voorspelt de toekomst niet.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border/10">
              <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Kan een generator mijn winstkans verhogen?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Nee. De loterij is puur toeval. Wat een statistische generator wél doet, is u helpen bij het kiezen van een <strong>evenwichtige</strong> selectie (mix van hoog/laag, even/oneven) en het vermijden van patronen die door duizenden anderen worden gespeeld (zoals 1, 2, 3, 4, 5), waardoor u bij winst de pot minder vaak hoeft te delen.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3" className="border-border/10">
              <AccordionTrigger className="text-sm font-medium hover:text-emerald text-left">Waarom zijn deze statistieken gratis?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Lucky Engine is een passieproject om data-transparantie te bieden in de loterijwereld. Wij geloven dat spelers recht hebben op eerlijke, wiskundige inzichten zonder betaalmuren of valse beloftes.
              </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
    </section>
  );
};

export const DisclaimerSection = () => {
  return (
    <section className="p-8 rounded-lg bg-card border border-border/20 space-y-4 shadow-lg"
      style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }} 
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <AlertTriangle size={16} className="text-emerald" />
        <h2 className="text-xs font-bold uppercase tracking-extra-wide text-small-caps">Juridische Disclaimer</h2>
      </div>
      <div className="space-y-3 text-xs text-secondary-foreground leading-relaxed font-medium">
        <p>
          Lucky Engine is een statistische analysetool die uitsluitend voor informatieve en amusementsdoeleinden wordt aangeboden. 
          De gegenereerde getallen zijn gebaseerd op historische frequentiepatronen en garanderen geen winnende uitkomst.
          Het weergegeven "slaagkans percentage" is een interne statistische score die de waarschijnlijkheid van een getal of ster in een trekking aangeeft, gebaseerd op onze algoritmen, en is geen voorspelling van daadwerkelijke winst.
        </p>
        <p>
          EuroMillions-trekkingen zijn onafhankelijke gebeurtenissen die worden beheerst door willekeurig toeval. Eerdere prestaties zijn geen indicator voor toekomstige resultaten. 
          Wij zijn niet gelieerd aan enige officiële loterij-exploitant.
        </p>
        <p className="text-muted-foreground">
          Speel alstublieft verantwoord. Als u of iemand die u kent een gokprobleem heeft, zoek dan professionele hulp.
        </p>
      </div>
    </section>
  );
};