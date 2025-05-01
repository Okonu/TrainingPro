import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Check } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const features = [
    {
      title: "Customized Training Solutions",
      description: "Programs tailored to address your specific organizational challenges",
    },
    {
      title: "Expert Facilitators",
      description: "Learn from industry veterans with decades of practical experience",
    },
    {
      title: "Measurable Outcomes",
      description: "Track progress with comprehensive assessment and reporting tools",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`animated-element ${isInView ? 'in-view' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Team working together in a collaborative environment"
              className="rounded-lg shadow-custom w-full object-cover"
              height="600"
              width="800"
            />
          </div>
          <div className={`animated-element delay-200 ${isInView ? 'in-view' : ''}`}>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-primary">
              Elevate Your Organization's Capabilities
            </h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              ExcellenceTraining provides comprehensive development solutions designed to transform your workforce into a strategic advantage. Our expert-led programs combine cutting-edge research with practical application to deliver measurable results.
            </p>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary-light text-white">
              <a href="#contact">Learn More About Our Approach</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
