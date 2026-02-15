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
    // Generate more particles for better coverage
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% width
      duration: Math.random() * 15 + 10, // 10-25s duration (slightly faster)
      delay: Math.random() * -20, // Negative delay to start mid-animation
      size: Math.random() * 30 + 15, // 15-45px size (larger)
      opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity (much more visible)
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10%] animate-float-down text-emerald-500/40"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 0 4px rgba(0, 200, 83, 0.4))'
          }}
        >
          {/* Using an inline SVG for the clover shape directly to ensure it renders without external file dependency issues if any */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12.75 5.56c1.1-1.74 3.48-1.79 4.67-.1 1.25 1.77-.07 4.29-2.17 4.54 1.77-1.16 3.99.71 3.2 2.76-.8 2.06-3.48 1.94-5.04.58.94 1.83-1.09 3.8-3.04 3.09-.32-.12-.62-.27-.9-.46-.35 2.42-2.12 4.41-2.12 4.41s-1.07-2.39-.77-4.78c-.28.18-.58.33-.9.45-1.95.7-3.98-1.26-3.04-3.09-1.56 1.36-4.24 1.48-5.04-.58-.79-2.05 1.43-3.92 3.2-2.76-2.1-.25-3.42-2.77-2.17-4.54 1.19-1.69 3.57-1.64 4.67.1.6 1.05 1.46 2.37 1.76 4.31.3-1.94 1.16-3.26 1.76-4.31z" />
          </svg>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-down {
          0% {
            transform: translateY(-20vh) rotate(0deg) translateX(0);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(20px);
          }
          100% {
            transform: translateY(120vh) rotate(360deg) translateX(-20px);
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