import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters } from "@/lib/law";
import { useStudy } from "@/lib/store";
import { faNum } from "@/lib/utils";

export const Route = createFileRoute("/azmoon")({ component: ExamHub });

function ExamHub() {
  const exams = useStudy((s) => s.exams);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">آزمون</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          پرسش‌ها از خود مواد ساخته شده‌اند. اول آزمون مبحث، بعد آزمون جامع بیست
          سؤالی. بعد از هر آزمون، دام و ماده را مرور کنید.
        </p>
      </header>

      <Link
        to="/azmoon/jame"
        className="block rounded-xl bg-forest p-5 text-forest-fg"
      >
        <p className="text-xs text-forest-fg/70">بیست پرسش از مواد حیاتی</p>
        <h2 className="mt-1 text-xl font-semibold">آزمون جامع</h2>
        <p className="mt-2 text-sm text-forest-fg/85">
          شبیه‌سازی مرور شب امتحان وکالت و قضاوت.
        </p>
      </Link>

      <section>
        <h2 className="mb-3 text-sm font-medium text-muted">آزمون هر مبحث</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {chapters.map((ch) => (
            <Link
              key={ch.id}
              to="/azmoon/bab/$id"
              params={{ id: ch.id }}
              className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]"
            >
              <p className="text-xs text-muted">
                مواد {faNum(ch.from)}–{faNum(ch.to)}
              </p>
              <p className="font-medium">{ch.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {exams.length ? (
        <section>
          <h2 className="mb-2 text-sm font-medium text-muted">کارنامه اخیر</h2>
          <ul className="space-y-2">
            {exams.slice(0, 8).map((e) => (
              <li
                key={e.at}
                className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm shadow-[var(--shadow-card)]"
              >
                <span>{e.kind}</span>
                <span className="tabular-nums text-muted">
                  {faNum(e.ok)} از {faNum(e.total)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
