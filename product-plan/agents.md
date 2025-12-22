# Agent Guidelines

This document outlines the coding standards and guidelines for agents working on this project.

## Code Standards

- **No semicolons**: Do not use semicolons at the end of statements.
- **2-space indentation**: Use 2 spaces for indentation, no tabs.
- **Function declarations**: Prefer `function` declarations over `const` arrow functions for components and functions.
- **One component per file**: Each file should contain only one React component.
- **Shared components**: Use the `shared` folder for generic, reusable components.
- **Extract logic to hooks**: Move extensive logic into custom hooks for better separation of concerns.
- **Prettier normalization**: Use Prettier to automatically format and normalize code style.

## Enforcement

These standards are enforced through ESLint and Prettier configurations. Ensure your code adheres to these rules before committing.
