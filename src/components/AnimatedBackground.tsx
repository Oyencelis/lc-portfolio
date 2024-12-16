import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface AnimatedBackgroundProps {
  pointCount?: number; // Number of points
  pointSpeed?: number; // Maximum speed of points
  trailColor?: string; // Base color of trails
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  pointCount = 100,
  pointSpeed = 0.5,
  trailColor = "rgba(0, 100, 150",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas 2D context is not supported in this browser.");
      return;
    }

    let animationFrameId: number;
    let points: Point[] = [];
    let mousePosition = { x: 0, y: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const throttle = (callback: Function, delay: number) => {
      let lastTime = 0;
      return (...args: any[]) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
          lastTime = now;
          callback(...args);
        }
      };
    };

    const createPoint = (x: number, y: number): Point => ({
      x,
      y,
      vx: (Math.random() - 0.5) * pointSpeed,
      vy: (Math.random() - 0.5) * pointSpeed,
      life: Math.random() * 0.5 + 0.5,
    });

    const init = () => {
      points = Array(pointCount)
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
      gradient.addColorStop(0, `${trailColor}, ${alpha})`);
      gradient.addColorStop(1, `${trailColor}, ${alpha})`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(1, 2 * life);
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
      gradient.addColorStop(0, `${trailColor}, ${point.life})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        // Attraction to mouse
        const dx = mousePosition.x - point.x;
        const dy = mousePosition.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          point.vx += (dx / dist) * 0.05;
          point.vy += (dy / dist) * 0.05;
        }

        // Connect nearby points
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

        // Boundary checking and bouncing
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Speed limiting
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > pointSpeed) {
          point.vx = (point.vx / speed) * pointSpeed;
          point.vy = (point.vy / speed) * pointSpeed;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = throttle((event: MouseEvent) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    }, 50);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [pointCount, pointSpeed, trailColor]);

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
      }}
    />
  );
};

export default AnimatedBackground;
