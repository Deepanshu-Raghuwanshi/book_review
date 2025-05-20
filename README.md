# Book Review REST API

A RESTful API for a book review system built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for books and reviews
- Search functionality for books
- Pagination for books and reviews
- Swagger API documentation

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Swagger for API documentation

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d
   ```

### Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Example API Requests

#### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "password123"}'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

#### Create a new book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "description": "A novel about the American Dream", "genre": "Fiction", "publishedYear": 1925}'
```

#### Get all books

```bash
curl -X GET http://localhost:5000/api/books
```

#### Get book by ID

```bash
curl -X GET http://localhost:5000/api/books/BOOK_ID
```

#### Add a review

```bash
curl -X POST http://localhost:5000/api/books/BOOK_ID/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"rating": 5, "comment": "Great book, highly recommended!"}'
```

#### Update a review

```bash
curl -X PUT http://localhost:5000/api/reviews/REVIEW_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"rating": 4, "comment": "Good book, but not perfect."}'
```

#### Delete a review

```bash
curl -X DELETE http://localhost:5000/api/reviews/REVIEW_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Search books

```bash
curl -X GET http://localhost:5000/api/search?query=gatsby
```

## Database Schema

### User

- `_id`: ObjectId
- `username`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: Date
- `updatedAt`: Date

### Book

- `_id`: ObjectId
- `title`: String (required)
- `author`: String (required)
- `description`: String (required)
- `genre`: String (required)
- `publishedYear`: Number
- `isbn`: String
- `createdBy`: ObjectId (reference to User)
- `createdAt`: Date
- `updatedAt`: Date

### Review

- `_id`: ObjectId
- `rating`: Number (required, 1-5)
- `comment`: String (required)
- `book`: ObjectId (reference to Book)
- `user`: ObjectId (reference to User)
- `createdAt`: Date
- `updatedAt`: Date

## Design Decisions and Assumptions

1. **Authentication**: JWT-based authentication is used for secure API access. Tokens expire after 30 days.

2. **One Review Per User Per Book**: A user can only submit one review per book, enforced by a compound index.

3. **Pagination**: All list endpoints support pagination to handle large datasets efficiently.

4. **Error Handling**: Global error handler middleware provides consistent error responses.

5. **Response Format**: Response interceptor middleware ensures consistent response format.

6. **Search**: Case-insensitive and partial match search for book titles and authors.

7. **Average Rating**: Calculated on-the-fly using MongoDB aggregation.

8. **Swagger Documentation**: Comprehensive API documentation with examples and schemas.
