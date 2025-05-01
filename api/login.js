import { promises as fs } from 'fs';
import path from 'path';
import { scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { serialize } from 'cookie';
import { readJsonFile } from './_utils.js';

const scryptAsync = promisify(scrypt);
const usersPath = path.join(process.cwd(), 'data', 'users.json');

// Compare password with stored hash
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split('.');
  const hashedBuf = Buffer.from(hashed, 'hex');
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get username and password from request body
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if we're in Vercel serverless environment
    if (process.env.VERCEL) {
      // For demo purposes in Vercel, allow login with a test account
      if (username === 'testuser' && password === 'password123') {
        // Create a mock user
        const mockUser = {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Set session cookie
        const session = {
          userId: mockUser.id,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
        };
        
        const sessionCookie = serialize('session', JSON.stringify(session), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
          path: '/'
        });
        
        res.setHeader('Set-Cookie', sessionCookie);
        
        // Return the mock user
        return res.status(200).json(mockUser);
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    }
    
    // For local development, get users from the JSON file
    let users = [];
    try {
      users = await readJsonFile('users');
    } catch (error) {
      return res.status(500).json({ error: 'Error reading user data' });
    }

    // Find the user by username
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set session cookie
    const session = {
      userId: user.id,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
    };

    const sessionCookie = serialize('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
      path: '/'
    });

    res.setHeader('Set-Cookie', sessionCookie);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}