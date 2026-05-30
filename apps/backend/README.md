# Secure Notes Backend

A production-ready backend API for the Secure Notes Application built with Node.js, Express, TypeScript, MongoDB, JWT authentication, and refresh token support.

---

# Features

* Access & Refresh Token Authentication
* HTTP-only refresh token cookies
* Automatic access token renewal
* Secure password hashing using bcrypt
* Protected routes middleware
* MongoDB database integration
* AES encrypted note storage support
* Notes CRUD APIs
* Search notes functionality
* Centralized error handling
* Input validation using express-validator
* Health check endpoint
* Backend API testing using Jest & Supertest
* TypeScript support
* Scalable folder architecture

---

# Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs
* express-validator
* Jest
* Supertest

---

# Folder Structure

```bash
apps/backend/
│
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── notes.controller.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   └── note.model.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── notes.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── notes.service.ts
│   │
│   ├── tests/
│   │   ├── auth.test.ts
│   │   ├── notes.test.ts
│   │   └── setup.ts
│   │
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── bcrypt.ts
│   │   ├── encryption.ts
│   │   └── jwt.ts
│   │
│   ├── lib/
│   │   └── ApiError.ts
│   │
│   ├── types/
│   │   └── index.d.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

# Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_token_secret

JWT_REFRESH_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

From the project root:

```bash
npm install
```

---

# Run Development Server

Run only backend:

```bash
npm run dev --workspace=backend
```

Backend will run on:

```bash
http://localhost:8000
```

---

# Build Project

```bash
npm run build --workspace=backend
```

---

# Run Production Build

```bash
npm run start --workspace=backend
```

---

# API Base URL

```bash
http://localhost:8000/api
```

---

# API Endpoints

---

# Authentication

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

## Login User

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "JWT_ACCESS_TOKEN"
  }
}
```

---

## Refresh Access Token

```http
POST /api/auth/refresh-token
```

Uses secure HTTP-only refresh token cookie to generate a new access token.

---

## Logout User

```http
POST /api/auth/logout
```

Clears refresh token cookie and logs out user.

---

# Notes

## Get All Notes

```http
GET /api/notes
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Search Notes

```http
GET /api/notes?search=work
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Create Note

```http
POST /api/notes
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Request Body

```json
{
  "title": "My Note",
  "content": "encrypted-note-content"
}
```

---

## Delete Note

```http
DELETE /api/notes/:id
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# Health Check

## Health Endpoint

```http
GET /api/health
```

### Response

```json
{
  "success": true,
  "message": "Server is running successfully"
}
```

---

# Security Features

* Access & Refresh Token Authentication
* HTTP-only refresh token cookies
* Short-lived access tokens
* Automatic token refresh flow
* Password hashing with bcrypt
* Protected routes
* Input validation
* Secure middleware architecture
* Encrypted note storage
* User ownership validation

---

# Testing

Run backend tests:

```bash
npm run test --workspace=backend
```

Testing stack includes:

* Jest
* Supertest
* Authentication API tests
* Notes API tests
* Refresh token flow tests
* Protected routes testing

---

# Docker Support

Start MongoDB locally using Docker:

```bash
docker compose up -d
```

---

# Postman Collection

The Postman collection is available in:

```bash
/postman/SecureNotes.postman_collection.json
```

---

# Future Improvements

* Swagger API documentation
* Pagination support
* Rate limiting
* Edit notes functionality
* Email verification
* Password reset functionality
* Role-based authorization

---

# Author

Developed as a Full Stack React Developer Assessment Project.
