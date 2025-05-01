import { readJsonFile, writeJsonFile, ensureJsonFile } from './_utils.js';
import { parse } from 'cookie';
import path from 'path';

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

// Generate a unique booking ID
function generateBookingId(bookings) {
  if (!bookings || bookings.length === 0) {
    return 1;
  }
  return Math.max(...bookings.map(booking => booking.id)) + 1;
}

export default async function handler(req, res) {
  // Ensure bookings file exists
  await ensureJsonFile('bookings', []);
  
  // Check authentication for protected routes
  const user = await getUserFromSession(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // Handle GET requests for user bookings
  if (req.method === 'GET' && req.url.startsWith('/api/bookings/user/')) {
    const userId = parseInt(req.url.split('/').pop());
    
    // Make sure the user can only access their own bookings
    if (userId !== user.id) {
      return res.status(403).json({ error: 'You can only view your own bookings' });
    }
    
    try {
      const bookings = await readJsonFile('bookings');
      const programs = await readJsonFile('programs');
      
      // Filter bookings for the user and add program details
      const userBookings = bookings
        .filter(booking => booking.userId === userId)
        .map(booking => {
          const program = programs.find(p => p.id === booking.programId);
          return {
            ...booking,
            program: program || { 
              id: booking.programId,
              title: 'Unknown Program',
              description: 'Program details not available',
              image: ''
            }
          };
        });
      
      return res.status(200).json(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle GET request for a specific booking
  if (req.method === 'GET' && req.url.match(/^\/api\/bookings\/\d+$/)) {
    const bookingId = parseInt(req.url.split('/').pop());
    
    try {
      const bookings = await readJsonFile('bookings');
      const booking = bookings.find(b => b.id === bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      // Make sure the user can only access their own bookings
      if (booking.userId !== user.id) {
        return res.status(403).json({ error: 'You can only view your own bookings' });
      }
      
      // Get program details
      const programs = await readJsonFile('programs');
      const program = programs.find(p => p.id === booking.programId);
      
      return res.status(200).json({
        ...booking,
        program: program || { 
          id: booking.programId,
          title: 'Unknown Program',
          description: 'Program details not available',
          image: ''
        }
      });
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle POST request to create a new booking
  if (req.method === 'POST' && req.url === '/api/bookings') {
    try {
      const { programId, notes } = req.body;
      
      if (!programId || isNaN(parseInt(programId))) {
        return res.status(400).json({ error: 'Invalid program ID' });
      }
      
      // Verify the program exists
      const programs = await readJsonFile('programs');
      const program = programs.find(p => p.id === parseInt(programId));
      
      if (!program) {
        return res.status(404).json({ error: 'Program not found' });
      }
      
      // Create the booking
      const bookings = await readJsonFile('bookings');
      const newBooking = {
        id: generateBookingId(bookings),
        userId: user.id,
        programId: parseInt(programId),
        bookingDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'pending',
        notes: notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Only try to write to filesystem if not in Vercel serverless
      if (!process.env.VERCEL) {
        bookings.push(newBooking);
        await writeJsonFile('bookings', bookings);
      } else {
        console.log('Note: Booking creation in serverless environment is simulated');
      }
      
      // Return the new booking with program details
      return res.status(201).json({
        ...newBooking,
        program
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle PUT request to update a booking
  if (req.method === 'PUT' && req.url.match(/^\/api\/bookings\/\d+$/)) {
    try {
      const bookingId = parseInt(req.url.split('/').pop());
      const { status, notes } = req.body;
      
      // Get the existing bookings
      const bookings = await readJsonFile('bookings');
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      // Make sure the user can only update their own bookings
      if (bookings[bookingIndex].userId !== user.id) {
        return res.status(403).json({ error: 'You can only update your own bookings' });
      }
      
      // Only allow users to cancel their bookings, not change other statuses
      if (status && status !== 'cancelled') {
        return res.status(403).json({ error: 'You can only cancel bookings, not change other statuses' });
      }
      
      // Update the booking
      const updatedBooking = {
        ...bookings[bookingIndex],
        status: status || bookings[bookingIndex].status,
        notes: notes !== undefined ? notes : bookings[bookingIndex].notes,
        updatedAt: new Date().toISOString()
      };
      
      // Only try to write to filesystem if not in Vercel serverless
      if (!process.env.VERCEL) {
        bookings[bookingIndex] = updatedBooking;
        await writeJsonFile('bookings', bookings);
      } else {
        console.log('Note: Booking update in serverless environment is simulated');
      }
      
      // Get program details
      const programs = await readJsonFile('programs');
      const program = programs.find(p => p.id === updatedBooking.programId);
      
      return res.status(200).json({
        ...updatedBooking,
        program: program || { 
          id: updatedBooking.programId,
          title: 'Unknown Program',
          description: 'Program details not available',
          image: ''
        }
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Return 405 Method Not Allowed for other HTTP methods
  return res.status(405).json({ error: 'Method not allowed' });
}