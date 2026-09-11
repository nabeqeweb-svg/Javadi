import { createFileRoute, Link } from "@tanstack/react-router";
import { glossary } from "@/lib/law/glossary";
import { faNum } from "@/lib/utils";

export const Route = createFileRoute("/vajenameh")({ component: GlossaryPage });

function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "fa"));
  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">واژه‌نامه دادرسی</h1>
        <p className="mt-1 text-sm leading-7 text-muted">
          اصطلاحات کلیدی را با تعریف کوتاه و مواد مادر بخوانید. هر واژه را به
          متن ماده پیوند داده‌ایم.
        </p>
      </header>
      <ul className="space-y-3">
        {sorted.map((t) => (
          <li
            key={t.id}
            className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]"
          >
            <h2 className="font-semibold">{t.term}</h2>
            <p className="mt-2 text-sm leading-7">{t.def}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.see.map((n) => (
                <Link
                  key={n}
                  to="/m/$n"
                  params={{ n: String(n) }}
                  className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-soft hover:border-forest"
                >
                  ماده {faNum(n)}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
