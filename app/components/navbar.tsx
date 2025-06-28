"use client";

import Link from "next/link";
import { Route } from "../layout";
import { usePathname } from "next/navigation";
// import { routes } from "../layout";

interface NavbarProps {
  routes: readonly Route[];
}

// todo: darkmode support
export default function Navbar({ routes }: NavbarProps) {
  const pathname = usePathname();
  return (
    <div className="border-b border-outline w-full flex justify-center">
      <div className="container-medium flex justify-start mx-2">
        {routes.map((route) => {
          return (
            <div
              key={`nav-link-${route.name}`}
              className={`capitalize ${
                pathname === route.path
                  ? "border-b border-foreground "
                  : "text-foreground-secondary hover:text-foreground-secondary-hover"
              } me-4 py-4 duration-100 transition-opacity`}
              style={{
                transitionProperty: "color, border-color, opacity",
              }}
            >
              <Link href={route.path}>{route.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
