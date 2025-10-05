import React from "react";
import GithubCalendar from "./githubCalendar";

import Heading from "../heading";

// todo: wire up heading and description from index page data

function GitHeroSection() {
  return (
    <div className="w-full flex flex-col justify-center">
      <Heading size="default" className="mb-2">
        My Open Source Journey
      </Heading>
      <div className="text-muted-foreground mb-6 text-sm">
        Each green square represents a day of contribution, a step towards
        better software for everyone.
      </div>
      <GithubCalendar />
    </div>
  );
}

export default GitHeroSection;
