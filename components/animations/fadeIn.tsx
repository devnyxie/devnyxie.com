"use client";

import React from "react";
import { motion } from "framer-motion";

function FadeIn({
  children,
  duration = 0.5,
  delay,
}: {
  children: React.ReactNode;
  duration?: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        scale: 1.1,
        opacity: 0,
        filter: "blur(20px)",
      }}
      animate={{
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: duration,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
