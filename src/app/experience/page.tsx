/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiJavascript,
  SiMongodb,
  SiDocker,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";

import experiencesData from "@/data/experiences.json";
import { PageTransition } from "@/components/ui/page-transition";

/* ---------------- ICON MAP ---------------- */

const techIcons: Record<string, { icon: any; color: string }> = {
  React: { icon: SiReact, color: "text-[#61DAFB]" },
  "Next.js": { icon: SiNextdotjs, color: "text-foreground" },
  Tailwind: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  TypeScript: { icon: SiTypescript, color: "text-[#3178C6]" },
  JavaScript: { icon: SiJavascript, color: "text-[#F7DF1E]" },
  Node: { icon: SiNodedotjs, color: "text-[#339933]" },
  MongoDB: { icon: SiMongodb, color: "text-[#47A248]" },
  PostgreSQL: { icon: SiPostgresql, color: "text-[#4169E1]" },
  Prisma: { icon: SiPrisma, color: "text-[#2D3748]" },
  Docker: { icon: SiDocker, color: "text-[#2496ED]" },
  "OpenAI API": { icon: SiOpenai, color: "text-white" },
};

/* ---------------- DATA ---------------- */

const experiences = experiencesData
  .filter((e) => e.published)
  .sort((a, b) => a.order - b.order);

/* ---------------- COMPONENT ---------------- */

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">
            Experience
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Companies I’ve worked with, the problems I solved, and the
            technologies I used.
          </p>
        </header>

        {/* Experience List */}
        <div className="space-y-10">
          {experiences.map((exp, i) => {
            const isCurrent = exp.current;
            const isExpanded = isCurrent || expandedId === exp.id;

            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className="rounded-2xl border border-border bg-card/50 hover:bg-card transition shadow-sm">
                  {/* HEADER */}
                  <button
                    onClick={() => {
                      if (!isCurrent) {
                        setExpandedId(isExpanded ? null : exp.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between gap-6 p-6 text-left ${
                      !isCurrent ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {/* Left */}
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">{exp.company}</h2>
                      <p className="text-sm text-muted-foreground">
                        {exp.position} · {exp.employmentType}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <FiCalendar /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FiExternalLink />
                        </a>
                      )}

                      {!isCurrent && (
                        <FiChevronDown
                          className={`transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}

                      {isCurrent && (
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                    </div>
                  </button>

                  {/* CONTENT */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 space-y-6">
                          {/* Description */}
                          <ul className="space-y-3">
                            {exp.description.map((item, j) => (
                              <li
                                key={j}
                                className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                              >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-3">
                            {exp.technologies?.map((tech) => {
                              const IconData = techIcons[tech];
                              if (!IconData) return null;

                              const Icon = IconData.icon;

                              return (
                                <div
                                  key={tech}
                                  className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium"
                                >
                                  <Icon
                                    className={`${IconData.color} text-sm`}
                                  />
                                  {tech}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
