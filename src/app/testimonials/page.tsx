import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonial-card";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What colleagues and collaborators say about working with Ryan Nicanor.",
};

export default function TestimonialsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Testimonials</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
