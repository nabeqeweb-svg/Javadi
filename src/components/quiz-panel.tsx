import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { QuizQ } from "@/lib/law/types";
import { useStudy } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function QuizPanel({
  articleN,
  questions,
  onDone,
}: {
  articleN?: number;
  questions: QuizQ[];
  onDone?: (ok: number, total: number) => void;
}) {
  const recordQuiz = useStudy((s) => s.recordQuiz);
  const [picked, setPicked] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [revealed, setRevealed] = useState(false);

  const ok = useMemo(() => {
    return questions.reduce(
      (n, q, i) => n + (picked[i] === q.a ? 1 : 0),
      0,
    );
  }, [picked, questions]);

  function finish() {
    setRevealed(true);
    if (articleN != null) recordQuiz(articleN, ok, questions.length);
    onDone?.(ok, questions.length);
  }

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const choice = picked[qi];
        return (
          <div
            key={qi}
            className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]"
          >
            <p className="mb-3 text-sm font-medium leading-7">
              <span className="ml-2 text-muted">{qi + 1}.</span>
              {q.q}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const selected = choice === oi;
                const correct = revealed && oi === q.a;
                const wrong = revealed && selected && oi !== q.a;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={revealed}
                    onClick={() =>
                      setPicked((p) => {
                        const n = [...p];
                        n[qi] = oi;
                        return n;
                      })
                    }
                    className={cn(
                      "flex min-h-11 items-start gap-2 rounded-lg border px-3 py-2.5 text-right text-sm leading-6",
                      selected && !revealed && "border-forest bg-forest/8",
                      !selected && !revealed && "border-line bg-paper hover:bg-paper-2",
                      correct && "border-moss bg-moss/10",
                      wrong && "border-clay bg-clay/10",
                      revealed && !correct && !wrong && "border-line opacity-60",
                    )}
                  >
                    <span className="mt-0.5 shrink-0">
                      {correct ? (
                        <Check className="size-4 text-moss" />
                      ) : wrong ? (
                        <X className="size-4 text-clay" />
                      ) : (
                        <span className="block size-4 rounded-full border border-line-strong" />
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {revealed ? (
              <p className="mt-3 border-t border-line pt-3 text-sm leading-7 text-ink-soft">
                {q.why}
              </p>
            ) : null}
          </div>
        );
      })}
      {!revealed ? (
        <Button
          className="w-full"
          onClick={finish}
          disabled={picked.some((p) => p == null)}
        >
          دیدن نتیجه
        </Button>
      ) : (
        <div className="rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm">
          نتیجه این آزمون: {ok} از {questions.length} پاسخ درست
        </div>
      )}
    </div>
  );
}
