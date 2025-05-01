// Vercel serverless function for programs API
const { readJsonFile } = require('./_utils');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    try {
      const programs = readJsonFile('programs.json');
      return res.status(200).json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};