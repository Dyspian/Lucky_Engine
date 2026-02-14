"use client";

import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png"; 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo imgClassName="h-10" imageUrl={logoUrl} />
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