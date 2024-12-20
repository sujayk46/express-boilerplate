import { sampleDb } from "../services/database/database.services";
import IAddress from "../interfaces/user.interface";

export default class MUser {
    constructor(
        public _uid: string,
        public name: string,
        public dob: string,
        public gender: "male" | "female" | "others" | "null",
        public email: string,
        public address: IAddress,
    ) {}
}

export const userSchemaValidation = async () => {
    const validationCommand = {
        collMod: process.env.USER_PROFILE_COLLECTION,
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["_uid", "name", "dob", "gender", "email"],
                additionalProperties: false,
                properties: {
                    _uid: {
                        bsonType: "string",
                        description: "uid for the firbase auth and is required",
                    },
                    name: {
                        bsonType: "string",
                        description: "name is of type string and is required",
                    },
                    dob: {
                        bsonType: ["string", "null"],
                        description: "dob is of type string and is required",
                    },
                    gender: {
                        enum: ["male", "female", "others", "null"],
                        description: "gender can be 'male', 'female', 'others' and is required",
                    },
                    email: {
                        bsonType: "string",
                        description: "email is of type string and is required",
                    },
                    contact: {
                        bsonType: ["number", "null"],
                        description: "contact is of type number",
                    },
                    address: {
                        bsonType: "object",
                        additionalProperties: false,
                        properties: {
                            residence: {
                                bsonType: ["string", "null"],
                                description: "residence is of type string and is required",
                            },
                            state: {
                                bsonType: ["string", "null"],
                                description: "state is of type string and is required",
                            },
                            city: {
                                bsonType: ["string", "null"],
                                description: "city is of type string and is required",
                            },
                            pincode: {
                                bsonType: ["number", "null"],
                                description: "pincode is of type string and is required",
                            },
                            contact: {
                                bsonType: ["number", "null"],
                                description: "contact is of type string and is required",
                            },
                        }
                    }
                },
            },
        },
    };

    await sampleDb.db.command(validationCommand);
};
