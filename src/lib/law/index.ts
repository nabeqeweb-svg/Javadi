import articlesJson from "./articles.json";
import chaptersJson from "./chapters.json";
import type { Article, Chapter } from "./types";

export type { Article, Chapter, QuizQ } from "./types";

export const articles = articlesJson as Article[];
export const chapters = chaptersJson as Chapter[];

const byN = new Map<number, Article>(articles.map((a) => [a.n, a]));
const byChapter = new Map<string, Article[]>();
for (const a of articles) {
  const list = byChapter.get(a.chapterId) ?? [];
  list.push(a);
  byChapter.set(a.chapterId, list);
}

export function getArticle(n: number): Article | undefined {
  return byN.get(n);
}

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function articlesOf(chapterId: string): Article[] {
  return byChapter.get(chapterId) ?? [];
}

export function searchArticles(q: string): Article[] {
  const needle = q.trim().replace(/\s+/g, " ");
  if (needle.length < 2) return [];
  const hits: { a: Article; s: number }[] = [];
  for (const a of articles) {
    let s = 0;
    if (a.title.includes(needle)) s += 8;
    if (String(a.n) === needle || faHas(needle, a.n)) s += 12;
    if (a.text.includes(needle)) s += 4;
    if (a.explanation.includes(needle)) s += 2;
    if (a.trap.includes(needle)) s += 1;
    if (s) hits.push({ a, s });
  }
  hits.sort((x, y) => y.s - x.s || x.a.n - y.a.n);
  return hits.slice(0, 60).map((h) => h.a);
}

function faHas(q: string, n: number): boolean {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const f = String(n).replace(/\d/g, (d) => fa[Number(d)] ?? d);
  return q === f || q === `ماده ${n}` || q === `ماده ${f}`;
}

export const vitalArticles = articles.filter((a) => a.importance === 4);
