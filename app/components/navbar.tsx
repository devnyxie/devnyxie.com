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
    <div className=" border-b border-b-zinc-800 w-full flex justify-center">
      <div className="container-small flex justify-start">
        {routes.map((route) => {
          return (
            <div
              key={`nav-link-${route.name}`}
              className={`capitalize ${
                pathname === route.path
                  ? "text-white border-b border-white opacity-100"
                  : "text-zinc-400 hover:text-zinc-200 opacity-60"
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
