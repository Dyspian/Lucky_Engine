"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 150; // Increased particle count
    const colors = ['hsl(var(--particle-green))', 'hsl(var(--primary))', 'rgba(255,255,255,0.8)']; // Green, Gold, White

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize particles on resize to distribute them correctly
      particles = [];
      initParticles();
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // Larger particles (1 to 3)
          speedX: (Math.random() - 0.5) * 0.2, // Slightly faster horizontal movement
          speedY: Math.random() * 0.1 + 0.1, // Faster upwards movement (0.1 to 0.2)
          opacity: Math.random() * 0.6 + 0.4, // Higher opacity (0.4 to 1.0)
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'hsl(var(--background))'; // Ensure background is drawn by the canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8; // Add a subtle glow
        ctx.shadowColor = p.color; // Glow color matches particle color
        ctx.fill();
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
          p.opacity = Math.random() * 0.6 + 0.4;
        }
        if (p.x < -p.size || p.x > canvas.width + p.size) {
          p.x = p.x < -p.size ? canvas.width + p.size : -p.size;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.6 + 0.4;
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize and particle setup
    animate();

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
      className="fixed inset-0 w-full h-full -z-20" // Ensure it's fixed and behind everything
      aria-hidden="true"
    />
  );
};

export default BackgroundCanvas;