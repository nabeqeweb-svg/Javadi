import { createFileRoute, Link } from "@tanstack/react-router";
import { getArticle } from "@/lib/law";
import { useStudy } from "@/lib/store";
import { faNum } from "@/lib/utils";

export const Route = createFileRoute("/yaddasht")({ component: NotesPage });

function NotesPage() {
  const notes = useStudy((s) => s.notes);
  const starred = useStudy((s) => s.starred);
  const entries = Object.entries(notes)
    .filter(([, t]) => t.trim())
    .map(([n, t]) => ({ n: Number(n), t, title: getArticle(Number(n))?.title ?? "" }))
    .sort((a, b) => a.n - b.n);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">یادداشت‌ها</h1>
        <p className="mt-1 text-sm text-muted">
          نوشته‌های شخصی شما کنار هر ماده، اینجا جمع می‌شود.
        </p>
      </header>

      {starred.length ? (
        <section>
          <h2 className="mb-2 text-sm font-medium text-muted">نشان‌شده‌ها</h2>
          <div className="flex flex-wrap gap-2">
            {starred.map((n) => (
              <Link
                key={n}
                to="/m/$n"
                params={{ n: String(n) }}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs"
              >
                ماده {faNum(n)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {entries.length === 0 ? (
        <p className="rounded-xl bg-surface p-5 text-sm leading-7 text-muted shadow-[var(--shadow-card)]">
          هنوز یادداشتی ندارید. داخل هر ماده، زبانه «یادداشت» را باز کنید و نکته
          خودتان را بنویسید.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li
              key={e.n}
              className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]"
            >
              <Link
                to="/m/$n"
                params={{ n: String(e.n) }}
                className="text-sm font-medium text-forest"
              >
                ماده {faNum(e.n)} · {e.title}
              </Link>
              <p className="mt-2 whitespace-pre-line text-sm leading-7">{e.t}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
