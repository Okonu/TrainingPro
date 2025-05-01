import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'cookie';

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

    // Get users from the JSON file
    let users = [];
    try {
      const usersData = await fs.readFile(usersPath, 'utf8');
      users = JSON.parse(usersData);
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