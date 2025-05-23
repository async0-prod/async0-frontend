"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const pathsArray = ["/"];
  const parts = pathname.split("/").filter((part) => part);
  let currentPath = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    pathsArray.push(currentPath);
  }
  return (
    <Breadcrumb className="pb-4 px-48">
      <BreadcrumbList>
        {pathsArray.length > 0 &&
          pathsArray.map((path, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="capitalize" asChild>
                    <Link href={`${path}`}>
                      {index === 0 ? "Home" : path.split("/").pop()}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index != pathsArray.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
