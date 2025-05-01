import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Brain, UserCog, RotateCcw } from "lucide-react";

interface LeadershipFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function LeadershipFeature({ icon, title, description }: LeadershipFeatureProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-secondary-light text-primary-dark">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="text-xl font-medium text-neutral-800">{title}</h4>
        <p className="text-neutral-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Culturally-Relevant Approach",
      description: "Programs built on proven leadership principles tailored to East African business contexts"
    },
    {
      icon: <UserCog className="h-6 w-6" />,
      title: "Personalized Development",
      description: "Customized plans addressing each Kenyan leader's unique strengths and opportunities"
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Continuous Growth",
      description: "Ongoing coaching and resources ensuring sustained leadership development for the local market"
    }
  ];

  return (
    <section id="leadership" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className={`max-w-3xl mx-auto text-center mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">
            Leadership Development Excellence
          </h2>
          <p className="text-neutral-600 text-lg">
            Our signature leadership programs transform managers into visionary leaders who inspire their teams to achieve extraordinary results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`order-2 lg:order-1 animated-element delay-200 ${isInView ? 'in-view' : ''}`}>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
              Why Our Leadership Development Works
            </h3>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <LeadershipFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
            
            <Button asChild className="bg-primary hover:bg-primary-light text-white">
              <a href="#contact">Explore Leadership Programs</a>
            </Button>
          </div>
          
          <div className={`order-1 lg:order-2 animated-element ${isInView ? 'in-view' : ''}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576089073624-b5451dfcd8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                alt="Kenyan leadership development workshop" 
                className="rounded-lg shadow-lg w-full h-auto"
                height="600"
                width="800"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <div className="text-sm text-neutral-600">
                  <span className="text-secondary mr-2">"</span>
                  This leadership program completely transformed how I approach team management and strategic decisions for our Nairobi operations.
                  <span className="text-secondary ml-2">"</span>
                </div>
                <div className="mt-2 font-medium text-primary">
                  - Grace Kimani, COO at Savannah Tech
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
