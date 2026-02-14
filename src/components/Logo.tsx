"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  imageUrl?: string;
  alt?: string;
  ariaLabel?: string;
}

const Logo = ({ 
  className, 
  imgClassName, 
  imageUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png", 
  alt = "Lucky Engine Logo",
  ariaLabel = "Lucky Engine Logo"
}: LogoProps) => {
  return (
    <div className={cn("relative group", className)}>
      <img 
        src={imageUrl} 
        alt={alt} 
        aria-label={ariaLabel}
        className={cn("w-auto transition-transform duration-500 ease-in-out group-hover:scale-105", imgClassName)}
      />
    </div>
  );
};

export default Logo;