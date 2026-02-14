"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  image: HTMLImageElement | null;
}

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const cloverImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 80 : 150; // Reduced particle count for mobile

    // Preload the clover image
    const preloadImage = new Image();
    preloadImage.src = '/clovereffect.svg'; // Assumes clovereffect.svg is in the public folder
    preloadImage.onload = () => {
      cloverImageRef.current = preloadImage;
      resizeCanvas(); // Initial resize and particle setup after image loads
      animate();
    };
    preloadImage.onerror = (err) => {
      console.error("Failed to load clover image:", err);
      resizeCanvas(); // Still initialize canvas even if image fails
      animate();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = []; // Clear existing particles
      initParticles();
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 10, // Slightly smaller size for clovers (10 to 20px)
          speedX: (Math.random() - 0.5) * 0.05, // Even slower horizontal movement
          speedY: Math.random() * 0.03 + 0.03, // Even slower upwards movement
          opacity: Math.random() * 0.2 + 0.1, // Much lower opacity (0.1 to 0.3)
          image: cloverImageRef.current,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // No need to draw background here, it's handled by CSS
      
      particles.forEach(p => {
        if (p.image) {
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 5; // Subtle glow
          ctx.shadowColor = 'hsl(var(--emerald) / 0.3)'; // Emerald glow for clovers
          ctx.drawImage(p.image, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
      });
      ctx.shadowBlur = 0; // Reset shadow blur after drawing particles
      ctx.shadowColor = 'transparent';
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.x += p.speedX;
        p.y -= p.speedY; // Move upwards

        // Reset particle if it goes off screen
        if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.2 + 0.1;
        }
        if (p.x < -p.size || p.x > canvas.width + p.size) {
          p.x = p.x < -p.size ? canvas.width + p.size : -p.size;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.2 + 0.1;
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20"
      aria-hidden="true"
    />
  );
};

export default BackgroundCanvas;