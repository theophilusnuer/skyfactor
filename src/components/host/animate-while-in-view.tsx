"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedWhileInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedWhileInView({ children, className, delay = 0 }: AnimatedWhileInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
