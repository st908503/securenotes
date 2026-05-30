# Secure Notes Backend

A production-ready backend API for the Secure Notes Application built with Node.js, Express, TypeScript, MongoDB, and JWT authentication.

---

## Features

* JWT Authentication
* Secure password hashing using bcrypt
* Protected routes middleware
* MongoDB database integration
* AES encrypted note storage support
* Notes CRUD APIs
* Search notes functionality
* Centralized error handling
* Input validation using express-validator
* TypeScript support
* Scalable folder architecture

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator

---

## Folder Structure

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── lib/
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

CLIENT_URL=your_client_url

```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:8000
```

---

## Build Project

```bash
npm run build
```

---

## Run Production Build

```bash
npm start
```

---

## API Base URL

```bash
http://localhost:8000/api
```

---

# API Endpoints

---

## Authentication

### Register User

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

---

### Login User

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

---

## Notes

### Get All Notes

```http
GET /api/notes
```

### Get Notes with Search

```http
GET /api/notes?search=work
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

### Create Note

```http
POST /api/notes
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

### Request Body

```json
{
  "title": "My Note",
  "content": "encrypted-note-content"
}
```

---

### Delete Note

```http
DELETE /api/notes/:id
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Security Features

* JWT Authentication
* Password hashing with bcrypt
* Protected routes
* Input validation
* Secure middleware architecture
* Encrypted note storage
* User ownership validation

---

# Postman Collection

The Postman collection is available in the root `/postman` directory.

---

# Future Improvements

* Refresh token authentication
* Swagger API documentation
* Pagination support
* Docker support
* Unit testing
* Rate limiting
* Edit notes functionality

---

# Author

Developed as a Full Stack React Developer Assessment Project.
