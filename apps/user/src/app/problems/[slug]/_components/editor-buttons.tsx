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
    <div className="flex justify-end gap-2 pt-4 w-full">
      <Button
        size="lg"
        className="mr-auto cursor-pointer"
        onClick={toggleConsole}
      >
        Console
        <ChevronUp
          className={` ${isConsoleOpen ? "transition-all duration-400 ease-in-out rotate-180" : "transition-all duration-400 ease-in-out"} `}
          size="14"
        />
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="border-charcoal text-charcoal bg-transparent cursor-pointer"
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
        className="bg-charcoal text-almond cursor-pointer"
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
