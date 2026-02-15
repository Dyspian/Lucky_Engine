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
      opacity: Math.random() * 0.3 + 0.15, // Higher opacity (0.15 - 0.45)
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10%] animate-float-down text-emerald-600"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 0 6px rgba(0, 200, 83, 0.3))'
          }}
        >
          {/* Distinct 4-Leaf Clover Shape (Heart-based petals) */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M16.17 7.83 14.75 6.42a4 4 0 0 0-5.66 0l-1.41 1.41L6.27 6.42a4 4 0 0 0-5.66 5.66l1.41 1.41-1.41 1.42a4 4 0 0 0 5.66 5.66l1.41-1.42 1.41 1.42a4 4 0 0 0 5.66 0l1.41-1.42 1.42 1.42a4 4 0 0 0 5.66-5.66l-1.42-1.42 1.42-1.41a4 4 0 0 0 0-5.66l-1.42-1.42Z" />
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