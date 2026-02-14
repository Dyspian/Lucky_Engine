"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldAlert, Lock, Scale, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Legal = () => {
  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
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
              Juridische <span className="text-emerald">Informatie</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lees deze voorwaarden zorgvuldig door voordat u Lucky Engine gebruikt. 
              Transparantie en verantwoordelijkheid staan bij ons voorop.
            </p>
          </div>

          <Card className="bg-card border border-border/20 shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="border-b border-border/20 bg-muted/20 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-small-caps text-foreground">
                <Scale className="text-emerald" size={20} />
                Algemene Voorwaarden (Terms of Service)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6 text-sm md:text-base text-secondary-foreground leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">1. Uitsluiting van Aansprakelijkheid (Disclaimer)</h3>
                <p>
                  Lucky Engine ("de Applicatie") is uitsluitend bedoeld voor amusements- en informatieve doeleinden. 
                  De Applicatie genereert getallenreeksen op basis van historische statistische gegevens en wiskundige algoritmen.
                  <strong> Er wordt GEEN enkele garantie gegeven dat de gegenereerde getallen zullen leiden tot winst in een loterijtrekking.</strong>
                </p>
                <div className="bg-red-900/10 border-l-4 border-red-500 p-4 my-4 rounded-r-md">
                  <p className="text-red-200/90 italic">
                    Het gebruik van deze Applicatie en het deelnemen aan loterijen is volledig op eigen risico. De ontwikkelaars en eigenaren van Lucky Engine zijn niet aansprakelijk voor enige directe, indirecte, incidentele of gevolgschade, inclusief maar niet beperkt tot financiële verliezen, die voortvloeien uit het gebruik van deze tool.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">2. Geen Affiliatie</h3>
                <p>
                  Lucky Engine is een onafhankelijke tool en is op geen enkele wijze verbonden, gelieerd, onderschreven of gesponsord door EuroMillions, Camelot Group, La Française des Jeux, Loterías y Apuestas del Estado, of enige andere officiële loterijorganisator.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">3. Verantwoord Spelen</h3>
                <p>
                  Wij moedigen verantwoord spelgedrag aan. Gokken kan verslavend zijn. Speel alleen met geld dat u zich kunt veroorloven te verliezen.
                  De Applicatie is niet bedoeld voor gebruik door personen jonger dan 18 jaar (of de wettelijke minimumleeftijd voor gokken in uw jurisdictie).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">4. Intellectueel Eigendom</h3>
                <p>
                  Alle rechten op de broncode, het ontwerp, de algoritmen en de inhoud van deze Applicatie behoren toe aan de eigenaar van Lucky Engine. Het is niet toegestaan om delen van deze applicatie te kopiëren, te reverse-engineeren of te herdistribueren zonder uitdrukkelijke toestemming.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/20 shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="border-b border-border/20 bg-muted/20 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-small-caps text-foreground">
                <Lock className="text-emerald" size={20} />
                Privacybeleid (Privacy Policy)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6 text-sm md:text-base text-secondary-foreground leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">1. Gegevensverzameling</h3>
                <p>
                  Lucky Engine respecteert uw privacy. Wij verzamelen <strong>geen</strong> persoonlijk identificeerbare informatie (PII) zoals uw naam, e-mailadres of telefoonnummer.
                  U hoeft geen account aan te maken om de basisfuncties van de Applicatie te gebruiken.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">2. Lokale Opslag & Cookies</h3>
                <p>
                  De Applicatie kan gebruikmaken van lokale opslagtechnologieën (zoals LocalStorage) in uw browser om uw voorkeuren (bijv. thema-instellingen of laatst gegenereerde filters) op te slaan. Deze gegevens verlaten uw apparaat niet.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">3. Externe Diensten</h3>
                <p>
                  Wij maken gebruik van externe diensten voor het ophalen van trekkingsgegevens (EuroMillions API) en voor geanonimiseerde gebruiksstatistieken (Vercel Analytics). Deze diensten kunnen technische gegevens zoals uw IP-adres en browser-user-agent verwerken om de verbinding tot stand te brengen.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">4. Wijzigingen</h3>
                <p>
                  Wij behouden ons het recht voor om dit beleid te allen tijde te wijzigen. Wijzigingen treden in werking zodra ze op deze pagina worden gepubliceerd.
                </p>
              </div>
            </CardContent>
          </Card>

           <div className="text-center text-xs text-muted-foreground">
             Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
           </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;