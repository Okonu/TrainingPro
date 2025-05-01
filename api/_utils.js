// Helper functions for Vercel API routes
const fs = require('fs');
const path = require('path');

// Utility to read JSON files - works in development and production
function readJsonFile(fileName) {
  try {
    // Try multiple potential file paths to accommodate different environments
    const possiblePaths = [
      // Standard path (local development)
      path.join(process.cwd(), 'data', fileName),
      // Vercel typical paths for serverless functions
      path.join(process.cwd(), '..', 'data', fileName),
      path.join(process.cwd(), '/data', fileName),
      // Additional fallback paths
      path.join(__dirname, '..', 'data', fileName),
      path.join(__dirname, '../..', 'data', fileName)
    ];
    
    // Try each path until we find one that works
    let data = null;
    let successPath = null;
    
    for (const tryPath of possiblePaths) {
      try {
        if (fs.existsSync(tryPath)) {
          data = fs.readFileSync(tryPath, 'utf8');
          successPath = tryPath;
          break;
        }
      } catch (e) {
        // Continue to the next path
      }
    }
    
    if (!data) {
      // If all paths failed, log clear error and return empty array
      console.error(`Error: No valid data file found for ${fileName}. Tried paths:`, possiblePaths);
      return [];
    }
    
    console.log(`Successfully read ${fileName} from ${successPath}`);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

// Utility to write JSON files (if needed)
function writeJsonFile(fileName, data) {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile
};