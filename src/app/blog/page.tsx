
import { PageTransition } from "@/components/ui/page-transition";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "My DevOps learning journey, notes, and daily progress.",
};

const articles = [
  {
    title: "Day 1 · Linux Basics",
    excerpt:
      "Learned terminal navigation, file management, directories, and essential Linux commands.",
    tag: "Linux",
    date: "Jun 12, 2026",
  },
  {
    title: "Day 2 · Shell Scripting",
    excerpt:
      "Started Bash scripting with variables, loops, conditions, and simple automation tasks.",
    tag: "Shell",
    date: "Jun 13, 2026",
  },
  {
    title: "Day 3 · DevOps Fundamentals",
    excerpt:
      "Explored the DevOps lifecycle, automation concepts, and deployment workflows.",
    tag: "DevOps",
    date: "Jun 14, 2026",
  },
];

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
            Blog
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            DevOps Learning Journal
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Notes, learnings, and progress while exploring Linux, Shell
            Scripting, DevOps tools, cloud technologies, and modern
            infrastructure.
          </p>
        </section>

        {/* Articles */}
        <div className="space-y-4">
          {articles.map((article, index) => (
            <article
              key={`${article.date}-${index}`}
              className="group rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-primary font-medium">
                  {article.tag}
                </span>

                <span className="text-muted-foreground">
                  {article.date}
                </span>
              </div>

              <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
                {article.title}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                {article.excerpt}
              </p>

              <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>

        {/* Learning Progress */}
        <section className="mt-12 rounded-xl border border-border bg-card/30 p-5">
          <h3 className="text-base font-semibold mb-4">
            Learning Progress
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border p-3">
              ✅ Linux
            </div>

            <div className="rounded-lg border border-border p-3">
              ✅ Shell Scripting
            </div>

            <div className="rounded-lg border border-border p-3">
              🔄 Git & GitHub
            </div>

            <div className="rounded-lg border border-border p-3">
              ⏳ Docker
            </div>

            <div className="rounded-lg border border-border p-3">
              ⏳ Kubernetes
            </div>

            <div className="rounded-lg border border-border p-3">
              ⏳ AWS
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Sharing daily DevOps notes and practical learnings.
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
