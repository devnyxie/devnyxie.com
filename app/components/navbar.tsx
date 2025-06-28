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
          if (route.name === "status") {
            return (
              <div
                key={`nav-link-${route.name}`}
                className={`capitalize flex items-center ${
                  pathname === route.path
                    ? "border-b border-foreground "
                    : "text-foreground-secondary hover:text-foreground-secondary-hover"
                } me-4 py-4 duration-100 transition-opacity`}
                style={{
                  transitionProperty: "color, border-color, opacity",
                }}
              >
                <Link
                  href={route.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {route.name}
                </Link>
                {/* <div
                  id="status-indicator"
                  className="h-full flex items-center ms-2"
                >
                  <span className="inline-block w-2 h-2 mt-0.5 bg-green-500 rounded-full animate-pulse"></span>
                </div> */}
                <div
                  id="status-indicator"
                  className="h-full flex items-center ms-2 relative"
                >
                  <span className="inline-block w-2 h-2 mt-0.5 bg-green-800 rounded-full animate-pulse absolute transform -translate-x-1/2"></span>
                  <span className="inline-block w-1 h-1 mt-0.5 bg-green-400 rounded-full absolute transform -translate-x-1/2"></span>
                </div>
              </div>
            );
          } else {
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
          }
        })}
      </div>
    </div>
  );
}
