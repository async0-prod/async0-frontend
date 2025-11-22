"use client";

import ToggleTheme from "@/app/_components/toggle-theme";
import UserAuth from "@/app/_components/user-auth";
import { motion } from "motion/react";
import Link from "next/link";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 flex h-16 shrink-0 items-center justify-between px-8 lg:px-24"
    >
      <Link href="/" className={`dark:text-almond text-xl font-bold`}>
        async0
      </Link>

      <div className="flex items-center gap-3">
        <ToggleTheme />
        <UserAuth />
      </div>
    </motion.header>
  );
}
