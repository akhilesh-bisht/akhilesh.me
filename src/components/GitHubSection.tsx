"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMapPin, FiUsers, FiGitBranch, FiStar } from "react-icons/fi";

const GITHUB_USER = "akhilesh-bisht";

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
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("Failed to fetch");
        const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()]);
        setUser(userData);
        setRepos(reposData);
      } catch {
        setError("Could not load GitHub profile");
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          GitHub
        </h2>
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-muted/50 rounded-lg" />
          <div className="h-16 bg-muted/50 rounded-lg" />
        </div>
      </section>
    );
  }

  if (error || !user) {
    return (
      <section className="mb-16">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaGithub className="w-4 h-4" />
          View GitHub Profile →
        </a>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        GitHub
      </h2>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold group-hover:text-accent transition-colors">
              @{user.login}
            </p>
            {user.bio && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {user.bio}
              </p>
            )}
            {user.location && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                <FiMapPin className="w-3 h-3 flex-shrink-0" />
                {user.location}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FiGitBranch className="w-4 h-4" />
              {user.public_repos} repos
            </span>
            <span className="flex items-center gap-1.5">
              <FiUsers className="w-4 h-4" />
              {user.followers} · {user.following}
            </span>
          </div>
        </div>

        {repos.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Recent activity</p>
            <div className="space-y-2">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-start justify-between gap-3 py-2 -mx-2 px-2 rounded-lg hover:bg-muted/40 transition-colors group/repo"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm group-hover/repo:text-accent transition-colors truncate">
                      {repo.name}
                    </p>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                    {repo.language && (
                      <span>{repo.language}</span>
                    )}
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
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-3 group-hover:text-accent transition-colors">
          View full profile →
        </p>
      </a>
    </section>
  );
}
