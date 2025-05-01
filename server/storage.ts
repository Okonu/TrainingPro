import fs from 'fs/promises';
import path from 'path';
import { ContactFormValues } from "@shared/schema";

// Helper function to read JSON files
async function readJsonFile(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

// Helper function to write JSON files
async function writeJsonFile(fileName: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
}

export const storage = {
  // Testimonials
  async getTestimonials() {
    const testimonials = await readJsonFile('testimonials.json');
    // Sort by id in descending order
    return testimonials.sort((a: any, b: any) => b.id - a.id);
  },

  // Programs
  async getPrograms() {
    return await readJsonFile('programs.json');
  },

  // Events
  async getEvents() {
    const events = await readJsonFile('events.json');
    // Sort by date in ascending order
    return events.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  // Contact Form
  async saveContactMessage(message: ContactFormValues) {
    const messages = await readJsonFile('contact-messages.json');
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map((m: any) => m.id)) + 1 : 1,
      ...message,
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    await writeJsonFile('contact-messages.json', messages);
    return [newMessage];
  },

  // Newsletter Subscription
  async subscribeToNewsletter(email: string) {
    const subscriptions = await readJsonFile('newsletter-subscriptions.json');
    
    // Check if email already exists
    const existing = subscriptions.find((sub: any) => sub.email === email);
    if (existing) {
      return existing;
    }
    
    const newSubscription = {
      id: subscriptions.length > 0 ? Math.max(...subscriptions.map((s: any) => s.id)) + 1 : 1,
      email,
      createdAt: new Date().toISOString()
    };
    
    subscriptions.push(newSubscription);
    await writeJsonFile('newsletter-subscriptions.json', subscriptions);
    return [newSubscription];
  }
};
