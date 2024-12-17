import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { debounce } from 'lodash';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

interface AnimatedBackgroundProps {
  pointCount?: number;
  pointSpeed?: number;
  trailColor?: string;
  maxConnections?: number;
  trailLength?: number;
  interactionRadius?: number;
  quality?: 'low' | 'medium' | 'high';
  enableAnimation?: boolean;
  colorMode?: 'single' | 'rainbow' | 'gradient';
  pulseSpeed?: number;
  particleSize?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  pointCount = 50,
  pointSpeed = 0.5,
  trailColor = "rgba(0, 255, 255, 0.5)",
  maxConnections = 3,
  trailLength = 0.8,
  interactionRadius = 120,
  quality = 'medium',
  enableAnimation = true,
  colorMode = 'single',
  pulseSpeed = 0.005,
  particleSize = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  
  const qualitySettings = useMemo(() => ({
    low: {
      points: Math.floor(pointCount * 0.5),
      skipFrames: 2,
      connectionDistance: 80,
      dpr: 1,
      blur: 0,
    },
    medium: {
      points: pointCount,
      skipFrames: 1,
      connectionDistance: 100,
      dpr: window.devicePixelRatio || 1,
      blur: 0.5,
    },
    high: {
      points: pointCount * 1.2,
      skipFrames: 0,
      connectionDistance: 120,
      dpr: window.devicePixelRatio || 1,
      blur: 1,
    },
  }), [pointCount]);

  const getColor = useCallback((point: Point, time: number) => {
    switch (colorMode) {
      case 'rainbow':
        return `hsla(${point.hue + time * 20}, 70%, 50%, ${point.life})`;
      case 'gradient':
        return `hsla(${(point.x / window.innerWidth) * 360}, 70%, 50%, ${point.life})`;
      default:
        return `${trailColor}, ${point.life})`;
    }
  }, [colorMode, trailColor]);

  const createPoint = useCallback((x: number, y: number): Point => ({
    x,
    y,
    vx: (Math.random() - 0.5) * pointSpeed,
    vy: (Math.random() - 0.5) * pointSpeed,
    life: Math.random() * 0.8 + 0.2,
    size: Math.random() * particleSize + particleSize * 0.5,
    hue: Math.random() * 360,
  }), [pointSpeed, particleSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const settings = qualitySettings[quality];
    let time = 0;
    let mousePosition = { x: 0, y: 0 };

    const handleResize = debounce(() => {
      const dpr = settings.dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      pointsRef.current = Array(settings.points)
        .fill(null)
        .map(() => createPoint(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
    }, 250);

    const drawPoint = (point: Point, time: number) => {
      const size = point.size * (1 + Math.sin(time * pulseSpeed) * 0.3);
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, size
      );
      
      const color = getColor(point, time);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      if (!enableAnimation) return;
      
      frameRef.current++;
      time += 0.016;

      if (frameRef.current % (settings.skipFrames + 1) !== 0) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = `rgba(0, 0, 0, ${1 - trailLength})`;
      ctx.filter = `blur(${settings.blur}px)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'none';

      pointsRef.current.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;
        
        const dx = mousePosition.x - point.x;
        const dy = mousePosition.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < interactionRadius) {
          const force = (1 - dist / interactionRadius) * 0.02;
          point.vx += dx * force;
          point.vy += dy * force;
        }

        let connections = 0;
        for (let j = i + 1; j < pointsRef.current.length && connections < maxConnections; j++) {
          const p2 = pointsRef.current[j];
          const dx = p2.x - point.x;
          const dy = p2.y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < settings.connectionDistance) {
            const opacity = (settings.connectionDistance - dist) / settings.connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = getColor({ ...point, life: opacity * trailLength }, time);
            ctx.lineWidth = Math.min(point.size, p2.size) * 0.5;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        }

        if (point.x < 0 || point.x > canvas.width) {
          point.vx *= -0.8;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.vy *= -0.8;
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }

        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > pointSpeed) {
          const dampening = 0.95;
          point.vx *= dampening;
          point.vy *= dampening;
        }

        drawPoint(point, time);
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = debounce((e: MouseEvent) => {
      mousePosition = { x: e.clientX, y: e.clientY };
    }, 16);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [
    quality,
    enableAnimation,
    pointSpeed,
    trailLength,
    maxConnections,
    interactionRadius,
    createPoint,
    getColor,
    qualitySettings,
    pulseSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "var(--bg-color)",
        willChange: "transform",
        pointerEvents: "none",
      }}
    />
  );
};

export default React.memo(AnimatedBackground);
