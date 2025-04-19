# Hari Krishnan | Portfolio Backend API

This is the backend server for my personal full-stack developer portfolio. Built using **Node.js**, **Express**, and **MongoDB**, it handles contact form submissions, admin login, and provides a secure admin dashboard endpoint to view contact messages.

## Live API

[Visit Backend API](https://your-backend-url.com)

## Features

- Secure admin login using JWT
- Contact form submission and storage in MongoDB
- Protected route for viewing messages
- Global error handler
- CORS enabled and .env configuration support
- Organized folder structure (Controllers, Routes, Models, Middleware)

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- dotenv
- CORS

## Available API Routes

### Auth Routes

- `POST /api/auth/login` – Admin login
- `POST /api/auth/register` – Disabled by default for security

### Contact Routes

- `POST /api/contact/submit` – Submit contact form
- `GET /api/contact/all` – Get all messages (protected by token)

## Author

**Hari Krishnan Nagarajan**  
Full Stack Developer | MERN Stack Enthusiast  
**Email:** harikrish61@gmail.com  
**GitHub:** [github.com/Harikrish58](https://github.com/Harikrish58)  
**LinkedIn:** [linkedin.com/in/hari-krishnan-283360138](https://linkedin.com/in/hari-krishnan-283360138)
