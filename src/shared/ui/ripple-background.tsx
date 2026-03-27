"use client";

import { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleId = 0;
const MAX_RIPPLES = 5;

export function RippleBackground({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const timeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const id = ++rippleId;

      setRipples((prev) => {
        const next = [...prev, { id, x: e.clientX, y: e.clientY }];
        // Keep max ripples to prevent buildup
        if (next.length > MAX_RIPPLES) {
          const removed = next.shift()!;
          const t = timeoutsRef.current.get(removed.id);
          if (t) { clearTimeout(t); timeoutsRef.current.delete(removed.id); }
        }
        return next;
      });

      const t = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
        timeoutsRef.current.delete(id);
      }, 900);
      timeoutsRef.current.set(id, t);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {children}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed -z-5 rounded-full"
          style={{
            left: r.x,
            top: r.y,
            translate: "-50% -50%",
            opacity: 0,
            border: "1px solid var(--neon-glow)",
            animation: "ripple-ring 0.8s ease-out forwards",
            ["--ripple-size" as string]: "350px",
          }}
        />
      ))}
    </>
  );
}
