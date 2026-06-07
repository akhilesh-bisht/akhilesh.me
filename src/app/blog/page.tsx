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
    date: "Jun 12, 2026",
  },
  {
    title: "Designing Reliable API Workflows",
    excerpt:
      "How to build APIs that are efficient, secure, and easy to maintain across web and mobile applications.",
    tag: "Backend",
    date: "May 28, 2026",
  },
  {
    title: "Improving Developer Velocity",
    excerpt:
      "Tools, processes, and practices that help teams ship faster without sacrificing quality.",
    tag: "Productivity",
    date: "May 10, 2026",
  },
];

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <section className="mb-12">
          <p className="text-sm font-medium text-primary mb-3">Blog</p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Writing about software and design.
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Thoughts on frontend development, backend systems, architecture,
            performance, and lessons learned while building products.
          </p>
        </section>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article, index) => (
            <article
              key={`${article.date}-${index}`}
              className="group border-b border-border pb-8 last:border-0"
            >
              <div className="flex items-center gap-3 mb-3 text-sm">
                <span className="text-muted-foreground">
                  {article.date}
                </span>

                <span className="h-1 w-1 rounded-full bg-muted-foreground" />

                <span className="text-primary font-medium">
                  {article.tag}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {article.title}
              </h2>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <section className="mt-14 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            More articles and project breakdowns coming soon.
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
