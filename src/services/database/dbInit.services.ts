import { userSchemaValidation } from "../../models/user.model";
import { sampleDb } from "./database.services";
import { logger } from "../../utils/logger.util";

export const initDb = async () => {
    //User Profile
    await sampleDb.db
        .createCollection(process.env.USER_COLLECTION)
        .then(async () => {
            await userSchemaValidation();
            logger.info("Created collection < " + process.env.USER_COLLECTION + " >");
        })
        .catch((err) => {
            logger.warn(
                "Collection < " + process.env.USER_COLLECTION + " > already exist, skipping schema validation...",
            );
        });
};
