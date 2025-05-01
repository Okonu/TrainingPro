// Vercel serverless function for newsletter subscription API
const fs = require('fs');
const path = require('path');
const { readJsonFile } = require('./_utils');

// Simple email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// For Vercel production, we would use a database or external service
// For demo purposes, we'll just return success but log that this would normally save data
function subscribeToNewsletter(email) {
  // In a production environment, this would connect to a database instead
  if (process.env.VERCEL === '1') {
    console.log('In production, would subscribe email:', email);
    return { success: true, message: 'Subscription recorded (simulated in production)' };
  }
  
  // For local development, we can still use the file system
  try {
    const filePath = path.join(process.cwd(), 'data', 'newsletter-subscriptions.json');
    let subscriptions = [];
    
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch (err) {
      // File doesn't exist or is invalid, use empty array
      subscriptions = [];
    }
    
    // Check if email already exists
    const existing = subscriptions.find(sub => sub.email === email);
    if (existing) {
      return { success: true, message: 'Already subscribed' };
    }
    
    const newSubscription = {
      id: subscriptions.length > 0 ? Math.max(...subscriptions.map(s => s.id)) + 1 : 1,
      email,
      createdAt: new Date().toISOString()
    };
    
    subscriptions.push(newSubscription);
    fs.writeFileSync(filePath, JSON.stringify(subscriptions, null, 2), 'utf8');
    
    return { success: true, message: 'Subscribed successfully' };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'Error processing subscription' };
  }
}

module.exports = (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      
      if (!email || !validateEmail(email)) {
        return res.status(400).json({ 
          message: 'Invalid email address', 
          errors: [{ path: ['email'], message: 'Please enter a valid email address' }]
        });
      }
      
      const result = subscribeToNewsletter(email);
      
      if (result.success) {
        return res.status(201).json({ message: result.message });
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      console.error('Error processing newsletter subscription:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};