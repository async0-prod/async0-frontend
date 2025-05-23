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
