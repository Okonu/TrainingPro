import { db } from "@db";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";
import { ContactFormValues, NewsletterSubscription } from "@shared/schema";

export const storage = {
  // Testimonials
  async getTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: (testimonials, { desc }) => [desc(testimonials.id)]
    });
  },

  // Programs
  async getPrograms() {
    return await db.query.programs.findMany();
  },

  // Events
  async getEvents() {
    return await db.query.events.findMany({
      orderBy: (events, { asc }) => [asc(events.date)]
    });
  },

  // Contact Form
  async saveContactMessage(message: ContactFormValues) {
    return await db.insert(schema.contactMessages).values(message).returning();
  },

  // Newsletter Subscription
  async subscribeToNewsletter(email: string) {
    // Check if email already exists
    const existing = await db.query.newsletterSubscriptions.findFirst({
      where: eq(schema.newsletterSubscriptions.email, email)
    });

    if (existing) {
      return existing;
    }

    return await db.insert(schema.newsletterSubscriptions)
      .values({ email })
      .returning();
  }
};
