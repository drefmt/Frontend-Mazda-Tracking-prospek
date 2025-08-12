import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import React from "react";
import { AppHeader } from "@/components/header/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar (paling atas z-index) */}
        <div className="z-50">
          <AppSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 relative z-10 ">
          {/* Header hanya untuk konten, bukan global */}
          <div className="sticky top-0 z-40  shadow-sm mt-5 rounded-2xl">
            <AppHeader />
          </div>

          {/* Konten utama */}
          <main className="flex-1 px-4 pb-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
