"use client";

import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import { Ghost, Home } from "lucide-react";
import Ball from "@/components/Ball";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "404 - Gebruiker verdwaald op:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans flex items-center justify-center overflow-hidden">
      <SEO title="404 Pagina Niet Gevonden" />
      <BackgroundGrid />
      <div className="radial-spotlight" />
      
      {/* Floating debris animation could go here */}

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="flex justify-center gap-4 mb-8">
            <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                <Ball value={4} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Ball value={0} variant="star" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                <Ball value={4} />
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Pagina <span className="text-emerald">Niet Gevonden</span>
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Oeps! Het lijkt erop dat deze bal niet uit de machine is gerold. 
          De pagina die je zoekt bestaat niet (meer).
        </p>

        <Link to="/">
          <Button 
            className="bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-6 px-8 rounded-md emerald-glow transition-all duration-120 active:scale-[0.98] mt-4"
          >
            <Home className="mr-2" size={20} />
            TERUG NAAR DE HOME
          </Button>
        </Link>
        
        <div className="pt-12 text-xs text-muted-foreground/50 font-mono">
          Error Code: 404_LUCK_NOT_FOUND
        </div>
      </div>
    </div>
  );
};

export default NotFound;