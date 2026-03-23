"use client";

import { PageTransition } from "@/components/ui/page-transition";
import { FiMail, FiGlobe } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import personalInfo from "@/data/personal-info.json";
import socialLinks from "@/data/social-links.json";
import Image from "next/image";
import { TechStack } from "@/components/ui/tech-badge";
import { GitHubActivityBlock } from "@/components/GitHubActivityBlock";
import CurrentCompany from "./experience/CurrentExprince";
import CatFollower from "@/components/Running";
import MusicPage from "@/components/Shopify";
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    FiMail,
    FiGlobe,
    FaLinkedin,
    FaGithub,
  };

const SKILL_ICONS = [
  "react",
  "next",
  "node",
  "mongodb",
  "typescript",
  "javascript",
  "tailwind",
  "github",
  "python",
  "sql",
  "openai",
];

export default function Home() {
  const heroSocialLinks = socialLinks.filter((link) => link.published);

  return (
    <PageTransition>
      <CatFollower />
      <MusicPage />
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Hero: Image left, name + about right */}
        <section className="mb-12 flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-10">
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-xl w-full h-full sm:w-40 sm:h-40 shadow-lg">
              <Image
                src="/logo.jpg"
                height={160}
                width={160}
                alt="Akhilesh Bisht"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              {personalInfo.hero_title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {personalInfo.about_me_paragraph_1}
            </p>
            <div className="flex flex-wrap gap-2">
              {heroSocialLinks.map((link) => {
                const IconComponent =
                  IconMap[link.icon as keyof typeof IconMap];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        {/* Skills: Icons in a row */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3 [&_span]:text-xl">
            <TechStack technologies={SKILL_ICONS} showNames={false} />
          </div>
        </section>
        <CurrentCompany />
        {/* GitHub Activity */}
        <GitHubActivityBlock />
      </div>
    </PageTransition>
  );
}
