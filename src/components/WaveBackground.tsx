"use client";

import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; z: number; baseSize: number }[] = [];
    const countX = 55;
    const countZ = 55;
    const gap = 24;

    // Create particle coordinates relative to center
    for (let x = 0; x < countX; x++) {
      for (let z = 0; z < countZ; z++) {
        particles.push({
          x: (x - countX / 2) * gap,
          z: (z - countZ / 2) * gap,
          baseSize: 1.2,
        });
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const focalLength = 350;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 30;

      time += 0.01;

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply a 3D perspective rotation (angled look)
        const angleY = 0.45; // rotation angle around Y
        const angleX = 0.55; // rotation angle around X (looking down)

        // Wave calculation
        const wave1 = Math.sin(p.x * 0.009 + time) * 32;
        const wave2 = Math.cos(p.z * 0.009 + time) * 32;
        const y = wave1 + wave2;

        // 3D rotation Y
        let rotX = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let rotZ = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
        
        // 3D rotation X
        let rotY = y * Math.cos(angleX) - rotZ * Math.sin(angleX);
        let finalZ = y * Math.sin(angleX) + rotZ * Math.cos(angleX);

        // Translate away from camera
        const depth = finalZ + 550;

        if (depth > 0) {
          const scale = focalLength / depth;
          const screenX = centerX + rotX * scale;
          const screenY = centerY + rotY * scale;

          if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            // Depth fade effect (like fog in depth of field)
            const alpha = Math.max(0.01, Math.min(0.7, 1.1 - (depth - 150) / 700));
            const size = Math.max(0.4, p.baseSize * scale * 1.5);

            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 65, 0, ${alpha})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}
