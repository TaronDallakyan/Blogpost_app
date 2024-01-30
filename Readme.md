# Project Name

BLOGPOST is a web application for managing blog posts and comments with user authentication using JWT (JSON Web Tokens).

## Features

- User authentication: Register, login, logout, and manage user accounts securely using JWT.
- Blog post management: Create, read, update, and delete blog posts.
- Comment system: Users can post comments on blog posts, view all comments associated with a post, update and delete their own comments.
- Secure API endpoints: RESTful API endpoints with proper authentication and authorization mechanisms.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Express Validator for input validation
- bcrypt for password hashing

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>

   ```

2. Install dependencies:

   ```bash
    npm install

   ```

3. Configure environment variables:

Create a .env file in the root directory and define the following variables:

```bash
     PORT=3000
     MONGO_URI=mongodb://localhost:27017
     JWT_SECRET=your-secret-key


4. Start the server:

 npm start


### Postman Collection

Postman Collection has been added for easy testing
```
