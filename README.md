# ExcellenceTraining - Professional Training & Development Website

A modern, responsive website for a professional training and development company. This project showcases a beautifully designed landing page with multiple sections highlighting the company's services, programs, testimonials, and more.

![ExcellenceTraining Website Screenshot](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&w=400&q=80)

## Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Modern UI/UX**: Clean and professional design with subtle animations
- **Interactive Components**: Navigation, contact forms, and more
- **Full-stack Architecture**: Node.js/Express backend with React frontend
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Section-based Layout**:
  - Hero section with call-to-action
  - About Us with company history and values
  - Services showcase
  - Training programs overview
  - Leadership development section
  - Client testimonials
  - Upcoming events
  - Contact form
  - Newsletter subscription

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide React (icons)
- Framer Motion (animations)
- React Hook Form (form handling)
- TanStack Query (data fetching)
- Wouter (routing)

### Backend
- Node.js
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Zod (validation)

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   └── index.html           # HTML template
├── db/                      # Database configuration
│   ├── index.ts             # Database connection setup
│   └── seed.ts              # Database seeding
├── server/                  # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   └── vite.ts              # Vite configuration for development
├── shared/                  # Shared code between frontend and backend
│   └── schema.ts            # Database schema definitions
└── components.json          # Shadcn UI component configurations
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/excellence-training.git
   cd excellence-training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/excellence_training
   ```

4. Initialize the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and visit [http://localhost:5000](http://localhost:5000)

## Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run start`: Start the production server
- `npm run db:push`: Push schema changes to the database
- `npm run db:seed`: Seed the database with initial data

### Code Style

This project follows modern React patterns and best practices:
- Functional components with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture

## Deployment

The application can be deployed to any platform that supports Node.js applications:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting provider

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from modern corporate websites
- Images from [Unsplash](https://unsplash.com/)
- Icons from [Lucide React](https://lucide.dev/)