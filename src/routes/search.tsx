import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchArticles } from "@/lib/law";
import { faNum } from "@/lib/utils";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchArticles(q), [q]);

  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">جستجو</h1>
        <p className="mt-1 text-sm text-muted">
          شماره ماده، عنوان، عبارت متن یا نکته شرح را بنویسید.
        </p>
      </header>
      <Input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="مثلاً ابلاغ واقعی، ماده ۸۴، امر مختوم…"
      />
      {q.trim().length >= 2 ? (
        <p className="text-xs text-muted">{faNum(hits.length)} نتیجه</p>
      ) : null}
      <ul className="space-y-2">
        {hits.map((a) => (
          <li key={a.n}>
            <Link
              to="/m/$n"
              params={{ n: String(a.n) }}
              className="block rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]"
            >
              <p className="text-xs text-muted">
                ماده {faNum(a.n)} · {a.section}
              </p>
              <h2 className="mt-0.5 font-medium">{a.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
                {a.text}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
