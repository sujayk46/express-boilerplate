import express = require('express');
import cors from "cors";
import session from "express-session";
import swaggerJsDoc from 'swagger-jsdoc';
import MongoDBStore from "connect-mongodb-session";
import * as dotenv from "dotenv";
import * as swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger.util';
import { apiRouter } from "./services/database/api.services";
import { connectToDatabase } from "./services/database/database.services";
import { initializeFirebase } from './services/database/firebaseInit.services';

dotenv.config();

// Configure MongoDB store for session management
const mongoDBStore = MongoDBStore(session);
const store = new mongoDBStore({
    databaseName: process.env.DB_NAME,
    collection: process.env.USER_SESSIONS_COLLECTION,
    uri: process.env.DB_CONN_STRING,
    expires: 1000 * 60,
});

// Swagger options for generating API documentation
const swaggerOptions:any = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API',
            version: '1.0.0',
            description: 'API documentation for the server',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 8080}/api`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [], 
            },
        ],
    },
    apis: ['./services/**/*.js', './src/controller/*.ts'], 
};

// Generate Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

//Initialize  Express app setup with cors
const app = express();
const port = process.env.PORT || 8080; // Default to 8080 if not specified

//Server config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);

//Session config
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        store: store,
        cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    }),
);

// Swagger UI setup for API documentation in non-production environments
if (process.env.NODE_ENV !== 'production') app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Initialize Firebase Admin SDK
// initializeFirebase();

// Connect to the database and then start the server
connectToDatabase().then(() => {
    app.use("/api", apiRouter); // Mount the API router
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}).catch((error) => {
    logger.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process on failure to connect to DB
});
