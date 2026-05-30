# Secure Notes Frontend

A modern frontend application for Secure Notes built with React, TypeScript, Redux Toolkit, TailwindCSS, and Vite.

This application allows users to securely authenticate and manage encrypted personal notes with access & refresh token authentication.

---

# Features

* Access & refresh token authentication
* Automatic access token renewal
* Protected routes
* Responsive UI
* Redux Toolkit state management
* AES client-side note encryption
* Create notes
* Search/filter notes
* Delete notes
* Debounced search
* Reusable component architecture
* Axios API integration
* Toast notifications
* Logout confirmation modal
* Secure authentication flow

---

# Tech Stack

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
* Vitest
* React Testing Library

---

# Folder Structure

```bash
apps/frontend/
│
├── src/
│   ├── app/
│   │   └── store.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loader.tsx
│   │   │
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   │
│   │   └── notes/
│   │       ├── NoteCard.tsx
│   │       └── NoteForm.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   ├── authSlice.ts
│   │   │   └── types.ts
│   │   │
│   │   └── notes/
│   │       ├── notesService.ts
│   │       ├── notesSlice.ts
│   │       └── types.ts
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── tests/
│   │   ├── Dashboard.test.tsx
│   │   ├── Login.test.tsx
│   │   └── setup.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── api.ts
│   │   └── encryption.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```


---

# Environment Variables

Create a `.env` file in the frontend root directory.

```env id="um6azg"
VITE_API_BASE_URL=http://localhost:8000/api

VITE_AES_SECRET_KEY=your_aes_secret_key
```

---

# Installation

## Clone Repository

```bash id="35a3z0"
git clone <repository-url>
```

---

# Install Dependencies

From project root:

```bash id="c7u8t0"
npm install
```

---

# Run Development Server

Run only frontend:

```bash id="ndc0bn"
npm run dev --workspace=frontend
```

Frontend will run on:

```bash id="g9q6sm"
http://localhost:5173
```

---

# Build Project

```bash id="0um0ud"
npm run build --workspace=frontend
```

---

# Preview Production Build

```bash id="7icgu3"
npm run start --workspace=frontend
```

---

# Run Frontend Tests

```bash id="1tlq27"
npm run test --workspace=frontend
```

---

# Application Pages

# Authentication

## Login Page

Features:

* User login
* Form validation
* Access token authentication
* Automatic token refresh
* Protected navigation

---

## Register Page

Features:

* User registration
* Password validation
* Secure authentication flow
* Redirect to login after registration

---

# Dashboard

Features:

* Create encrypted notes
* Search/filter notes
* Delete notes
* Logout confirmation modal
* Responsive note cards
* Protected dashboard route

---

# Encryption

Notes are encrypted on the client side using AES encryption before being sent to the backend.

Encryption is implemented using:

```bash id="gtjjms"
crypto-js
```

---

# Authentication Flow

Authentication is implemented using:

* Short-lived access tokens
* HTTP-only refresh token cookies
* Automatic token renewal using Axios interceptors

Access tokens are stored in localStorage.

Refresh tokens are stored securely in HTTP-only cookies.

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

# Testing

Frontend testing includes:

* Login page rendering tests
* Dashboard rendering tests
* React Testing Library
* Vitest configuration

---

# Security Notes

This project encrypts note content on the client side using AES encryption before storing it in the database.

For production-grade applications:

* encryption keys should not live in frontend bundles
* secure key management services should be used
* HTTPS should always be enabled in production

This implementation is intended for assessment/demo purposes.

---

# Future Improvements

* Dark mode
* Edit notes
* Rich text editor
* Pagination
* Infinite scroll
* PWA support
* Docker deployment
* Offline support

---

# Author

Developed as a Full Stack React Developer Assessment Project.
