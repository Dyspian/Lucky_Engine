"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { MadeWithDyad } from "@/components/made-with-elmony";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/10 relative z-10 bg-background/50 backdrop-blur-sm mt-16 md:mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-extra-wide text-muted-foreground/60 text-small-caps mb-2">
            © {new Date().getFullYear()} Lucky Engine • Analytische Systemen Divisie
          </p>
          <div className="flex justify-center md:justify-start">
             <MadeWithDyad />
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Link to="/legal" className="hover:text-emerald transition-colors duration-200">
            Algemene Voorwaarden
          </Link>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <Link to="/legal" className="hover:text-emerald transition-colors duration-200">
            Privacybeleid
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;