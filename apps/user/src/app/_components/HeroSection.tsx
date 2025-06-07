"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const VARIANT = {
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  //
  return (
    <div className="flex flex-1 flex-col justify-center items-center font-nunito">
      <motion.p
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={VARIANT}
        className="font-black text-4xl lg:text-7xl"
      >
        solve problems in
      </motion.p>
      <motion.p
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut" }}
        variants={VARIANT}
        className="font-black text-4xl lg:text-7xl ml-4 "
      >
        javascript.
      </motion.p>

      <motion.p
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
        variants={VARIANT}
        className="font-light lg:text-xl text-sm tracking-wide max-w-sm lg:max-w-lg mt-4 text-center px-2"
      >
        JavaScript? Is it the best tool for the job? Absolutely not. Will we do
        it anyway? You bet your undefined we will.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex mt-4 gap-3"
      >
        <Button className="cursor-pointer bg-charcoal dark:bg-almond">
          <Link href={"/dashboard"}> Dashboard</Link>
        </Button>
        <Button
          variant="outline"
          className="bg-transparent hover:bg-charcoal dark:hover:bg-almond hover:text-almond dark:hover:text-charcoal cursor-pointer border-charcoal dark:border-almond flex items-center gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          asChild
        >
          <Link href={"/problems"}>
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
            </motion.div>{" "}
            Problems
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
