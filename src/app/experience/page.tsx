"use client";

import { LinkButton } from "@/components/ui/link-button";
import { PageTransition } from "@/components/ui/page-transition";
import { FiMapPin, FiWifi, FiHome, FiRepeat } from "react-icons/fi";
import { motion } from "framer-motion";
import experiencesData from "@/data/experiences.json";

const experiences = experiencesData.filter((exp: { published: boolean }) => exp.published);

const getWorkTypeBadge = (workType: string) => {
  switch (workType) {
    case "remote":
      return { label: "Remote", icon: FiWifi, className: "bg-green-500/10 text-green-600 dark:text-green-400" };
    case "onsite":
      return { label: "Onsite", icon: FiHome, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400" };
    case "hybrid":
      return { label: "Hybrid", icon: FiRepeat, className: "bg-purple-500/10 text-purple-600 dark:text-purple-400" };
    default:
      return { label: "Remote", icon: FiWifi, className: "bg-green-500/10 text-green-600 dark:text-green-400" };
  }
};

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  workType: string;
  description: string[];
  current: boolean;
  link: string | null;
}

export default function Experience() {
  return (
    <PageTransition>
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Experience</h1>
          <p className="text-muted-foreground">
            Building products that scale — from concept to deployment.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[5px] top-4 bottom-4 w-px bg-border"
            aria-hidden
          />

          <div className="space-y-10">
            {experiences.map((exp: Experience, i: number) => {
              const badge = getWorkTypeBadge(exp.workType);
              const Icon = badge.icon;
              return (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className="relative pl-10"
                >
                  {/* Timeline dot */}
                  <div
                    className={`
                      absolute left-0 top-1.5 w-3 h-3 rounded-full -translate-x-[3px]
                      ${exp.current ? "bg-accent ring-4 ring-accent/20" : "bg-muted-foreground/60"}
                    `}
                  />

                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold">
                        {exp.link ? (
                          <LinkButton href={exp.link} target="_blank">
                            {exp.company}
                          </LinkButton>
                        ) : (
                          exp.company
                        )}
                      </h2>
                      {exp.current && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/15 text-accent">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium text-sm mb-3">
                      {exp.position}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span>{exp.period}</span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${badge.className}`}>
                        <Icon className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item: string, j: number) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/60 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: experiences.length * 0.1 }}
            className="mt-16 pt-10 border-t border-border"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Education
            </h2>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/60 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Uttarakhand University — Bachelor Degree</p>
                <p className="text-sm text-muted-foreground">Aug 2022 – Aug 2025</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
