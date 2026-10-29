import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects | Akhilesh Bisht",
  description: "Things I've built and shipped",
  openGraph: {
    title: "Projects | Akhilesh Bisht",
    description: "Things I've built and shipped",
    url: "https://akhileshj22.me/projects",
  },
};

export default function Projects() {
  const publishedProjects = projects
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order);

  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="max-w-xl mb-8 md:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-2">
            Build log / 2025—26
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Small ideas,
            <br className="hidden sm:block" /> big builds.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Things I&apos;ve built — from AI chatbots to email automation tools.
          </p>
        </div>

        <div className="max-w-2xl grid grid-cols-1 items-start gap-3">
          {publishedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size="medium"
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
