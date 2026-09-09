"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({
  testimonial,
  index = 0,
}: {
  testimonial: Testimonial;
  index?: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6"
    >
      <blockquote className="text-fg">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <p className="font-medium text-fg">{testimonial.name}</p>
        <p className="text-muted">{testimonial.role}</p>
      </figcaption>
    </motion.figure>
  );
}
