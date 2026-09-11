import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  PenLine,
  Scale,
  ScrollText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { QuizPanel } from "@/components/quiz-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getArticle, getChapter } from "@/lib/law";
import { useStudy } from "@/lib/store";
import { cn, faNum } from "@/lib/utils";

export const Route = createFileRoute("/m/$n")({ component: ArticlePage });

const importanceLabel = ["", "تکمیلی", "متوسط", "مهم", "حیاتی"] as const;

function ArticlePage() {
  const { n: nStr } = Route.useParams();
  const n = Number(nStr);
  const article = getArticle(n);
  const navigate = useNavigate();
  const markRead = useStudy((s) => s.markRead);
  const setLast = useStudy((s) => s.setLast);
  const toggleStar = useStudy((s) => s.toggleStar);
  const starred = useStudy((s) => s.starred.includes(n));
  const read = useStudy((s) => s.read.includes(n));
  const note = useStudy((s) => s.notes[n] ?? "");
  const setNote = useStudy((s) => s.setNote);
  const quizRec = useStudy((s) => s.quiz[n]);
  const [draft, setDraft] = useState(note);
  const [tab, setTab] = useState<"text" | "explain" | "example" | "note" | "quiz">(
    "text",
  );

  useEffect(() => {
    setDraft(note);
  }, [n, note]);

  useEffect(() => {
    if (!article) return;
    setLast(article.n);
  }, [article, setLast]);

  if (!article || !Number.isFinite(n) || n < 1 || n > 529) {
    return (
      <p className="text-muted">
        این ماده یافت نشد.{" "}
        <Link to="/" className="text-forest">
          بازگشت
        </Link>
      </p>
    );
  }

  const chapter = getChapter(article.chapterId);
  const prev = n > 1 ? n - 1 : null;
  const next = n < 529 ? n + 1 : null;

  return (
    <article className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-forest">
          خانه
        </Link>
        <span>/</span>
        {chapter ? (
          <Link
            to="/bab/$id"
            params={{ id: chapter.id }}
            className="hover:text-forest"
          >
            {chapter.title}
          </Link>
        ) : null}
      </div>

      <header className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>ماده {faNum(article.n)}</Badge>
          <Badge variant={article.importance === 4 ? "clay" : "muted"}>
            {importanceLabel[article.importance]}
          </Badge>
          {read ? (
            <Badge variant="moss">خوانده‌شده</Badge>
          ) : null}
          {quizRec ? (
            <Badge variant="sand">
              آزمون {faNum(quizRec.ok)}/{faNum(quizRec.total)}
            </Badge>
          ) : null}
        </div>
        <h1 className="mt-3 text-2xl font-semibold leading-snug">{article.title}</h1>
        <p className="mt-2 text-sm text-muted">{article.section}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant={starred ? "default" : "outline"} onClick={() => toggleStar(n)}>
            <Bookmark className="size-4" />
            {starred ? "نشان شد" : "نشان کردن"}
          </Button>
          <Button
            size="sm"
            variant={read ? "secondary" : "outline"}
            onClick={() => markRead(n)}
          >
            <CheckCircle2 className="size-4" />
            {read ? "خوانده شد" : "علامت خواندن"}
          </Button>
        </div>
      </header>

      <div className="sticky top-14 z-20 -mx-4 overflow-x-auto border-b border-line bg-paper/95 px-4 backdrop-blur-md md:top-14">
        <div className="flex min-w-max gap-1 py-2">
          {(
            [
              ["text", "متن", ScrollText],
              ["explain", "شرح", Lightbulb],
              ["example", "مثال", Scale],
              ["note", "یادداشت", PenLine],
              ["quiz", "آزمون", CheckCircle2],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm",
                tab === id
                  ? "bg-forest text-forest-fg"
                  : "text-ink-soft hover:bg-paper-2",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "text" ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-sm font-medium text-muted">متن رسمی ماده</h2>
          <p className="font-[family-name:var(--font-statute)] text-[1.05rem] leading-9 text-ink">
            {article.text}
          </p>
          {article.pillars.length ? (
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {article.pillars.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-7 text-ink-soft">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {tab === "explain" ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-sm font-medium text-muted">شرح آموزشی</h2>
          <div className="space-y-4 text-[0.95rem] leading-8">
            {article.explanation.split("\n\n").map((p) => (
              <p key={p.slice(0, 24)} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-sand/50 bg-sand/15 p-4 text-sm leading-7">
            <p className="mb-1 text-xs font-medium text-ink-soft">دام آزمونی</p>
            {article.trap}
          </div>
        </section>
      ) : null}

      {tab === "example" ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-sm font-medium text-muted">مثال کاربردی</h2>
          <p className="text-[0.95rem] leading-8">{article.example}</p>
        </section>
      ) : null}

      {tab === "note" ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 text-sm font-medium text-muted">یادداشت شخصی</h2>
          <p className="mb-3 text-sm text-muted">
            این جعبه فقط روی همین دستگاه ذخیره می‌شود. رأی وحدت رویه، نکته استاد
            یا سؤال خودتان را بنویسید.
          </p>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => setNote(n, draft)}
            placeholder="یادداشت این ماده…"
          />
          <div className="mt-3">
            <Button size="sm" onClick={() => setNote(n, draft)}>
              ذخیره یادداشت
            </Button>
          </div>
        </section>
      ) : null}

      {tab === "quiz" ? (
        <section>
          <h2 className="mb-3 text-sm font-medium text-muted">
            آزمون ماده {faNum(article.n)}
          </h2>
          <QuizPanel
            articleN={article.n}
            questions={article.quiz}
            onDone={() => markRead(article.n)}
          />
        </section>
      ) : null}

      {article.related.length ? (
        <section>
          <h2 className="mb-2 text-sm font-medium text-muted">مواد مرتبط</h2>
          <div className="flex flex-wrap gap-2">
            {article.related.map((r) => (
              <Link
                key={r}
                to="/m/$n"
                params={{ n: String(r) }}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs hover:border-forest"
              >
                ماده {faNum(r)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="flex items-center justify-between gap-3 pt-2">
        {prev ? (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate({ to: "/m/$n", params: { n: String(prev) } })}
          >
            <ChevronRight className="size-4" />
            ماده {faNum(prev)}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button
            className="flex-1"
            onClick={() => navigate({ to: "/m/$n", params: { n: String(next) } })}
          >
            ماده {faNum(next)}
            <ChevronLeft className="size-4" />
          </Button>
        ) : null}
      </nav>
    </article>
  );
}
