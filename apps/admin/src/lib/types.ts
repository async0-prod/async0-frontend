export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "NA";

export type SessionUser = {
  id: string;
  email: string;
  image: string;
  name: string;
  role: string;
};

export interface Problem {
  id: string;
  name: string;
  description: string;
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
  ui: string;
  input: string;
  output: string;
}

export interface Topic {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
}

export interface Solution {
  title: string;
  hint: string;
  description: string;
  code: string;
  code_explanation: string;
  notes: string;
  time_complexity: string;
  space_complexity: string;
  difficulty_level: string;
  display_order: number;
  author: string;
  is_active: boolean;
}

export interface ProblemFormdata {
  name: string;
  slug: string;
  description: string;
  link: string;
  problem_number: number;
  difficulty: string;
  starter_code: string;
  time_limit: number;
  memory_limit: number;
  is_active: boolean;
  selectedTopics: string[];
  selectedLists: string[];
  testcases: Testcase[];
  solutions: Solution[];
}

export interface ProblemBody {
  name: string;
  slug: string;
  link: string;
  problem_number: number | undefined;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "NA";
  starter_code: string;
  time_limit: number;
  memory_limit: number;
  is_active: boolean;
  topics: string[];
  lists: string[];
  testcases: Testcase[];
  solutions: Solution[];
}
