import React from "react";
import { getPageData } from "@/lib/api/pages";
import Heading from "../heading";
import { Button } from "../button";

type Props = {
  title: string;
  description: string;
  picture: {
    src: string;
    alt: string;
  };
};

async function Hero({ title, description, picture }: Props) {
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
      <p className="text-muted-foreground text-center mx-auto max-w-2xl text-balance">
        {description}
      </p>
      {/* <UButton v-bind="page.hero.links[0]" />
      <UButton
        :color="global.available ? 'success' : 'error'"
        variant="ghost"
        class="gap-2"
        :to="global.available ? global.meetingLink : ''"
        :label="
          global.available ? 'Available' : 'Not available at the moment'
        "
      >
      <template #leading>
        <span class="relative flex size-2">
          <span
            class="absolute inline-flex size-full rounded-full opacity-75"
            :class="
              global.available ? 'bg-success animate-ping' : 'bg-error'
            "
          />
          <span
            class="relative inline-flex size-2 scale-90 rounded-full"
            :class="global.available ? 'bg-success' : 'bg-error'"
          />
        </span>
      </template>
    </UButton> */}
      <Button className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5">
        Let's Talk
      </Button>
      <div className="rounded-md font-medium inline-flex items-center transition-colors px-2.5 py-1.5 text-sm gap-1.5 bg-primary text-primary-foreground">
        Let's Talk
      </div>
    </div>
  );
}

export default Hero;
