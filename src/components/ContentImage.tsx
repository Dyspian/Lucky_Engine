"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface ContentImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}

const ContentImage = ({ src, alt, caption, className, imgClassName }: ContentImageProps) => {
  return (
    <div className={cn("my-8 rounded-lg overflow-hidden border border-border/20 shadow-lg", className)}>
      <img 
        src={src} 
        alt={alt} 
        className={cn("w-full h-auto object-cover", imgClassName)} 
      />
      {caption && (
        <p className="text-sm text-muted-foreground text-center p-4 bg-card/50 border-t border-border/20">
          {caption}
        </p>
      )}
    </div>
  );
};

export default ContentImage;