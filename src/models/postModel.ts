import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./userModel";


export interface IPost {
    description: string,
    user: IUser,
    imageUrl?: string,
    likes?: string[],
    // comments : IComment
}
export interface IPostDocument extends IPost, Document {
    createdAt: Date,
    updatedAt: Date
}
const postSchema = new mongoose.Schema<IPostDocument>({
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to User model
        required: true,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    likes: {
        type: [String]
    }

}, { timestamps: true });

export const Post: Model<IPostDocument> = mongoose.models?.Post ||
    mongoose.model<IPostDocument>("Post", postSchema);