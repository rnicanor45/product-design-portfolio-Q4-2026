export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Shown as the highlight on the homepage */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Alicia Staley",
    role: "VP of Patient Engagement, Medidata Solutions",
    featured: true,
    quote:
      "Ryan is a visionary product designer whose impact extends beyond the products he works to create. His ability to navigate the entire product development lifecycle with a keen eye for detail and a deep understanding of UI/UX principles sets him apart from his peers. If you're looking to elevate your product's design and user experience, I highly recommend connecting with Ryan — he is not just a designer, he is a catalyst for innovation and success.",
  },
  {
    name: "Paul Chang",
    role: "VP of Design, Medidata Solutions",
    quote:
      "Ryan was an early member of the design team tasked with redefining how patients are supported throughout their clinical trial and related healthcare journeys, leading several new product offerings while overseeing the holistic patient experience. He's an exceptional teammate, willing to fill any gap where he can add value — and one of the nicest, most genuine people you'll ever meet.",
  },
  {
    name: "Benjamin Berte",
    role: "Director of Product Design, Patient Cloud, Medidata Solutions",
    quote:
      "Ryan grew from a junior designer into an influential lead designer over four years, leading design for our patient experience and managing the myMedidata design system. His ability to manage multiple projects while keeping sight of the larger picture — and to work with stakeholders, engineers, and cross-functional teams — is something every designer should strive for.",
  },
  {
    name: "Jesi Zhang",
    role: "Senior Product Designer, Medidata Solutions",
    quote:
      "Ryan's exceptional intelligence and efficiency set him apart, making him the go-to person for swift, insightful responses within our team. His contributions extended well beyond traditional design tasks — he spearheaded our research efforts and brought a forward-thinking, collaborative approach to every project.",
  },
  {
    name: "James Stephens",
    role: "Senior Product Designer, Swing Education",
    quote:
      "As soon as Ryan joined our team, he surprised me at how immediately he was asking great questions, solving problems, and adding value wherever he directed his attention. It's rare to find someone with such high emotional intelligence, a systematic mindset, and great collaboration skills, who's also really pleasant to be around. Highly recommended!",
  },
  {
    name: "Jimmy Thompson",
    role: "Staff Applications Engineer, Medidata Solutions",
    quote:
      "Ryan has a keen eye for design and layout, calling attention to details that others may have missed. Always the first to a meeting and often the only one to take notes and schedule follow-ups — he'd be an excellent member of any team.",
  },
  {
    name: "Katie Chiu",
    role: "Business Analyst, Medidata Solutions",
    quote:
      "Ryan always demonstrated professionalism and expertise in his craft, and was very skilled at keeping the patient voice at the center of his design. Even in a very fast-paced environment, he was always on the ball and wonderful to work with.",
  },
];
