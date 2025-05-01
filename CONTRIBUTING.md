# Contributing to Professional Training and Development Website

Thank you for your interest in contributing to our project! We appreciate your help in making this website better.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone <your-fork-url>
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. Make your changes and ensure they follow the project's code style
2. Seed the initial data if needed:
   ```bash
   npm run db:seed
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Test your changes thoroughly
5. Commit your changes with descriptive commit messages:
   ```bash
   git commit -m "Add feature: descriptive message about changes"
   ```

## Pull Requests

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a pull request against the main repository
3. Provide a clear description of your changes
4. Reference any related issues
5. Be responsive to feedback and be willing to make changes if requested

## Coding Standards

- Follow the existing code style and conventions
- Write clear, concise, and descriptive comments
- Use meaningful variable and function names
- Keep components small and focused on a single responsibility
- Use TypeScript types for improved code quality

## Component Guidelines

- Create reusable components when possible
- Group related components in folders
- Include proper propTypes or TypeScript interfaces
- Follow the Shadcn UI component pattern

## CSS Guidelines

- Use TailwindCSS utility classes where appropriate
- Group related styles together
- Follow the mobile-first approach for responsive design
- Use CSS variables for theming

## Testing

- Test your changes across different browsers and devices
- Ensure responsive design works as expected
- Verify that animations and transitions perform well

## Documentation

- Update documentation to reflect your changes
- Document new features or API endpoints
- Include examples where appropriate

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.