"use client";

import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { SiLinkedin } from "react-icons/si";
import Image from "next/image";

export default function CurrentCompanyCompact() {
  return (
    <section className="mb-12">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Current Role
        </h2>

        <Link
          href="/experience"
          className="text-xs font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          View Full Experience →
        </Link>
      </div>

      {/* Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black px-4 py-3 transition-colors">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="rounded-sm bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/c.png"
              alt="Scriptguru Digital Solutions logo"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                Scriptguru Digital Solutions
              </h3>

              {/* Icons */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600 flex-wrap sm:flex-nowrap">
                <a
                  href="https://scriptgurudigitalsolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGlobe className="w-3.5 h-3.5 hover:text-zinc-900 dark:hover:text-white" />
                </a>

                <a
                  href="https://www.linkedin.com/company/scriptguru-digital-solutions/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiLinkedin className="w-3.5 h-3.5 hover:text-zinc-900 dark:hover:text-white" />
                </a>

                {/* Active dot */}
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-500">
              Full Stack Engineer · Full Time
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="text-left sm:text-right shrink-0">
          <p className="text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Sep 2025 — Present
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-600 mt-1">
            Dehradun, India (On-site)
          </p>
        </div>
      </div>
    </section>
  );
}
