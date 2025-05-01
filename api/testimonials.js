// Vercel serverless function for testimonials API
const { readJsonFile } = require('./_utils');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    try {
      const testimonials = readJsonFile('testimonials.json');
      return res.status(200).json(testimonials.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};