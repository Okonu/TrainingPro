# Contributing to ExcellenceTraining Website

Thank you for considering contributing to the ExcellenceTraining website project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## How Can I Contribute?

There are many ways you can contribute to this project:

### Reporting Bugs

If you find a bug, please create an issue using the bug report template. Include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

### Suggesting Enhancements

If you have ideas for improving the website, please create an issue using the feature request template. Include:

- A clear and descriptive title
- Detailed description of the proposed enhancement
- Any relevant mockups or examples
- Why this enhancement would be valuable

### Pull Requests

We welcome pull requests! To submit a pull request:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your pull request:
- Includes a clear description of the changes
- Updates documentation if necessary
- Passes all tests
- Follows the project's code style

## Development Setup

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- PostgreSQL

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/excellence-training.git
   cd excellence-training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/excellence_training
   ```

4. Set up the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

Please familiarize yourself with the [Project Overview](./docs/project-overview.md) to understand the architecture and organization of the codebase.

## Coding Guidelines

### JavaScript/TypeScript

- Use TypeScript for all new code
- Follow the existing code style (using ESLint and Prettier)
- Use functional components and hooks for React
- Add meaningful comments for complex logic
- Write descriptive variable and function names

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design for all screen sizes
- Use the existing color variables and design tokens

### Documentation

- Update documentation for any changes to APIs or components
- Add JSDoc comments to functions and components
- Keep the README and docs up to date

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers and devices

## Git Workflow

- Keep commits small and focused
- Write clear commit messages
- Rebase your branch before submitting a pull request
- Reference issues in commit messages and pull requests

## Review Process

After you submit a pull request:

1. Automated tests will run
2. Maintainers will review your code
3. You may be asked to make changes
4. Once approved, your PR will be merged

## Recognition

All contributors will be recognized in the README and/or CONTRIBUTORS file.

## Questions?

If you have any questions, feel free to create an issue or contact the maintainers.

Thank you for your contributions!