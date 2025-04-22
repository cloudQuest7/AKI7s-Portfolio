// components/GalacticBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GalacticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Star properties
    const stars: {
      x: number;
      y: number;
      size: number;
      speed: number;
      brightness: number;
      color: string;
    }[] = [];

    // Create stars with GitHub-inspired purple palette
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2;
      const speed = Math.random() * 0.05;
      const brightness = Math.random() * 0.8 + 0.2;
      
      // Create a color palette with more purple tones (GitHub-inspired)
      const colors = ['#d2a8ff', '#a371f7', '#8957e5', '#bf91f3', '#ffffff', '#c9d1d9'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speed,
        brightness,
        color
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent dark background
      ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        // Move star
        star.y += star.speed;
        
        // Reset position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      {/* Nebula effects with purple tones */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-purple-700/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional faint purple glow */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent" />
    </div>
  );
};

export default GalacticBackground;