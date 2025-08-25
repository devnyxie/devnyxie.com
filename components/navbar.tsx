"use client";

import * as React from "react";
import Link from "next/link";
import { Server, ServerCog } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";
import { usePathname } from "next/navigation";

function activeClassName(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
      ? "border border-border bg-accent dark:bg-accent/25"
      : "border border-transparent text-muted-foreground";
  }

  return pathname.startsWith(href)
    ? "border border-border bg-accent dark:bg-accent/25"
    : "border border-transparent text-muted-foreground";
}

/*
Notes:
- "z-2" is for ensuring the navbar's dropdowns appear above other content and remain clickable.
*/

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center justify-center border-b border-border z-2">
      <div className="container max-w-screen-md py-4 flex items-center justify-between px-4 md:px-0">
        <Link href="/" className="font-semibold">
          timothee
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={activeClassName(pathname, "/")}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={activeClassName(pathname, "/blog")}
              >
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={activeClassName(pathname, "/portfolio")}
              >
                <Link href="/portfolio">Portfolio</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={activeClassName(pathname, "/now")}
              >
                <Link href="/now">Now</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={activeClassName(pathname, "/about")}
              >
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={activeClassName(pathname, "/more")}
              >
                More
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="flex-row items-center gap-2">
                        <Server />
                        Self Hosting
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="flex-row items-center gap-2">
                        <ServerCog />
                        Status
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
