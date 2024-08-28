import mongoose, { Document, Model } from "mongoose";

export interface User {
    firstName: string,
    lastName: string,
    userId: string,
    profilePhoto?: string,
    bio?: string
}

export interface UserDocument extends User, Document {
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<UserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },

    profilePhoto: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model("User", userSchema)