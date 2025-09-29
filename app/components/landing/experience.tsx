import React from "react";
import FadeIn from "../animations/fadeIn";
import Heading from "../heading";
import { formatDate } from "@/lib/utils";
import { IndexPageType } from "@/lib/types/pages";

function Experience({
  experience,
}: {
  experience: IndexPageType["experience"];
}) {
  return (
    <FadeIn delay={0.6}>
      <div className="px-0 !pt-0 gap-8 sm:gap-6 lg:gap-8">
        <div className="mb-4">
          <Heading size="default">{experience.title}</Heading>
        </div>
        <ul className="list-disc list-inside text-sm sm:text-md lg:text-sm flex flex-col gap-2">
          {experience.items.map((item) => (
            <li
              key={item.position}
              className="w-full flex items-center gap-1 text-sm"
            >
              <div className="text-muted-foreground">
                {typeof item.date === "string"
                  ? item.date
                  : formatDate(item.date)}
              </div>
              <hr className="grow bg-bg-muted" />
              <a
                href={item.company.url}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="font-sm">{item.position}</div>
                <span>at</span>
                <span className="font-medium">{item.company.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

export default Experience;
