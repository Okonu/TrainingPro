import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')" }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className={`max-w-3xl mx-auto text-center animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Transform Your Organization Today
          </h2>
          <p className="text-xl text-neutral-200 mb-8">
            Schedule a consultation with our training experts to develop a customized program that addresses your unique challenges.
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary-light text-primary font-bold text-lg">
            <a href="#contact">Schedule a Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
