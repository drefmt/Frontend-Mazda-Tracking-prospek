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
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/stores/auth";
import Logo from "@/assets/Logo.png";
import { sidebarMenus } from "@/routes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  
  const handleLogOut = () => {
    logout();
  };

  const menuItems = sidebarMenus[user?.level || "sales"];

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
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              {/* <SidebarMenuButton >
                <span>Cancelation SPK</span>
              </SidebarMenuButton>
              <SidebarMenuButton >
                <span>Delivery Report</span>
              </SidebarMenuButton>
              <SidebarMenuButton >
                <span>Customer Complaint</span>
              </SidebarMenuButton>
              <SidebarMenuButton >
                <span>Insentif</span>
              </SidebarMenuButton>
              <SidebarMenuButton >  
                <span>Add User</span>
              </SidebarMenuButton> */}
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
