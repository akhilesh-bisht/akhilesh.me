"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GITHUB_USER = "akhilesh-bisht";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

const LEVEL_COLORS = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

export function GitHubActivityBlock() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
        );
        if (res.ok) {
          const data: ContributionsResponse = await res.json();
          setContributions(data.contributions || []);
          const total = data.total
            ? Object.values(data.total).reduce((a, b) => a + b, 0)
            : 0;
          setTotalContributions(total);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="text-lg font-semibold mb-2">GitHub Activity</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {GITHUB_USER}&apos;s coding journey over the past year
        </p>
        <div className="h-24 bg-muted/50 rounded-lg animate-pulse" />
      </section>
    );
  }

  if (contributions.length === 0) {
    return (
      <section className="mt-16">
        <h2 className="text-lg font-semibold mb-2">GitHub Activity</h2>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline"
        >
          View GitHub profile →
        </a>
      </section>
    );
  }

  const daysPerWeek = 7;
  const weekChunks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += daysPerWeek) {
    const week = contributions.slice(i, i + daysPerWeek);
    while (week.length < daysPerWeek) {
      week.push({ date: "", count: 0, level: 0 });
    }
    weekChunks.push(week);
  }

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold mb-2">GitHub Activity</h2>
      <p className="text-sm text-muted-foreground mb-2">
        {GITHUB_USER}&apos;s coding journey over the past year
      </p>
      <p className="text-sm font-medium mb-4">
        Total: <strong>{totalContributions.toLocaleString()}</strong>{" "}
        contributions
      </p>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {weekChunks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week?.map((c, index) => (
                <div
                  key={`${c.date}+ ${index}`}
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px]",
                    LEVEL_COLORS[c.level],
                  )}
                  title={
                    c.date ? `${c.date}: ${c.count} contributions` : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          {LEVEL_COLORS.map((cls, i) => (
            <div key={i} className={cn("w-2.5 h-2.5 rounded-[2px]", cls)} />
          ))}
        </div>
        <span>More</span>
      </div>
      <a
        href={`https://github.com/${GITHUB_USER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-accent hover:underline mt-4 inline-block"
      >
        View on GitHub →
      </a>
    </section>
  );
}
