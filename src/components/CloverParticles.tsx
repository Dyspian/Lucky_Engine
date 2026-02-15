"use client";

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  rotation: number;
}

const CloverParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Increased count and visibility settings
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% width
      duration: Math.random() * 20 + 15, // Slower float (15-35s)
      delay: Math.random() * -30, // Start at various points
      size: Math.random() * 40 + 20, // Larger size (20-60px)
      opacity: Math.random() * 0.4 + 0.2, // Higher opacity for this detailed SVG
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Define Gradients and Filters once globally for the SVG context */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="leafGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#9CFF6B"/>
            <stop offset="60%" stopColor="#34D058"/>
            <stop offset="100%" stopColor="#0B7A2A"/>
          </radialGradient>

          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7BFF5E"/>
            <stop offset="100%" stopColor="#0A5F1F"/>
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10%] animate-float-down"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
             {/* Leaves */}
            <g filter="url(#glow)">
              <circle cx="256" cy="160" r="85" fill="url(#leafGrad)"/>
              <circle cx="352" cy="256" r="85" fill="url(#leafGrad)"/>
              <circle cx="256" cy="352" r="85" fill="url(#leafGrad)"/>
              <circle cx="160" cy="256" r="85" fill="url(#leafGrad)"/>
            </g>

            {/* Center */}
            <circle cx="256" cy="256" r="45" fill="#0B7A2A"/>

            {/* Stem */}
            <path d="M256 300 C 240 360, 280 420, 256 470"
                  stroke="url(#stemGrad)"
                  strokeWidth="28"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"/>

            {/* Swirl */}
            <path d="M120 340 C 80 280, 120 200, 220 190
                     C 360 175, 420 260, 390 340"
                  stroke="#34D058"
                  strokeWidth="18"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"/>
          </svg>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-down {
          0% {
            transform: translateY(-20vh) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(30vh) rotate(120deg) translateX(30px);
          }
          66% {
             transform: translateY(80vh) rotate(240deg) translateX(-30px);
          }
          100% {
            transform: translateY(120vh) rotate(360deg) translateX(0);
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