import type { Metadata } from "next";
import Image from "next/image";
import { Gallery } from "@/components/media";

const careerPhotos = [
  {
    src: "/images/about/career-03.jpeg",
    alt: "Ryan Nicanor with colleagues at the Medidata NEXT conference in New York",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/about/career-04.jpg",
    alt: "Ryan Nicanor facilitating a team workshop around a conference table",
    width: 3024,
    height: 4032,
  },
  {
    src: "/images/about/career-05.jpg",
    alt: "Ryan Nicanor presenting to a group in front of a whiteboard",
    width: 5000,
    height: 3333,
  },
  {
    src: "/images/about/career-06.jpg",
    alt: "Ryan Nicanor and colleagues gathered around sticky notes during a design workshop",
    width: 4032,
    height: 3024,
  },
];

export const metadata: Metadata = {
  title: "About",
  description: "About Ryan Nicanor, human-centered product designer.",
};

const values = [
  {
    title: "Adopt a learner's mindset",
    body: "Acknowledge the infinite landscape of what we don't know. It's about doing our homework — meticulously researching and testing, tracking our assumptions along the way. Viewing problems from multiple angles enriches our understanding and solutions, so our designs are informed by a broad spectrum of insights and experiences, not just our limited view.",
  },
  {
    title: "Be confidently creative",
    body: "Uncertainties and challenges can intimidate even the most seasoned designers. But it's within that ambiguity that the seeds of innovation are sown. Creativity thrives on confidence — nurtured by deeply understanding our context, validating ideas through testing, and setting clear constraints to focus our efforts.",
  },
  {
    title: "Dream, but remain lean",
    body: "Effective design means navigating the balance between aspiration and execution. Every decision carries weight, influencing both a project's direction and its success in meeting user needs and business objectives. Balancing ambition with a clear-eyed view of risk and value turns visionary ideas into tangible realities.",
  },
  {
    title: "Strive to bring joy",
    body: "The hallmark of a great designer isn't just creating experiences that are intuitive or easy to navigate — it's crafting moments of delight. I aim to leave people with a positive imprint that brightens their day, looking beyond mere usability toward happiness and satisfaction, and adding the extra layer of thoughtfulness that turns ordinary interactions into memorable ones.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          A human-centered designer
        </h1>
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-border bg-surface sm:h-32 sm:w-32">
          <Image
            src="/images/about/profile-portrait.png"
            alt="Black and white portrait of Ryan Nicanor"
            fill
            className="object-cover grayscale"
            sizes="128px"
            priority
          />
        </div>
      </div>
      <div className="prose mt-6 max-w-none">
        <p>
          For more than five years, I&apos;ve helped teams create solutions
          that truly resonate with people. My approach centers on a thorough
          understanding of our customers, stakeholders, and business goals.
          From the start, my goal has been to infuse joy into every
          experience. In today&apos;s screen-filled world, the need for a
          personal touch is clearer than ever, and that&apos;s exactly what I
          strive to deliver.
        </p>

        <h2>The journey so far</h2>
        <p>
          At the age of 5, my dad introduced me to HTML and CSS, sparking an
          early fascination with technology. At the age of 14, I started
          using Photoshop. It wasn&apos;t until I attended UC San Diego,
          embarking on my first course in human-centered design during my
          undergrad, that everything clicked. This course was the gateway to
          my education in human-computer interaction, covering everything
          from the importance of empathy and ethnography in design, to UI
          design, and fostering the mantra of creative confidence.
        </p>
        <p>
          Graduating felt like diving into the deep end — I quickly found
          myself leading design efforts at small startups. Early in my
          career, I contributed to launching mobile and responsive iOS
          applications tailored for autism patients and practitioners. My
          journey then led me to Medidata Solutions, a larger corporation,
          where I took on a key role in developing their patient-facing
          product suite. Along this path, I&apos;ve honed my skills in user
          research and UI design, and expanded into workshop facilitation,
          service design, design system operations, and design leadership.
        </p>
      </div>

      <div className="mt-8">
        <Gallery
          images={careerPhotos}
          caption="A few moments along the way: conferences, workshops, and design studios."
        />
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">
        My values
      </h2>
      <dl className="mt-8 flex flex-col gap-8">
        {values.map((value) => (
          <div key={value.title}>
            <dt className="text-lg font-medium text-fg">{value.title}</dt>
            <dd className="mt-2 text-muted">{value.body}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
