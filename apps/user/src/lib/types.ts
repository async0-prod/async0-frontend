export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "NA";

export type SessionUser = {
  id: string;
  email: string;
  image: string;
  name: string;
  role: string;
};

export interface List {
  id: string;
  name: string;
  slug: string;
  total_problems: string;
}

export interface TanstackProblem {
  id: string;
  name: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "NA";
  has_solved?: boolean;
  list_names: string[];
  topic_names: string[];
}

export interface Problem {
  id: string;
  name: string;
  slug: string;
  link?: string;
  description: string;
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

export type SidebarTopicList = {
  name: string;
  problems: Partial<Problem>[];
}[];

export type WebsocketMessage = {
  kind: "message";
  data: any;
};

export type WebsocketResponse = {
  kind: "response";
  success: boolean;
  message: string;
  data: any;
};

export type CodeRunResult = {
  data: {
    status_id: number;
    status_description: string;
    result?: string;
    error_message?: string;
  };
};

export type CodeSubmitResult = {
  data: {
    overall_status_id: number;
    overall_status: string;
    passed_testcases: number;
    total_testcases: number;
    testcases_results: TestcaseResult[];
  } | null;
};

export type TestcaseResult = {
  tc_pass: boolean;
  tc_status_id: number;
  tc_status: string;
  tc_time: number;
  tc_memory: number;
  tc_output: string;
  tc_expected_output: string;
};

export interface CardAnalytics {
  name: string;
  total_questions: number;
  total_solved: number;
  total_solutions: number;
  total_user_attempts: number;

  total_easy_q: number;
  total_medium_q: number;
  total_hard_q: number;

  total_easy_solved: number;
  total_medium_solved: number;
  total_hard_solved: number;
}

export enum SubmissionStatus {
  AC = "Accepted",
  WA = "Wrong Answer",
  TLE = "Time Limit Exceeded",
  MLE = "Memory Limit Exceeded",
  RE = "Runtime Error",
  CE = "Compilation Error",
  PE = "Presentation Error",
  PENDING = "Pending",
  RUNNING = "Running",
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  status: keyof typeof SubmissionStatus;
  runtime?: number;
  memory_used?: number;
  total_testcases?: number;
  passed_testcases?: number;
  failed_testcases?: number;
  created_at: string;
}
