import { IconBrandGithub } from "@tabler/icons-react";
import { Mail, Rss, Calendar, Notebook, Download } from "lucide-react";
import React from "react";
import { APP_CONFIG } from "@/lib/app.config";

const fontSize = "font-normal"; // "font-normal" | "font-medium"

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

const primaryItems: Item[] = [
  {
    href: `mailto:${APP_CONFIG.email}`,
    label: "Email",
    icon: <Mail size={16} />,
    external: true,
  },
  {
    href: APP_CONFIG.meetingLink,
    label: "Let's Talk",
    icon: <Calendar size={16} />,
    external: true,
  },
  {
    href: "/resume",
    label: "Resume",
    icon: <Download size={16} />,
    external: true,
  },
];

const secondaryItems: Item[] = [
  {
    href: `/blog/feed.xml`,
    label: "RSS",
    icon: <Rss size={16} />,
  },
  {
    href: `https://github.com/${APP_CONFIG.github_username}`,
    label: "GitHub",
    icon: <IconBrandGithub size={16} />,
    external: true,
  },
  {
    href: "https://notes.devnyxie.com",
    label: "Notes",
    icon: <Notebook size={16} />,
    external: true,
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border py-8">
      <div className="container max-w-screen-md mx-auto px-4 md:px-0">
        <div className="flex flex-col items-center gap-4">
          {/* Primary Links - Contact & Resume */}
          <div className="flex gap-6 flex-wrap items-center justify-center">
            {primaryItems.map((item: Item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm text-muted-foreground
                              hover:text-foreground transition-colors ${fontSize}`}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Secondary Links - Social & Other */}
          <div className="flex gap-6 flex-wrap items-center justify-center">
            {secondaryItems.map((item: Item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm text-muted-foreground
                              hover:text-foreground transition-colors ${fontSize}`}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center">
            © {currentYear} Tim Afanasiev. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
