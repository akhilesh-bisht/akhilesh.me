"use client";

import { useEffect, useState } from "react";

export function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get current visit count from localStorage
    const currentVisits = localStorage.getItem("portfolio_visits");
    const count = currentVisits ? parseInt(currentVisits) + 1 : 1;

    // Update localStorage
    localStorage.setItem("portfolio_visits", count.toString());
    setVisits(count);
  }, []);

  if (!mounted || visits === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm group">
      <p className="text-xs sm:text-sm font-semibold text-primary group-hover:scale-110 transition-transform duration-300 inline-flex items-center gap-1.5">
        <span className="animate-pulse">👁️</span> {visits.toLocaleString()}
      </p>
    </div>
  );
}
