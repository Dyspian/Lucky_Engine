"use client";

import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png"; 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo imgClassName="h-10" imageUrl={logoUrl} alt="Lucky Engine Logo" ariaLabel="Lucky Engine Logo" />
        <div className="hidden sm:block">
          {/* Replaced text with another instance of the Logo */}
          <Logo imgClassName="h-8 opacity-70" imageUrl={logoUrl} alt="Lucky Engine Secondary Logo" ariaLabel="Lucky Engine Secondary Logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;