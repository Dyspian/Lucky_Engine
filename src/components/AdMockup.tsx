"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface AdMockupProps {
  className?: string;
  size?: "leaderboard" | "rectangle" | "banner" | "responsive";
  label?: string;
  imageUrl?: string;
  linkUrl?: string;
}

const AdMockup = ({ 
  className, 
  size = "responsive", 
  label = "Advertentie",
  imageUrl,
  linkUrl
}: AdMockupProps) => {
  const containerClasses = cn(
    "rounded-lg overflow-hidden relative my-8 mx-auto select-none transition-opacity hover:opacity-90",
    !imageUrl && "bg-card/40 border border-dashed border-border/30 flex flex-col items-center justify-center",
    size === "leaderboard" && "w-full max-w-[728px] h-[90px]",
    size === "rectangle" && "w-full max-w-[336px] h-[280px]",
    size === "banner" && "w-full max-w-[468px] h-[60px]",
    size === "responsive" && "w-full h-[120px] md:h-[200px]",
    className
  );

  const content = imageUrl ? (
    <img 
      src={imageUrl} 
      alt={label} 
      className="w-full h-full object-cover"
    />
  ) : (
    <>
      {/* Subtle diagonal stripe pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%, transparent)', 
          backgroundSize: '16px 16px',
          color: 'var(--foreground)'
        }} 
      />
      
      <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 border border-muted-foreground/20 px-2 py-0.5 rounded mb-1">
        AD
      </span>
      <span className="relative z-10 text-xs text-muted-foreground/40 font-medium">
        {label}
      </span>
    </>
  );

  if (linkUrl) {
    return (
      <a 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={cn(containerClasses, "block cursor-pointer")}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={containerClasses} aria-hidden={!imageUrl}>
      {content}
    </div>
  );
};

export default AdMockup;