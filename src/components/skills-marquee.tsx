const skills = [
  "UX Design",
  "UI Design",
  "User Research",
  "Testing",
  "Service Design",
  "Product Strategy",
  "Design Systems",
  "Workshops",
  "Interaction Design",
  "UX Writing",
];

export function SkillsMarquee() {
  // Rendered twice back-to-back so the CSS animation can loop seamlessly
  // (translate exactly -50% and the second copy picks up where the first
  // left off). Decorative — hidden from assistive tech, which already gets
  // this information as real content elsewhere on the page.
  const track = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {skills.map((skill) => (
        <li
          key={skill}
          className="flex items-center gap-8 whitespace-nowrap text-sm font-medium text-muted"
        >
          {skill}
          <span aria-hidden className="text-muted">
            •
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-border py-5"
    >
      <div className="marquee-track flex w-max">
        {track}
        {track}
      </div>
    </div>
  );
}
