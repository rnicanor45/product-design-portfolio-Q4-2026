import type { ImageRef } from "@/data/projects";
import { ZoomableFillImage, ZoomableImage } from "@/components/lightbox/zoomable-image";

/** Grid column count for a gallery, tuned so small counts don't stretch into
 * awkwardly wide cells and larger counts still read as a tidy grid. */
function galleryCols(count: number) {
  if (count <= 2) return "grid-cols-2";
  if (count === 4) return "grid-cols-2 sm:grid-cols-4";
  return "grid-cols-2 sm:grid-cols-3";
}

/** A single full-width image in a bordered frame, optionally captioned.
 * Shared between case study content blocks and the About page. */
export function SingleImage({
  image,
  caption,
}: {
  image: ImageRef;
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <ZoomableImage
        image={image}
        wrapperClassName="overflow-hidden rounded-xl border border-border bg-surface"
        imageClassName="h-auto w-full"
        sizes="(min-width: 768px) 720px, 100vw"
      />
      {caption ? <figcaption className="text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/** A responsive grid of 2+ related images, with an optional caption labeling
 * the group as a whole. Shared between case study content blocks and the
 * About page. */
export function Gallery({
  images,
  caption,
}: {
  images: ImageRef[];
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className={`grid gap-3 ${galleryCols(images.length)}`}>
        {images.map((img, i) => (
          <ZoomableFillImage
            key={i}
            image={img}
            wrapperClassName="h-56 overflow-hidden rounded-xl border border-border bg-surface"
            imageClassName="object-contain p-3"
            sizes="(min-width: 640px) 33vw, 50vw"
          />
        ))}
      </div>
      {caption ? <figcaption className="text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
