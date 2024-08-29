"use server"

import {currentUser} from "@clerk/nextjs/server";
import {dbConnect} from "../db/db";
import {IUser} from "../models/userModel";
import {v2 as cloudinary} from "cloudinary";
import {Post} from "../models/postModel";
import {revalidatePath} from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// create new post
export const createPostAction = async (inputText: string, selectedFile: string | null) => {
    await dbConnect();
    const user = await currentUser();
    if (!user) throw new Error('User not authenticated');
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
                imageUrl: uploadResponse?.secure_url // yha pr image url aay ga from cloudinary
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

    revalidatePath('/')
}


// get all posts
export const getAllPosts = async () => {
    await dbConnect()

    try {
        const posts = await Post.find().sort({
            createdAt: -1 // means most recent post will be shown at top
        })
        return JSON.parse(JSON.stringify(posts))
    } catch (error) {
        console.log(error)
    }
}
