import { z } from "zod";

// User related types
export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
};

// User insert schema (for registration)
export const insertUserSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  interest: z.string().min(1, { message: "Please select an area of interest" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Newsletter subscription
export const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

export type NewsletterSubscription = {
  email: string;
};