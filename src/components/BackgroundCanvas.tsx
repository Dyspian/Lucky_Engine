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
    const particleCount = window.innerWidth < 768 ? 80 : 150; 

    // Use placeholder.svg since clovereffect.svg is missing to prevent 404
    const preloadImage = new Image();
    preloadImage.src = '/placeholder.svg'; 
    preloadImage.onload = () => {
      cloverImageRef.current = preloadImage;
      resizeCanvas(); 
      animate();
    };
    preloadImage.onerror = (err) => {
      console.warn("Failed to load particle image, falling back to shapes.");
      resizeCanvas(); 
      animate();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = []; 
      initParticles();
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 10, 
          speedX: (Math.random() - 0.5) * 0.05, 
          speedY: Math.random() * 0.03 + 0.03, 
          opacity: Math.random() * 0.2 + 0.1, 
          image: cloverImageRef.current,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        if (p.image) {
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 5; 
          ctx.shadowColor = 'hsl(var(--emerald) / 0.3)'; 
          ctx.drawImage(p.image, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          // Fallback if image fails or isn't loaded yet: simple circles
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = 'hsl(148, 100%, 39%)'; // Manual emerald color
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0; 
      ctx.shadowColor = 'transparent';
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.x += p.speedX;
        p.y -= p.speedY; 

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