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
  return (
    <Carousel
      className="mb-10"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <img
            src="/images/portfolio/ethereal_overview.png"
            className="rounded border border-border"
          />
        </CarouselItem>
        <CarouselItem>
          {" "}
          <img
            src="/images/portfolio/ethereal_overview.png"
            className="rounded border border-border"
          />
        </CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default PortfolioCarousel;
