import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { Article, QuizQ } from "@/lib/law/types";
import { useStudy } from "@/lib/store";
import { faNum } from "@/lib/utils";
import { QuizPanel } from "./quiz-panel";

export type ExamItem = QuizQ & { n: number; title: string };

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

export function buildExam(pool: Article[], count: number, seed: number): ExamItem[] {
  const items: ExamItem[] = [];
  for (const a of shuffle(pool, seed)) {
    const q = a.quiz[seed % a.quiz.length] ?? a.quiz[0];
    if (!q) continue;
    items.push({ ...q, n: a.n, title: a.title });
    if (items.length >= count) break;
  }
  return items;
}

export function ExamRunner({
  kind,
  title,
  items,
}: {
  kind: string;
  title: string;
  items: ExamItem[];
}) {
  const recordExam = useStudy((s) => s.recordExam);
  const [score, setScore] = useState<{ ok: number; total: number } | null>(null);

  const questions = useMemo(
    () =>
      items.map((it) => ({
        q: `ماده ${faNum(it.n)} — ${it.q}`,
        options: it.options,
        a: it.a,
        why: `${it.why} (ماده ${faNum(it.n)}: ${it.title})`,
      })),
    [items],
  );

  return (
    <main className="space-y-5">
      <header>
        <p className="text-xs text-muted">
          <Link to="/azmoon" className="hover:text-forest">
            آزمون‌ها
          </Link>
        </p>
        <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted">
          {faNum(items.length)} پرسش · پس از پاسخ، شرح هر سؤال را بخوانید و به
          ماده برگردید.
        </p>
      </header>
      <QuizPanel
        questions={questions}
        onDone={(ok, total) => {
          setScore({ ok, total });
          recordExam({ at: Date.now(), kind, ok, total });
        }}
      />
      {score ? (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/azmoon"
            className="inline-flex h-11 items-center rounded-md bg-forest px-4 text-sm font-medium text-forest-fg"
          >
            بازگشت به آزمون‌ها
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm"
          >
            خانه
          </Link>
        </div>
      ) : null}
    </main>
  );
}
