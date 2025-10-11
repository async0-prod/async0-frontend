"use client";

import { CodeRunResult, CodeSubmitResult } from "@/lib/types";
import { Terminal, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import RunConsole from "./run-console";
import SubmitConsole from "./submit-console";

interface EditorConsoleProps {
  isConsoleOpen: boolean;
  consoleRef: React.RefObject<HTMLDivElement | null>;
  clearConsole: () => void;
  problemRunResult: CodeRunResult | null;
  problemSubmitResult: CodeSubmitResult | null;
  isRunPending: boolean;
  isSubmitPending: boolean;
  consoleMode: "run" | "submit" | null;
}

export default function EditorConsole({
  isConsoleOpen,
  consoleRef,
  clearConsole,
  problemRunResult,
  problemSubmitResult,
  isRunPending,
  isSubmitPending,
  consoleMode,
}: EditorConsoleProps) {
  return (
    <AnimatePresence>
      {isConsoleOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "40%", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-muted-foreground bg-charcoal absolute bottom-0 z-50 w-full"
          ref={consoleRef}
        >
          <div className="flex h-8 items-center justify-between border-b px-4">
            <div className="flex items-center gap-1">
              <Terminal size={13} />
              <h3 className="text-xs font-medium">Console</h3>
            </div>
            <div
              className="ml-auto flex cursor-pointer items-center gap-1"
              onClick={clearConsole}
            >
              <Trash2 size={13} />
            </div>
          </div>
          {consoleMode === "run" && (
            <RunConsole data={problemRunResult} isRunPending={isRunPending} />
          )}
          {consoleMode === "submit" && (
            <SubmitConsole
              data={problemSubmitResult}
              isSubmitPending={isSubmitPending}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
