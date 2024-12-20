# Express Boilerplate
This is an Express.js boilerplate project designed for building scalable and robust backend services. It includes essential features  to start with. You can enhanced it to meet enterprise-level standards.

### Key Notes:
- The Firebase-related files (`firebaseInit.services.ts` and the Firebase SDK config) are mentioned as commented out for now.
- The authentication middleware (`auth.middleware.ts`) is also included but not active unless Firebase is configured.
- The README provides instructions on setting up Firebase and environment variables, as well as an overview of the folder structure and key files.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#Installation)
- [Folder Structure](#folder-structure)
- [File Descriptions](#file-descriptions)
- [Firebase Integration](#firebase-integration)
- [Features](#features)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account
- Firebase Project (optional, if using Firebase Auth)
- **Node.js** and **npm** (or **yarn**).

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sujayk46/react-boilerplate.git
   cd react-boilerplate
   ```
2. Install the necessary dependencies:
   ```bash
    npm install
    # or
    yarn install
   ```
3. Configure a `.env` file for the environment variables (see the .env file for details).

4. Optionally, if using Firebase Authentication, set up Firebase and place the Firebase Admin SDK configuration in the `config/` folder.

4. Start the server:
   ```bash
    npm run serve
   ``` 

## Folder Structure

```plaintext
└── 📁src
    └── 📁@custom_types
        └── custom.d.ts                 # TypeScript custom type definitions
    └── 📁config
        └── example-firebase-adminsdk-e5f9e-sample.json  # Firebase Admin SDK configuration (commented out)
    └── 📁controller
        └── user.controller.ts          # Controller for user-related routes
    └── 📁interfaces
        └── user.interface.ts          # TypeScript interface for user model
    └── 📁middleware
        └── auth.middleware.ts         # Authentication middleware (currently not active)
        └── send-response.middleware.ts # Middleware to standardize API responses
    └── 📁models
        └── user.model.ts              # Mongoose model for User (or other DB model)
    └── 📁services
        └── 📁database
            └── api.services.ts        # General API-mounting services
            └── database.services.ts   # Database initialization and queries
            └── dbInit.services.ts     # Initializes the database connection
            └── firebaseInit.services.ts # Firebase SDK initialization (currently commented out)
        └── user.services.ts           # Business logic for user-related operations
    └── 📁utils
        └── logger.util.ts             # Utility for logging
    └── server.ts                      # Entry point for the server
```

## Firebase Admin SDK Integration

The Firebase Admin SDK is set up but currently commented out. To enable Firebase authentication, follow these steps:

1. Replace the `example-firebase-adminsdk-e5f9e-sample.json` file with your Firebase Admin SDK credentials.
2. Uncomment the Firebase initialization and authentication logic in `firebaseInit.services.ts` and `auth.middleware.ts`.

## File Descriptions

- **`server.ts`**: The main entry point that starts the Express server.
- **`user.controller.ts`**: Contains the route handlers for user-related API requests.
- **`user.interface.ts`**: TypeScript interface for the user object.
- **`auth.middleware.ts`**: Authentication middleware to handle token validation (currently inactive).
- **`send-response.middleware.ts`**: A middleware to standardize API responses across the app.
- **`user.model.ts`**: Mongoose (or another ORM/ODM) model for the user data.
- **`api.services.ts`**: Generic API service for handling API calls.
- **`database.services.ts`**: Database initialization and utility functions.
- **`dbInit.services.ts`**: Initializes the database connection at the start of the server.
- **`firebaseInit.services.ts`**: Placeholder for Firebase Admin SDK initialization (currently commented out).
- **`logger.util.ts`**: Utility functions for logging messages and errors.

## Firebase Integration

The Firebase Admin SDK is set up but currently commented out. To enable Firebase authentication, follow these steps:

1. Replace the `example-firebase-adminsdk-e5f9e-sample.json` file with your Firebase Admin SDK credentials.
2. Uncomment the Firebase initialization and authentication logic in `firebaseInit.services.ts` and `auth.middleware.ts`.


## Features

1. **Authentication Middleware**: Includes a placeholder for Firebase Auth middleware (auth.middleware.ts) which you can enable after configuring Firebase.

2. **Controller & Service Pattern**: Separated logic for routes (controllers) and business logic (services) for better scalability and maintainability.

3. **Database Services**: Utility services to handle database operations, including API services and database initialization.

4. **Custom Types**: TypeScript types for strong typing support.

5. **Winston Logger Integration**: Provides logging functionality for debugging and error tracking with Winston in `logger.util.ts`.

6. **Joi Validation**: Middleware for input validation using Joi to ensure API requests contain valid data.

8. **Environment Configuration**: Handles environment variables for database credentials, Firebase authentication, and other secrets.

9. **Standardized API Responses**: The app uses `send-response.middleware.ts` to ensure all API responses are consistent and properly formatted.

10. **Firebase Admin SDK Integration (Optional)**: Firebase authentication is supported but commented out. Set up Firebase credentials and enable the Firebase logic to use it for user authentication.

11. **Modular File Structure**: Clear organization of controllers, services, models, middlewares, and utilities for better code readability and maintenance.

# License

Copyright (c) 2024 Sujay Kanolkar

This project is a boilerplate template and is open-source. You can freely use and modify the code to build your own applications. However, this project comes with no warranty or guarantee.

### Permissions
- You may use this code to create your own projects or as a base for any application.
- You may modify the code to suit your needs.
- You may distribute your modified or original version of this code.

### Conditions
- You must include this license in all copies or substantial portions of the code.

### Limitation
- The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Feel free to modify, improve, and adapt it to your needs, but please acknowledge the original creator.

