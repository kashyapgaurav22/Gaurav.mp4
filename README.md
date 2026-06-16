# Gaurav.mp4

A video streaming web application that allows users to explore and watch various categories of videos, built with a modern tech stack.

## Tech Stack

### Client
- **React 19**
- **Vite**
- **React Router**
- **React Player**
- **Lucide React** (Icons)

### Server
- **Node.js & Express**
- **PostgreSQL**
- **Prisma ORM**
- **JSON Web Tokens (JWT)** & **bcrypt** for authentication

## Project Structure

The project is structured as a monorepo containing both the frontend and backend:

- `/client` - The React frontend application.
- `/server` - The Express backend application.

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL database running

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file based on your PostgreSQL connection:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/gaurav_mp4?schema=public"
   JWT_SECRET="your_secret_key"
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```