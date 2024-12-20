import { logger } from "../utils/logger.util";
import MUser from "../models/user.model";
import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../middleware/send-response.middlewre";
import { checkUserExistence, createReqBodySchema, createUser } from "../services/user.services";

export const userRouter = Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user profile
 *     description: This route allows you to create a new user profile by submitting user details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               dob:
 *                 type: string
 *                 description: The date of birth of the user (YYYY-MM-DD)
 *                 example: "1990-05-15"
 *               gender:
 *                 type: string
 *                 enum:
 *                   - male
 *                   - female
 *                   - others
 *                   - null
 *                 description: The gender of the user
 *                 example: "male"
 *               address:
 *                 type: object
 *                 description: The user's address
 *                 properties:
 *                   residence:
 *                     type: string
 *                     description: The residence of the user
 *                     example: "123 Main St"
 *                   state:
 *                     type: string
 *                     description: The state of the user
 *                     example: "California"
 *                   city:
 *                     type: string
 *                     description: The city of the user
 *                     example: "Los Angeles"
 *                   pincode:
 *                     type: number
 *                     description: The pincode of the user's address
 *                     example: 90001
 *                   contact:
 *                     type: number
 *                     description: The contact number of the user
 *                     example: 1234567890
 */
userRouter.post(
    "/create",
    // authMiddleware, add auth middleware if using Firebase authentication
    async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate the request body
            const { error } = createReqBodySchema.validate(req.body);
            if (error) {
                res.status(400).send(sendResponse(null, error.details[0].message, false));
                return;
            }

            const { name, dob, gender, address } = req.body;

            // Verify the Firebase ID token
            // const decodedToken = req.user; // Firebase decoded token
            const _uid = "firebase auth _uid here"; //decodedToken.uid;

            // Check if user already exists
            const existingUser = await checkUserExistence(_uid);
            if (existingUser) {
                res.status(400).send(sendResponse(null, "User already exists", false));
                return;
            }

            // Create new user 
            const newUser: MUser = {
                _uid: "firebase auth _uid here", // decodedToken.uid
                name: name,
                dob: dob,
                gender: gender,
                email: "firebase decodedToken.email here", // decodedToken.email
                address: address,
            };

            // Insert the new user profile into the database
            const insertedId = await createUser(newUser);

            // Respond to the client with success
            res.status(201).send(sendResponse(insertedId, "User created successfully", true));
        } catch (error) {
            logger.error("Error creating user:", error);
            res.status(500).send(sendResponse(null, "Internal server error", false));
        }
    },
);
