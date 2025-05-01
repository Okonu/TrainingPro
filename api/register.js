import { promises as fs } from 'fs';
import path from 'path';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const dataPath = path.join(process.cwd(), 'data');
const usersPath = path.join(dataPath, 'users.json');

// Initialize users file if it doesn't exist
async function ensureUsersFile() {
  try {
    await fs.access(usersPath);
  } catch (error) {
    // File doesn't exist, create it
    await fs.mkdir(dataPath, { recursive: true });
    await fs.writeFile(usersPath, JSON.stringify([]));
  }
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure users file exists
    await ensureUsersFile();

    // Get the user data from the request body
    const { username, password, email, fullName } = req.body;

    // Validate inputs
    if (!username || !password || !email || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (fullName.length < 2) {
      return res.status(400).json({ error: 'Full name must be at least 2 characters' });
    }

    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get existing users
    const usersData = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(usersData);

    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const now = new Date();
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username,
      password: hashedPassword,
      email,
      fullName,
      createdAt: now,
      updatedAt: now
    };

    // Add to users array
    users.push(newUser);

    // Save updated users
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    // Clone the user object without the password for the response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}