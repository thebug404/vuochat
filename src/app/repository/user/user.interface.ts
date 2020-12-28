import { Document, PaginateModel } from "mongoose";

export interface IUser {
    name: string;
    provider: string;
    username: string;
    oauthId: string;
    picture: string;
    password?: string;
    created_at?: number;
    updated_at?: number;
};

export interface IUserMongo extends IUser, PaginateModel<Document> {
    _id: string;
}
