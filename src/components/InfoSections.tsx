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
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shadow-md"> {/* Increased size and added shadow */}
          <Info size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">Hoe de Engine Werkt</h2> {/* Ensured text is white */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2 shadow-lg"> {/* Added rounded-2xl and shadow */}
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 size={16} />
              <h3 className="font-bold text-sm uppercase tracking-wider">{p.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const DisclaimerSection = () => {
  return (
    <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 shadow-lg"> {/* Added rounded-2xl and shadow */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <AlertTriangle size={16} className="text-primary" /> {/* Added primary color to icon */}
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Juridische Disclaimer</h2>
      </div>
      <div className="space-y-3 text-xs text-muted-foreground/80 leading-relaxed font-medium"> {/* Adjusted opacity for better readability */}
        <p>
          Lucky Engine is een statistische analysetool die uitsluitend voor informatieve en amusementsdoeleinden wordt aangeboden. 
          De gegenereerde getallen zijn gebaseerd op historische frequentiepatronen en garanderen geen winnende uitkomst.
        </p>
        <p>
          EuroMillions-trekkingen zijn onafhankelijke gebeurtenissen die worden beheerst door willekeurig toeval. Eerdere prestaties zijn geen indicator voor toekomstige resultaten. 
          Wij zijn niet gelieerd aan enige officiële loterij-exploitant.
        </p>
        <p className="text-muted-foreground/90"> {/* Adjusted opacity for better readability */}
          Speel alstublieft verantwoord. Als u of iemand die u kent een gokprobleem heeft, zoek dan professionele hulp.
        </p>
      </div>
    </section>
  );
};