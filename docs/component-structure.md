# Component Structure Documentation

This document provides an overview of the component structure and organization in the ExcellenceTraining project.

## Overview

The application is built with a component-based architecture, where each section of the website is implemented as a separate React component. These components are then assembled in the main `Home` page.

## Component Organization

### Page Components

Located in `client/src/pages/`:

- `home.tsx`: The main landing page that assembles all section components
- `not-found.tsx`: 404 error page

### Section Components

Located in `client/src/components/`:

- `header.tsx`: Navigation header with mobile responsiveness
- `hero-section.tsx`: Main welcome section with call-to-action
- `stats-section.tsx`: Animated statistics display
- `about-section.tsx`: Company information with history and values
- `services-section.tsx`: Services offered by the company
- `programs-section.tsx`: Training programs showcase
- `leadership-section.tsx`: Leadership development offerings
- `testimonials-section.tsx`: Client testimonials carousel
- `events-section.tsx`: Upcoming events listing
- `cta-section.tsx`: Call-to-action section
- `newsletter-section.tsx`: Newsletter subscription form
- `contact-section.tsx`: Contact form and information
- `footer.tsx`: Website footer with links and information

### UI Components

Located in `client/src/components/ui/`:

These are reusable UI components from the shadcn/ui library, customized for this project:
- `button.tsx`: Button component with variants
- `form.tsx`: Form components with validation
- `input.tsx`: Input field component
- `toast.tsx`: Toast notification component
- And many more...

## Component Pattern

Most section components follow this general pattern:

```tsx
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
// Other imports...

export default function SectionName() {
  // Ref for the section element
  const sectionRef = useRef<HTMLElement>(null);
  
  // Check if the section is in viewport
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  // Data or configuration for the section
  const items = [
    // Section data...
  ];
  
  return (
    <section id="section-id" ref={sectionRef} className="py-16 lg:py-24 bg-color">
      <div className="container-custom">
        {/* Section header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 animated-element ${isInView ? 'in-view' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-primary">
            Section Title
          </h2>
          <p className="text-neutral-600 text-lg">
            Section description
          </p>
        </div>
        
        {/* Section content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <ItemComponent
              key={index}
              {...item}
              delay={`delay-${index * 100}`}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Common Component Features

1. **Intersection Observer Integration**:
   - Components use the `useIntersectionObserver` hook to detect when they enter the viewport
   - This triggers animations and improves performance by only rendering complex elements when needed

2. **Responsive Design**:
   - Components use Tailwind's responsive class modifiers (`sm:`, `md:`, `lg:`, etc.)
   - Layout changes based on screen size (e.g., columns adjust from 1 to 3 columns)

3. **Animation Classes**:
   - `.animated-element`: Base class for all animated elements
   - `.in-view`: Added when element is in viewport to trigger animations
   - `.delay-X`: Controls animation timing for staggered effects

4. **Styling Pattern**:
   - Tailwind utility classes for most styling
   - Consistent color variables: `text-primary`, `bg-secondary`, etc.
   - Custom container: `container-custom` with standardized padding

## Example Components

### Hero Section

```tsx
export default function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-primary to-primary-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animated-element">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6">
              Transform Your Organization's Potential
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-8">
              Industry-leading training programs designed to elevate your team's performance and drive sustainable growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="#programs">Explore Programs</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
          <div className="relative animated-element delay-200">
            {/* Hero image */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Service Card Component

```tsx
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
```

## Forms

Forms use the `react-hook-form` library with Zod for validation:

```tsx
export default function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

## Animation Implementation

Animations are implemented using CSS transitions and classes:

```css
/* In index.css */
.animated-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animated-element.in-view {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 {
  transition-delay: 0.1s;
}

.delay-200 {
  transition-delay: 0.2s;
}

/* And so on for other delay values */
```

## Best Practices

1. **Component Composition**: Breaking down complex UI into smaller, reusable components
2. **Prop Typing**: Using TypeScript interfaces for component props
3. **Responsive Design**: Consistent use of responsive Tailwind classes
4. **Animation Performance**: Using Intersection Observer for efficient animations
5. **Accessibility**: Semantic HTML elements and proper ARIA attributes
6. **Form Validation**: Consistent validation using Zod schemas