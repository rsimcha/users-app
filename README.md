# Users App

This project consists of a Node.js server running on port 8080 and a React frontend application.

## Server

The server handles API requests related to user management. It communicates with an external API to fetch user data and provides endpoints for creating, updating, and deleting users.

### Installation

1. Clone this repository.
2. Navigate to the `server` directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file and configure environment variables (e.g., `MONGO_URL`, `ACCESS_TOKEN_SECRET`).
5. Run `npm start` to start the server.

### Usage

The server consists of five endpoints:

- `GET /api/users/getUsers/:page`: Retrieves users from an external API based on the specified page number.
- `GET /api/users/getUser/:id`: Retrieves a specific user by ID.
- `POST /api/users/createUser`: Creates a new user.
- `PUT /api/users/updateUser/:id`: Updates an existing user.
- `DELETE /api/users/deleteUser/:id`: Deletes a user.

## Frontend

The frontend is a React application that interacts with the server's API endpoints to display user data and perform CRUD operations.

### Installation

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.
