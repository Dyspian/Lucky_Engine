"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  imageUrl?: string; // New prop for image URL
}

const Logo = ({ className, imgClassName, imageUrl = "/lucky_engine.png" }: LogoProps) => {
  return (
    <div className={cn("relative group", className)}>
      <img 
        src={imageUrl} 
        alt="Lucky Engine Logo" 
        className={cn("w-auto transition-transform duration-500 ease-in-out group-hover:scale-105", imgClassName)}
      />
      <div 
        className="absolute inset-0 bg-primary blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-in-out rounded-full -z-10"
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default Logo;