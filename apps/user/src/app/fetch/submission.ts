export async function runCode(code: string, problemID: string) {
  console.log(JSON.stringify({ code }));

  const response = await fetch(
    `http://localhost:8080/api/v1/submissions/run/${problemID}`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to run user code: ${response.statusText}`);
  }

  const submissions = (await response.json()) as { data: string };

  return submissions;
}

export async function submitCode(code: string, problemID: string) {
  const response = await fetch(
    `http://localhost:8080/api/v1/submissions/submit/${problemID}`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to submit user code: ${response.statusText}`);
  }

  const submissions = (await response.json()) as { data: string };

  return submissions;
}
