"use client";

import React from "react";
import { getPageData } from "@/lib/api/pages";
import Heading from "../heading";
import { Button } from "../button";
import Link from "next/link";
// import { motion } from "motion/react";
import { motion } from "framer-motion";

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
      <img
        src={picture.src}
        alt={picture.alt}
        className="w-24 h-24 border-2 border-muted rounded-full"
      />
      <Heading size="big" className="text-center text-shadow-md">
        {title}
      </Heading>
      {/* <div className="max-w-lg mx-auto">
        <motion.p
          className="text-shadow-md text-4xl font-bold text-center tracking-tight text-pretty"
          initial={{
            scale: 1.1,
            opacity: 0,
            filter: "blur(20px)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
        >
          {title}
        </motion.p>
      </div> */}
      <p className="text-muted-foreground text-center mx-auto max-w-2xl text-balance">
        {description}
      </p>
      <div className="flex gap-2">
        {links && links.length > 0 && links[0].to && (
          <Button asChild>
            <Link href={links[0].to} className="flex gap-2 items-center">
              {links[0].label}
            </Link>
          </Button>
        )}
        <Button
          variant="ghost"
          color="success"
          className="flex gap-2 items-center"
        >
          <span className="relative flex size-2">
            <span
              className={`
                  absolute inline-flex size-full rounded-full opacity-75
                  ${available ? "bg-success animate-ping" : "bg-error"}
                  `}
            />
            <span
              className={`
                  relative inline-flex size-2 scale-90 rounded-full
                  ${available ? "bg-success" : "bg-error"}
                  `}
            />
          </span>
          {available ? "Available" : "Not available at the moment"}
        </Button>
      </div>
    </div>
  );
}

export default Hero;
