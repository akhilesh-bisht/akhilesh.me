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
    url: "https://Akhilesh j22.me/projects",
  },
};

export default function Projects() {
  const publishedProjects = projects.filter((project) => project.published);

  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            Things I&apos;ve built — from AI chatbots to email automation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publishedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} size="medium" />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
