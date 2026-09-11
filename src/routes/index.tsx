import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookMarked,
  Bookmark,
  GraduationCap,
  Library,
  Scale,
} from "lucide-react";
import { articles, chapters, getArticle, vitalArticles } from "@/lib/law";
import { useStudy } from "@/lib/store";
import { faNum } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const read = useStudy((s) => s.read);
  const last = useStudy((s) => s.last);
  const starred = useStudy((s) => s.starred);
  const quiz = useStudy((s) => s.quiz);
  const lastArt = last ? getArticle(last) : undefined;
  const pct = Math.round((read.length / articles.length) * 100);
  const quizDone = Object.keys(quiz).length;

  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-xl bg-forest px-5 py-7 text-forest-fg sm:px-8">
        <p className="text-xs tracking-wide text-forest-fg/70">
          قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی · ۱۳۷۹
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          مکتب آیین
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-forest-fg/85 sm:text-base">
          هر ماده با متن رسمی، شرح آزمونی، مثال پرونده، جای یادداشت شخصی و سه
          پرسش. مسیر را از کلیات شروع کنید؛ بعد از خواندن این مجموعه، دیگر به
          جزوه پراکنده نیاز ندارید.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/m/$n"
            params={{ n: String(lastArt?.n ?? 1) }}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-paper px-4 text-sm font-medium text-forest"
          >
            {lastArt ? `ادامه از ماده ${faNum(lastArt.n)}` : "شروع از ماده ۱"}
            <ArrowLeft className="size-4" />
          </Link>
          <Link
            to="/azmoon"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-forest-fg/25 px-4 text-sm text-forest-fg"
          >
            <Scale className="size-4" />
            آزمون جامع
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="مواد خوانده‌شده"
          value={`${faNum(read.length)} / ${faNum(529)}`}
          extra={<Progress value={pct} className="mt-3" />}
        />
        <Stat label="آزمون ماده" value={faNum(quizDone)} hint="ماده با آزمون ثبت‌شده" />
        <Stat
          label="نشان‌شده"
          value={faNum(starred.length)}
          hint="برای مرور شب امتحان"
        />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Library className="size-4 text-forest" />
            باب‌ها و فصل‌ها
          </h2>
          <span className="text-xs text-muted">{faNum(chapters.length)} مبحث</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {chapters.map((ch) => {
            const done = read.filter((n) => n >= ch.from && n <= ch.to).length;
            return (
              <Link
                key={ch.id}
                to="/bab/$id"
                params={{ id: ch.id }}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">
                      مواد {faNum(ch.from)} تا {faNum(ch.to)}
                    </p>
                    <h3 className="mt-1 font-semibold">{ch.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{ch.theme}</p>
                  </div>
                  <Badge variant="muted">{faNum(ch.count)}</Badge>
                </div>
                <Progress
                  className="mt-4"
                  value={(done / ch.count) * 100}
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
          <GraduationCap className="size-4 text-forest" />
          مسیر آزمونی
        </h2>
        <p className="mb-3 text-sm leading-7 text-muted">
          این مواد بارها در آزمون وکالت، قضاوت و کارشناسی ارشد تکرار شده‌اند.
          اول این‌ها را با شرح و آزمون تمام کنید.
        </p>
        <div className="flex flex-wrap gap-2">
          {vitalArticles.slice(0, 36).map((a) => (
            <Link
              key={a.n}
              to="/m/$n"
              params={{ n: String(a.n) }}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft hover:border-forest hover:text-forest"
            >
              م {faNum(a.n)}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/tatbiq"
          className="flex items-start gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]"
        >
          <BookMarked className="mt-0.5 size-5 text-forest" />
          <div>
            <h3 className="font-semibold">جدول‌های تطبیقی</h3>
            <p className="mt-1 text-sm leading-6 text-muted">
              تجدیدنظر و فرجام، تأمین و دستور موقت، انواع ابلاغ و ادله اثبات.
            </p>
          </div>
        </Link>
        <Link
          to="/vajenameh"
          className="flex items-start gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]"
        >
          <Bookmark className="mt-0.5 size-5 text-forest" />
          <div>
            <h3 className="font-semibold">واژه‌نامه دادرسی</h3>
            <p className="mt-1 text-sm leading-6 text-muted">
              اصطلاحات پرکاربرد با ارجاع به مواد مادر.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  hint,
  extra,
}: {
  label: string;
  value: string;
  hint?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-semibold tabular-nums text-xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
      {extra}
    </div>
  );
}
