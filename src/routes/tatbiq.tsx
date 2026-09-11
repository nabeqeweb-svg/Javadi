import { createFileRoute } from "@tanstack/react-router";
import { comparisons } from "@/lib/law/glossary";

export const Route = createFileRoute("/tatbiq")({ component: ComparePage });

function ComparePage() {
  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">جدول‌های تطبیقی</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          آیین دادرسی را با تفکیک نهادهای شبیه به هم می‌شود فهمید. این چهار
          جدول را قبل از آزمون حفظ کنید.
        </p>
      </header>
      {comparisons.map((c) => (
        <section key={c.id} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm leading-7 text-muted">{c.lead}</p>
          </div>
          <div className="overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[32rem] text-right text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-muted">
                  {c.headers.map((h) => (
                    <th key={h} className="px-3 py-2.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.join("-")} className="border-b border-line last:border-0">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className="px-3 py-2.5 leading-6 first:font-medium"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </main>
  );
}
