"use client";

import React from "react";
import Heading from "../heading";
import { Button } from "../button";
import Link from "next/link";

import FadeIn from "../animations/fadeIn";

type Props = {
  title: string;
  description: string;
  picture: {
    src: string;
    alt: string;
  };
  meetingLink: string;
  available: boolean;
  links?: {
    to?: string;
    label: string;
    target?: "_blank" | "_self";
  }[];
};

function Hero({
  title,
  description,
  picture,
  meetingLink,
  available,
  links,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <FadeIn delay={0.1}>
        <img
          src={picture.src}
          alt={picture.alt}
          className="w-24 h-24 border-2 border-muted rounded-full"
        />
      </FadeIn>
      <div className="max-w-xl mx-auto">
        <FadeIn delay={0.1}>
          <Heading size="big" className="text-center text-shadow-md">
            {title}
          </Heading>
        </FadeIn>
      </div>
      <FadeIn delay={0.3}>
        <p className="text-muted-foreground text-center mx-auto max-w-2xl text-balance">
          {description}
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <div className="flex gap-2">
          {links && links.length > 0 && links[0].to && (
            <Button asChild>
              <Link
                href={links[0].to}
                target={links[0].target}
                rel={
                  links[0].target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex gap-2 items-center"
              >
                {links[0].label}
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            color={available ? "success" : "destructive"}
            asChild
          >
            <Link
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center"
            >
              <span className="relative flex size-2">
                <span
                  className={`
                  absolute inline-flex size-full rounded-full opacity-75
                  ${available ? "bg-success animate-ping" : "bg-destructive"}
                  `}
                />
                <span
                  className={`
                  relative inline-flex size-2 scale-90 rounded-full
                  ${available ? "bg-success" : "bg-destructive"}
                  `}
                />
              </span>
              {available ? "Available" : "Not available"}
            </Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}

export default Hero;
