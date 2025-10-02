import { CodeRunResult, CodeSubmitResult, Submission } from "@/lib/types";

export async function runCode(code: string): Promise<CodeRunResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/submissions/run`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to run user code: ${response.statusText}`);
  }

  const submissions = (await response.json()) as CodeRunResult;

  return submissions;
}

export async function submitCode(
  code: string,
  problemID: string
): Promise<CodeSubmitResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/submissions/submit/${problemID}`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to submit user code: ${response.statusText}`);
  }

  const submissions = (await response.json()) as CodeSubmitResult;

  return submissions;
}

export async function getUserSubmissionsByProblemID(
  problemID: string
): Promise<{
  data: Submission[];
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/submissions/problem/${problemID}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get user submissions: ${response.statusText}`);
  }

  const submissions = await response.json();
  return submissions as { data: Submission[] };
}
