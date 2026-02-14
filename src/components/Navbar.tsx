"use client";

import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png"; 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Logo imgClassName="h-10" imageUrl={logoUrl} alt="Lucky Engine Logo" ariaLabel="Lucky Engine Logo" />
        {/* Geen extra elementen in de navbar, puur en functioneel */}
      </div>
    </nav>
  );
};

export default Navbar;