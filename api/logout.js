import { serialize } from 'cookie';

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the session cookie
  const sessionCookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire immediately
    path: '/'
  });

  res.setHeader('Set-Cookie', sessionCookie);
  res.status(200).json({ message: 'Logged out successfully' });
}