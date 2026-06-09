# KodeNote - Modern Code Snippet Manager

KodeNote is a full-stack application built with the MERN stack (MongoDB, Express, React, Node.js) that helps developers save, organize, and manage their reusable code snippets.

## Features

- **Authentication:** Secure registration and login with JWT and bcrypt.
- **Snippet Management:** Full CRUD operations (Create, Read, Update, Delete) for snippets.
- **Tags & Languages:** Categorize snippets by programming language and custom tags.
- **Modern UI:** Professional dark-themed interface built with Tailwind CSS.
- **Search:** Quickly find snippets by title or tags.
- **Responsive:** Fully mobile-friendly design.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React, Axios, React Router.
- **Backend:** Node.js, Express, Mongoose, JWT, Bcryptjs.
- **Database:** MongoDB.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### 1. Clone the repository

```bash
git clone <repository-url>
cd kodenote
```

### 2. Set up Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 3. Set up Frontend

```bash
cd ../client
npm install
```

### 4. Run the Application

Start the backend:

```bash
# In server directory
npm run server
```

Start the frontend:

```bash
# In client directory
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port), and the backend runs on `http://localhost:5000`.

## Deployment

### Backend (Render)

1. Connect your GitHub repository.
2. Set Environment Variables (`MONGO_URI`, `JWT_SECRET`).
3. Set Build Command: `cd server && npm install`.
4. Set Start Command: `cd server && node app.js`.

### Frontend (Vercel)

1. Connect your GitHub repository.
2. Set the framework to Vite.
3. Set the Root Directory to `client`.
4. The proxy in `package.json` should be replaced with a base URL in axios for production.

## License

MIT
