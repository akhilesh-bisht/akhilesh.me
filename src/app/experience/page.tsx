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
  SiOpenai,
  SiHtml5,
  SiCss3,
  SiExpress,
} from "react-icons/si";

import experiencesData from "@/data/experiences.json";
import { PageTransition } from "@/components/ui/page-transition";

/* ---------------- ICON MAP ---------------- */

const techIcons: Record<string, { icon: any; color: string }> = {
  react: { icon: SiReact, color: "text-[#61DAFB]" },
  nextjs: { icon: SiNextdotjs, color: "text-foreground" },
  tailwind: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  typescript: { icon: SiTypescript, color: "text-[#3178C6]" },
  javascript: { icon: SiJavascript, color: "text-[#F7DF1E]" },
  nodejs: { icon: SiNodedotjs, color: "text-[#339933]" },
  expressjs: { icon: SiExpress, color: "text-[#000000] dark:text-white" },
  mongodb: { icon: SiMongodb, color: "text-[#47A248]" },
  openaiapi: { icon: SiOpenai, color: "text-white" },
  html: { icon: SiHtml5, color: "text-[#E34F26]" },
  css: { icon: SiCss3, color: "text-[#1572B6]" },
};

/* ---------------- DATA ---------------- */

const experiences = experiencesData
  .filter((e) => e.published)
  .sort((a, b) => a.order - b.order);

/* ---------------- COMPONENT ---------------- */

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const normalizeTech = (tech: string) =>
    tech.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-2 py-8">
        {/* Header */}

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
                            {exp.technologies.map((tech) => {
                              const key = normalizeTech(tech);
                              const IconData = techIcons[key];

                              if (!IconData) {
                                return (
                                  <span
                                    key={tech}
                                    className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1"
                                  >
                                    {tech}
                                  </span>
                                );
                              }

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
