const Joi = require("joi");
import MUser from "../models/user.model";
import { sampleDb } from "./database/database.services";
import { InsertOneResult, ObjectId, WithId } from "mongodb";


export const createReqBodySchema = Joi.object({
    name: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    address: Joi.object({
        residence: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.number().required(),
        contact: Joi.number().required(),
    }).required(),
});

export const checkUserExistence = async (_uid: string): null | Promise<WithId<MUser>> => {
    if (_uid === undefined) return null;

    let user: WithId<MUser> = await sampleDb.collections.user.findOne({
        _uid: _uid,
    });

    if (user) return user;

    return undefined;
};

export const createUser = async (userProfile: MUser): null | Promise<ObjectId> => {
    const createdUser: InsertOneResult<MUser> = await sampleDb.db
        .collection(process.env.USER_COLLECTION)
        .insertOne(userProfile);
    if (createdUser.acknowledged) return null;

    return createdUser.insertedId;
};
