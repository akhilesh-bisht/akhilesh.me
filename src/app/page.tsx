"use client";

import { PageTransition } from "@/components/ui/page-transition";
import { FiMail, FiGlobe } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import personalInfo from "@/data/personal-info.json";
import socialLinks from "@/data/social-links.json";
import Image from "next/image";
import Link from "next/link";

const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FiMail,
  FiGlobe,
  FaLinkedin,
  FaGithub,
};

export default function Home() {
  const heroSocialLinks = socialLinks.filter((link) => link.published);
  const skills = personalInfo.skills as {
    frontend?: string[];
    backend?: string[];
    tools?: string[];
    practices?: string[];
  };

  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Hero - flex left text, right logo */}
        <section className="mb-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {personalInfo.hero_title}
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              {(personalInfo as { hero_subtitle?: string }).hero_subtitle ||
                "Full Stack Developer"}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-muted-foreground">
              {(personalInfo as { hero_contact?: string }).hero_contact && (
                <span>{(personalInfo as { hero_contact?: string }).hero_contact}</span>
              )}
              {(personalInfo as { hero_email?: string }).hero_email && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <a
                    href={`mailto:${(personalInfo as { hero_email?: string }).hero_email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {(personalInfo as { hero_email?: string }).hero_email}
                  </a>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {heroSocialLinks.map((link) => {
                const IconComponent = IconMap[link.icon as keyof typeof IconMap];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors duration-200"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-2xl w-28 h-28 md:w-36 md:h-36 shadow-xl">
              <Image
                src="/Anime%20Hypio%20Kids.webp"
                height={144}
                width={144}
                alt="Akhilesh Bisht"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            About
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{personalInfo.about_me_paragraph_1}</p>
            <p>{personalInfo.about_me_paragraph_2}</p>
          </div>
        </section>

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <section className="mb-16">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Skills
            </h2>
            <div className="space-y-4">
              {skills.frontend && skills.frontend.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground/80 mb-2">
                    Frontend
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {skills.frontend.join(", ")}
                  </p>
                </div>
              )}
              {skills.backend && skills.backend.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground/80 mb-2">
                    Backend
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {skills.backend.join(", ")}
                  </p>
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground/80 mb-2">
                    Tools & Libraries
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {skills.tools.join(", ")}
                  </p>
                </div>
              )}
              {skills.practices && skills.practices.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground/80 mb-2">
                    Best Practices
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {skills.practices.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Quick links */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Explore
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/experience"
              className="text-sm font-medium text-accent hover:underline"
            >
              Experience →
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              Projects →
            </Link>
            <Link
              href="/github"
              className="text-sm font-medium text-accent hover:underline"
            >
              GitHub →
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
