import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { de } from "zod/locales";

type Props = {
  title: string;
};

// published: {
//   icon: "material-symbols:check-rounded",
//   color: "success",
//   title: "Published",
// },
// draft: {
//   icon: "material-symbols:edit-outline-rounded",
//   color: "neutral",
//   title: "Draft",
// },
// archived: {
//   icon: "material-symbols:archive-rounded",
//   color: "warning",
//   title: "Archived",
// },
// in_progress: {
//   icon: "material-symbols:hourglass-bottom",
//   color: "info",
//   title: "In Progress",
// },

const stateLabels: { [key: string]: { title: string; classes: string } } = {
  "in-progress": {
    title: "In Progress",
    classes: "bg-blue-100 text-blue-800 dark:bg-blue-400/10 dark:text-blue-300",
  },
  published: {
    title: "Published",
    classes:
      "bg-green-100 text-green-800 dark:bg-green-600/20 dark:text-green-400",
  },
  archived: {
    title: "Archived",
    classes:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600/20 dark:text-amber-300",
  },
  draft: {
    title: "Draft",
    classes: "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-200",
  },
};

function ProjectState({ title }: Props) {
  const lwtitle = title.toLowerCase();
  console.log("lwtitle", title);
  return (
    <div
      className={`
        inline-flex items-center justify-center gap-2 whitespace-nowrap rounded transition-all text-xs px-2 has-[>svg]:px-2.5
        ${stateLabels[lwtitle]?.classes}
        `}
    >
      {stateLabels[lwtitle]?.title || title}
    </div>
  );
}

export default ProjectState;
