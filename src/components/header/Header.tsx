// import React, { useState } from "react";
import NotificationDropdown from "@/components/header/NotificationDropown";
// import UserDropdown from "@/components/header/UserDropdown";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import React from "react";
import { ModeToggle } from "../mode-toggle";

export const AppHeader = () => {
  const breadcrumbs = useBreadcrumb();

  return (
    <header className="flex w-full bg-white dark:bg-gray-950 dark:border-gray-800 border-gray-200 lg:border-b items-center py-1">
      <div className="pb-2 flex items-center px-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex md:items-center justify-between grow lg:flex-row lg:px-6 py-1 ">
        <div className="items-center justify-between w-full gap-4  lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none">
          <div className="flex items-end gap-2 2xsm:gap-3 justify-end px-4">
            <ModeToggle></ModeToggle>
            <NotificationDropdown />
            {/* <UserDropdown /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
