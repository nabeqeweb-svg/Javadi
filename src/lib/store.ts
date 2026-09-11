import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ExamRecord = {
  at: number;
  kind: string;
  ok: number;
  total: number;
};

type StudyState = {
  notes: Record<number, string>;
  read: number[];
  starred: number[];
  last: number | null;
  quiz: Record<number, { ok: number; total: number }>;
  exams: ExamRecord[];
  setNote: (n: number, text: string) => void;
  markRead: (n: number) => void;
  toggleStar: (n: number) => void;
  setLast: (n: number) => void;
  recordQuiz: (n: number, ok: number, total: number) => void;
  recordExam: (rec: ExamRecord) => void;
};

export const useStudy = create<StudyState>()(
  persist(
    (set, get) => ({
      notes: {},
      read: [],
      starred: [],
      last: null,
      quiz: {},
      exams: [],
      setNote: (n, text) =>
        set({ notes: { ...get().notes, [n]: text } }),
      markRead: (n) => {
        const read = get().read;
        if (read.includes(n)) return;
        set({ read: [...read, n] });
      },
      toggleStar: (n) => {
        const starred = get().starred;
        set({
          starred: starred.includes(n)
            ? starred.filter((x) => x !== n)
            : [...starred, n],
        });
      },
      setLast: (n) => set({ last: n }),
      recordQuiz: (n, ok, total) =>
        set({ quiz: { ...get().quiz, [n]: { ok, total } } }),
      recordExam: (rec) =>
        set({ exams: [rec, ...get().exams].slice(0, 30) }),
    }),
    { name: "maktab-aiin-v1" },
  ),
);
