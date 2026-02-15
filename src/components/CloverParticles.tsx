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
          {/* Detailed 4-Leaf Clover Path provided by user */}
          <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
            <path d="M512 302.3c0 35.29-28.99 63.91-64.28 63.91c-38.82 0-88.7-22.75-122.4-40.92c18.17 33.7 40.92 83.57 40.92 122.4c0 35.29-28.61 63.91-63.91 63.91c-18.1 0-34.45-7.52-46.09-19.63C244.6 504.3 228 512 209.7 512c-35.29 0-63.91-28.99-63.91-64.28c0-38.82 22.75-88.7 40.92-122.4c-33.7 18.17-83.57 40.92-122.4 40.92c-35.29 0-63.91-28.61-63.91-63.91c0-18.1 7.52-34.45 19.63-46.09C7.676 244.6 0 228 0 209.7c0-35.29 28.99-63.91 64.28-63.91c38.82 0 88.7 22.75 122.4 40.92C168.5 152.1 145.8 103.1 145.8 64.28c0-35.29 28.61-63.91 63.91-63.91c18.1 0 34.45 7.52 46.09 19.63C267.4 7.676 283.1 0 302.3 0c35.29 0 63.91 28.99 63.91 64.28c0 38.82-22.75 88.7-40.92 122.4c33.7-18.17 83.57-40.92 122.4-40.92c35.29 0 63.91 28.61 63.91 63.91c0 18.1-7.52 34.45-19.63 46.09C504.3 267.4 512 283.1 512 302.3z" />
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