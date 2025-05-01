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
      title: "East African Market Strategy",
      description: "Align your organization around a clear, compelling strategic vision that drives sustainable growth in Kenyan and regional markets.",
      features: [
        "Regional Strategic Planning",
        "East African Competitive Analysis",
        "Local Vision & Mission Development",
        "Kenya-focused Implementation Plans"
      ],
      delay: "delay-100"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "African Leadership Development",
      description: "Build a pipeline of effective Kenyan leaders who can navigate local complexity, inspire diverse teams, and drive organizational success.",
      features: [
        "Executive Coaching for African Leaders",
        "High-Potential Leadership Programs",
        "Culturally-aware Change Management",
        "Local Decision-Making Frameworks"
      ],
      delay: "delay-200"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "African Innovation & Design",
      description: "Foster a culture of innovation that addresses local challenges and enables your organization to adapt to East African market disruptions.",
      features: [
        "Afrocentric Design Thinking",
        "Local Innovation Process Development",
        "Culturally-relevant Creativity Training",
        "Kenya-focused Prototyping Methods"
      ],
      delay: "delay-300"
    },
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "Regional Sales Excellence",
      description: "Enhance your team's ability to communicate persuasively, build relationships within local business contexts, and close deals effectively.",
      features: [
        "East African Consultative Selling",
        "Cross-cultural Presentation Skills",
        "Local Negotiation Techniques",
        "Kenyan Client Relationship Management"
      ],
      delay: "delay-100"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Kenyan Professional Skills",
      description: "Develop the essential competencies that professionals need to succeed in Kenya's dynamic business environment.",
      features: [
        "Critical Thinking for Local Challenges",
        "Time & Priority Management",
        "Cross-cultural Emotional Intelligence",
        "Effective Regional Communication"
      ],
      delay: "delay-200"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Team Performance Optimization",
      description: "Transform diverse Kenyan teams into high-performing units that collaborate effectively across cultures and deliver exceptional results.",
      features: [
        "Culturally-aware Team Building",
        "Local Conflict Resolution",
        "Collaborative Problem Solving",
        "Building Trust in Diverse Teams"
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
            Comprehensive training and development solutions tailored to Kenyan and East African organizations facing unique regional challenges.
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