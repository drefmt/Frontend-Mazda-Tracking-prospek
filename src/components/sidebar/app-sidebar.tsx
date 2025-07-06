import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/stores/auth";
import Logo from "@/assets/Logo.png";
import { sidebarMenus, reportSidebarMenu } from "@/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

export function AppSidebar() {
  const { user, logout } = useAuthStore();

  const handleLogOut = () => {
    logout();
  };

  const menuItems = sidebarMenus[user?.level || "sales"];
  const reportMenuItems = reportSidebarMenu[user?.level || "svp"];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <img
            src={Logo}
            alt="Logo Mazda Banjarbaru "
            className="py-4"
            width={150}
          />

          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2 ">
                      <item.icon className="w-5 h-5" />
                      <span className="text-lg lg:text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>

              <Collapsible defaultOpen className="group/collapsible">
                {/* Tombol pemicu collapsible */}
                <CollapsibleTrigger asChild>
                  <SidebarMenuItem>
              <SidebarGroupLabel>Other</SidebarGroupLabel>
                    {/* <span className="text-lg lg:text-sm">Report</span> */}
                  </SidebarMenuItem>
                </CollapsibleTrigger>

                {/* Isi collapsible */}
                <CollapsibleContent className="ml-4 space-y-1">
                  {reportMenuItems.map((item) => (
                    <SidebarMenuSub key={item.path}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.path}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-lg lg:text-sm">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSub>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleLogOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
