"use client";

import Link from "next/link";
import UserAuth from "./UserAuth";
import ToggleTheme from "./ToggleTheme";

export function Navbar() {
  return (
    <header className="px-8 lg:px-24 py-8 font-nunito flex items-center justify-around">
      <Link href="/" className={`font-black text-xl`}>
        async0
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        <ToggleTheme />
        <UserAuth />
      </div>
    </header>
  );
}
