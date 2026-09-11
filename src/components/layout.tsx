import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, PenLine, Scale, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "خانه", icon: Home },
  { to: "/search", label: "جستجو", icon: Search },
  { to: "/azmoon", label: "آزمون", icon: Scale },
  { to: "/yaddasht", label: "یادداشت", icon: PenLine },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-forest text-forest-fg">
              <BookOpen className="size-4" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight">
                مکتب آیین
              </span>
              <span className="hidden text-[11px] text-muted sm:block">
                آیین دادرسی مدنی · ۱ تا ۵۲۹
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-10 items-center gap-1.5 rounded-md px-3 text-sm",
                    active
                      ? "bg-forest text-forest-fg"
                      : "text-ink-soft hover:bg-paper-2",
                  )}
                >
                  <item.icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-6 md:pb-12">{children}</div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                  active ? "text-forest" : "text-muted",
                )}
              >
                <item.icon className="size-5" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
