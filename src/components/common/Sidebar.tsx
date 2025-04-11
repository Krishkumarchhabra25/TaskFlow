"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Bell,
  Settings,
  Menu,
  UserPlus,
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapsed((c) => !c);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CheckSquare, label: "Tasks", href: "/task" },
    { icon: UserPlus, label: "Team", href: "/team" },
    { icon: Bell, label: "Notifications", href: "/notification" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        )}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors",
                    isActive && "bg-gray-100 text-purple-600"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      collapsed ? "mx-auto" : "mr-3"
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-medium">
            JS
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Smith</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
