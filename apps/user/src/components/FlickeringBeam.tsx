"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function FlickeringBeam() {
  const { theme } = useTheme();

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          theme === "dark"
            ? `linear-gradient(to bottom, var(--color-almond) 0%, transparent 100%)`
            : `linear-gradient(to bottom, var(--color-charcoal) 0%, transparent 100%)`,
        clipPath: "polygon(70% -10%, 50% 100%, 97% 100%)",
        opacity: 0.5,
      }}
      whileHover={{
        opacity: [0, 0.5, 0, 0.5],
        transition: { duration: 0.5 },
      }}
    />
  );
}
