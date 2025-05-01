import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Seed testimonials data
    const testimonials = [
      {
        quote: "The leadership program exceeded our expectations. Our managers are now equipped with practical tools to lead more effectively. The facilitators were exceptional and the content was directly applicable to our business challenges.",
        author: "Jennifer Richardson",
        position: "HR Director, Global Finance Inc.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        rating: 5
      },
      {
        quote: "We've seen measurable improvements in team collaboration and productivity since implementing the team development program. The customized approach addressed our specific challenges and provided a framework for continuous improvement.",
        author: "Michael Thomas",
        position: "CEO, Innovate Solutions",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        rating: 5
      },
      {
        quote: "The professional skills training provided our team with practical tools they could immediately apply. Six months later, we're still seeing significant improvements in communication, problem-solving, and project delivery times.",
        author: "Sophia Martinez",
        position: "Operations Director, TechGrowth",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        rating: 5
      }
    ];

    // Seed programs data
    const programs = [
      {
        title: "Leadership Excellence",
        description: "Develop effective leaders capable of inspiring teams, driving innovation, and executing strategic initiatives.",
        features: ["Executive Leadership Training", "Change Management", "Strategic Decision Making"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
      },
      {
        title: "Team Performance",
        description: "Build high-performing teams that collaborate effectively, communicate clearly, and deliver exceptional results.",
        features: ["Team Building Workshops", "Conflict Resolution", "Agile Team Management"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        title: "Professional Skills",
        description: "Enhance critical professional competencies essential for success in today's rapidly evolving business landscape.",
        features: ["Advanced Communication", "Negotiation & Influence", "Problem Solving & Innovation"],
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ];

    // Seed events data
    const events = [
      {
        title: "Strategic Leadership Summit",
        description: "A one-day intensive workshop for executives and senior managers focused on strategic leadership in uncertain times.",
        date: new Date("2023-06-15"),
        location: "New York City, NY",
        isVirtual: false
      },
      {
        title: "Advanced Negotiation Masterclass",
        description: "Learn proven negotiation strategies from expert facilitators in this interactive virtual masterclass.",
        date: new Date("2023-07-08"),
        location: "",
        isVirtual: true
      },
      {
        title: "Team Performance Accelerator",
        description: "A two-day workshop designed to help teams overcome challenges and maximize their collective potential.",
        date: new Date("2023-07-22"),
        location: "Chicago, IL",
        isVirtual: false
      },
      {
        title: "Emotional Intelligence for Leaders",
        description: "Discover how emotional intelligence can transform your leadership effectiveness in this interactive workshop.",
        date: new Date("2023-08-05"),
        location: "",
        isVirtual: true
      }
    ];

    // Check if testimonials already exist
    const existingTestimonials = await db.query.testimonials.findMany();
    if (existingTestimonials.length === 0) {
      console.log("Seeding testimonials...");
      for (const testimonial of testimonials) {
        await db.insert(schema.testimonials).values(testimonial);
      }
    } else {
      console.log("Testimonials already exist, skipping seed.");
    }

    // Check if programs already exist
    const existingPrograms = await db.query.programs.findMany();
    if (existingPrograms.length === 0) {
      console.log("Seeding programs...");
      for (const program of programs) {
        await db.insert(schema.programs).values({
          title: program.title,
          description: program.description,
          features: program.features,
          image: program.image
        });
      }
    } else {
      console.log("Programs already exist, skipping seed.");
    }

    // Check if events already exist
    const existingEvents = await db.query.events.findMany();
    if (existingEvents.length === 0) {
      console.log("Seeding events...");
      for (const event of events) {
        await db.insert(schema.events).values(event);
      }
    } else {
      console.log("Events already exist, skipping seed.");
    }

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
