import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExamRunner, buildExam } from "@/components/exam-runner";
import { articlesOf, getChapter } from "@/lib/law";

export const Route = createFileRoute("/azmoon/bab/$id")({
  component: ChapterExam,
});

function ChapterExam() {
  const { id } = Route.useParams();
  const ch = getChapter(id);
  const items = useMemo(() => {
    if (!ch) return [];
    const pool = articlesOf(ch.id);
    return buildExam(pool, Math.min(10, pool.length), ch.from * 13 + 7);
  }, [ch]);

  if (!ch) {
    return (
      <p className="text-muted">
        مبحث یافت نشد.{" "}
        <Link to="/azmoon" className="text-forest">
          آزمون‌ها
        </Link>
      </p>
    );
  }

  return (
    <ExamRunner
      kind={`آزمون ${ch.title}`}
      title={`آزمون مبحث ${ch.title}`}
      items={items}
    />
  );
}
