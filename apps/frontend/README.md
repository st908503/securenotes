# Secure Notes Frontend

A modern frontend application for Secure Notes built with React, TypeScript, Redux Toolkit, TailwindCSS, and Vite.

This application allows users to securely authenticate and manage encrypted personal notes.

---

## Features

* JWT authentication flow
* Responsive UI
* Redux Toolkit state management
* AES client-side note encryption
* Create notes
* Search notes
* Delete notes
* Protected routes
* Debounced search
* Reusable component architecture
* Axios API integration
* Toast notifications

---

## Tech Stack

* React
* TypeScript
* Vite
* Redux Toolkit
* TailwindCSS
* React Router DOM
* Axios
* React Hook Form
* CryptoJS
* React Hot Toast

---

## Folder Structure

```bash
frontend/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

---

## Environment Variables

Create a `.env` file in the frontend root directory.

```env
VITE_API_BASE_URL=http://localhost:8000/api

VITE_AES_SECRET_KEY=my-super-secret-key
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Frontend

```bash
cd frontend
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

Frontend will run on:

```bash
http://localhost:5173
```

---

## Build Project

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# Application Pages

---

## Authentication

### Login Page

* User login
* Form validation
* JWT token handling

### Register Page

* User registration
* Password validation
* Secure authentication flow

---

## Dashboard

### Features

* Create encrypted notes
* Search notes
* Delete notes
* Responsive note cards
* Protected dashboard route

---

# Encryption

Notes are encrypted on the client side using AES encryption before being sent to the backend.

Encryption is implemented using:

```bash
crypto-js
```

---

# State Management

Redux Toolkit is used for:

* Authentication state
* Notes state
* Async API handling
* Loading and error management

---

# UI Design

The UI is built using:

* TailwindCSS
* Responsive layout
* Reusable components
* Modern minimal design system

---

# Future Improvements

* Dark mode
* Edit notes
* Rich text editor
* Pagination
* Infinite scroll
* PWA support
* Unit testing
* Docker deployment

---

# Author

Developed as a Full Stack React Developer Assessment Project.
