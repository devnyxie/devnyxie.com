import { IconBrandGithub } from "@tabler/icons-react";
import { MailboxIcon, Rss } from "lucide-react";
import React from "react";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
    label: "RSS Feed",
    icon: <Rss size={16} />,
  },
  {
    href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
    label: "Source",
    icon: <IconBrandGithub size={16} />,
  },
  {
    href: "https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
    label: "Contact",
    icon: <MailboxIcon size={16} />,
  },
];

function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-4">
      {items.map((item: Item) => {
        return (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </footer>
  );
}

export default Footer;
