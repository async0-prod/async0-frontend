"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VARIANT = {
  initial: { opacity: 0, y: -10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 10, filter: "blur(4px)" },
};

const TEXTS = [
  "Solve problems in",
  "But why in",
  "It's fine in",
  "Fine, we'll do in",
  "It's a pain in",
];

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
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

  const text = "Javascript.";
  const letters = text.split("");

  return (
    <div className="dark:text-almond flex flex-1 flex-col items-center justify-center">
      <div className="ml-4 flex flex-col items-center justify-center">
        <div className="text-3xl font-thin text-balance sm:text-[2.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedTextIdx}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              variants={VARIANT}
              className="tracking-wide select-none"
            >
              {TEXTS[selectedTextIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3, ease: "easeOut" }}
          variants={VARIANT}
          className="font-ephesis -mt-8 flex text-[5rem] font-thin tracking-wide select-none lg:-mt-14 lg:text-[10rem]"
          onMouseLeave={() => setHoverIndex(-1)}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              className={cn(
                "relative inline-block transition-colors duration-300 ease-out",
                index <= hoverIndex ? "text-orange-500" : "inherit",
              )}
            >
              {letter}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="-mt-2 flex gap-3 lg:-mt-4"
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
              <p className="tracking-wide">Problems</p>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
