import HasDuplicate from "@/components/problems/HasDuplicate";
import { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const problemNameMapping: Record<string, ComponentType<any>> = {
  "Contains Duplicate": HasDuplicate,
};
