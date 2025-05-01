import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Check, Calendar, Users, Award, TrendingUp, BookOpen } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  const missionRef = useRef<HTMLDivElement>(null);
  const missionIsInView = useIntersectionObserver(missionRef, { threshold: 0.1 });

  const historyRef = useRef<HTMLDivElement>(null);
  const historyIsInView = useIntersectionObserver(historyRef, { threshold: 0.1 });

  const features = [
    {
      title: "Customized Training Solutions",
      description: "Programs tailored to address your specific organizational challenges",
      icon: <BookOpen className="h-5 w-5 text-secondary" />
    },
    {
      title: "Expert Facilitators",
      description: "Learn from industry veterans with decades of practical experience",
      icon: <Award className="h-5 w-5 text-secondary" />
    },
    {
      title: "Measurable Outcomes",
      description: "Track progress with comprehensive assessment and reporting tools",
      icon: <TrendingUp className="h-5 w-5 text-secondary" />
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started with a vision to transform professional development"
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Extended our reach to serve clients across 20+ countries"
    },
    {
      year: "2018",
      title: "Digital Transformation",
      description: "Launched innovative virtual training solutions"
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Awarded Top Training Provider by Business Excellence"
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      {/* Main About Section */}
      <div ref={sectionRef} className="container-custom mb-20">
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-primary">
            About ExcellenceTraining
          </h2>
          <p className="text-neutral-600 text-lg">
            Your trusted partner in professional development and organizational excellence since 2010.
          </p>
        </div>
        
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
            <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-primary">
              Elevate Your Organization's Capabilities
            </h3>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              ExcellenceTraining provides comprehensive development solutions designed to transform your workforce into a strategic advantage. Our expert-led programs combine cutting-edge research with practical application to deliver measurable results.
            </p>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">{feature.title}</h4>
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

      {/* Mission & Values */}
      <div ref={missionRef} className="bg-neutral-50 py-16">
        <div className="container-custom">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animated-element ${missionIsInView ? 'in-view' : ''}`}>
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-primary">
                Our Mission & Values
              </h3>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                We are dedicated to empowering organizations and individuals to reach their full potential through innovative training solutions and development programs that drive lasting change.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="bg-primary-light p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">People First</h4>
                  <p className="text-neutral-600 text-sm">We believe that investing in people is the most powerful strategy for organizational success.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="bg-primary-light p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Excellence</h4>
                  <p className="text-neutral-600 text-sm">We are committed to the highest standards in everything we do, from program design to delivery.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="bg-primary-light p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Innovation</h4>
                  <p className="text-neutral-600 text-sm">We continuously evolve our methods and content to stay ahead of industry trends.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="bg-primary-light p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Results-Driven</h4>
                  <p className="text-neutral-600 text-sm">We measure our success by the tangible outcomes we create for our clients.</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Our mission and values"
                className="rounded-lg shadow-custom w-full object-cover h-auto lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company History */}
      <div ref={historyRef} className="py-16 container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-12 animated-element ${historyIsInView ? 'in-view' : ''}`}>
          <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-primary">
            Our Journey
          </h3>
          <p className="text-neutral-600">
            From our humble beginnings to becoming an industry leader, our commitment to excellence has remained unwavering.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-light"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center animated-element delay-${index * 100} ${historyIsInView ? 'in-view' : ''}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'order-3 pl-8'}`}>
                  <h4 className="font-bold text-xl mb-2">{milestone.title}</h4>
                  <p className="text-neutral-600">{milestone.description}</p>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                  <Calendar className="h-5 w-5" />
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'order-3 pl-8' : 'text-right pr-8'}`}>
                  <span className="text-3xl font-bold text-primary">{milestone.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
