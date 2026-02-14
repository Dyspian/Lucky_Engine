"use client";

import React, { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const CloverParticles = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // console.log("Particles container loaded", container);
  }, []);

  if (prefersReducedMotion) {
    return null; // Do not render particles if user prefers reduced motion
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Ensure particles are behind other content
        },
        background: {
          color: {
            value: "transparent", // Background color is handled by the main page
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#34D399", "#10B981", "#059669", "#6EE7B7"], // Multiple shades of green
          },
          links: {
            enable: false,
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.3, // Slow drift
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800, // Corrected to 'area' as per the latest type error
            },
            value: 40, // Low density
          },
          opacity: {
            value: { min: 0.1, max: 0.4 }, // Low opacity
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
              startValue: "random",
              destroy: "min",
            },
          },
          shape: {
            type: "image",
            options: {
              image: {
                src: "/clover.svg", // Custom clover SVG
                width: 24,
                height: 24,
              },
            },
          },
          size: {
            value: { min: 10, max: 30 }, // Different sizes for parallax effect
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              startValue: "random",
              destroy: "min",
            },
          },
          rotate: {
            animation: {
              enable: true,
              speed: 0.5, // Gentle rotation
              sync: false,
            },
            value: { min: 0, max: 360 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default CloverParticles;