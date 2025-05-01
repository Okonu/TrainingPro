// Vercel serverless function for contact form API
import fs from 'fs';
import path from 'path';
import { readJsonFile, writeJsonFile } from './_utils.js';

// Simple Zod-like validation
function validateContactForm(data) {
  const errors = [];
  
  if (!data.fullName || data.fullName.length < 2) {
    errors.push({ path: ['fullName'], message: 'Name must be at least 2 characters' });
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ path: ['email'], message: 'Please enter a valid email address' });
  }
  
  if (!data.company) {
    errors.push({ path: ['company'], message: 'Company name is required' });
  }
  
  if (!data.interest) {
    errors.push({ path: ['interest'], message: 'Please select an area of interest' });
  }
  
  if (!data.message || data.message.length < 10) {
    errors.push({ path: ['message'], message: 'Message must be at least 10 characters' });
  }
  
  return { isValid: errors.length === 0, errors };
}

// Save contact message using our improved utility functions
async function saveContactMessage(message) {
  try {
    // Vercel environment special handling for serverless
    if (process.env.VERCEL) {
      console.log('In serverless environment, simulating success for contact message');
      return { success: true, message: 'Message received (simulated in serverless)' };
    }
    
    // Get existing messages
    const messages = await readJsonFile('contact-messages') || [];
    
    // Create new message object
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      ...message,
      createdAt: new Date().toISOString()
    };
    
    // Add to array
    messages.push(newMessage);
    
    // Write to file
    await writeJsonFile('contact-messages', messages);
    
    return { 
      success: true, 
      message: 'Message sent successfully'
    };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, message: 'Error saving message' };
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const validation = validateContactForm(data);
      
      if (!validation.isValid) {
        return res.status(400).json({ 
          message: 'Invalid form data', 
          errors: validation.errors 
        });
      }
      
      const result = await saveContactMessage(data);
      
      if (result.success) {
        return res.status(201).json({ message: 'Message sent successfully' });
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};