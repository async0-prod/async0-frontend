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
      name: string;
    };
  }[];
  list_problem: {
    list: {
      name: string;
    };
  }[];
}[];
