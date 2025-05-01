// Vercel serverless function for contact form API
const fs = require('fs');
const path = require('path');
const { readJsonFile } = require('./_utils');

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

// For Vercel production, we would use a database or external service
// For demo purposes, we'll just return success but log that this would normally save data
function saveContactMessage(message) {
  // In a production environment, this would connect to a database instead
  if (process.env.VERCEL === '1') {
    console.log('In production, would save message:', message);
    return { success: true, message: 'Message received (simulated in production)' };
  }
  
  // For local development, we can still use the file system
  try {
    const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');
    let messages = [];
    
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(data);
    } catch (err) {
      // File doesn't exist or is invalid, use empty array
      messages = [];
    }
    
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      ...message,
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8');
    
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, message: 'Error saving message' };
  }
}

module.exports = (req, res) => {
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
      
      const result = saveContactMessage(data);
      
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