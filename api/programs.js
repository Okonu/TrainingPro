// Vercel serverless function for programs API
import { readJsonFile, ensureJsonFile } from './_utils';

export default async function handler(req, res) {
  // Ensure programs file exists
  await ensureJsonFile('programs', []);
  
  if (req.method === 'GET') {
    try {
      // Check if we're requesting a specific program by ID
      const pathParts = req.url.split('/');
      if (pathParts.length > 2 && pathParts[1] === 'api' && pathParts[2] === 'programs' && pathParts.length === 4) {
        const programId = parseInt(pathParts[3]);
        if (isNaN(programId)) {
          return res.status(400).json({ error: 'Invalid program ID' });
        }
        
        const programs = await readJsonFile('programs');
        const program = programs.find(p => p.id === programId);
        
        if (!program) {
          return res.status(404).json({ error: 'Program not found' });
        }
        
        return res.status(200).json(program);
      }
      
      // Otherwise return all programs
      const programs = await readJsonFile('programs');
      return res.status(200).json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};