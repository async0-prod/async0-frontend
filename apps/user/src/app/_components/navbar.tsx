"use client";

import Link from "next/link";
import UserAuth from "./user-auth";
import ToggleTheme from "./toggle-theme";

export function Navbar() {
  return (
    <header className="flex items-center justify-around px-8 py-8 lg:px-24">
      <Link href="/" className={`dark:text-almond text-xl font-bold`}>
        async0
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <ToggleTheme />
        <UserAuth />
      </div>
    </header>
  );
}
