"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Slow-drifting editorial guide lines.
 *
 * Rendered ABOVE the photograph and BELOW the copy (z-10), so the horizontal
 * lines run uninterrupted across the text/photo boundary and the "seam" line
 * becomes just one line in a drifting grid rather than a column divider.
 */

const SOFT_VERTICAL =
  "bg-gradient-to-b from-transparent via-violet-200/20 to-transparent";

const HORIZONTAL_TONE =
  "bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.22)_38%,rgba(255,255,255,0.1)_58%,transparent)]";

const verticalLines = [
  {
    id: "gutter-left",
    position: "left-[2%]",
    tone: SOFT_VERTICAL,
    drift: 4,
    duration: 26,
  },
  {
    id: "gutter-left",
    position: "left-[45%]",
    tone: SOFT_VERTICAL,
    drift: 4,
    duration: 26,
  },
  {
    id: "gutter-left",
    position: "left-[48%]",
    tone: SOFT_VERTICAL,
    drift: 4,
    duration: 26,
  },
  {
    // Follows the grid split (md 60/40 → lg 55/45 → xl 52/48 → 2xl 50/50)
    // and slowly wanders back and forth across it.
    id: "seam",
    position:
      "hidden md:block md:left-[60%] lg:left-[55%] xl:left-[52%] 2xl:left-1/2",
    tone: "bg-[linear-gradient(to_bottom,transparent,rgba(167,139,250,0.3)_40%,rgba(168,85,247,0.16)_72%,transparent)]",
    drift: 12,
    duration: 36,
  },
  // {
  //   id: "gutter-right",
  //   position: "left-[94%]",
  //   tone: SOFT_VERTICAL,
  //   drift: -4,
  //   duration: 44,
  // },
] as const;

const horizontalLines = [
  { id: "upper", position: "top-[10%]", drift: 5, duration: 32 },
  { id: "upper", position: "top-[18%]", drift: 5, duration: 32 },
  { id: "lower", position: "top-[82%]", drift: -5, duration: 42 },
  { id: "lower", position: "top-[90%]", drift: -5, duration: 42 },
] as const;

// First keyframe doubles as the server-rendered / reduced-motion resting state,
// so there is no opacity jump on hydration.
const VERTICAL_OPACITY = [0.45, 0.9, 0.45, 0.9, 0.45];
const HORIZONTAL_OPACITY = [0.3, 0.7, 0.3, 0.7, 0.3];

export default function HeroLines() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      {verticalLines.map((line) => (
        <motion.div
          key={`${line.id}-${line.position}`}
          className={`absolute inset-y-0 w-px ${line.position} ${line.tone}`}
          initial={{ x: 0, opacity: VERTICAL_OPACITY[0] }}
          animate={
            reduceMotion
              ? { x: 0, opacity: VERTICAL_OPACITY[0] }
              : {
                  x: [0, line.drift, 0, -line.drift, 0],
                  opacity: VERTICAL_OPACITY,
                }
          }
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {horizontalLines.map((line) => (
        <motion.div
          key={`${line.id}-${line.position}`}
          className={`absolute inset-x-0 h-px ${line.position} ${HORIZONTAL_TONE}`}
          initial={{ y: 0, opacity: HORIZONTAL_OPACITY[0] }}
          animate={
            reduceMotion
              ? { y: 0, opacity: HORIZONTAL_OPACITY[0] }
              : {
                  y: [0, line.drift, 0, -line.drift, 0],
                  opacity: HORIZONTAL_OPACITY,
                }
          }
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
