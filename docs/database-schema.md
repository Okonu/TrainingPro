# Database Schema Documentation

This document outlines the database schema used in the ExcellenceTraining project.

## Overview

The project uses PostgreSQL as its database with Drizzle ORM for database operations. The schema is defined in `shared/schema.ts`.

## Tables

### Users

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores user information:
- `id`: Unique identifier (auto-incremented)
- `name`: User's full name
- `email`: User's email address (unique)
- `role`: User's role (default: "user")
- `createdAt`: Timestamp when the user was created

### Testimonials

```typescript
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores client testimonials:
- `id`: Unique identifier (auto-incremented)
- `author`: Name of the person giving the testimonial
- `position`: Job position of the author
- `company`: Company name of the author
- `content`: Testimonial text content
- `rating`: Numerical rating (typically 1-5)
- `imageUrl`: URL to the author's profile image
- `createdAt`: Timestamp when the testimonial was created

### Programs

```typescript
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores training program information:
- `id`: Unique identifier (auto-incremented)
- `title`: Program title
- `description`: Program description
- `features`: Array of program features
- `imageUrl`: URL to the program image
- `createdAt`: Timestamp when the program was created

### Events

```typescript
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  isVirtual: boolean("is_virtual").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores upcoming events:
- `id`: Unique identifier (auto-incremented)
- `title`: Event title
- `description`: Event description
- `date`: Date and time of the event
- `location`: Physical location or virtual platform
- `isVirtual`: Boolean indicating if the event is virtual
- `createdAt`: Timestamp when the event was created

### Contact Messages

```typescript
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores messages from the contact form:
- `id`: Unique identifier (auto-incremented)
- `name`: Sender's name
- `email`: Sender's email
- `company`: Sender's company (optional)
- `phone`: Sender's phone number (optional)
- `message`: Message content
- `createdAt`: Timestamp when the message was created

### Newsletter Subscriptions

```typescript
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

This table stores newsletter subscriptions:
- `id`: Unique identifier (auto-incremented)
- `email`: Subscriber's email address (unique)
- `createdAt`: Timestamp when the subscription was created

## Schema Validation

The project uses Zod for schema validation:

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
```

These schemas are used to validate form submissions before inserting data into the database.

## Type Definitions

The project uses TypeScript to ensure type safety:

```typescript
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterSubscription = {
  email: string;
};
```

These types are used throughout the application to ensure consistent data structures.

## Relationships

The current schema doesn't define explicit relationships between tables using foreign keys. However, the database design allows for future expansion to include relationships, such as:

- Linking testimonials to specific programs
- Associating events with related programs
- Connecting users to contact messages or newsletter subscriptions

## Database Operations

Database operations are handled through Drizzle ORM functions:

```typescript
// Query example
const programs = await db.query.programs.findMany();

// Insert example
const [newMessage] = await db.insert(contactMessages).values({
  name,
  email,
  company,
  phone,
  message,
}).returning();
```

For more details on database operations, refer to the Drizzle ORM documentation and the implementation in the server routes.