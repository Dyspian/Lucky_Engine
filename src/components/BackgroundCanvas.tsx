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
    const particleCount = 200; // Increased particle count for more clovers

    // Preload the clover image
    const preloadImage = new Image();
    preloadImage.src = '/clovereffect.svg'; // Assumes clovereffect.svg is in the public folder
    preloadImage.onload = () => {
      cloverImageRef.current = preloadImage;
      console.log("Clover image loaded successfully!"); // Confirm image load
      resizeCanvas(); // Initial resize and particle setup after image loads
      animate();
    };
    preloadImage.onerror = (err) => {
      console.error("Failed to load clover image:", err);
      // Fallback or handle error if image fails to load
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
          size: Math.random() * 15 + 15, // Larger size for clovers (15 to 30px)
          speedX: (Math.random() - 0.5) * 0.1, // Slower horizontal movement
          speedY: Math.random() * 0.05 + 0.05, // Slower upwards movement
          opacity: Math.random() * 0.5 + 0.5, // Higher opacity (0.5 to 1.0)
          image: cloverImageRef.current,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'hsl(var(--background))'; // Ensure background is drawn by the canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        if (p.image) {
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 10; // Add a subtle glow
          ctx.shadowColor = 'hsl(var(--particle-green))'; // Green glow for clovers
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
          p.opacity = Math.random() * 0.5 + 0.5;
        }
        if (p.x < -p.size || p.x > canvas.width + p.size) {
          p.x = p.x < -p.size ? canvas.width + p.size : -p.size;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.5 + 0.5;
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    // Initial setup is now handled by preloadImage.onload
    // No need to call resizeCanvas() or animate() directly here

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