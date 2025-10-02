export type DifficultyEnumType = "Easy" | "Medium" | "Hard" | "NA";

export type ProblemType = {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyEnumType;
  starter_code: string;
  link: string;
  time_limit: number | null;
  memory_limit: number | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  rank: number;
  testcase: {
    input: string;
    output: string;
  }[];
  topic_problem: {
    topic: {
      id: string;
      name: string;
    };
  }[];
  list_problem: {
    list: {
      id: string;
      name: string;
    };
  }[];
};

export type TopicType = {
  id: string;
  name: string;
  list_id: string;
}[];

export type ListType = {
  id: string;
  name: string;
}[];

export interface Problem {
  id: string;
  name: string;
  slug: string;
  link?: string;
  problem_number?: number;
  difficulty: "Easy" | "Medium" | "Hard" | "NA";
  starter_code: Record<string, string>;
  solution_code?: Record<string, string>;
  time_limit: number;
  memory_limit: number;
  acceptance_rate?: number;
  total_submissions: number;
  successful_submissions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  topics: string[];
  lists: string[];
  testcases: Testcase[];
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

export interface CreateProblemFormdata {
  name: string;
  slug: string;
  description: string;
  link: string;
  problem_number: string;
  difficulty: string;
  starter_code: string;
  time_limit: string;
  memory_limit: string;
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
