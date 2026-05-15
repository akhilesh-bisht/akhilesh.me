"use client";

import { PageTransition } from "@/components/ui/page-transition";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiExternalLink,
  FiDownload,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";

const CONTACT_METHODS = [
  {
    title: "Email",
    value: "akhileshbisht2020@gmail.com",
    icon: FiMail,
    href: "mailto:akhileshbisht2020@gmail.com",
    description: "Get in touch via email",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Phone",
    value: "+91-6399085419",
    icon: FiPhone,
    href: "tel:+916399085419",
    description: "Call or WhatsApp me",
    color: "from-green-500 to-green-600",
  },
  {
    title: "LinkedIn",
    value: "akhileshdev",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/akhileshdev",
    description: "Connect on LinkedIn",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "GitHub",
    value: "AkhileshBisht",
    icon: FiGithub,
    href: "https://github.com/AkhileshBisht",
    description: "Check out my projects",
    color: "from-gray-700 to-gray-900",
  },
];

const SERVICES = [
  {
    title: "Full-Stack Development",
    description: "End-to-end web development with React, Node.js, and MongoDB",
    emoji: "💻",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS deployment, Docker containerization, and CI/CD pipelines",
    emoji: "☁️",
  },
  {
    title: "API Integration",
    description: "RESTful APIs, third-party integrations, and authentication",
    emoji: "🔌",
  },
  {
    title: "Performance Optimization",
    description: "Code optimization, database tuning, and loading speed",
    emoji: "⚡",
  },
  {
    title: "Technical Consultation",
    description: "Architecture planning and technology selection guidance",
    emoji: "🎯",
  },
  {
    title: "Custom Solutions",
    description: "Tailored applications for your specific business needs",
    emoji: "🛠️",
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
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
              Based in India
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
            Let's Build Something <span className="text-primary">Amazing</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl">
            I'm always excited about new projects, freelance opportunities, and
            collaborations. Whether you have a specific project in mind or just
            want to discuss possibilities, let's connect!
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Currently available for{" "}
            <span className="font-semibold text-foreground">
              remote projects worldwide
            </span>{" "}
            • Based in Dehradun, Uttarakhand, India
          </p>
        </section>

        {/* Quick Action Buttons */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleResumeDownload}
              className="group relative overflow-hidden rounded-lg border border-primary/30 bg-primary/5 px-4 sm:px-6 py-4 sm:py-5 text-left transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1">
                    Download Resume
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    PDF version of my CV
                  </p>
                </div>
                <FiDownload className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 ml-3 group-hover:translate-y-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleCopy("akhileshbisht2020@gmail.com", "email")}
              className="group relative overflow-hidden rounded-lg border border-primary/30 bg-primary/5 px-4 sm:px-6 py-4 sm:py-5 text-left transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1">
                    {copied === "email" ? "Email Copied!" : "Copy Email"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {copied === "email"
                      ? "Ready to send"
                      : "akhileshbisht2020@gmail.com"}
                  </p>
                </div>
                {copied === "email" ? (
                  <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 ml-3" />
                ) : (
                  <FiCopy className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 ml-3 group-hover:scale-110 transition-transform" />
                )}
              </div>
            </button>
          </div>
        </section>

        {/* Contact Methods - Enhanced Grid */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-foreground">
            Contact Methods
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
                  className="group relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-primary/20"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative space-y-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${method.color} p-2 sm:p-2.5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-foreground">
                        {method.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        {method.description}
                      </p>
                      <p className="text-xs sm:text-sm font-mono text-primary break-all line-clamp-2">
                        {method.value}
                      </p>
                    </div>

                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-foreground">
            Services I Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {service.emoji}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time Section */}
        <section className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-0 dark:opacity-100" />

          <div className="relative space-y-3">
            <p className="text-3xl">📧</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I typically respond within{" "}
              <span className="font-semibold text-foreground">24-48 hours</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              For urgent matters, feel free to call or WhatsApp me!
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Ready to start your next project?
          </p>
          <a
            href="mailto:akhileshbisht2020@gmail.com"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
            Start a Conversation
          </a>
        </section>
      </div>
    </PageTransition>
  );
}
