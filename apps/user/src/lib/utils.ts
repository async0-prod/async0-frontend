import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MAX_QUERY_LENGTH = 20;

export function formatMemory(memory: number | null) {
  if (!memory) return "N/A";
  return memory < 1024 ? `${memory} KB` : `${(memory / 1024).toFixed(2)} MB`;
}

export function formatDifficulty(difficulty: string) {
  switch (difficulty) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
    default:
      return "NA";
  }
}

export function unescapeCode(code: string | undefined): string | void {
  if (code === undefined) return;
  else {
    return code
      .replace(/\\r\\n/g, "\n")
      .replace(/\\\//g, "/")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
}

export function escapeCode(code: string): string {
  return code
    .replace(/\\/g, "\\\\") // Replace \ with \\
    .replace(/"/g, '\\"') // Replace " with \"
    .replace(/'/g, "\\'") // Replace ' with \'
    .replace(/\n/g, "\\n") // Replace newline with \n
    .replace(/\r/g, "\\r") // Replace carriage return with \r
    .replace(/\t/g, "\\t") // Replace tab with \t
    .replace(/\//g, "\\/"); // Replace / with \/
}
