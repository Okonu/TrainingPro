import { useEffect } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import AboutSection from "@/components/about-section";
import ProgramsSection from "@/components/programs-section";
import LeadershipSection from "@/components/leadership-section";
import TestimonialsSection from "@/components/testimonials-section";
import EventsSection from "@/components/events-section";
import CTASection from "@/components/cta-section";
import NewsletterSection from "@/components/newsletter-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  // Scroll to hash if present in URL on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <LeadershipSection />
        <TestimonialsSection />
        <EventsSection />
        <CTASection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
