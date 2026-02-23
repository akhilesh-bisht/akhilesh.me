"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiDocker,
} from "react-icons/si";
import experiencesData from "@/data/experiences.json";
import { PageTransition } from "@/components/ui/page-transition";

const getTechIcon = (tech: string) => {
  const icons: Record<string, { icon: any; color: string }> = {
    React: { icon: SiReact, color: "text-[#61DAFB]" },
    Nextjs: { icon: SiNextdotjs, color: "text-white" },
    Tailwind: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
    TypeScript: { icon: SiTypescript, color: "text-[#3178C6]" },
    Node: { icon: SiNodedotjs, color: "text-[#339933]" },
    PostgreSQL: { icon: SiPostgresql, color: "text-[#4169E1]" },
    Prisma: { icon: SiPrisma, color: "text-[#2D3748]" },
    Docker: { icon: SiDocker, color: "text-[#2496ED]" },
  };
  return icons[tech] || { icon: null, color: "" };
};

const experiences = experiencesData
  .filter((e) => e.published)
  .sort((a, b) => a.order - b.order);

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-6 py-20 bg-black text-white min-h-screen selection:bg-blue-500/30">
        <header className="mb-20">
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        </header>

        <div className="space-y-4">
          {experiences.map((exp, i) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/5 last:border-0 pb-4"
              >
                {/* --- SEPARATE DIV: CLICKABLE HEADER --- */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-between py-4 cursor-pointer group hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-all"
                >
                  <div className="flex gap-4 items-center">
                    {/* Brand Logo */}
                    <div className="h-10 w-10 rounded-lg bg-[#111] border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-zinc-500">
                        {exp.company[0]}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-white transition-colors group-hover:text-blue-400">
                          {exp.company}
                        </h2>
                        {/* Social/Link Icons */}
                        <div className="flex items-center gap-2 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiGlobe className="w-3 h-3 hover:text-white" />
                          <FiGithub className="w-3 h-3 hover:text-white" />
                          <FiChevronDown
                            className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-400" : ""}`}
                          />
                        </div>
                      </div>
                      <p className="text-zinc-500 text-xs font-medium">
                        {exp.position}
                      </p>
                    </div>
                  </div>

                  {/* Right Side Meta */}
                  <div className="text-right shrink-0">
                    <p className="text-zinc-400 text-xs font-mono">
                      {exp.period}
                    </p>
                    <p className="text-zinc-600 text-[10px] mt-1 uppercase tracking-wider">
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* --- SEPARATE DIV: ACCORDION DETAILS --- */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pr-4 pb-6 pt-2 space-y-6">
                        {/* Skills Cloud */}
                        <div className="flex flex-wrap gap-4">
                          {exp.technologies?.map((tech) => {
                            const { icon: Icon, color } = getTechIcon(tech);
                            return (
                              <div
                                key={tech}
                                className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full transition-colors hover:border-white/20"
                              >
                                {Icon && (
                                  <Icon className={`${color} text-sm`} />
                                )}
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                                  {tech}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Description List */}
                        <ul className="space-y-3">
                          {exp.description.map((item, j) => (
                            <li
                              key={j}
                              className="text-sm text-zinc-400 leading-relaxed flex gap-3"
                            >
                              <span className="text-blue-500 mt-1.5 h-1 w-1 rounded-full shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Simplified Education */}
        <footer className="mt-32 pt-12 border-t border-white/5">
          <div className="flex items-baseline justify-between group cursor-default">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700 mb-4">
                Academic
              </h3>
              <p className="text-lg font-bold text-zinc-300">
                Uttarakhand University
              </p>
              <p className="text-sm text-zinc-500 italic">
                Bachelor of Computer Science
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-600">2022 — 2025</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
