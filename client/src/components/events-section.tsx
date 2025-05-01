import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { MapPin, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface EventProps {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  isVirtual: boolean;
  delay: string;
  isInView: boolean;
}

function Event({ id, title, description, date, location, isVirtual, delay, isInView }: EventProps) {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString('default', { month: 'long' });
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();

  return (
    <div className={`bg-neutral-100 rounded-lg overflow-hidden shadow-custom flex flex-col md:flex-row animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <div className="md:w-1/3 bg-primary text-white p-6 flex flex-col items-center justify-center text-center">
        <div className="text-sm uppercase font-medium">{month}</div>
        <div className="text-4xl font-bold">{day}</div>
        <div className="text-sm">{year}</div>
        <div className={`mt-4 inline-block px-3 py-1 ${isVirtual ? 'bg-accent text-white' : 'bg-secondary text-primary'} text-xs font-semibold rounded-full`}>
          {isVirtual ? 'Virtual' : 'In-Person'}
        </div>
      </div>
      <div className="md:w-2/3 p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 mb-4">
          {description}
        </p>
        <div className="flex items-center text-neutral-500 text-sm mb-4">
          {isVirtual ? (
            <>
              <Video className="h-4 w-4 mr-2" />
              <span>Online - Live Interactive Session</span>
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location}</span>
            </>
          )}
        </div>
        <Button asChild size="sm" className="bg-primary hover:bg-primary-light text-white">
          <a href="#contact">Register Now</a>
        </Button>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Fetch events from the API
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['/api/events'],
    refetchOnWindowFocus: false
  });

  // Mock events if data is not loaded yet
  const mockEvents = [
    {
      id: 1,
      title: "Strategic Leadership Summit",
      description: "A one-day intensive workshop for executives and senior managers focused on strategic leadership in uncertain times.",
      date: "2023-06-15",
      location: "New York City, NY",
      isVirtual: false,
      delay: "delay-100"
    },
    {
      id: 2,
      title: "Advanced Negotiation Masterclass",
      description: "Learn proven negotiation strategies from expert facilitators in this interactive virtual masterclass.",
      date: "2023-07-08",
      location: "",
      isVirtual: true,
      delay: "delay-200"
    },
    {
      id: 3,
      title: "Team Performance Accelerator",
      description: "A two-day workshop designed to help teams overcome challenges and maximize their collective potential.",
      date: "2023-07-22",
      location: "Chicago, IL",
      isVirtual: false,
      delay: "delay-300"
    },
    {
      id: 4,
      title: "Emotional Intelligence for Leaders",
      description: "Discover how emotional intelligence can transform your leadership effectiveness in this interactive workshop.",
      date: "2023-08-05",
      location: "",
      isVirtual: true,
      delay: "delay-400"
    }
  ];

  const displayEvents = events || mockEvents;

  return (
    <section id="events" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">
            Upcoming Training Events
          </h2>
          <p className="text-neutral-600 text-lg">
            Join our upcoming workshops, seminars, and certification programs to advance your professional development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              isVirtual={event.isVirtual}
              delay={event.delay}
              isInView={isInView}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary-light text-white">
            <a href="#contact">View All Events</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
