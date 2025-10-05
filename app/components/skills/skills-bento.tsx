import { cn } from "@/lib/utils";
import Image from "next/image";
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
        "group relative overflow-hidden rounded-lg border bg-card p-4",
        category.bgColor,
        size === "large" && "p-6",
        size === "small" && "p-3"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className="flex-shrink-0">
              <Image
                width={64}
                height={64}
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
  // Group skills into rows for precise control over layout
  const rows = [];
  for (let i = 0; i < skills.length; i += 3) {
    rows.push(skills.slice(i, Math.min(i + 3, skills.length)));
  }
  
  return (
    <div className={cn("w-full", className)}>
      {rows.map((row, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          className="mb-4 last:mb-0"
        >
          {/* Mobile: 1 column layout */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {row.map((skill) => (
              <SkillCard key={`mobile-${skill.title}`} skill={skill} size="default" />
            ))}
          </div>
          
          {/* Tablet: 2 column layout with special handling for incomplete rows */}
          <div className="hidden md:grid lg:hidden gap-4">
            {row.length === 1 ? (
              // Single item row - full width
              <div className="grid grid-cols-1 gap-4">
                <SkillCard key={`tablet-${row[0].title}`} skill={row[0]} size="default" />
              </div>
            ) : row.length === 2 ? (
              // Two item row - split evenly
              <div className="grid grid-cols-2 gap-4">
                {row.map((skill) => (
                  <SkillCard key={`tablet-${skill.title}`} skill={skill} size="default" />
                ))}
              </div>
            ) : (
              // Three item row - 2 columns (tablet can't fit 3 columns well)
              <div className="grid grid-cols-2 gap-4">
                <SkillCard key={`tablet-${row[0].title}`} skill={row[0]} size="default" />
                <SkillCard key={`tablet-${row[1].title}`} skill={row[1]} size="default" />
                <div className="col-span-2">
                  <SkillCard key={`tablet-${row[2].title}`} skill={row[2]} size="default" />
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop: 3 column layout with even distribution for incomplete rows */}
          <div className="hidden lg:grid gap-4" 
            style={{
              gridTemplateColumns: row.length === 1 ? "1fr" : row.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr"
            }}
          >
            {row.map((skill) => (
              <SkillCard key={`desktop-${skill.title}`} skill={skill} size="default" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default SkillsBento;
