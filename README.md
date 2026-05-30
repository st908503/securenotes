# Secure Notes Application

A full-stack secure notes application built using a modern monorepo architecture with TurboRepo.

Users can securely register, login, and manage encrypted personal notes through a responsive React frontend and a scalable Node.js backend.

---

# Live Demo

## Frontend

Add your deployed frontend URL here.

```txt
https://your-frontend-url.vercel.app
```

## Backend

Add your deployed backend URL here.

```txt
https://your-backend-url.onrender.com
```

---

# Features

## Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Secure password hashing using bcrypt

## Notes Management

* Create secure notes
* Fetch notes
* Delete notes
* Search notes

## Security

* AES encrypted note content
* JWT-based authorization
* Protected API routes
* Input validation
* Secure middleware architecture

## Frontend

* Responsive UI
* Redux Toolkit state management
* Debounced search
* Reusable component architecture
* TailwindCSS UI

## Backend

* RESTful APIs
* MongoDB integration
* Centralized error handling
* Scalable service architecture
* TypeScript support

---

# Monorepo Architecture

This project uses TurboRepo for monorepo management.

```txt
secure-notes-app/
│
├── apps/
│   ├── frontend/
│   └── backend/
│
├── package.json
├── turbo.json
└── README.md
```

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Redux Toolkit
* TailwindCSS
* Axios
* React Hook Form

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt

## Monorepo

* TurboRepo
* npm Workspaces

---

# Project Structure

```txt
apps/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── README.md
```

---

# Environment Variables

## Backend

Create:

```txt
apps/backend/.env
```

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development
```

---

## Frontend

Create:

```txt
apps/frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8000/api

VITE_AES_SECRET_KEY=your_aes_secret_key
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

# Install Dependencies

From root directory:

```bash
npm install
```

---

# Run Frontend + Backend

From root directory:

```bash
npm run dev
```

TurboRepo will start:

* frontend
* backend

simultaneously.

---

# Application URLs

## Frontend

```txt
http://localhost:5173
```

## Backend

```txt
http://localhost:8000
```

---

# Build Project

```bash
npm run build
```

---

# Start Production Build

```bash
npm run start
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Notes

### Get Notes

```http
GET /api/notes
```

### Search Notes

```http
GET /api/notes?search=value
```

### Create Note

```http
POST /api/notes
```

### Delete Note

```http
DELETE /api/notes/:id
```

---

# Postman Collection

The Postman collection is available inside:

```txt
/postman
```

---

# Screenshots

## Login Page

Add screenshot here.

```txt
screenshots/login.png
```

## Dashboard

Add screenshot here.

```txt
screenshots/dashboard.png
```

---

# Security Notes

This project encrypts note content on the client side using AES encryption before storing it in the database.

For production-grade applications:

* encryption keys should not live in frontend bundles
* secure key management services should be used

This implementation is intended for assessment/demo purposes.

---

# Future Improvements

* Refresh token authentication
* Edit notes functionality
* Pagination
* Docker support
* Swagger documentation
* Unit testing
* Dark mode
* Rich text editor

---

# Individual App Documentation

Detailed documentation is available inside:

```txt
apps/frontend/README.md
apps/backend/README.md
```

---

# Author

Developed as a Full Stack React Developer Assessment Project using React, TypeScript, Node.js, MongoDB, and TurboRepo.
