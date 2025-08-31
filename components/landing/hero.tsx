import React from "react";
import { getPageData } from "@/lib/api/pages";

type Props = {
  title: string;
  description: string;
  picture: {
    src: string;
    alt: string;
  };
};

async function Hero({ title, description, picture }: Props) {
  return (
    <div>
      <img
        src={picture.src}
        alt={picture.alt}
        className="w-24 h-24 border-2 border-muted rounded-full"
      />
    </div>
  );
}

export default Hero;
