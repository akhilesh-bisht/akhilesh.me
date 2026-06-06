"use client";

import { PageTransition } from "@/components/ui/page-transition";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from "react";

const CONTACT_METHODS = [
  {
    title: "Email",
    value: "akhileshbisht2020@gmail.com",
    icon: Mail,
    href: "mailto:akhileshbisht2020@gmail.com",
    description: "Send the project brief and your timeline",
    color: "bg-sky-600",
  },
  {
    title: "Phone",
    value: "+91-6399085419",
    icon: Phone,
    href: "tel:+916399085419",
    description: "Phone or WhatsApp for quick follow-up",
    color: "bg-emerald-600",
  },
  {
    title: "LinkedIn",
    value: "akhileshdev",
    icon: FaLinkedin,
    href: "https://linkedin.com/in/akhileshdev",
    description: "Professional profile and endorsements",
    color: "bg-cyan-600",
  },
  {
    title: "GitHub",
    value: "AkhileshBisht",
    icon: IoLogoGithub,
    href: "https://github.com/AkhileshBisht",
    description: "Explore my recent code and repositories",
    color: "bg-slate-800",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume/Akhilesh_Bisht_Resume.pdf";
    link.download = "Akhilesh_Bisht_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageTransition>
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <section className="mb-12">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            <MapPin className="w-4 h-4" />
            <span>Dehradun, India</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I help teams deliver reliable, maintainable software. Share your
            goals, timeline, and priorities, and I’ll get back to you with a
            clear next step.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 mb-10">
          <button
            onClick={handleResumeDownload}
            className="rounded-2xl border border-border bg-background px-5 py-4 text-left transition hover:border-primary/60 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-1">
                  Download resume
                </h2>
                <p className="text-sm text-muted-foreground">
                  PDF version of my experience and skills.
                </p>
              </div>
              <Download className="w-5 h-5 text-primary" />
            </div>
          </button>

          <button
            onClick={() => handleCopy("akhileshbisht2020@gmail.com", "email")}
            className="rounded-2xl border border-border bg-background px-5 py-4 text-left transition hover:border-primary/60 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-1">
                  {copied === "email" ? "Email copied" : "Copy email"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {copied === "email"
                    ? "Paste it into your message."
                    : "akhileshbisht2020@gmail.com"}
                </p>
              </div>
              {copied === "email" ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 mb-10">
          {CONTACT_METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.title}
                href={method.href}
                target={
                  method.title !== "Email" && method.title !== "Phone"
                    ? "_blank"
                    : undefined
                }
                rel={
                  method.title !== "Email" && method.title !== "Phone"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-3xl border border-border bg-card p-5 transition hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${method.color}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  {method.title}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {method.description}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {method.value}
                </p>
              </a>
            );
          })}
        </section>

        <section className="rounded-3xl border border-border bg-background p-6">
          <p className="text-sm text-muted-foreground mb-5">
            I typically respond within{" "}
            <span className="font-semibold text-foreground">24-48 hours</span>.
            For urgent requests, use phone or email.
          </p>
          <a
            href="mailto:akhileshbisht2020@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Mail className="w-4 h-4" />
            Start the conversation
          </a>
        </section>
      </div>
    </PageTransition>
  );
}
