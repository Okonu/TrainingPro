import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
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

  const navLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Leadership", href: "#leadership" },
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
            isMobileMenuOpen ? "max-h-64" : "max-h-0"
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
