import React from "react";
import FadeIn from "../animations/fadeIn";
import Heading from "../heading";

function AboutMe({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <FadeIn delay={0.6}>
      <div className="px-0 !pt-0 gap-8 sm:gap-6 lg:gap-8">
        <div className="mb-4">
          <Heading size="default">{title}</Heading>
        </div>
        <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </FadeIn>
  );
}

export default AboutMe;
