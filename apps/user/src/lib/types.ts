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

export type userProblemSolvedStatType = {
  total_problems_solved: number;
  percentage_change: number | null;
};

export type userProblemStreakStatType = {
  current_streak: number;
};

export interface List {
  id: string;
  name: string;
  slug: string;
  total_problems: string;
}

export interface Problem {
  id: string;
  name: string;
  slug: string;
  link?: string;
  problem_number?: number;
  difficulty: "Easy" | "Medium" | "Hard" | "NA";
  starter_code: string;
  time_limit: number;
  memory_limit: number;
  acceptance_rate?: number;
  total_submissions: number;
  successful_submissions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testcase {
  id: string;
  problem_id: string;
  ui: string;
  input: string;
  output: string;
  position: number;
  is_active: boolean;
  created_at: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type SidebarTopicList = {
  name: string;
  problems: Partial<Problem>[];
}[];
