import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle } from "lucide-react";

interface ProgramProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  delay: string;
  isInView: boolean;
}

function Program({ title, description, features, image, delay, isInView }: ProgramProps) {
  return (
    <div className={`bg-white rounded-lg shadow-custom overflow-hidden transition-transform hover:-translate-y-1 duration-300 animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <div className="h-48 bg-primary-light relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-60 flex items-center justify-center">
          <h3 className="text-white font-serif text-2xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-neutral-600 mb-4">
          {description}
        </p>
        <ul className="mb-6 space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-neutral-600">
              <Circle className="h-2 w-2 text-secondary mr-2" fill="currentColor" />
              {feature}
            </li>
          ))}
        </ul>
        <a href="#contact" className="text-primary font-medium hover:text-secondary transition-colors inline-flex items-center">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const programs = [
    {
      title: "Leadership Excellence",
      description: "Develop effective leaders capable of inspiring teams, driving innovation, and executing strategic initiatives.",
      features: [
        "Executive Leadership Training",
        "Change Management",
        "Strategic Decision Making"
      ],
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      delay: "delay-100"
    },
    {
      title: "Team Performance",
      description: "Build high-performing teams that collaborate effectively, communicate clearly, and deliver exceptional results.",
      features: [
        "Team Building Workshops",
        "Conflict Resolution",
        "Agile Team Management"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      delay: "delay-200"
    },
    {
      title: "Professional Skills",
      description: "Enhance critical professional competencies essential for success in today's rapidly evolving business landscape.",
      features: [
        "Advanced Communication",
        "Negotiation & Influence",
        "Problem Solving & Innovation"
      ],
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      delay: "delay-300"
    }
  ];

  return (
    <section id="programs" ref={sectionRef} className="py-16 lg:py-24 bg-neutral-100">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-primary">
            Our Training Programs
          </h2>
          <p className="text-neutral-600 text-lg">
            Discover our comprehensive range of professional development programs designed to elevate your organization's capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Program
              key={index}
              title={program.title}
              description={program.description}
              features={program.features}
              image={program.image}
              delay={program.delay}
              isInView={isInView}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary-light text-white">
            <a href="#contact">View All Programs</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
