import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExamRunner, buildExam } from "@/components/exam-runner";
import { vitalArticles } from "@/lib/law";

export const Route = createFileRoute("/azmoon/jame")({ component: Jame });

function Jame() {
  const items = useMemo(() => {
    const seed = Math.floor(Date.now() / 60000);
    return buildExam(vitalArticles, 20, seed);
  }, []);
  return (
    <ExamRunner kind="آزمون جامع" title="آزمون جامع آیین دادرسی مدنی" items={items} />
  );
}
