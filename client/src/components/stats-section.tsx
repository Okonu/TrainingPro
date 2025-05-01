import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounter } from "@/hooks/use-counter";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: string;
  isInView: boolean;
}

function StatItem({ value, suffix, label, delay, isInView }: StatItemProps) {
  const count = useCounter(value, isInView, 2000);
  
  return (
    <Card className={`shadow-custom animated-element ${delay} ${isInView ? 'in-view' : ''}`}>
      <CardContent className="p-8 flex flex-col items-center text-center">
        <span className="text-5xl font-serif font-bold text-primary mb-2">
          {Math.floor(count)}{suffix}
        </span>
        <span className="text-neutral-600">{label}</span>
      </CardContent>
    </Card>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const stats = [
    { value: 96, suffix: "%", label: "Client Satisfaction", delay: "delay-100" },
    { value: 12000, suffix: "+", label: "Professionals Trained", delay: "delay-200" },
    { value: 250, suffix: "+", label: "Corporate Clients", delay: "delay-300" },
    { value: 15, suffix: "+", label: "Years of Experience", delay: "delay-400" },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-neutral-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
