import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesOf, getChapter } from "@/lib/law";
import { useStudy } from "@/lib/store";
import { faNum } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/bab/$id")({ component: ChapterPage });

function ChapterPage() {
  const { id } = Route.useParams();
  const ch = getChapter(id);
  const read = useStudy((s) => s.read);
  const quiz = useStudy((s) => s.quiz);

  if (!ch) {
    return (
      <p className="text-muted">
        این مبحث یافت نشد.{" "}
        <Link to="/" className="text-forest">
          خانه
        </Link>
      </p>
    );
  }

  const list = articlesOf(ch.id);
  const done = list.filter((a) => read.includes(a.n)).length;

  return (
    <main className="space-y-5">
      <p className="text-xs text-muted">
        <Link to="/" className="hover:text-forest">
          خانه
        </Link>
        <span className="mx-1">/</span>
        {ch.title}
      </p>
      <header className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs text-muted">
          مواد {faNum(ch.from)} تا {faNum(ch.to)}
        </p>
        <h1 className="mt-1 text-2xl font-semibold">{ch.title}</h1>
        <p className="mt-2 text-sm text-ink-soft">{ch.theme}</p>
        <p className="mt-3 text-sm leading-8">{ch.intro}</p>
        <div className="mt-4 rounded-lg bg-paper-2 p-3 text-sm leading-7 text-ink-soft">
          <span className="font-medium text-ink">روش مطالعه: </span>
          {ch.study}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span>
            {faNum(done)} از {faNum(ch.count)} خوانده شده
          </span>
          <Link
            to="/azmoon/bab/$id"
            params={{ id: ch.id }}
            className="text-forest"
          >
            آزمون این مبحث
          </Link>
        </div>
        <Progress className="mt-2" value={(done / ch.count) * 100} />
      </header>

      <ol className="space-y-2">
        {list.map((a) => {
          const isRead = read.includes(a.n);
          const q = quiz[a.n];
          return (
            <li key={a.n}>
              <Link
                to="/m/$n"
                params={{ n: String(a.n) }}
                className="flex items-start justify-between gap-3 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]"
              >
                <div>
                  <p className="text-xs text-muted">ماده {faNum(a.n)}</p>
                  <h2 className="mt-0.5 font-medium leading-7">{a.title}</h2>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {a.importance === 4 ? (
                    <Badge variant="clay">حیاتی</Badge>
                  ) : a.importance === 3 ? (
                    <Badge variant="default">مهم</Badge>
                  ) : null}
                  {isRead ? <Badge variant="moss">خوانده</Badge> : null}
                  {q ? (
                    <Badge variant="sand">
                      {faNum(q.ok)}/{faNum(q.total)}
                    </Badge>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
