// Vercel serverless function for events API
import { readJsonFile } from './_utils.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const events = await readJsonFile('events');
      return res.status(200).json(
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};