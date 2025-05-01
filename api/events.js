// Vercel serverless function for events API
const { readJsonFile } = require('./_utils');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    try {
      const events = readJsonFile('events.json');
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