import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data');

// Read a JSON file from the data directory
export async function readJsonFile(fileName) {
  try {
    const filePath = path.join(dataPath, `${fileName}.json`);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}.json:`, error);
    throw new Error(`Failed to read ${fileName} data`);
  }
}

// Write data to a JSON file in the data directory
export async function writeJsonFile(fileName, data) {
  try {
    await fs.mkdir(dataPath, { recursive: true });
    const filePath = path.join(dataPath, `${fileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to ${fileName}.json:`, error);
    throw new Error(`Failed to write ${fileName} data`);
  }
}

// Create JSON file if it doesn't exist
export async function ensureJsonFile(fileName, defaultData = []) {
  try {
    const filePath = path.join(dataPath, `${fileName}.json`);
    try {
      await fs.access(filePath);
    } catch (error) {
      // File doesn't exist, create it
      await fs.mkdir(dataPath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData));
    }
  } catch (error) {
    console.error(`Error ensuring ${fileName}.json exists:`, error);
    throw new Error(`Failed to ensure ${fileName} data file exists`);
  }
}