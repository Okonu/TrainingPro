# Deployment Guide

This guide provides instructions for deploying the ExcellenceTraining website to various environments.

## Prerequisites

Before deploying, ensure you have the following:

- Node.js (v18+) installed
- PostgreSQL database
- Access to your hosting platform
- Environment variables properly configured

## Environment Variables

The application requires the following environment variables:

```
DATABASE_URL=postgresql://username:password@hostname:port/database_name
NODE_ENV=production
```

## Building for Production

To build the application for production:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/excellence-training.git
   cd excellence-training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

This will create a `dist` directory with the compiled application.

## Database Setup

Before deploying, ensure your database is properly set up:

1. Set up the database schema:
   ```bash
   npm run db:push
   ```

2. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

## Deployment Options

### Option 1: Traditional Hosting (VPS/Dedicated Server)

1. Copy the `dist` directory to your server
2. Install Node.js and PostgreSQL on your server
3. Configure environment variables
4. Install PM2 for process management:
   ```bash
   npm install -g pm2
   ```
5. Start the application:
   ```bash
   pm2 start dist/server/index.js --name excellence-training
   ```
6. Configure Nginx as a reverse proxy:

   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. Set up SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 2: Deploying to Replit

1. Fork the Replit project
2. Set up environment secrets in the Replit interface
3. Use the Replit deployments feature to deploy

### Option 3: Deploying to Vercel

1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Configure environment variables in the Vercel dashboard
4. Set up a database (either using Vercel Postgres or an external provider)
5. Deploy the application

### Option 4: Deploying to Netlify

1. Push your code to GitHub
2. Connect Netlify to your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/client`
4. Set up environment variables in the Netlify dashboard
5. Configure Netlify Functions for the backend

## Multi-Environment Setup

For a professional setup, consider configuring multiple environments:

### Development
- Local environment for development
- Uses development database
- Environment variables in `.env.development`

### Staging
- Mirror of production for testing
- Separate database from production
- Environment variables in `.env.staging`

### Production
- Live environment
- Production database
- Environment variables in `.env.production`

## Continuous Integration/Continuous Deployment (CI/CD)

For automated deployments, set up a CI/CD pipeline using GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to production
        # Replace with your preferred deployment method
        # This could be Vercel, Netlify, or a custom deployment script
```

## Post-Deployment Verification

After deploying, verify that:

1. The website loads correctly
2. All API endpoints are working
3. Forms submit successfully
4. Database connections are functioning
5. Images and assets are loading

## Monitoring and Maintenance

Set up monitoring for your deployed application:

1. Use a service like Sentry for error tracking
2. Set up uptime monitoring
3. Configure regular database backups
4. Implement logging for debugging issues

## SSL/TLS Configuration

Ensure your deployed site uses HTTPS:

1. Obtain SSL certificates (Let's Encrypt is a free option)
2. Configure your web server to use HTTPS
3. Set up HTTP to HTTPS redirects
4. Enable HSTS for additional security

## Performance Optimization

Optimize your deployment for best performance:

1. Enable compression (gzip/brotli)
2. Set up proper caching headers
3. Use a CDN for static assets
4. Optimize image delivery
5. Implement lazy loading for non-critical resources

## Scaling Considerations

As your application grows, consider these scaling options:

1. Horizontal scaling (adding more servers)
2. Database optimization and potential sharding
3. Caching layers (Redis, Memcached)
4. Load balancing between multiple instances
5. Containerization with Docker for consistent deployments