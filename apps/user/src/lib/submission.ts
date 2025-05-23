import { cache } from "react";
import axios from "axios";
import { judge0ResponseType, testcaseType } from "./types";
import { postUserSubmission } from "@/app/actions/submissions";

export const submissionRun = cache(async (userCode: string) => {
  const source = axios.CancelToken.source();
  const timeId = setTimeout(() => {
    source.cancel();
  }, 10000);

  const code = {
    language_id: 63,
    source_code: userCode.trim(),
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_JUDGE0_URL}/submissions/?base64_encoded=false&wait=false`,
      JSON.stringify(code),
      {
        headers: { "Content-Type": "application/json" },
        cancelToken: source.token,
      }
    );

    clearTimeout(timeId);
    return await checkPromiseStatus(response.data.token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      return Promise.resolve({
        stdout: null,
        time: null,
        memory: null,
        stderr: "Server is down at the moment. Please try again in some time.",
        token: null,
        compile_output: null,
        message: null,
        status: { id: 69, description: null },
        output: null,
      });
    }

    clearTimeout(timeId);

    if (axios.isCancel(error)) {
      return Promise.resolve({
        stdout: null,
        time: null,
        memory: null,
        stderr: "Server took too long to respond.",
        token: null,
        compile_output: null,
        message: null,
        status: { id: 69, description: null },
        output: null,
      });
    }

    return Promise.resolve({
      stdout: null,
      time: null,
      memory: null,
      stderr: "Something went wrong!",
      token: null,
      compile_output: null,
      message: null,
      status: { id: 69, description: null },
      output: null,
    });
  }
});

export const submissionSubmit = cache(
  async (userCode: string, testcases: testcaseType[], problemId: string) => {
    const source = axios.CancelToken.source();
    const timeId = setTimeout(() => {
      source.cancel();
    }, 10000);

    const submissions = buildTestcaseSubmissions(userCode, testcases);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JUDGE0_URL}/submissions/batch?base64_encoded=false&wait=false`,
        { submissions },
        {
          headers: { "Content-Type": "application/json" },
          cancelToken: source.token,
        }
      );

      clearTimeout(timeId);

      const tokens: { token: string }[] = response.data;

      const responses = await Promise.allSettled(
        tokens.map((t) => checkPromiseStatus(t.token))
      );

      const filteredResponse = responses
        .filter(
          (result): result is PromiseFulfilledResult<judge0ResponseType> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value);

      const totalTestcases = filteredResponse.length;
      const passedTestcases = filteredResponse.filter(
        (res) => res.status.id === 3
      ).length;
      let status = "";
      if (totalTestcases === passedTestcases) {
        status = "Accepted";
      } else if (filteredResponse[passedTestcases].status.id === 5) {
        status = "TimeLimit";
      } else {
        status = "Rejected";
      }

      postUserSubmission(
        status,
        problemId,
        passedTestcases,
        totalTestcases,
        userCode
      );

      return filteredResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      clearTimeout(timeId);

      const errMsg = axios.isCancel(error)
        ? "Server took too long to respond."
        : error.code === "ECONNREFUSED"
          ? "Server is down at the moment. Please try again in some time."
          : "Something went wrong!";

      return Promise.resolve([
        {
          stdout: null,
          time: null,
          memory: null,
          stderr: errMsg,
          token: null,
          compile_output: null,
          message: null,
          status: { id: 69, description: null },
          output: null,
        },
      ]);
    }
  }
);

export async function checkPromiseStatus(
  token: string
): Promise<judge0ResponseType> {
  return new Promise((resolve) => {
    async function checkStatus() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_JUDGE0_URL}/submissions/${token}?base64_encoded=false`
      );

      if (
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(
          response.data.status.id
        )
      ) {
        clearInterval(intervalId);
        resolve(response.data);
      }
    }

    const intervalId = setInterval(checkStatus, 200);
  });
}

export async function checkSubmitPromiseStatus(
  token: string[]
): Promise<judge0ResponseType> {
  return new Promise((resolve) => {
    async function checkStatus() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_JUDGE0_URL}/submissions/${token}?base64_encoded=false`
      );

      if (
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(
          response.data.status.id
        )
      ) {
        clearInterval(intervalId);
        resolve(response.data);
      }
    }

    const intervalId = setInterval(checkStatus, 200);
  });
}

function buildTestcaseSubmissions(userCode: string, testcases: testcaseType[]) {
  return testcases.map((tc) => {
    const source_code = `
${userCode.trim()}
try {
  const result = ${tc.input};
  console.log(result);
} catch (e) {
  console.error(e.message);
}
`.trim();

    return {
      language_id: 63,
      source_code,
      expected_output: tc.output,
    };
  });
}
