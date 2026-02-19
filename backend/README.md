# Blog Backend API

Express.js backend server for managing blog posts.

## Features

- RESTful API for blog CRUD operations
- JSON file-based storage (easy to migrate to database later)
- CORS enabled for frontend integration
- Automatic read time calculation
- Featured posts support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### GET `/api/blog`
Get all blog posts (sorted by date, newest first)

### GET `/api/blog/:id`
Get a single blog post by ID

### POST `/api/blog`
Create a new blog post

**Request body:**
```json
{
  "title": "Post Title",
  "excerpt": "Short description",
  "content": "<p>HTML content</p>",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "featured": false
}
```

### PUT `/api/blog/:id`
Update an existing blog post

**Request body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt",
  "content": "<p>Updated content</p>",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "featured": true
}
```

### DELETE `/api/blog/:id`
Delete a blog post

### GET `/api/health`
Health check endpoint

## Data Storage

Blog posts are stored in `data/blog-posts.json`. The file is automatically created on first run with a sample post.

## Environment Variables

- `PORT` - Server port (default: 3001)
