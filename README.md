# HashBlog

HashBlog is a full-stack blogging platform built with React.js for the front-end and Node.js with Express.js for the back-end. It allows users to create, read, update, and delete blog posts.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Rich text editor for writing blog posts
- Responsive design for desktop and mobile devices
- Markdown support for blog posts
- Search functionality to find blog posts
- Pagination for blog posts
- Comment section for each blog post
- User profiles with avatar upload
- Admin panel for managing users and posts

## Technologies Used

### Front-end

- React.js
- React Router
- Axios (for HTTP requests)
- React Quill (rich text editor)
- React Markdown (markdown rendering)
- React Bootstrap (UI library)

### Back-end

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Multer (for file uploads)
- BCrypt (for password hashing)

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/HashBlog.git
```
2. Install front-end dependencies:

```bash
cd HashBlog/client
npm install
```
3. Install back-end dependencies:

```bash
cd ../server
npm install
```
4. Create a .env file in the server directory and add your environment variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the back-end server
```bash
npm start

```
6. Start the front-end development server:
```bash
cd ../client
npm start
```
