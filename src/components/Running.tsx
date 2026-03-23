"use client";

import { useEffect, useRef, useState } from "react";

export default function ModernFollower() {
  const targetPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const jumpPhase = useRef(0);

  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Track mouse
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Smooth follow + subtle bounce
  useEffect(() => {
    let frame: number;

    const animate = () => {
      // Very slow smoothing
      smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.02;
      smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.02;

      // Subtle jump/bounce
      jumpPhase.current += 0.05;
      const jumpY = Math.sin(jumpPhase.current) * 2; // small, subtle

      setRenderPos({
        x: smoothPos.current.x,
        y: smoothPos.current.y - jumpY,
      });

      // Scale for modern dynamic feel
      setScale(1 + Math.sin(jumpPhase.current) * 0.05);

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: renderPos.x,
        top: renderPos.y,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #06b6d4, #4f46e5)",
        boxShadow: "0 0 6px #06b6d4, 0 0 12px #4f46e5",
        pointerEvents: "none",
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 9999,
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    />
  );
}
