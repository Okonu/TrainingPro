import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'cookie';
import { readJsonFile } from './_utils.js';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for session cookie
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    if (!cookies.session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Parse session cookie
    let session;
    try {
      session = JSON.parse(cookies.session);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Get user ID from session
    const userId = session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Handle Vercel serverless environment
    if (process.env.VERCEL) {
      // For demo purposes, if this is the test user from the login endpoint
      if (userId === 1) {
        const mockUser = {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        return res.status(200).json(mockUser);
      } else {
        return res.status(401).json({ error: 'User not found' });
      }
    }
    
    // For local development, get users from the JSON file
    let users = [];
    try {
      users = await readJsonFile('users');
    } catch (error) {
      return res.status(500).json({ error: 'Error reading user data' });
    }

    // Find the user by ID
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}