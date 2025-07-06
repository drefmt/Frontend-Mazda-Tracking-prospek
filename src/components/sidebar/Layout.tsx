import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import React from "react";
import { AppHeader } from "@/components/header/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-4 w-screen h-full overflow-x-scroll dark:bg-black">        
          <AppHeader />      
        {children}
      </main>
    </SidebarProvider>
  );
}
