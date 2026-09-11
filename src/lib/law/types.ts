export type QuizQ = {
  q: string;
  options: string[];
  a: number;
  why: string;
};

export type Clause = { n: number; t: string };

export type Article = {
  n: number;
  title: string;
  chapterId: string;
  section: string;
  text: string;
  notes: string[];
  clauses: Clause[];
  essence: string;
  explanation: string;
  example: string;
  trap: string;
  pillars: string[];
  related: number[];
  quiz: QuizQ[];
  importance: 1 | 2 | 3 | 4;
};

export type Chapter = {
  id: string;
  bab: number;
  title: string;
  from: number;
  to: number;
  count: number;
  theme: string;
  intro: string;
  study: string;
};
