import fs from 'fs/promises';
import path from 'path';

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

async function seed() {
  try {
    // Seed testimonials data
    const testimonials = [
      {
        id: 1,
        quote: "The leadership program exceeded our expectations. Our managers are now equipped with practical tools to lead more effectively. The facilitators were exceptional and the content was directly applicable to our business challenges.",
        author: "Jennifer Richardson",
        position: "HR Director, Global Finance Inc.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 2,
        quote: "We've seen measurable improvements in team collaboration and productivity since implementing the team development program. The customized approach addressed our specific challenges and provided a framework for continuous improvement.",
        author: "Michael Thomas",
        position: "CEO, Innovate Solutions",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 3,
        quote: "The professional skills training provided our team with practical tools they could immediately apply. Six months later, we're still seeing significant improvements in communication, problem-solving, and project delivery times.",
        author: "Sophia Martinez",
        position: "Operations Director, TechGrowth",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
      }
    ];

    // Seed programs data
    const programs = [
      {
        id: 1,
        title: "Leadership Excellence",
        description: "Develop effective leaders capable of inspiring teams, driving innovation, and executing strategic initiatives.",
        features: ["Executive Leadership Training", "Change Management", "Strategic Decision Making"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
      },
      {
        id: 2,
        title: "Team Performance",
        description: "Build high-performing teams that collaborate effectively, communicate clearly, and deliver exceptional results.",
        features: ["Team Building Workshops", "Conflict Resolution", "Agile Team Management"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: 3,
        title: "Professional Skills",
        description: "Enhance critical professional competencies essential for success in today's rapidly evolving business landscape.",
        features: ["Advanced Communication", "Negotiation & Influence", "Problem Solving & Innovation"],
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ];

    // Seed events data
    const events = [
      {
        id: 1,
        title: "Strategic Leadership Summit",
        description: "A one-day intensive workshop for executives and senior managers focused on strategic leadership in uncertain times.",
        date: new Date("2025-06-15").toISOString(),
        location: "New York City, NY",
        isVirtual: false
      },
      {
        id: 2,
        title: "Advanced Negotiation Masterclass",
        description: "Learn proven negotiation strategies from expert facilitators in this interactive virtual masterclass.",
        date: new Date("2025-07-08").toISOString(),
        location: "Virtual Zoom Session",
        isVirtual: true
      },
      {
        id: 3,
        title: "Team Performance Accelerator",
        description: "A two-day workshop designed to help teams overcome challenges and maximize their collective potential.",
        date: new Date("2025-07-22").toISOString(),
        location: "Chicago, IL",
        isVirtual: false
      },
      {
        id: 4,
        title: "Emotional Intelligence for Leaders",
        description: "Discover how emotional intelligence can transform your leadership effectiveness in this interactive workshop.",
        date: new Date("2025-08-05").toISOString(),
        location: "Virtual Zoom Session",
        isVirtual: true
      }
    ];

    // Check and write testimonials data
    const existingTestimonials = await readJsonFile('testimonials.json');
    if (existingTestimonials.length === 0) {
      console.log("Seeding testimonials...");
      await writeJsonFile('testimonials.json', testimonials);
    } else {
      console.log("Testimonials already exist, skipping seed.");
    }

    // Check and write programs data
    const existingPrograms = await readJsonFile('programs.json');
    if (existingPrograms.length === 0) {
      console.log("Seeding programs...");
      await writeJsonFile('programs.json', programs);
    } else {
      console.log("Programs already exist, skipping seed.");
    }

    // Check and write events data
    const existingEvents = await readJsonFile('events.json');
    if (existingEvents.length === 0) {
      console.log("Seeding events...");
      await writeJsonFile('events.json', events);
    } else {
      console.log("Events already exist, skipping seed.");
    }

    // Initialize empty files if they don't exist
    const existingContactMessages = await readJsonFile('contact-messages.json');
    if (existingContactMessages.length === 0) {
      console.log("Initializing contact-messages.json...");
      await writeJsonFile('contact-messages.json', []);
    }

    const existingSubscriptions = await readJsonFile('newsletter-subscriptions.json');
    if (existingSubscriptions.length === 0) {
      console.log("Initializing newsletter-subscriptions.json...");
      await writeJsonFile('newsletter-subscriptions.json', []);
    }

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error seeding JSON files:", error);
  }
}

seed();
