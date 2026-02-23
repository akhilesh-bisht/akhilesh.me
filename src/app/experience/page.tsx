"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import experiencesData from "@/data/experiences.json";
import { PageTransition } from "@/components/ui/page-transition";

const experiences = experiencesData
  .filter((e) => e.published)
  .sort((a, b) => a.order - b.order);

export default function Experience() {
  return (
    <PageTransition>
      <div className="container max-w-2xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold tracking-tight text-foreground"
          >
            Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-3 text-lg"
          >
            A journey through the teams I’ve joined and the products I’ve helped
            craft.
          </motion.p>
        </header>

        {/* Timeline Section */}
        <div className="space-y-20">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10"
            >
              {/* Date/Period Side */}
              <div className="text-sm font-medium text-muted-foreground/60 pt-1 uppercase tracking-widest">
                {exp.period}
              </div>

              {/* Content Side */}
              <div className="relative">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between group">
                    <h2 className="text-xl font-medium text-foreground flex items-center gap-2">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          className="hover:underline decoration-muted-foreground/30 underline-offset-4 flex items-center gap-1"
                        >
                          {exp.company}
                          <FiArrowUpRight className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        exp.company
                      )}

                      {exp.current && (
                        <span className="ml-2 flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </h2>
                  </div>

                  <p className="text-foreground/80 font-medium">
                    {exp.position}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FiMapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </div>

                  {/* Tech stack - Pills style */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-full bg-secondary/50 border border-border/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description - Modern minimal list */}
                  <ul className="mt-6 space-y-3">
                    {exp.description.map((item: string, j: number) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground leading-relaxed hover:text-foreground transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Education Section */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-12 border-t border-border/40"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-6">
            Education
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
            <div>
              <p className="text-lg font-medium">Uttarakhand University</p>
              <p className="text-muted-foreground">
                Bachelor of Computer Science
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-mono italic">
              2022 — 2025
            </p>
          </div>
        </motion.footer>
      </div>
    </PageTransition>
  );
}
