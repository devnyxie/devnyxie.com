import { cn } from "@/lib/utils";
import React from "react";

interface SkillItem {
  title: string;
  description?: string;
  icon?: string;
  category: "blue" | "green" | "purple" | "orange" | "pink" | "teal";
}

interface SkillsBentoProps {
  skills: SkillItem[];
  className?: string;
}

const skillCategories = {
  blue: {
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bgColor: "bg-green-50 dark:bg-green-950/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  purple: {
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  pink: {
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  teal: {
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
};

const SkillCard = ({
  skill,
  size = "default",
}: {
  skill: SkillItem;
  size?: "small" | "default" | "large";
}) => {
  const category = skillCategories[skill.category];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:shadow-md hover:border-muted-foreground/20",
        category.bgColor,
        size === "large" && "p-6",
        size === "small" && "p-3"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className="flex-shrink-0">
              <img
                src={skill.icon}
                alt={`${skill.title} icon`}
                className={cn(
                  "transition-all duration-300",
                  size === "large" ? "w-8 h-8" : "w-6 h-6"
                )}
              />
            </div>
          )}
          <h3
            className={cn(
              "font-medium text-foreground-highlighted",
              size === "large" ? "text-lg" : "text-base"
            )}
          >
            {skill.title}
          </h3>
        </div>

        {skill.description && size !== "small" && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {skill.description}
          </p>
        )}
      </div>
    </div>
  );
};

const SkillsBento: React.FC<SkillsBentoProps> = ({ skills, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.title} skill={skill} size="default" />
        ))}
      </div>
    </div>
  );
};

export default SkillsBento;
