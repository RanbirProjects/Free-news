# Free Newspaper Reader

A MERN stack application that allows users to read newspapers online for free.

## Features

- User authentication and authorization
- Browse different newspaper categories
- Search functionality
- Save favorite articles
- Responsive design for all devices

## Tech Stack

- MongoDB: Database
- Express.js: Backend framework
- React.js: Frontend framework
- Node.js: Runtime environment

## Project Structure

```
free-newspaper/
├── client/             # React frontend
├── server/             # Express backend
├── .gitignore
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```
3. Create a .env file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Contributing

Feel free to submit issues and enhancement requests. 