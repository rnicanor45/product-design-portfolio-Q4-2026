import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies.",
};

export default function WorkIndex() {
  // Protected/NDA projects are left off the public index — they're still
  // reachable at /work/<slug> for anyone with the direct link + password.
  const visible = projects.filter((p) => !p.protected);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-2 max-w-xl text-muted">
        {/* TODO: replace with your real intro copy for this page */}
        A selection of projects. Get in touch for NDA work not shown here.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </main>
  );
}
