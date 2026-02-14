"use client";

import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  // IMPORTANT: Replace this with your actual Supabase Storage public URL for lucky_engine.png
  const logoUrl = "https://your-supabase-url.supabase.co/storage/v1/object/public/your-bucket-name/lucky_engine.png"; 

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