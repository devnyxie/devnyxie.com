"use client";

import React from "react";
import Heading from "../heading";
import { Button } from "../button";
import Link from "next/link";

import FadeIn from "../animations/fadeIn";
import Image from "next/image";
import { Send } from "lucide-react";

type Props = {
  title: string;
  description: string;
  picture: {
    src: string;
    alt: string;
  };
  meetingLink: string;
  available: boolean;
  links?: { to?: string; label: string }[];
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
        <Image
          src={picture.src}
          alt={picture.alt}
          width={"500"}
          height={"500"}
          className="w-32 h-32 border-2 border-muted rounded-full"
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
              <Link href={links[0].to} className="flex gap-2 items-center">
                {links[0].label} <Send />
              </Link>
            </Button>
          )}

          {available ? (
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
                    className={
                      "absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping"
                    }
                  />
                  <span
                    className={
                      "relative inline-flex size-2 scale-90 rounded-full bg-success"
                    }
                  />
                </span>
                Available
              </Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                color={available ? "success" : "destructive"}
                asChild
              >
                <div
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <span className="relative flex size-2">
                    <span
                      className={
                        "absolute inline-flex size-full rounded-full opacity-75 bg-destructive"
                      }
                    />
                    <span
                      className={
                        "relative inline-flex size-2 scale-90 rounded-full bg-destructive"
                      }
                    />
                  </span>
                  Not available
                </div>
              </Button>
            </>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export default Hero;
