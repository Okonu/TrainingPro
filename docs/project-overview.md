# Project Overview

## Architecture

This project follows a modern full-stack JavaScript architecture:

- **Frontend**: React-based single-page application
- **Backend**: Express.js REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Bundling**: Vite for both development and production builds

The application is structured to keep the backend primarily responsible for data persistence and API calls, while the frontend handles the UI logic and user interaction.

## Key Files and Directories

### Frontend (client/)

- `client/src/components/`: Contains all UI components, organized by section
  - `ui/`: Reusable UI components like buttons, forms, etc. (shadcn components)
  - Section components: `hero-section.tsx`, `about-section.tsx`, etc.
- `client/src/hooks/`: Custom React hooks
  - `use-intersection-observer.tsx`: For triggering animations when elements come into view
  - `use-mobile.tsx`: For responsive behavior
  - `use-toast.ts`: For toast notifications
- `client/src/lib/`: Utility functions and configurations
  - `queryClient.ts`: TanStack Query setup
  - `utils.ts`: Helper functions
- `client/src/pages/`: Page components
  - `home.tsx`: Main landing page
  - `not-found.tsx`: 404 page

### Backend (server/)

- `server/index.ts`: Express application initialization
- `server/routes.ts`: API route definitions
- `server/storage.ts`: Data access functions
- `server/vite.ts`: Development server configuration

### Shared (shared/)

- `shared/schema.ts`: Database schema and type definitions using Drizzle ORM

### Database (db/)

- `db/index.ts`: Database connection setup
- `db/seed.ts`: Database seeding logic

## Design Patterns

### Component Structure

Components follow a consistent pattern:

1. Import dependencies
2. Define interface/types (if needed)
3. Define component function
4. Export component

Example:
```tsx
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ComponentProps {
  title: string;
  // other props...
}

export default function MyComponent({ title }: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 });
  
  return (
    <div ref={ref} className={`animated-element ${isInView ? 'in-view' : ''}`}>
      <h2>{title}</h2>
      {/* Component content */}
    </div>
  );
}
```

### Animation Pattern

The project uses a consistent animation pattern:
- Elements have an `animated-element` base class
- The `in-view` class is added when the element becomes visible in the viewport
- CSS transitions handle the animation behavior
- The `delay-X` classes provide staggered animations

### API Data Fetching

The frontend fetches data from the backend using TanStack Query:
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['/api/endpoint'],
  // Default fetcher is configured in queryClient.ts
});
```

### Form Handling

Forms use React Hook Form with Zod validation:
```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    // Default values...
  },
});

const onSubmit = async (data: FormValues) => {
  // Submit logic...
};
```

## Styling Approach

The project uses Tailwind CSS with custom utility classes:
- `container-custom`: Custom container with responsive padding
- `shadow-custom`: Consistent shadow style
- `animated-element`: Base class for animated elements
- Font classes: `font-serif` for headings, `font-sans` for body text
- Color classes: `text-primary`, `text-secondary`, etc.

## Performance Considerations

- Images are optimized and sized appropriately
- Intersection Observer is used to trigger animations only when needed
- Code splitting is done at the page level
- TanStack Query provides efficient caching of API responses