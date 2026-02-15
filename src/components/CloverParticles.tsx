"use client";

import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const CloverParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% width
      duration: Math.random() * 20 + 15, // 15-35s duration (slow)
      delay: Math.random() * -30, // Negative delay to start mid-animation
      size: Math.random() * 20 + 10, // 10-30px size
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacity (very subtle)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10%] animate-float-down text-emerald"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <img 
            src="/clovereffect.svg" 
            alt="" 
            className="w-full h-full text-current"
            style={{ 
              filter: 'drop-shadow(0 0 2px rgba(0, 200, 83, 0.3))' 
            }} 
          />
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-down {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
          }
        }
        .animate-float-down {
          animation-name: float-down;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
};

export default CloverParticles;