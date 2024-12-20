import * as mongoDB from "mongodb";
import MUser from "../models/user.model";

type SampleCollections = {
    user?: mongoDB.Collection<MUser>;
};

type SampleDatabase = {
    db?: mongoDB.Db;
    collections?: SampleCollections;
    client?: mongoDB.MongoClient;
};

type SampleUserSession = {
    userId: mongoDB.ObjectId;
    email: string;
    loggedIn: boolean;
};

declare module "express-session" {
    interface SessionData {
        userData: SampleUserSession;
    }
}

// Update the request type definition (can be in a separate file like types.d.ts)
declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
}
