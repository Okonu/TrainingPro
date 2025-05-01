import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  BarChart3, 
  Users, 
  Lightbulb, 
  Presentation, 
  GraduationCap, 
  Award
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: string;
  isInView: boolean;
}

function ServiceCard({ icon, title, description, features, delay, isInView }: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-custom p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <div className="bg-primary-light w-14 h-14 rounded-lg mb-5 flex items-center justify-center">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      
      <h3 className="font-bold text-xl mb-3 text-neutral-800">{title}</h3>
      <p className="text-neutral-600 text-sm mb-4 flex-grow">
        {description}
      </p>
      
      <div className="border-t border-neutral-200 mt-auto pt-4">
        <h4 className="font-medium text-neutral-700 mb-2">Key Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <ChevronRight className="h-4 w-4 text-secondary mt-1 mr-2 flex-shrink-0" />
              <span className="text-neutral-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  const services = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Corporate Strategy Development",
      description: "Align your organization around a clear, compelling strategic vision that drives sustainable growth and competitive advantage.",
      features: [
        "Strategic Planning Workshops",
        "Competitive Analysis",
        "Vision & Mission Development",
        "Strategic Implementation Roadmaps"
      ],
      delay: "delay-100"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Leadership Development",
      description: "Build a pipeline of effective leaders who can navigate complexity, inspire teams, and drive organizational success.",
      features: [
        "Executive Coaching",
        "High-Potential Leadership Programs",
        "Change Management Training",
        "Decision-Making Frameworks"
      ],
      delay: "delay-200"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation & Design Thinking",
      description: "Foster a culture of innovation that enables your organization to adapt, evolve, and stay ahead of market disruptions.",
      features: [
        "Design Thinking Workshops",
        "Innovation Process Development",
        "Creativity Training",
        "Prototyping & Testing Methods"
      ],
      delay: "delay-300"
    },
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "Sales & Communication Excellence",
      description: "Enhance your team's ability to communicate persuasively, build relationships, and close deals effectively.",
      features: [
        "Consultative Selling Techniques",
        "Presentation Skills",
        "Negotiation Mastery",
        "Client Relationship Management"
      ],
      delay: "delay-100"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Professional Skills Training",
      description: "Develop the essential competencies that professionals need to succeed in today's complex business environment.",
      features: [
        "Critical Thinking",
        "Time & Priority Management",
        "Emotional Intelligence",
        "Effective Communication"
      ],
      delay: "delay-200"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Team Performance Optimization",
      description: "Transform groups of individuals into high-performing teams that collaborate effectively and deliver exceptional results.",
      features: [
        "Team Building Programs",
        "Conflict Resolution",
        "Collaborative Problem Solving",
        "Trust & Psychological Safety"
      ],
      delay: "delay-300"
    }
  ];
  
  return (
    <section id="services" ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-primary">
            Our Services
          </h2>
          <p className="text-neutral-600 text-lg">
            Comprehensive training and development solutions to address your organization's most pressing challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={service.delay}
              isInView={isInView}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary-light text-white">
            <a href="#contact">Discuss Your Needs</a>
          </Button>
        </div>
      </div>
    </section>
  );
}