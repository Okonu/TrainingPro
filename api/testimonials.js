// Vercel serverless function for testimonials API
import { readJsonFile } from './_utils.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const testimonials = await readJsonFile('testimonials');
      return res.status(200).json(testimonials.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};