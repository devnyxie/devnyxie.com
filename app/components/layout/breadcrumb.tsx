"use client";

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/shadcn/breadcrumb";
import { useBreadcrumbs } from "@/app/hooks/useBreadcrumbs";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface PageBreadcrumbProps {
  pageTitle?: string;
  customItems?: BreadcrumbItem[];
}

export default function PageBreadcrumb({
  pageTitle,
  customItems,
}: PageBreadcrumbProps) {
  const defaultItems = useBreadcrumbs(pageTitle);

  if (defaultItems.length === 0 && !customItems) {
    return null;
  }

  const items = customItems || defaultItems;

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
