"use client";

import * as React from "react";
import Link from "next/link";
import {
  Server,
  ServerCog,
  Menu,
  X,
  Home,
  Book,
  User2,
  LucideClock4,
  Download,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/shadcn/navigation-menu";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/shadcn/button";

function activeClassName(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
      ? "border border-border bg-accent/25 text-foreground-highlighted"
      : "border border-transparent text-muted-foreground";
  }

  return pathname.startsWith(href)
    ? "border border-border bg-accent/25 text-foreground-highlighted"
    : "border border-transparent text-muted-foreground";
}

/*
Notes:
- "z-2" is for ensuring the navbar's dropdowns appear above other content and remain clickable.
*/

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open and handle keyboard events
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: Book },
    { href: "/portfolio", label: "Portfolio", icon: Book },
    { href: "/now", label: "Now", icon: LucideClock4 },
    { href: "/about", label: "About", icon: User2 },
  ];

  const moreItems = [
    { href: "/self-hosting", label: "Self Hosting", icon: Server },
    // todo: shouldn't be hardcoded
    { href: "https://status.devnyxie.com", label: "Status", icon: ServerCog, target: "_blank" },
    { href: "/resume", label: "Resume", icon: Download, target: "_blank" },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-center border-b border-border dark:border-border/50 z-[2]">
        <div className="container max-w-screen-md py-4 flex items-center justify-between px-4 md:px-0">
          <Link href="/" className="font-semibold">
            timothee
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList>
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={item.href + "-desktop"}>
                  <NavigationMenuLink
                    asChild
                    className={activeClassName(pathname, item.href)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={activeClassName(pathname, "/more")}
                >
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      {moreItems.map((item) => (
                        <NavigationMenuLink
                          asChild
                          key={item.href + "-desktop"}
                        >
                          <Link
                            href={item.href}
                            className="flex-row items-center gap-2"
                            target={item.target}
                          >
                            <item.icon />
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-out translate-x-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold">Navigation</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="h-8 w-8"
                  aria-label="Close navigation menu"
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-2 px-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href + "-mobile"}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors ${
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href))
                          ? "bg-accent/25 text-foreground-highlighted border border-border"
                          : "text-muted-foreground hover:bg-accent/25 hover:text-foreground-highlighted border border-transparent hover:border-border/50"
                      }`}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  ))}

                  {/* More Section */}
                  <div className="pt-4 mt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground px-3 mb-2 uppercase tracking-wider">
                      More
                    </div>
                    {moreItems.map((item) => (
                      <Link
                        key={item.href + "-mobile"}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors text-muted-foreground hover:bg-accent/25 hover:text-foreground-highlighted border border-transparent hover:border-border/50"
                        target={item.target}
                      >
                        <item.icon className="size-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
