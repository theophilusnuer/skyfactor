
"use client";

import { motion, useReducedMotion } from "framer-motion";

function useDrift(x: number, y: number, duration: number) {
  const reduceMotion = useReducedMotion();

  return reduceMotion
    ? {}
    : {
        animate: { x: [0, x, 0], y: [0, y, 0] },
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
}

const GRID =
  "absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(16,24,32,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(16,24,32,0.6)_1px,transparent_1px)] [background-size:clamp(2.5rem,5vw,5rem)_clamp(2.5rem,5vw,5rem)]";

type GlowProps = {
  className: string;
  x: number;
  y: number;
  duration: number;
};

function Glow({ className, x, y, duration }: GlowProps) {
  return (
    <motion.div
      {...useDrift(x, y, duration)}
      className={`absolute rounded-full will-change-transform ${className}`}
    />
  );
}

/** Original: cool sky glow with violet and blue depth */
export default function InitiativesBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
    >
      <Glow
        x={60}
        y={40}
        duration={16}
        className="-left-[12%] -top-[14%] aspect-square w-[min(90vw,34rem)] bg-sky-400/30 blur-[clamp(4rem,10vw,8rem)]"
      />

      <Glow
        x={-50}
        y={60}
        duration={20}
        className="-right-[12%] top-[24%] aspect-square w-[min(80vw,30rem)] bg-violet-500/20 blur-[clamp(4rem,10vw,8rem)]"
      />

      <Glow
        x={40}
        y={-50}
        duration={18}
        className="-bottom-[18%] left-[28%] aspect-square w-[min(85vw,32rem)] bg-blue-500/20 blur-[clamp(4rem,11vw,9rem)]"
      />

      <div className={GRID} />
    </div>
  );
}

/** Inverse: violet leads, blue anchors the top, sky becomes a subtle lower accent */
export function InitiativesBackdropInverse() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
    >
      <Glow
        x={-45}
        y={35}
        duration={19}
        className="-right-[14%] -top-[16%] aspect-square w-[min(88vw,32rem)] bg-violet-500/25 blur-[clamp(4rem,10vw,8rem)]"
      />

      <Glow
        x={55}
        y={-45}
        duration={17}
        className="-left-[14%] top-[28%] aspect-square w-[min(82vw,30rem)] bg-blue-500/25 blur-[clamp(4rem,10vw,8rem)]"
      />

      <Glow
        x={-35}
        y={50}
        duration={21}
        className="-bottom-[20%] right-[24%] aspect-square w-[min(76vw,28rem)] bg-sky-400/15 blur-[clamp(4rem,11vw,9rem)]"
      />

      <div className={GRID} />
    </div>
  );
}
