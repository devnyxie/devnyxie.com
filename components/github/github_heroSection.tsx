import React from "react";
import GithubCalendar from "./githubCalendar";
import { Button } from "../button";
// import { RiNextjsFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import Heading from "../heading";

// const contributions = [
//   {
//     name: "@vercel/next.js",
//     url: "https://github.com/vercel/next.js",
//     reactIcon: RiNextjsFill,
//   },
//   {
//     name: "@mui/material-ui",
//     url: "https://github.com/mui/material-ui",
//     icon: "/logos/material-ui.svg",
//   },
//   {
//     name: "@pterm/pterm",
//     url: "https://github.com/pterm/pterm",
//     icon: "/logos/pterm.png",
//   },
// ];

function GitHeroSection() {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* <h2 className="mb-1">My Open Source Journey</h2> */}
      <Heading size="default" className="mb-2">
        My Open Source Journey
      </Heading>
      <div className="text-muted-foreground mb-4 text-sm">
        Each green square represents a day of contribution, a step towards
        better software for everyone.
      </div>
      <GithubCalendar />
    </div>
  );
}

export default GitHeroSection;
