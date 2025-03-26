# Todo App Frontend
A modern, responsive React application for managing todo tasks with user authentication.
## Overview
This is the frontend portion of the Todo App, a full-stack application that allows users to manage their personal tasks. It features a clean, responsive UI built with React and Bootstrap.
## Features

User authentication (sign up, login)
Create, read, update, and delete tasks
Mark tasks as complete/incomplete
Responsive design for desktop and mobile devices
Real-time validation for forms
Protected routes for authenticated users

## Tech Stack

React for UI components
Context API for state management
React Router for navigation
Bootstrap for responsive design
Axios for API requests
FontAwesome for icons

### Getting Started
Prerequisites

Node.js (v14 or higher)
Backend API (See backend repository)

### Installation

Clone the repository

```bash
git clone https://github.com/Kevin520122/TODO-app-digital_factory.git
```

Install dependencies

```bash
npm install
```

Create a .env.development file for local development
```bash
REACT_APP_API_URL=http://localhost:5000
```
Create a .env.production file for production
```bash
REACT_APP_API_URL=https://your-backend-deploy-link.app
```

Start the development server

```bash
npm start
```
The application will be running at http://localhost:3000.
Project Structure

```bash
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   ├── routing/       # Route protection
│   └── tasks/         # Task management components
├── context/           # Context API providers
├── pages/             # Page components
├── App.js             # Main application component
└── index.js           # Entry point
```
### Context API
This application uses React's Context API for state management:

AuthContext: Manages user authentication state
TaskContext: Manages task state and operations

### Deployment
The frontend is deployed on Vercel at https://todo-app-digital-factory.vercel.app

### Backend Repository
The backend API for this application is available at [Todo App Backend](https://github.com/Kevin520122/TODO-App-Backend-DeployVersion).
