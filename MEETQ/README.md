# MEETQ

A real-time office hours queue management system for universities.

## Features

- Real-time queue management
- Faculty and student portals
- AI-powered scheduling
- Smart analytics

## Authentication

The application includes a basic login system for both faculty and students:

### Faculty Login
- **Login Page**: `/faculty/login`
- **Sign Up Page**: `/faculty/signup`
- **Dashboard**: `/faculty`

### Student Login
- **Login Page**: `/student/login`
- **Sign Up Page**: `/student/signup`
- **Dashboard**: `/student`

### Current Implementation
- Client-side form validation
- Basic email and password requirements
- Redirects to respective dashboards after login
- Links between login and signup pages

**Note**: This is a demo implementation. In production, integrate with a proper authentication service like Firebase Auth, Auth0, or similar.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/faculty/` - Faculty-specific pages
- `app/student/` - Student-specific pages
- `components/` - Reusable UI components
- `lib/` - Utility functions and Firebase configuration
