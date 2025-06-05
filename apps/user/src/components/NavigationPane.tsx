"use client";

import Link from "next/link";

export default function NavigationPane() {
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  return (
    <div className="flex items-center justify-start gap-4 w-full lg:justify-end">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:text-charcoal hover:underline"
      >
        Dashboard
      </Link>
      <Link
        href="/problems"
        className="text-sm text-muted-foreground hover:text-charcoal hover:underline"
      >
        Problems
      </Link>

      {/* <Toggle
        aria-label="Toggle"
        className="cursor-pointer hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent"
        onPressedChange={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {mounted ? (
          theme === "light" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}
      </Toggle> */}
    </div>
  );
}
