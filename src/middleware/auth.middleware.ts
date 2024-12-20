import admin from "firebase-admin";
import { logger } from "../utils/logger.util";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "./send-response.middlewre";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    //Extract the token from the Authorization header (Bearer <token>)
    const token = req.header("Authorization")?.split(" ")[1];

    //Check if the token is missing
    if (!token) {
        res.status(401).send(sendResponse(null, "Authorization token is missing", false));
        return;
    }

    //Verify the Firebase token
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            //Attach the decoded user information to the request object
            req.user = decodedToken;
            logger.info("Token verified.");
            next();
        })
        .catch((error) => {
            logger.error("Error verifying token:", error);
            res.status(401).send(sendResponse(null, "Invalid or expired token", false));
        });
}
