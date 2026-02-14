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
    const particleCount = 80; // Number of particles
    const colors = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))', 'rgba(255,255,255,0.8)'];

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
          size: Math.random() * 1.5 + 0.5, // 0.5 to 2
          speedX: (Math.random() - 0.5) * 0.1, // -0.05 to 0.05
          speedY: Math.random() * 0.05 + 0.05, // 0.05 to 0.1 (upwards movement)
          opacity: Math.random() * 0.5 + 0.2, // 0.2 to 0.7
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'hsl(var(--background))'; // Ensure background is drawn
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.x += p.speedX;
        p.y -= p.speedY; // Move upwards

        // Reset particle if it goes off screen
        if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.5 + 0.2;
        }
        if (p.x < -p.size || p.x > canvas.width + p.size) {
          p.x = p.x < -p.size ? canvas.width + p.size : -p.size;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.5 + 0.2;
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