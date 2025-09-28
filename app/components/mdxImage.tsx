"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";

export const MdxImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`
            object-cover cursor-zoom-in hover:opacity-80
            transition-all duration-300 group-hover:scale-105 select-none
            my-2
            ${className}`}
        loading="lazy"
        onClick={() => {
          setOpen(true);
        }}
      />
      <ImageModal
        src={src}
        alt={alt}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
