"use client";

import { motion } from "framer-motion";

export default function AnimatedFullstop() {
  return (
    <motion.span
      initial={{ scale: 1, rotate: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3,
      }}
      className="inline-block text-[#2877D4]"
    >
      .
    </motion.span>
  );
}
