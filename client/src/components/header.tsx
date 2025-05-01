import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { currentUser, loading, signOut } = useAuthContext();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
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

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Programs", href: "#programs" },
    { name: "Events", href: "#events" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header
      className={cn(
        "fixed w-full bg-white bg-opacity-95 shadow-sm z-50 transition-all duration-300",
        scrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <div className="text-primary font-serif font-bold text-2xl">
                Excellence<span className="text-secondary">Training</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-neutral-600 hover:text-primary transition-colors font-medium"
                onClick={handleNavClick}
              >
                {link.name}
              </a>
            ))}

            {!loading && (
              currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                        <AvatarFallback>{currentUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/bookings" className="flex items-center">
                        <span>My Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="outline" asChild>
                    <Link 
                      href="/auth" 
                      className="flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                  
                  <Button asChild>
                    <Link 
                      href="/auth?tab=register" 
                      className="bg-primary hover:bg-primary-light text-white transition-colors flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )
            )}

            <Button asChild>
              <a 
                href="#contact" 
                className="bg-primary hover:bg-primary-light text-white transition-colors"
                onClick={handleNavClick}
              >
                Get Started
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-neutral-600" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-neutral-600 hover:text-primary font-medium"
                onClick={handleNavClick}
              >
                {link.name}
              </a>
            ))}

            {!loading && (
              currentUser ? (
                <>
                  <Link 
                    href="/profile" 
                    className="block px-3 py-3 text-neutral-600 hover:text-primary font-medium"
                    onClick={handleNavClick}
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/bookings" 
                    className="block px-3 py-3 text-neutral-600 hover:text-primary font-medium"
                    onClick={handleNavClick}
                  >
                    My Bookings
                  </Link>
                  <button
                    className="block w-full text-left px-3 py-3 text-neutral-600 hover:text-primary font-medium"
                    onClick={() => {
                      handleLogout();
                      handleNavClick();
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth" 
                    className="block px-3 py-3 text-neutral-600 hover:text-primary font-medium"
                    onClick={handleNavClick}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth?tab=register" 
                    className="block px-3 py-3 text-primary hover:text-primary-dark font-medium"
                    onClick={handleNavClick}
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}

            <a
              href="#contact"
              className="block px-3 py-3 text-primary font-medium"
              onClick={handleNavClick}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
