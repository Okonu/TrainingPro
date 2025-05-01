import { promises as fs } from 'fs';
import path from 'path';

// Data management functions that work both locally and in Vercel
// Default static data for serverless environment
const staticData = {
  events: [
    {
      id: 1,
      title: "Women in Leadership Conference",
      description: "An annual conference focused on empowering women leaders in various industries across Kenya.",
      date: "2025-06-15",
      location: "KICC, Nairobi",
      isVirtual: false
    },
    {
      id: 2,
      title: "Leadership and Innovation Summit",
      description: "A premier event that brings together thought leaders and innovators from across East Africa.",
      date: "2025-07-22",
      location: "Sarova Whitesands, Mombasa",
      isVirtual: false
    },
    {
      id: 3,
      title: "Remote Team Management Webinar",
      description: "Learn effective strategies for leading distributed teams in the digital age.",
      date: "2025-05-08",
      location: "Online",
      isVirtual: true
    },
    {
      id: 4,
      title: "Sustainable Business Leadership Forum",
      description: "Focusing on how leaders can drive sustainable business practices in African markets.",
      date: "2025-08-10",
      location: "Radisson Blu, Nairobi",
      isVirtual: false
    },
    {
      id: 5,
      title: "Youth Entrepreneurship Workshop",
      description: "Empowering young Kenyan entrepreneurs with leadership and business skills.",
      date: "2025-09-18",
      location: "iHub, Nairobi",
      isVirtual: false
    }
  ],
  programs: [
    {
      id: 1,
      title: "Executive Leadership Masterclass",
      description: "A comprehensive program designed for senior executives looking to enhance their strategic leadership capabilities.",
      categories: ["Executive", "Leadership"],
      image: "/images/programs/executive-leadership.jpg",
      price: 65000,
      startDate: "2025-06-10",
      endDate: "2025-07-15",
      location: "Nairobi Business School",
      isVirtual: false
    },
    {
      id: 2,
      title: "Women in Leadership Academy",
      description: "A transformative program specifically tailored for women leaders navigating unique challenges in the workplace.",
      categories: ["Women Leadership", "Professional Development"],
      image: "/images/programs/women-leadership.jpg",
      price: 45000,
      startDate: "2025-07-20",
      endDate: "2025-09-05",
      location: "Strathmore Business School",
      isVirtual: false
    },
    {
      id: 3,
      title: "Digital Transformation for Leaders",
      description: "Equipping leaders with the knowledge and tools to lead digital transformation initiatives in their organizations.",
      categories: ["Digital Leadership", "Technology"],
      image: "/images/programs/digital-transformation.jpg",
      price: 35000,
      startDate: "2025-08-15",
      endDate: "2025-09-15",
      location: "Online",
      isVirtual: true
    },
    {
      id: 4,
      title: "Emerging Leaders Program",
      description: "Designed for high-potential professionals ready to step into leadership roles within their organizations.",
      categories: ["Early Career", "Leadership Fundamentals"],
      image: "/images/programs/emerging-leaders.jpg",
      price: 30000,
      startDate: "2025-10-01",
      endDate: "2025-11-15",
      location: "USIU Africa, Nairobi",
      isVirtual: false
    },
    {
      id: 5,
      title: "Crisis Leadership & Resilience",
      description: "Build the skills needed to lead teams effectively through uncertainty, disruption, and organizational change.",
      categories: ["Crisis Management", "Resilience"],
      image: "/images/programs/crisis-leadership.jpg",
      price: 40000,
      startDate: "2025-09-10",
      endDate: "2025-10-10",
      location: "Sarova Stanley, Nairobi",
      isVirtual: false
    },
    {
      id: 6,
      title: "Conscious Leadership Workshop",
      description: "Explore mindfulness, emotional intelligence, and purpose-driven leadership practices for the modern leader.",
      categories: ["Mindfulness", "Emotional Intelligence"],
      image: "/images/programs/conscious-leadership.jpg",
      price: 25000,
      startDate: "2025-11-05",
      endDate: "2025-11-25",
      location: "Online",
      isVirtual: true
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: "The Executive Leadership program transformed how I approach strategic decisions. The Kenyan-centric case studies were particularly valuable for my work in the financial sector.",
      author: "Wanjiku Kamau",
      position: "CFO, Equity Bank Kenya",
      image: "/images/testimonials/testimonial-1.jpg"
    },
    {
      id: 2,
      quote: "As a woman in tech, the Women in Leadership Academy gave me the tools and confidence to navigate and succeed in a male-dominated industry.",
      author: "Amina Omar",
      position: "CTO, Safaricom",
      image: "/images/testimonials/testimonial-2.jpg"
    },
    {
      id: 3,
      quote: "The Digital Transformation program helped me lead my company through a critical technology overhaul that has positioned us as an industry leader.",
      author: "Daniel Ochieng",
      position: "CEO, Twiga Foods",
      image: "/images/testimonials/testimonial-3.jpg"
    }
  ],
  users: []
};

const dataPath = path.join(process.cwd(), 'data');

// Read data (works both locally and in serverless)
export async function readJsonFile(fileName) {
  try {
    // First try to read from filesystem (local development)
    try {
      const filePath = path.join(dataPath, `${fileName}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (fileError) {
      // If file read fails, return static data for Vercel
      if (staticData[fileName]) {
        console.log(`Using static data for ${fileName} in serverless environment`);
        return staticData[fileName];
      }
      throw fileError;
    }
  } catch (error) {
    console.error(`Error reading ${fileName} data:`, error);
    throw new Error(`Failed to read ${fileName} data`);
  }
}

// Write data (works in local development, is a no-op in serverless)
export async function writeJsonFile(fileName, data) {
  try {
    // In Vercel's serverless environment, writing to the filesystem won't persist
    // Instead, we'll log that this is happening but won't actually write
    if (process.env.VERCEL) {
      console.log(`Note: Data writes to '${fileName}' in serverless environment won't persist.`);
      return;
    }
    
    // For local development, write to filesystem
    await fs.mkdir(dataPath, { recursive: true });
    const filePath = path.join(dataPath, `${fileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to ${fileName} data:`, error);
    throw new Error(`Failed to write ${fileName} data`);
  }
}

// Create JSON file if it doesn't exist (works in local development, is a no-op in serverless)
export async function ensureJsonFile(fileName, defaultData = []) {
  try {
    // In Vercel's serverless environment, writing to the filesystem won't persist
    if (process.env.VERCEL) {
      console.log(`Note: File creation for '${fileName}' in serverless environment won't persist.`);
      return;
    }
    
    const filePath = path.join(dataPath, `${fileName}.json`);
    try {
      await fs.access(filePath);
    } catch (error) {
      // File doesn't exist, create it
      await fs.mkdir(dataPath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData));
    }
  } catch (error) {
    console.error(`Error ensuring ${fileName} data exists:`, error);
    throw new Error(`Failed to ensure ${fileName} data exists`);
  }
}