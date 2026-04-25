import { IconBrandGithub } from "@tabler/icons-react";
import {
  Mail,
  Rss,
  Calendar,
  Notebook,
  Download,
  Home,
  Book,
  Briefcase,
  Clock4,
  User2,
  Server,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { APP_CONFIG } from "@/app.config";
import { FooterServerStatus } from "@/app/components/layout/footer-server-status";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

const navItems: Item[] = [
  { href: "/", label: "Home", icon: <Home size={14} /> },
  { href: "/blog", label: "Blog", icon: <Book size={14} /> },
  { href: "/portfolio", label: "Portfolio", icon: <Briefcase size={14} /> },
  { href: "/now", label: "Now", icon: <Clock4 size={14} /> },
  { href: "/about", label: "About", icon: <User2 size={14} /> },
  { href: "/self-hosting", label: "Self Hosting", icon: <Server size={14} /> },
];

const connectItems: Item[] = [
  {
    href: `mailto:${APP_CONFIG.email}`,
    label: "Email",
    icon: <Mail size={14} />,
    external: true,
  },
  {
    href: APP_CONFIG.meetingLink,
    label: "Let's Talk",
    icon: <Calendar size={14} />,
    external: true,
  },
  {
    href: `https://github.com/${APP_CONFIG.github_username}`,
    label: "GitHub",
    icon: <IconBrandGithub size={14} />,
    external: true,
  },
  {
    href: "https://notes.devnyxie.com",
    label: "Notes",
    icon: <Notebook size={14} />,
    external: true,
  },
  {
    href: "/blog/feed.xml",
    label: "RSS",
    icon: <Rss size={14} />,
  },
  {
    href: "/resume",
    label: "Resume",
    icon: <Download size={14} />,
    external: true,
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border pt-10 pb-6">
      <div className="container max-w-screen-md mx-auto px-4 md:px-0">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-semibold text-foreground hover:opacity-80 transition-opacity"
            >
              timothee
            </Link>
            <p className="text-sm text-muted-foreground">
              {APP_CONFIG.og_img.title}
            </p>
            {APP_CONFIG.available && (
              <span className="flex items-center gap-1.5 text-xs text-green-500 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Available for work
              </span>
            )}
          </div>

          {/* Column 2 — Navigate */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground uppercase tracking-wider">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Connect */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground uppercase tracking-wider">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              {connectItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Tim Afanasiev. All rights reserved.
          </p>
          <FooterServerStatus />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
