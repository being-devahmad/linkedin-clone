"use server"

import { currentUser } from "@clerk/nextjs/server";
import { dbConnect } from "../db/db";
import { IUser } from "../models/userModel";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "../models/postModel";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})



// creating post using server actions
export const createPostAction = async (inputText: string, selectedFile: string) => {
    await dbConnect();
    const user = await currentUser();
    if (!user) throw new Error('User not athenticated');
    if (!inputText) throw new Error('Input field is required');

    const image = selectedFile;


    const userDatabase: IUser = {
        firstName: user.firstName || "Patel",
        lastName: user.lastName || "Mern Stack",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    
    let uploadResponse;
    try {
        if (image) {
            //1. create post with image
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user: userDatabase,
                imageUrl: uploadResponse?.secure_url // yha pr image url ayega from cloudinary
            })
        } else {
            //2. create post with text only
            await Post.create({
                description: inputText,
                user: userDatabase
            })
        }
    } catch (error: any) {
        throw new Error(error);
    }
}