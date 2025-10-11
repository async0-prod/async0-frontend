"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, Send } from "lucide-react";

type EditorButtonsProps = {
  value: string;
  toggleConsole: () => void;
  isConsoleOpen: boolean;
  handleRun: (value: string) => void;
  handleSubmit: (value: string) => void;
};

export default function EditorButtons({
  value,
  toggleConsole,
  isConsoleOpen,
  handleRun,
  handleSubmit,
}: EditorButtonsProps) {
  return (
    <div className="flex w-full justify-end gap-2 pt-4">
      <Button
        size="lg"
        className="bg-charcoal hover:bg-charcoal text-almond dark:border-almond/20 mr-auto cursor-pointer dark:border"
        onClick={toggleConsole}
      >
        Console
        <ChevronUp
          className={` ${isConsoleOpen ? "rotate-180 transition-all duration-400 ease-in-out" : "transition-all duration-400 ease-in-out"} `}
          size="14"
        />
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="border-charcoal/50 text-charcoal bg-almond hover:bg-almond dark:text-almond dark:border-almond/20 cursor-pointer dark:border"
        type="submit"
        onClick={() => {
          handleRun(value);
        }}
        // disabled={isPending}
      >
        Run
      </Button>

      <Button
        size="lg"
        type="submit"
        className="bg-charcoal hover:bg-charcoal text-almond dark:border-almond/20 cursor-pointer dark:border"
        onClick={() => {
          handleSubmit(value);
        }}
        // disabled={isPending}
      >
        Submit
        <Send size={13} />
      </Button>
    </div>
  );
}
