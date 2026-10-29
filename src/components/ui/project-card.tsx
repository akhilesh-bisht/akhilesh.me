"use client";

import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string | null;
  github?: string | null;
  twitter?: string | null;
  type: string;
  period: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  size?: "large" | "medium" | "small";
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "GitHub":
      return "Repo";
    case "NPM":
      return "Package";
    case "Bot":
      return "Bot";
    case "DeFi":
      return "DeFi";
    case "AI":
      return "AI";
    case "Full Stack":
      return "Full Stack";
    default:
      return type || "Project";
  }
};

export function ProjectCard({ project, size = "medium" }: ProjectCardProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl border border-border/70 bg-card/80 shadow-sm overflow-hidden",
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-accent/40 before:scale-y-0 before:origin-top before:transition-transform before:duration-300 hover:before:scale-y-100",
        "hover:bg-muted/50 hover:border-accent/40 hover:translate-x-1 transition-all duration-200",
        isLarge && "md:col-span-2 md:row-span-2",
        isSmall && "p-4",
      )}
    >
      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        />
      )}
      {/* Always-visible project name */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold group-hover:text-foreground transition-colors",
              isLarge ? "text-xl" : "text-lg",
            )}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-6 group-focus-within:opacity-100 group-focus-within:max-h-6">
            <span className="font-mono text-[10px] text-accent/80">
              {String(project.order + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">{project.period}</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {getTypeBadge(project.type)}
        </span>
      </div>

      <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
        <div className="overflow-hidden">
          <p className={cn("text-muted-foreground mt-4 mb-6 leading-relaxed", isLarge ? "text-base" : "text-sm", isSmall && "line-clamp-2")}>
            {project.description}
          </p>

      {/* Tech Stack & Links */}
      <div className="flex items-end justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, isSmall ? 2 : 3).map((technology) => (
            <span
              key={technology}
              className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="z-20 text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-4 h-4" />
            </Link>
          )}
          {project.twitter && (
            <Link
              href={project.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="z-20 text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>
          )}
          {project.link && (
            <FiExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
