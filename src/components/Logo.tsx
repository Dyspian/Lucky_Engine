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
  imageUrl = "/lucky_engine.png", 
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
      <div 
        className="absolute inset-0 bg-primary blur-xl opacity-10 rounded-full -z-10 animate-subtle-pulse" // New subtle pulsating glow
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default Logo;