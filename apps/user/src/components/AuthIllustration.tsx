"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";

export function AuthIllustration() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative w-full max-w-md p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          viewBox="0 0 500 500"
          fill="none"
        >
          <motion.circle
            cx="250"
            cy="250"
            r="200"
            fill={isDark ? "#1a1a1a" : "#f5f5f5"}
            stroke={isDark ? "#333" : "#e0e0e0"}
            strokeWidth="2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M250 150 L350 250 L250 350 L150 250 Z"
            stroke={isDark ? "#666" : "#999"}
            strokeWidth="2"
            fill="transparent"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.circle
            cx="250"
            cy="250"
            r="50"
            fill={isDark ? "#333" : "#e0e0e0"}
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="250"
            cy="250"
            r="20"
            fill={isDark ? "#666" : "#999"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={250 + 100 * Math.cos((i * Math.PI) / 4)}
              cy={250 + 100 * Math.sin((i * Math.PI) / 4)}
              r="5"
              fill={isDark ? "#666" : "#999"}
              initial={{
                x: 0,
                y: 0,
                opacity: 0.3,
              }}
              animate={{
                x: [0, 10 * Math.cos((i * Math.PI) / 4), 0],
                y: [0, 10 * Math.sin((i * Math.PI) / 4), 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Secure authentication powered by Auth.js
        </motion.p>
      </div>
    </div>
  );
}
