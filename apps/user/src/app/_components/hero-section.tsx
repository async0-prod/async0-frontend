"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VARIANT = {
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};

const TEXTS = [
  "Solve problems in",
  "But why in",
  "Maybe we shouldn't in",
  "It's fine in",
  "So should I learn",
  "Aight, we'll just do in",
];

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTextIdx, setSelectedTextIdx] = useState(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  function switchText() {
    setSelectedTextIdx((prev) => (prev + 1) % TEXTS.length);
    cooldownRef.current = 2; // reset timer (seconds)
  }

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) switchText();
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="font-urbanist dark:text-almond flex flex-1 flex-col items-center justify-center">
      <div className="ml-4 flex flex-col items-center justify-center">
        <div className="pointer-events-none text-4xl leading-tight font-thin tracking-tight text-balance sm:text-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTextIdx} // 👈 triggers enter/exit animation
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              variants={VARIANT}
            >
              {TEXTS[selectedTextIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3, ease: "easeOut" }}
          variants={VARIANT}
          className="font-ephesis text-6xl font-thin lg:text-8xl"
        >
          Javascript.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-2 flex gap-3"
        >
          <Button
            variant="outline"
            className="hover:bg-charcoal dark:hover:bg-almond-dark hover:text-almond dark:hover:text-charcoal border-charcoal dark:border-almond-dark bg-charcoal text-almond flex cursor-pointer items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            asChild
          >
            <Link href={"/problems"} prefetch>
              <motion.div
                key={isHovered.toString()}
                initial={{ y: 0, opacity: 1 }}
                animate={
                  isHovered
                    ? {
                        y: [0, 25, -25, 0],
                        opacity: [1, 0, 0, 1],
                      }
                    : { y: 0, opacity: 1 }
                }
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight />
              </motion.div>
              Problems
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
