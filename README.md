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
- 🔐 User authentication with Google Sign-in
- 👤 User profile management
- 🛒 Program booking system with secure payment processing (in development)
- 📊 User dashboard for managing bookings and account information

## Tech Stack

- **Frontend:** React with TypeScript, Shadcn UI components, TailwindCSS
- **Animations:** CSS transitions and animations
- **State Management:** React Query for API data fetching
- **Routing:** Wouter for lightweight client-side routing
- **Backend:** Express.js API endpoints
- **Data Storage:** JSON files (MVP approach) with Firebase Firestore integration
- **Authentication:** Firebase Authentication with Google Sign-in
- **Payment Processing:** Stripe integration for secure payments

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

The following environment variables are required for full functionality:

#### Firebase Configuration
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_APP_ID` - Firebase application ID

#### Stripe Configuration (For Payment Processing)
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key (server-side only)

For local development, the JSON file data storage will work without these environment variables, but authentication and payment features will be disabled.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── auth/       # Authentication-related components
│   │   │   │   ├── Login.tsx        # Login component
│   │   │   │   └── UserProfile.tsx  # User profile management
│   │   │   └── ...         # Other UI components
│   │   ├── context/        # React context providers
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   │   ├── firebase.ts # Firebase configuration and helpers
│   │   │   └── ...         # Other utility functions
│   │   ├── pages/          # Page components
│   │   │   ├── login.tsx   # Login page
│   │   │   ├── profile.tsx # User profile page
│   │   │   ├── bookings.tsx # Bookings management page
│   │   │   └── ...         # Other page components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
├── data/                   # JSON data files
│   ├── events.json         # Events data
│   ├── programs.json       # Programs data
│   ├── testimonials.json   # Testimonials data
├── db/                     # Database configuration (placeholder for MVP)
├── server/                 # Express server
│   ├── routes.ts           # API route definitions
│   └── storage.ts          # Data access layer
└── shared/                 # Shared code between client and server
    └── schema.ts           # TypeScript interface definitions
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

- Admin panel for content management
- Complete integration of Firebase Firestore for all data
- Analytics dashboard for visitor and booking tracking
- Notification system for booking updates and event reminders
- Blog section for content marketing
- Online course delivery platform
- Advanced search and filtering for programs and events
- Integration with calendar apps for event scheduling
- Membership subscription system with tiered benefits

## License

This project is licensed under the MIT License - see the LICENSE file for details.