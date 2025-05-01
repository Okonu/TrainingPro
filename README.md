# Professional Training and Development Services Website

A stylish, professional website for a training and development company featuring an eye-catching landing page with modern animations and strategic content presentation.

## Features

- 📱 Responsive design that works on all devices (mobile, tablet, desktop)
- ✨ Modern animations and transitions for an engaging user experience
- 🎯 Strategic content presentation highlighting key services and programs
- 📝 Contact form for inquiries and program registration
- 📰 Newsletter subscription for staying updated
- 📅 Upcoming events section with registration options
- 🌟 Testimonials showcase with client feedback
- 🔍 Comprehensive About Us and Services sections

## Tech Stack

- **Frontend:** React with TypeScript, Shadcn UI components, TailwindCSS
- **Animations:** CSS transitions and animations
- **State Management:** React Query for API data fetching
- **Routing:** Wouter for lightweight client-side routing
- **Backend:** Express.js API endpoints
- **Data Storage:** JSON files (MVP approach for simplicity)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the initial data:
   ```bash
   npm run db:seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000` to see the application.

## Deployment to Vercel

This project is designed for easy deployment to Vercel with minimal configuration:

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one.

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel from the CLI:
   ```bash
   vercel login
   ```

4. From the project root directory, run:
   ```bash
   vercel
   ```

5. Follow the prompts to complete the deployment.

### Deployment Configuration

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Development Command:** `npm run dev`
- **Install Command:** `npm install`

### Environment Variables

No environment variables are required for the MVP version since data is stored in JSON files.

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Application entry point
├── data/                 # JSON data files
│   ├── events.json       # Events data
│   ├── programs.json     # Programs data
│   ├── testimonials.json # Testimonials data
├── db/                   # Database configuration (placeholder for MVP)
├── server/               # Express server
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data access layer
└── shared/               # Shared code between client and server
    └── schema.ts         # TypeScript interface definitions
```

## Development Guidelines

### Adding New Pages

1. Create a new page component in `client/src/pages/`
2. Add the route in `client/src/App.tsx`

### Adding New API Endpoints

1. Define the endpoint in `server/routes.ts`
2. Implement data access in `server/storage.ts`
3. Add corresponding schema definitions in `shared/schema.ts`

## Future Enhancements

- User authentication for admin panel
- Database integration for data persistence
- Content management system for easy updates
- Analytics dashboard for visitor tracking
- Blog section for content marketing
- Online course delivery platform

## License

This project is licensed under the MIT License - see the LICENSE file for details.