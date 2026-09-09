import type { ContentBlock } from "@/data/projects";
import { Gallery, SingleImage } from "@/components/media";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-6 text-xl font-semibold tracking-tight text-fg first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={index} className="leading-relaxed text-muted">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex gap-3 leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-fg" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "stats":
            return (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-3"
              >
                {block.items.map((stat) => (
                  <div key={stat.label}>
                    <p className="gradient-text w-fit text-lg font-bold sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            );

          case "image":
            return <SingleImage key={index} image={block.image} caption={block.caption} />;

          case "gallery":
            return <Gallery key={index} images={block.images} caption={block.caption} />;

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-fg pl-5 text-lg text-fg"
              >
                <p>{block.text}</p>
                {block.attribution ? (
                  <footer className="mt-2 text-sm text-muted">
                    {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
