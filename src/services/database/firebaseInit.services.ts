var admin = require("firebase-admin");
import { logger } from "../../utils/logger.util";
var serviceAccount = require("../../config/example-firebase-adminsdk-e5f9e-sample.json");



export function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    logger.info("Successfully initialized Firebase Admin SDK !");
}
