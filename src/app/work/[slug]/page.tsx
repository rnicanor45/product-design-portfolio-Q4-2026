import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ContentBlocks } from "./content-blocks";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    // No per-project override needed: the whole site is noindex (see the
    // root layout's metadata and the X-Robots-Tag header in src/proxy.ts).
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <p className="text-sm text-muted">
        {project.role} · {project.year}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
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

      {project.meta ? (
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4">
          {project.meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <ContentBlocks blocks={project.body} />
    </main>
  );
}
