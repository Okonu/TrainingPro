import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Bookmark,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { title: "My Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
    { title: "My Bookings", href: "/bookings", icon: <Bookmark className="h-5 w-5" /> },
    { title: "Programs", href: "/programs", icon: <BookOpen className="h-5 w-5" /> },
    { title: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={toggleSidebar}
          className="absolute right-2 top-2 rounded-md p-1 text-gray-400 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Sidebar header */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center">
            <div className="text-primary font-serif font-bold text-2xl">
              Excellence<span className="text-secondary">Training</span>
            </div>
          </Link>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  location === item.href
                    ? "bg-gray-100 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-400 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Empty div for spacing on mobile */}
          <div className="lg:hidden"></div>

          {/* Profile dropdown */}
          <div className="relative">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={toggleProfileMenu}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={user?.fullName} />
                <AvatarFallback>{user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="hidden text-sm lg:block">
                <div className="font-medium">{user?.fullName}</div>
                <div className="text-xs text-gray-500">@{user?.username}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Dropdown menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}