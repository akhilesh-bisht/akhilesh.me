"use client";

import { FaPython } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGithub,
  SiMysql,
  SiOpenai,
} from "react-icons/si";

const ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  react: { icon: SiReact, color: "text-[#61DAFB]" },
  next: { icon: SiNextdotjs, color: "text-foreground" },
  node: { icon: SiNodedotjs, color: "text-[#339933]" },
  mongodb: { icon: SiMongodb, color: "text-[#47A248]" },
  typescript: { icon: SiTypescript, color: "text-[#3178C6]" },
  javascript: { icon: SiJavascript, color: "text-[#F7DF1E]" },
  tailwind: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  github: { icon: SiGithub, color: "text-[#181717] dark:text-white" },
  python: { icon: FaPython, color: "text-[#3776AB]" },
  sql: { icon: SiMysql, color: "text-[#4479A1]" },
  openai: { icon: SiOpenai, color: "text-[#412991]" },
};

type Props = {
  technologies: string[];
  showNames?: boolean;
};

export function TechStack({ technologies, showNames = true }: Props) {
  return (
    <>
      {technologies.map((tech) => {
        const data = ICON_MAP[tech.toLowerCase()];
        if (!data) return null;

        const Icon = data.icon;

        return (
          <div
            key={tech}
            className="flex items-center gap-2 cursor-pointer"
            title={tech}
          >
            <Icon
              className={`${data.color} text-2xl hover:scale-110 transition-transform`}
            />
            {showNames && (
              <span className="text-sm text-muted-foreground">{tech}</span>
            )}
          </div>
        );
      })}
    </>
  );
}
