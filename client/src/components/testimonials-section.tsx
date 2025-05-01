import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  image: string;
  delay: string;
  isInView: boolean;
}

function Testimonial({ quote, author, position, image, delay, isInView }: TestimonialProps) {
  return (
    <Card className={`shadow-custom relative animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <CardContent className="p-8">
        <div className="text-secondary mb-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <blockquote className="text-neutral-700 mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <div className="font-semibold text-neutral-800">{author}</div>
            <div className="text-neutral-500 text-sm">{position}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ClientLogoProps {
  url: string;
  alt: string;
  delay: string;
  isInView: boolean;
}

function ClientLogo({ url, alt, delay, isInView }: ClientLogoProps) {
  return (
    <div className={`grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <img src={url} alt={alt} className="h-12 w-auto mx-auto" />
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const testimonials = [
    {
      quote: "The leadership program exceeded our expectations. Our managers are now equipped with practical tools to lead more effectively. The facilitators were exceptional and the content was directly applicable to our business challenges.",
      author: "Jennifer Richardson",
      position: "HR Director, Global Finance Inc.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      delay: "delay-100"
    },
    {
      quote: "We've seen measurable improvements in team collaboration and productivity since implementing the team development program. The customized approach addressed our specific challenges and provided a framework for continuous improvement.",
      author: "Michael Thomas",
      position: "CEO, Innovate Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      delay: "delay-200"
    },
    {
      quote: "The professional skills training provided our team with practical tools they could immediately apply. Six months later, we're still seeing significant improvements in communication, problem-solving, and project delivery times.",
      author: "Sophia Martinez",
      position: "Operations Director, TechGrowth",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      delay: "delay-300"
    }
  ];

  const clientLogos = [
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 1", delay: "" },
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 2", delay: "delay-100" },
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 3", delay: "delay-200" },
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 4", delay: "delay-300" },
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 5", delay: "delay-400" },
    { url: "https://via.placeholder.com/150x60?text=Client+Logo", alt: "Client 6", delay: "delay-500" }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 lg:py-24 bg-neutral-100">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-neutral-600 text-lg">
            Discover how our training programs have transformed organizations across industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              image={testimonial.image}
              delay={testimonial.delay}
              isInView={isInView}
            />
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clientLogos.map((logo, index) => (
            <ClientLogo
              key={index}
              url={logo.url}
              alt={logo.alt}
              delay={logo.delay}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
