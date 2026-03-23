# Blog Web App

A personal blogging application built with the MERN stack (MongoDB, Express, React, Node.js). Uses EJS for server-side rendering with a React like-button component on individual posts.

## Stack

- Node.js + Express — server and routing
- MongoDB + Mongoose — persistent blog storage
- EJS — server-side templating
- React (CDN) — interactive like button on blog posts
- Bootstrap 5 — UI styling

## Project Structure

```
Blog-Web-App/
├── models/
│   └── Blog.js          # Mongoose schema
├── public/
│   ├── js/              # Client-side JS
│   └── styles/          # CSS
├── views/
│   ├── partials/        # Header and footer
│   ├── index.ejs        # Home page
│   ├── new.ejs          # Create post
│   ├── view.ejs         # Read post (React like button here)
│   ├── edit.ejs         # Edit post
│   └── delete.ejs       # Delete confirmation
├── .env                 # Environment variables (not committed)
└── index.js             # Entry point
```

## Prerequisites

- Node.js v18+
- MongoDB running locally, or a MongoDB Atlas URI

```bash
git clone https://github.com/praju120056/blog_web.git
cd Blog-Web-App
```
=======
## Setup

1. Clone the repository:
   ```
   git clone https://github.com/praju120056/blog_web.git
   cd blog_web
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   MONGO_URI=mongodb://localhost:27017/blogdb
   PORT=3000
   ```
   Replace `MONGO_URI` with your Atlas connection string if not using local MongoDB.

## Running

```
npm start
>>>>>>> 5597e69 (add .gitignore and update README)
```

Open `http://localhost:3000` in your browser.

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | / | Home — list all posts |
| GET | /new | New post form |
| POST | /view | Create post |
| GET | /blog/:id | View post |
| GET | /edit/:id | Edit form |
| POST | /edit/:id | Save edits |
| GET | /delete/:id | Delete confirmation |
| POST | /delete/:id | Delete post |
| POST | /api/blogs/:id/like | Increment like count |
