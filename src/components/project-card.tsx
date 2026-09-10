"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block h-full overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-fg"
      >
        {project.image ? (
          <div className="relative aspect-video w-full overflow-hidden border-b border-border">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            {project.protected ? (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/90 px-2.5 py-1 text-xs font-medium text-fg backdrop-blur-sm">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-3 w-3 shrink-0"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5 7V5a3 3 0 0 1 6 0v2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                Password protected
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-medium text-fg">{project.title}</h3>
            <span className="shrink-0 text-sm text-muted">{project.year}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
