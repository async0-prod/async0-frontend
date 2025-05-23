export type judge0ResponseType = {
  stdout: string | null;
  time: string | null;
  memory: number | null;
  stderr: string | null;
  token: string | null;
  compile_output: string | null;
  message: string | null;
  status: { id: number; description: string | null };
  output?: string | null;
};

export type testcaseType = {
  id: string;
  input: string;
  output: string;
};

export type solutionType = {
  id: string;
  code: string;
  rank: number;
};

export type submissionType = {
  id: string;
  status: string;
  passed_testcases: number;
  total_testcases: number;
};

export type problemType = {
  id: string;
  name: string;
  difficulty: string;
  link: string | null;
  starter_code: string;
  testcases: testcaseType[];
};

export type userProblemTableDataType = {
  id: string;
  name: string;
  topics: string[];
  lists: string[];
  totalUsersSolved: number;
  difficulty: "Easy" | "Medium" | "Hard" | "NA";
  totalBookmarks: number;
  hasSolved: boolean;
};

export type SidebarDataType = {
  name: string;
  topic: {
    name: string;
    topic_problem: {
      problem: {
        name: string;
        difficulty: string;
        time_limit: number | null;
        memory_limit: number | null;
      };
    }[];
  }[];
}[];

export type userSubmissionType = {
  id: string;
  status: "Rejected" | "Accepted" | "Pending" | "TimeLimit";
  user_id: string;
  problem_id: string;
  user_solution_id: string;
  passed_testcases: number;
  total_testcases: number;
  created_at: string;
  updated_at: string;
  code: string;
  has_solved: boolean;
}[];
