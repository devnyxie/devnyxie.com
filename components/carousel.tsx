"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";
import Autoplay from "embla-carousel-autoplay";

function PortfolioCarousel() {
  const items = [
    "/images/portfolio/ethereal_overview.png",
    "/images/portfolio/ethereal_preview.png",
    "/images/portfolio/Frame 115.png",
    "/images/portfolio/Frame 154.png",
    "/images/portfolio/Frame 158.png",
    "/images/portfolio/Frame 28.png",
    "/images/portfolio/Frame 47258.png",
    "/images/portfolio/Frame 60.png",
    "/images/portfolio/Futuristic Demo.png",
    "/images/portfolio/kujira_dark.png",
    "/images/portfolio/kujira_whale.png",
    "/images/portfolio/nigiri_overview.png",
    "/images/portfolio/solar_map.png",
    "/images/portfolio/website.png",
  ];
  return (
    <Carousel
      className="mb-10"
      plugins={
        [
          // Autoplay({
          //   delay: 5000,
          // }),
        ]
      }
    >
      <CarouselContent>
        {items.map((src, index) => (
          <CarouselItem key={index}>
            <img
              src={src}
              alt={`Portfolio item ${index + 1}`}
              className="w-full h-full aspect-video object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default PortfolioCarousel;
