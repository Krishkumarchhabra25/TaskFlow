"use client"


import { useState } from "react";
import { 
  Bell, 
  Settings, 
  User, 
  ChevronDown, 
  LogOut, 
  Check, 
  MessageSquare,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useRouter();
  const { logout } = useAuth();
  // In a real app, this would come from authentication state
  const isLoggedIn = true;
  const user = {
    name: "John Smith",
    email: "john@example.com",
    initials: "JS",
    role: "Team Lead"
  };

  const notifications = [
    {
      id: 1,
      message: "Jane Doe assigned you a new task",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      message: "Task 'Design API Documentation' is due tomorrow",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      message: "Michael Brown commented on your task",
      time: "2 hours ago",
      read: false
    },
    {
      id: 4,
      message: "Weekly team meeting scheduled for tomorrow",
      time: "Yesterday",
      read: true
    }
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAllAsRead = () => {
    setUnreadNotifications(0);
    // In a real app, we would call an API to mark notifications as read
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    logout()
    // Redirect to login page
    navigate.push("/sign-in");
    
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div>
          {/* Notification and user section would only be visible when logged in */}
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative" 
                  onClick={toggleNotifications}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <Badge className="bg-red-500 text-white absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-xs rounded-full">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
                
                {/* Dropdown for notifications */}
                {showNotifications && (
                  <div  className="absolute right-0 left-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-purple-600 h-auto p-0"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div>
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id} 
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-purple-50' : ''}`}
                            >
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <div className="flex-shrink-0 h-2 w-2 mt-1.5 rounded-full bg-purple-600" />
                                )}
                                <div className={`flex-1 ${!notification.read ? '' : 'ml-4'}`}>
                                  <p className={`text-sm ${!notification.read ? 'font-medium' : 'text-gray-600'}`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-sm justify-center"
                        onClick={() => {
                          setShowNotifications(false);
                          navigate.push('/notifications');
                        }}
                      >
                        View all notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 px-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-700 mr-1">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate.push('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
               
                    <span>Log out</span>
                 
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
