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
