import Image from "next/image";

interface DesignShowcaseProps {
  images: string[];
}

export default function DesignShowcase({ images }: DesignShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => {
        // Extract a clean name from the filename
        const cleanName = image
          .replace(/\.[^/.]+$/, "") // Remove file extension
          .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
          .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={`/images/portfolio/${image}`}
                alt={cleanName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm text-foreground line-clamp-2">
                {cleanName}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Design Showcase
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
