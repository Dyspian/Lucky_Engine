"use client";

import React from 'react';
import { ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold tracking-tight text-lg">LUCKY ENGINE</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Premium Statistical Engine v2.4
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;