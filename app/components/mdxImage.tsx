"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

export const MdxImage = ({
  src,
  alt = "Embedded image",
  className = "",
  width = 1200,
  height = 800,
}: {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`cursor-zoom-in my-2 select-none ${className}`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover hover:opacity-80 transition-all duration-300 group-hover:scale-105 w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        />
      </div>
      <ImageModal
        src={src}
        alt={alt}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
