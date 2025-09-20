import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ImageModal({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const getOptimalImageStyles = (): React.CSSProperties => {
    if (!imageDimensions.width || !imageDimensions.height) {
      return { maxWidth: "75%", maxHeight: "75%" }; // Fallback
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imageAspectRatio = imageDimensions.width / imageDimensions.height;
    const viewportAspectRatio = viewportWidth / viewportHeight;

    // Reserve some padding (10% on each side)
    const maxWidth = viewportWidth * 0.9;
    const maxHeight = viewportHeight * 0.9;

    let finalWidth, finalHeight;

    if (imageAspectRatio > viewportAspectRatio) {
      // Image is wider relative to viewport - constrain by width
      finalWidth = Math.min(maxWidth, imageDimensions.width);
      finalHeight = finalWidth / imageAspectRatio;

      // If height is still too tall, constrain by height instead
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * imageAspectRatio;
      }
    } else {
      // Image is taller relative to viewport - constrain by height
      finalHeight = Math.min(maxHeight, imageDimensions.height);
      finalWidth = finalHeight * imageAspectRatio;

      // If width is still too wide, constrain by width instead
      if (finalWidth > maxWidth) {
        finalWidth = maxWidth;
        finalHeight = finalWidth / imageAspectRatio;
      }
    }

    return {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
    };
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative flex items-center justify-center p-4 "
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={src}
              alt={alt}
              className="rounded-lg cursor-zoom-out"
              style={getOptimalImageStyles()}
              onLoad={handleImageLoad}
              onClick={onClose}
            />
            {/* <button
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
              onClick={onClose}
            >
              &times;
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
