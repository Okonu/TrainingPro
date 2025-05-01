import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'cookie';
import { readJsonFile, writeJsonFile, ensureJsonFile } from './_utils.js';

const profilesFilePath = path.join(process.cwd(), 'data', 'profiles.json');

// Function to get user from session
async function getUserFromSession(req) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  
  if (!cookies.session) {
    return null;
  }
  
  let session;
  try {
    session = JSON.parse(cookies.session);
  } catch (error) {
    return null;
  }
  
  if (new Date(session.expires) < new Date()) {
    return null;
  }
  
  const userId = session.userId;
  if (!userId) {
    return null;
  }
  
  // For Vercel serverless, use the test user if it matches
  if (process.env.VERCEL && userId === 1) {
    return {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      fullName: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  // For local development
  try {
    const users = await readJsonFile('users');
    return users.find(user => user.id === userId) || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export default async function handler(req, res) {
  // Ensure the profiles file exists
  await ensureJsonFile('profiles', []);
  
  // Check if user is authenticated
  const user = await getUserFromSession(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // Handle GET requests
  if (req.method === 'GET') {
    const userId = req.url.split('/').pop();
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    try {
      const profiles = await readJsonFile('profiles');
      const profile = profiles.find(p => p.userId === parseInt(userId));
      
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      
      return res.status(200).json(profile);
    } catch (error) {
      console.error('Error getting profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle POST requests for updating profiles
  if (req.method === 'POST' && req.url.includes('/update')) {
    try {
      const { userId, ...profileData } = req.body;
      
      if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      // Ensure the user can only update their own profile
      if (user.id !== parseInt(userId)) {
        return res.status(403).json({ error: 'You can only update your own profile' });
      }
      
      const profiles = await readJsonFile('profiles');
      const existingProfileIndex = profiles.findIndex(p => p.userId === parseInt(userId));
      
      // Create the updated profile object
      const updatedProfile = {
        userId: parseInt(userId),
        bio: profileData.bio || '',
        company: profileData.company || '',
        position: profileData.position || '',
        phone: profileData.phone || '',
        location: profileData.location || '',
        interests: profileData.interests || [],
        updatedAt: new Date().toISOString()
      };
      
      if (existingProfileIndex !== -1) {
        // Update existing profile
        profiles[existingProfileIndex] = {
          ...profiles[existingProfileIndex],
          ...updatedProfile
        };
      } else {
        // Create new profile
        updatedProfile.createdAt = new Date().toISOString();
        profiles.push(updatedProfile);
      }
      
      // Only try to write to filesystem if not in Vercel serverless
      if (!process.env.VERCEL) {
        await writeJsonFile('profiles', profiles);
      } else {
        console.log('Note: Profile update in serverless environment is simulated');
      }
      
      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Return 405 Method Not Allowed for other HTTP methods
  return res.status(405).json({ error: 'Method not allowed' });
}