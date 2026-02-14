"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";

export const ExplanationSection = () => {
  const points = [
    { title: "Historische Frequentie", desc: "Analyseert de frequentie van elk getal binnen de geselecteerde tijdsperiode." },
    { title: "Recentheids Weging", desc: "Past extra wiskundig gewicht toe op getallen die in de meest recente trekkingen voorkomen." },
    { title: "Gewogen Randomisatie", desc: "Gebruikt een temperatuur-geëgaliseerd algoritme om de selectie te beïnvloeden naar kandidaten met een hoge score." },
    { title: "Onafhankelijke Trekkingen", desc: "Handhaaft de integriteit van het systeem door te erkennen dat elke trekking een unieke gebeurtenis is." }
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-emerald-depth flex items-center justify-center text-emerald shadow-md">
          <Info size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-extra-wide text-foreground uppercase">Hoe de Engine Werkt</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <div key={i} className="p-6 rounded-lg bg-card border border-border/20 space-y-2 shadow-lg transition-all duration-120 hover:border-emerald/50 hover:-translate-y-1">
            <div className="flex items-center gap-2 text-emerald">
              <CheckCircle2 size={16} />
              <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">{p.title}</h3>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const DisclaimerSection = () => {
  return (
    <section className="p-8 rounded-lg bg-card border border-border/20 space-y-4 shadow-lg">
      <div className="flex items-center gap-2 text-muted-foreground">
        <AlertTriangle size={16} className="text-emerald" />
        <h2 className="text-xs font-bold uppercase tracking-extra-wide">Juridische Disclaimer</h2>
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