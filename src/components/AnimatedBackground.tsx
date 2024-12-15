import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    let mousePosition = { x: 0, y: 0 };
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPoint = (x: number, y: number): Point => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5, // Reduced speed for subtlety
      vy: (Math.random() - 0.5) * 0.5, // Reduced speed for subtlety
      life: Math.random() * 0.5 + 0.5,
    });

    const init = () => {
      points = Array(100) // Increased number of points for a more subtle effect
        .fill(null)
        .map(() =>
          createPoint(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
    };

    const drawTrail = (p1: Point, p2: Point, life: number) => {
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      const alpha = Math.min(life, 0.5);

      // Using deep blues, purples, and blacks for a dark, cosmic theme
      gradient.addColorStop(0, `rgba(0, 100, 150, ${alpha})`);
      gradient.addColorStop(1, `rgba(0, 100, 150, ${alpha})`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 * life;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const drawPoint = (point: Point) => {
      const gradient = ctx.createRadialGradient(
        point.x,
        point.y,
        0,
        point.x,
        point.y,
        5
      );
      gradient.addColorStop(0, `rgba(0, 100, 150, ${point.life})`);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (currentTime: number) => {
      lastTime = currentTime;

      // Using a dark background with subtle movement
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        // Subtle attraction to mouse
        const dx = mousePosition.x - point.x;
        const dy = mousePosition.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          point.vx += (dx / dist) * 0.05; // Reduced attraction for subtlety
          point.vy += (dy / dist) * 0.05; // Reduced attraction for subtlety
        }

        // Connecting nearby points for a subtle wave effect
        points.forEach((p2, j) => {
          if (i !== j) {
            const dx = p2.x - point.x;
            const dy = p2.y - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              drawTrail(point, p2, (150 - dist) / 150);
            }
          }
        });

        drawPoint(point);

        // Boundary checking with subtle bouncing
        if (point.x < 0 || point.x > canvas.width) point.vx *= -0.9; // Subtle bouncing
        if (point.y < 0 || point.y > canvas.height) point.vy *= -0.9; // Subtle bouncing

        // Speed limiting for a smooth animation
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > 1) {
          point.vx = (point.vx / speed) * 1; // Limiting speed for smoothness
          point.vy = (point.vy / speed) * 1; // Limiting speed for smoothness
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    init();
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'var(--bg-color)',
      }}
    />
  );
};

export default AnimatedBackground;
