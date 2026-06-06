import { PageTransition } from "@/components/ui/page-transition";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Insights, technical articles, and project updates from Akhilesh Bisht.",
};

const articles = [
  {
    title: "Building Modern Next.js Experiences",
    excerpt:
      "Practical patterns for scalable component architecture, data fetching, and production-ready UI in Next.js.",
    tag: "Frontend",
  },
  {
    title: "Designing Reliable API Workflows",
    excerpt:
      "How to build APIs that are efficient, secure, and easy to maintain across web and mobile applications.",
    tag: "Backend",
  },
  {
    title: "Improving Developer Velocity",
    excerpt:
      "Tools, processes, and practices that help teams ship faster without sacrificing quality.",
    tag: "Productivity",
  },
];

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Technical writing and project notes.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Explore articles on software architecture, frontend development,
            backend systems, and the best practices I use to deliver polished
            products.
          </p>
        </section>

        <div className="grid gap-5">
          {articles.map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border border-border bg-card/70 p-6 transition hover:border-primary/50 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  {article.title}
                </h2>
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {article.tag}
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
            More articles coming soon
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I’m regularly publishing updates on new projects, architecture
            patterns, and development workflows. Check back soon for the latest
            content.
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
