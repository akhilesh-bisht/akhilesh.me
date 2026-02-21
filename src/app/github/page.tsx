"use client";

import { useEffect, useState } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import { FaGithub } from "react-icons/fa";
import { FiMapPin, FiUsers, FiGitBranch, FiStar } from "react-icons/fi";
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

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

const LEVEL_COLORS = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

export default function GitHubPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=all`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
        ]);

        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setUser(userData);

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
        }

        if (contribRes.ok) {
          const contribData: ContributionsResponse = await contribRes.json();
          setContributions(contribData.contributions || []);
        }
      } catch {
        setError("Could not load GitHub data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const languages = Array.from(
    new Map(
      repos
        .filter((r) => r.language)
        .map((r) => [r.language, (repos.filter((x) => x.language === r.language).length) as number])
    ).entries()
  ).sort((a, b) => b[1] - a[1]);

  const joinedProjects = repos.filter((r) => r.fork);

  if (loading) {
    return (
      <PageTransition>
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted/50 rounded-lg" />
            <div className="h-48 bg-muted/50 rounded-lg" />
            <div className="h-64 bg-muted/50 rounded-lg" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !user) {
    return (
      <PageTransition>
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <FaGithub className="w-5 h-5" />
            Open GitHub Profile
          </a>
        </div>
      </PageTransition>
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
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">GitHub</h1>
          <p className="text-muted-foreground">Activity, languages, and projects</p>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/40 transition-colors mb-12 group"
        >
          <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold group-hover:text-accent transition-colors">@{user.login}</p>
            {user.bio && <p className="text-sm text-muted-foreground mt-0.5">{user.bio}</p>}
            {user.location && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                <FiMapPin className="w-3 h-3" />
                {user.location}
              </p>
            )}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <FiGitBranch className="w-4 h-4" />
              {user.public_repos}
            </span>
            <span className="flex items-center gap-1.5">
              <FiUsers className="w-4 h-4" />
              {user.followers} · {user.following}
            </span>
          </div>
        </a>

        {/* Contribution graph */}
        {contributions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Contribution activity
            </h2>
            <div className="overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {weekChunks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((c) => (
                        <div
                          key={c.date}
                          className={cn(
                            "w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] transition-colors",
                            LEVEL_COLORS[c.level]
                          )}
                          title={`${c.date}: ${c.count} contributions`}
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
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languages.slice(0, 12).map(([lang, count]) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 text-sm rounded-lg bg-muted/60 text-muted-foreground"
                >
                  {lang} <span className="text-muted-foreground/70">({count})</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Joined / contributed projects (forks) */}
        {joinedProjects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Contributed / joined projects
            </h2>
            <div className="space-y-2">
              {joinedProjects.slice(0, 10).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 py-3 px-3 rounded-lg hover:bg-muted/40 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate group-hover:text-accent transition-colors">
                      {repo.full_name}
                    </p>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-0.5">
                        <FiStar className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Reach out — let&apos;s build something together.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:akhileshbisht2020@gmail.com"
              className="text-sm font-medium text-accent hover:underline"
            >
              akhileshbisht2020@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/akhilesh-bisht-a76981291"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-accent hover:underline"
        >
          <FaGithub className="w-4 h-4" />
          View full profile on GitHub →
        </a>
      </div>
    </PageTransition>
  );
}
