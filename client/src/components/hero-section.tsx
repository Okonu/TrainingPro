import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className="relative bg-primary text-white pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541802645635-11f2286a7482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')" }}
      ></div>

      <div className="container-custom relative z-10">
        <div className={`max-w-4xl animated-element ${isInView ? 'in-view' : ''}`}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-6">
            Transform Kenyan Business Leadership
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-2xl">
            Develop high-performing teams through our comprehensive training programs tailored to East African organizations and their unique market challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-light text-primary font-bold">
              <a href="#contact">Schedule a Consultation</a>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <a href="#programs">Explore Programs</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Element */}
      <div 
        className="absolute bottom-0 left-0 w-full h-24 bg-neutral-100" 
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      ></div>
    </section>
  );
}
