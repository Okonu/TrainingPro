# Deployment Guide

This document provides detailed instructions for deploying the Professional Training and Development website to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A [Vercel account](https://vercel.com/signup)
2. The latest version of Node.js and npm installed
3. The Vercel CLI installed: `npm install -g vercel`

## Preparing for Deployment

1. Make sure all your changes are committed to your repository
2. Verify that the application runs correctly in development mode:
   ```bash
   npm run dev
   ```
3. Build the application locally to ensure there are no build errors:
   ```bash
   npm run build
   ```

## Deploying to Vercel

### Option 1: Using the Vercel CLI (Recommended)

1. Log in to Vercel from your terminal:
   ```bash
   vercel login
   ```

2. From the project root directory, run:
   ```bash
   vercel
   ```

3. Follow the interactive prompts:
   - Confirm you want to deploy the current directory
   - Select or create your project
   - Configure project settings (you can accept defaults for most options)

4. Once deployed, Vercel will provide you with a URL to access your live site.

### Option 2: Using the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to the [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Select "Other"
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

## Production Configuration

### Environment Variables

For the MVP version using JSON files, no environment variables are required. However, if you later integrate a database, you'll need to add the database connection string as an environment variable.

### Custom Domain (Optional)

1. From your project dashboard in Vercel, go to "Settings" > "Domains"
2. Add your custom domain
3. Follow the instructions to configure DNS settings for your domain

## Post-Deployment Verification

1. Visit your deployed site
2. Test all functionality:
   - Navigation
   - Forms (contact form and newsletter subscription)
   - Animations and transitions
   - Responsive design on different devices

## Troubleshooting

### Build Failures

If your build fails, check the build logs in the Vercel dashboard:
1. Ensure all dependencies are properly listed in package.json
2. Verify that your code doesn't contain any environment-specific assumptions

### Data Issues

If you're experiencing issues with data:
1. Ensure the data files are being properly included in the build
2. Check server API responses in the browser dev tools

### Performance Issues

If the site loads slowly:
1. Optimize image sizes
2. Consider implementing lazy loading for images and components
3. Use the Network tab in browser dev tools to identify bottlenecks

## Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository. When you push changes to your main branch, Vercel will automatically rebuild and deploy your site.

For feature branches, Vercel creates preview deployments so you can test changes before merging to the main branch.

## Rollback

If you need to roll back to a previous version:
1. Go to your project in the Vercel dashboard
2. Navigate to the "Deployments" tab
3. Find the deployment you want to revert to
4. Click the three dots menu and select "Promote to Production"