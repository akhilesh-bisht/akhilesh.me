"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiArrowUp, FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { href: "/experience", label: "Work", icon: null },
  { href: "/projects", label: "Projects", icon: null },
  { href: "/github", label: "GitHub", icon: null },
];

function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const themeInitialized = useRef(false);

  const currentPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  useEffect(() => {
    if (themeInitialized.current) return;
    themeInitialized.current = true;
    const stored = localStorage.getItem("portfolio-theme") as
      | "dark"
      | "light"
      | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
    else
      setTheme(
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      if (isScrolled && !showScrollBtn) {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(
          () => setShowScrollBtn(true),
          100,
        );
      } else if (!isScrolled && showScrollBtn) {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(
          () => setShowScrollBtn(false),
          100,
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mounted, showScrollBtn]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined")
        localStorage.setItem("portfolio-theme", next);
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3">
      <nav
        className={cn(
          "flex items-center justify-between gap-4 w-full max-w-3xl mx-auto px-4 py-3 rounded-xl",
          "bg-background/80 backdrop-blur-md border border-border/50",
          scrolled && "shadow-lg shadow-black/5 dark:shadow-black/10",
        )}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/avatar.png"
            alt="Akhilesh Bisht"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="text-sm font-bold text-foreground hidden sm:inline">
            Akhilesh .me
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                currentPath === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-opacity",
              showScrollBtn ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-label="Scroll to top"
            tabIndex={showScrollBtn ? 0 : -1}
          >
            <FiArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="w-4 h-4" />
            ) : (
              <FiMoon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-4xl px-4 py-4 rounded-xl bg-background/95 backdrop-blur-md border border-border/50 shadow-xl">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-2 px-3 text-sm rounded-md transition-colors",
                  currentPath === item.href
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showFooter =
    pathname === "/" ||
    pathname.startsWith("/experience") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/github");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-12">{children}</main>
      {showFooter && (
        <footer className="border-t border-border/50 py-8">
          <div className="container max-w-4xl mx-auto px-4">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Akhilesh Bisht
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
