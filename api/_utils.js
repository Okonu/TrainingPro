// Helper functions for Vercel API routes
const fs = require('fs');
const path = require('path');

// Utility to read JSON files - works in development and production
function readJsonFile(fileName) {
  try {
    // In Vercel serverless functions, we need to use a different path pattern
    const isVercel = process.env.VERCEL === '1';
    
    let filePath;
    if (isVercel) {
      // In Vercel, we use the included data from the deployment
      filePath = path.join(process.cwd(), 'data', fileName);
    } else {
      // In local development, use the normal path
      filePath = path.join(process.cwd(), 'data', fileName);
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

module.exports = {
  readJsonFile
};