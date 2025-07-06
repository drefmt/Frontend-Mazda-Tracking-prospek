// import React, { useState } from "react";
import NotificationDropdown from "@/components/header/NotificationDropown";
import UserDropdown from "@/components/header/UserDropdown";
import { SidebarTrigger } from "../ui/sidebar";

export const AppHeader = () => {
  return (
    <header className="flex w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex md:items-center justify-between grow lg:flex-row lg:px-6 py-1 ">
          <SidebarTrigger />
        <div className="items-center justify-between w-full gap-4  lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none">
          <div className="flex items-end gap-2 2xsm:gap-3 justify-end">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
