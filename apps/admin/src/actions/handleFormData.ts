"use server";

import { escapeCode } from "@/lib/codeFormat";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProblem, updateProblem } from "./problems";

export async function addOneProblem(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const testcases: { input: string; output: string }[] = [];
  const solutions: { code: string; rank: string }[] = [];

  for (const key in data) {
    if (key.startsWith("input")) {
      const id = Number(key.split("-")[1]);
      testcases.push({
        input: escapeCode(String(data[key])).trim(),
        output: escapeCode(String(data[`output-${id}`])).trim(),
      });
      delete data[key];
    }
    if (key.startsWith("output")) {
      delete data[key];
    }
    if (key.startsWith("$ACTION")) {
      delete data[key];
    }
    if (key.startsWith("solution")) {
      const rank = key.split("-")[1];
      solutions.push({
        code: String(data[key]),
        rank: rank,
      });
      delete data[key];
    }
  }
  const name = data.name as string;
  const link = data.link as string;
  const difficulty = data.difficulty as string;
  const listId = data.list as string;
  const topicId = data.topic as string;
  const starterCode = escapeCode(data.placeholderCode as string);

  const reqBody = {
    name,
    link,
    difficulty,
    listId,
    topicId,
    starterCode,
    // solutions,
    testcases,
  };

  await addProblem(reqBody);

  revalidatePath("/");
  revalidatePath("/problems");
  redirect("/problems");
}

export async function updateOneProblem(
  problemId: string,
  prevState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const testcases: { input: string; output: string }[] = [];
  const solutions: { code: string; rank: string }[] = [];

  for (const key in data) {
    if (key.startsWith("input")) {
      const id = Number(key.split("-")[1]);
      testcases.push({
        input: escapeCode(String(data[key])).trim(),
        output: escapeCode(String(data[`output-${id}`])).trim(),
      });
      delete data[key];
    }
    if (key.startsWith("output")) {
      delete data[key];
    }
    if (key.startsWith("$ACTION")) {
      delete data[key];
    }
    if (key.startsWith("solution")) {
      const rank = key.split("-")[1];
      solutions.push({
        code: String(data[key]),
        rank: rank,
      });
      delete data[key];
    }
  }

  const name = data.name as string;
  const link = data.link as string;
  const difficulty = data.difficulty as string;
  const listId = data.list as string;
  const topicId = data.topic as string;
  const starterCode = escapeCode(data.placeholderCode as string);

  const reqBody = {
    name,
    link,
    difficulty,
    listId,
    topicId,
    starterCode,
    // solutions,
    testcases,
  };

  await updateProblem(problemId, reqBody);

  revalidatePath("/");
  revalidatePath("/problems");
  redirect("/problems");
}
