import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { de } from "zod/locales";
import {
  Archive,
  Check,
  Clock,
  Edit2,
  Edit2Icon,
  FileEdit,
  LucideProps,
} from "lucide-react";

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

const stateLabels: {
  [key: string]: {
    title: string;
    classes: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
} = {
  "in-progress": {
    title: "In Progress",
    classes: "bg-blue-100 text-blue-800 dark:bg-blue-400/10 dark:text-blue-300",
    icon: Clock,
  },
  published: {
    title: "Published",
    classes:
      "bg-green-100 text-green-800 dark:bg-green-600/20 dark:text-green-400",
    icon: Check,
  },
  archived: {
    title: "Archived",
    classes:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600/20 dark:text-amber-300",
    icon: Archive,
  },
  draft: {
    title: "Draft",
    classes: "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-200",
    icon: FileEdit,
  },
};

function ProjectState({ title }: Props) {
  const state = title.toLowerCase();
  console.log("state", title);

  const label = stateLabels[state];
  if (!state) {
    throw new Error(`Portfolio Page: Invalid state provided '${state}'`);
  }
  const Icon = label.icon;
  if (!label) {
    throw new Error(`Portfolio Page: No icon set for state '${state}'`);
  }
  return (
    <div
      className={`
        inline-flex items-center justify-center gap-1 whitespace-nowrap rounded transition-all text-xs px-1.5 has-[>svg]:px-2
        ${stateLabels[state]?.classes}
        `}
    >
      <Icon size={14} />
      {stateLabels[state]?.title || title}
    </div>
  );
}

export default ProjectState;
