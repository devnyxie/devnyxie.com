import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SkillItem {
  title: string;
  description?: string;
  icon?: string;
  category: "blue" | "green" | "purple" | "orange" | "pink" | "teal";
  size?: "small" | "medium" | "large";
}

interface SkillsBentoProps {
  skills: SkillItem[];
  className?: string;
}

const skillCategories = {
  blue: {
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10",
    border: "border-blue-200/50 dark:border-blue-800/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    accent: "bg-blue-500/10 dark:bg-blue-400/20",
    shadow: "shadow-blue-500/10 dark:shadow-blue-400/5",
  },
  green: {
    gradient: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10",
    border: "border-green-200/50 dark:border-green-800/30",
    iconColor: "text-green-600 dark:text-green-400",
    accent: "bg-green-500/10 dark:bg-green-400/20",
    shadow: "shadow-green-500/10 dark:shadow-green-400/5",
  },
  purple: {
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10",
    border: "border-purple-200/50 dark:border-purple-800/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    accent: "bg-purple-500/10 dark:bg-purple-400/20",
    shadow: "shadow-purple-500/10 dark:shadow-purple-400/5",
  },
  orange: {
    gradient: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10",
    border: "border-orange-200/50 dark:border-orange-800/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    accent: "bg-orange-500/10 dark:bg-orange-400/20",
    shadow: "shadow-orange-500/10 dark:shadow-orange-400/5",
  },
  pink: {
    gradient: "bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/20 dark:to-pink-900/10",
    border: "border-pink-200/50 dark:border-pink-800/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    accent: "bg-pink-500/10 dark:bg-pink-400/20",
    shadow: "shadow-pink-500/10 dark:shadow-pink-400/5",
  },
  teal: {
    gradient: "bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10",
    border: "border-teal-200/50 dark:border-teal-800/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    accent: "bg-teal-500/10 dark:bg-teal-400/20",
    shadow: "shadow-teal-500/10 dark:shadow-teal-400/5",
  },
};

const SkillCard = ({ skill }: { skill: SkillItem }) => {
  const category = skillCategories[skill.category];
  const size = skill.size || "medium";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer",
        "hover:scale-[1.03] hover:-translate-y-2 active:scale-[0.98]",
        category.gradient,
        category.border,
        // "border border-border",
        category.shadow,
        "shadow-sm hover:shadow-xl",
        // Size-based padding and styling - large only on desktop, medium on smaller screens
        size === "large" && "p-5 min-h-[160px] lg:p-7 lg:min-h-[200px]",
        size === "medium" && "p-5 min-h-[160px]",
        size === "small" && "p-5 min-h-[160px] lg:p-4 lg:min-h-[120px]"
      )}
    >
      
      {/* Floating particles effect */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30 transition-opacity duration-700">
        <div className={cn(
          "absolute w-2 h-2 rounded-full animate-bounce",
          category.iconColor,
          "top-1/4 left-1/4"
        )} style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className={cn(
          "absolute w-1 h-1 rounded-full animate-bounce",
          category.iconColor,
          "top-3/4 right-1/3"
        )} style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className={cn(
          "absolute w-1.5 h-1.5 rounded-full animate-bounce",
          category.iconColor,
          "bottom-1/3 left-2/3"
        )} style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
       */}
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Header with icon and title */}
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className={cn(
              "relative flex-shrink-0 rounded-lg p-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2",
              category.accent,
              "shadow-sm group-hover:shadow-md"
            )}>
              <Image
                width={32}
                height={32}
                src={skill.icon}
                alt={`${skill.title} icon`}
                className={cn(
                  "transition-all duration-500 filter brightness-90 group-hover:brightness-110",
                  // Medium size on mobile/tablet, large size only on desktop for large skills
                  size === "large" ? "w-5 h-5 lg:w-6 lg:h-6" : size === "medium" ? "w-5 h-5" : "w-5 h-5 lg:w-4 lg:h-4",
                  category.iconColor
                )}
              />
              {/* Animated glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg opacity-0 transition-all duration-500 group-hover:opacity-30 animate-pulse",
                category.accent,
                "blur-sm"
              )} />
              {/* Subtle ring on hover */}
              <div className={cn(
                "absolute inset-0 rounded-lg border-2 opacity-0 transition-all duration-300 group-hover:opacity-50",
                category.border
              )} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-bold text-foreground-highlighted transition-all duration-300 group-hover:text-foreground line-clamp-2",
                "group-hover:tracking-wide",
                // Medium size on mobile/tablet, large size only on desktop for large skills
                size === "large" ? "text-lg leading-tight lg:text-xl lg:leading-tight" : size === "medium" ? "text-lg leading-tight" : "text-lg leading-tight lg:text-base lg:leading-tight"
              )}
            >
              {skill.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {skill.description && (
          <div className="relative">
            <p className={cn(
              "text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80",
              // Medium text size on mobile/tablet, large text only on desktop for large skills
              size === "large" ? "text-xs lg:text-sm" : "text-xs",
              size === "large" ? "line-clamp-3 lg:line-clamp-4" : "line-clamp-3"
            )}>
              {skill.description}
            </p>
          </div>
        )}

        {/* Interactive hover accent */}
        <div className={cn(
          "absolute -inset-0.5 rounded-xl opacity-0 transition-all duration-500 group-hover:opacity-100 -z-10",
          category.gradient,
          "blur-sm"
        )} />
      </div>
    </div>
  );
};

const SkillsBento: React.FC<SkillsBentoProps> = ({ skills, className }) => {
  // Separate skills by size for better layout control
  const largeSkills = skills.filter(skill => skill.size === "large");
  const mediumSkills = skills.filter(skill => skill.size === "medium");
  const smallSkills = skills.filter(skill => skill.size === "small");

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Mobile/Tablet: All skills in equal grid, Desktop: Large skills get special treatment */}
      <div className="block lg:hidden">
        {/* On smaller screens, all skills are equal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </div>
      </div>

      {/* Desktop layout: Large skills separate, others in 3-column grid */}
      <div className="hidden lg:block space-y-6">
        {/* Large skills - Hero section with 50% each */}
        {largeSkills.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            {largeSkills.map((skill) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </div>
        )}
        
        {/* Medium and small skills - 3-column grid */}
        {(mediumSkills.length > 0 || smallSkills.length > 0) && (
          <div className="grid grid-cols-3 gap-5">
            {[...mediumSkills, ...smallSkills].map((skill) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SkillsBento;
