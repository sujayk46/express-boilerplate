import * as mongoDB from "mongodb";
import MUser from "../../models/user.model";
import { SampleDatabase } from "custom";
import { initDb } from "./dbInit.services";
import { logger } from "../../utils/logger.util";

export let sampleDb: SampleDatabase = {};

// Initialize the database connection and collections
export async function connectToDatabase() {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        await client.connect();

        // Access the specified database
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
        logger.info(`Successfully connected to database ${db.databaseName}\n`);

        // Set up the collections for the app
        const userCollection: mongoDB.Collection<MUser> = db.collection<MUser>(process.env.USER_COLLECTION);

        // Assign the connected database and collections to the global `sampleBloomDb`
        sampleDb.db = db;
        sampleDb.collections = {};
        sampleDb.collections.user = userCollection;

        // Initialize the database
        await initDb();
    } catch (error) {
        logger.error("Error connecting to the database:", error);
        throw error; // Re-throw the error so it can be caught by higher-level handlers
    }
}
