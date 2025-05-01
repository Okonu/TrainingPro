import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "@shared/schema";

// Create postgres connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create drizzle instance
export const db = drizzle(pool, { schema });

// Function to initialize the database and run migrations if needed
export async function initializeDatabase() {
  try {
    // Connect to the database to verify connection
    const client = await pool.connect();
    client.release();
    console.log("Database connection established successfully");

    // Check if the tables exist (simple check for users table)
    const { rows } = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    const tablesExist = rows[0]?.exists || false;

    // If tables don't exist, create them
    if (!tablesExist) {
      console.log("Creating database tables...");
      // Simply execute the schema definitions directly
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" SERIAL PRIMARY KEY,
          "username" TEXT NOT NULL UNIQUE,
          "password" TEXT NOT NULL,
          "email" TEXT NOT NULL UNIQUE,
          "full_name" TEXT NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
          "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "testimonials" (
          "id" SERIAL PRIMARY KEY,
          "author" TEXT NOT NULL,
          "position" TEXT NOT NULL,
          "quote" TEXT NOT NULL,
          "image" TEXT NOT NULL,
          "rating" INTEGER DEFAULT 5 NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "programs" (
          "id" SERIAL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "features" TEXT[] NOT NULL,
          "image" TEXT NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "events" (
          "id" SERIAL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "date" TIMESTAMP WITH TIME ZONE NOT NULL,
          "location" TEXT,
          "is_virtual" BOOLEAN DEFAULT FALSE NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "contact_messages" (
          "id" SERIAL PRIMARY KEY,
          "full_name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "company" TEXT NOT NULL,
          "interest" TEXT NOT NULL,
          "message" TEXT NOT NULL,
          "status" TEXT DEFAULT 'new' NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "newsletter_subscriptions" (
          "id" SERIAL PRIMARY KEY,
          "email" TEXT NOT NULL UNIQUE,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
          "status" TEXT DEFAULT 'active' NOT NULL
        );
      `);
      console.log("Database tables created successfully");
    } else {
      console.log("Database tables already exist");
    }

    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}