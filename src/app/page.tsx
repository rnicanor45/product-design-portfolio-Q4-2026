"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { ProjectCard } from "@/components/project-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { SkillsMarquee } from "@/components/skills-marquee";

const services = [
  {
    title: "Strategy",
    description:
      "I help shape the future of products and services by exploring new opportunities and understanding people and their holistic experiences.",
    examples: "Product Discovery, Service Design, Design Thinking Workshops",
  },
  {
    title: "Design",
    description:
      "I bring ideas to life by crafting delightful user interfaces and experiences.",
    examples: "UI Design, Web & Mobile UX Design, UX Writing, Interaction Design",
  },
  {
    title: "Enablement",
    description:
      "I support and streamline the design process by establishing systems, guides, and frameworks.",
    examples: "Design Systems and Documentation, Prototyping and Usability Testing",
  },
];

export default function Home() {
  const featured = projects.filter((p) => !p.protected).slice(0, 2);
  const highlight = testimonials.find((t) => t.featured) ?? testimonials[0];

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-20 pt-24 sm:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Ryan Nicanor designs digital products with a deep understanding of
          people, a daring to be creative, and a collaborative spirit.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Link
            href="#work"
            className="gradient-fill inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Sample my work
          </Link>
        </motion.div>
      </section>

      <SkillsMarquee />

      <section id="work" className="mx-auto w-full max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-muted">
          Selected work
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="services" className="border-t border-border bg-surface/50">
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <h2 className="mb-10 text-3xl font-semibold tracking-tight">
            My services
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <h3 className="text-lg font-medium text-fg">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
                <p className="mt-4 text-xs uppercase tracking-wide text-muted">
                  This might look like...
                </p>
                <p className="mt-1 text-sm text-fg">{service.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <TestimonialCard testimonial={highlight} />
        </div>
        <Link
          href="/testimonials"
          className="mt-6 inline-block text-sm font-medium text-link underline decoration-link/30 underline-offset-4 transition-colors hover:decoration-link"
        >
          View more testimonials →
        </Link>
      </section>
    </main>
  );
}
