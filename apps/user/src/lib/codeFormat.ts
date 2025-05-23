import { testcaseType } from "./types";

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

export function buildJudge0Source(
  userFunction: string,
  testcases: testcaseType[]
) {
  return `
${userFunction}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const testcases = ${JSON.stringify(testcases)};

for (const tc of testcases) {
  try {
    const actual = hasDuplicate(...tc.input);
    const expected = tc.output;
    const pass = deepEqual(actual, expected);
    console.log(JSON.stringify({ id: tc.id, input: tc.input, expected, actual, pass }));
  } catch (e) {
    console.log(JSON.stringify({ id: tc.id, input: tc.input, error: e.message, pass: false }));
  }
}
`.trim();
}
