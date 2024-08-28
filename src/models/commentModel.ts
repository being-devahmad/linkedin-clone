import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./userModel";


export interface IComment {
    textMessage: string,
    user: IUser
}
export interface ICommentDocument extends IComment, Document {
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new mongoose.Schema<ICommentDocument>({
    textMessage: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

},
    { timestamps: true }
);

export const Comment: Model<ICommentDocument> = mongoose.models?.Comment
    || mongoose.model("Comment", commentSchema);