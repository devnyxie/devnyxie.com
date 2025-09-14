import { IconBrandGithub } from "@tabler/icons-react";
import { Mail, Rss, Calendar } from "lucide-react";
import React from "react";
import { APP_CONFIG } from "@/lib/app.config";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

const items: Item[] = [
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
    href: APP_CONFIG.meetingLink,
    label: "Let's Talk",
    icon: <Calendar size={16} />,
    external: true,
  },
  {
    href: `mailto:${APP_CONFIG.email}`,
    label: "Email",
    icon: <Mail size={16} />,
    external: true,
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border py-8 mt-16">
      <div className="container max-w-screen-md mx-auto px-4 md:px-0">
        <div className="flex flex-col items-center gap-6">
          {/* Links */}
          <div className="flex gap-6 flex-wrap items-center justify-center">
            {items.map((item: Item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
