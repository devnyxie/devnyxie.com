"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface GalleryImage {
  src: string;
  alt: string;
}

export const MdxGallery = ({
  images,
  columns = 3,
  className = "",
}: {
  images: GalleryImage[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) => {
  const [openModals, setOpenModals] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const handleImageClick = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };

  const handleCloseModal = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <>
      <div className={`mdx-component my-6 ${className}`}>
        <div className={`grid ${getGridCols()}`}>
          {images.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-300 cursor-zoom-in h-48 sm:h-56 lg:h-64 relative"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-[102%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <ImageModal
                src={image.src}
                alt={image.alt}
                isOpen={openModals[index]}
                onClose={() => handleCloseModal(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
