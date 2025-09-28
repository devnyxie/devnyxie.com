import React from "react";
import GithubCalendar from "./githubCalendar";

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
      <Heading size="default" className="mb-4">
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
