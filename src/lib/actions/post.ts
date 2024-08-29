"use server"

import {currentUser} from "@clerk/nextjs/server";
import {dbConnect} from "../db/db";
import {IUser} from "../models/userModel";
import {v2 as cloudinary} from "cloudinary";
import {Post} from "../models/postModel";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

export const createPostAction = async (inputText: string, selectedFile: string | null) => {
    await dbConnect();
    const user = await currentUser();
    if (!user) throw new Error('User not authenticated');
    if (!inputText) throw new Error('Input field is required');

    const userDatabase: IUser = {
        firstName: user.firstName || "Patel",
        lastName: user.lastName || "Mern Stack",
        userId: user.id,
        profilePhoto: user.imageUrl
    };

    let uploadResponse;
    try {
        if (selectedFile) {
            // Upload the image to Cloudinary
            uploadResponse = await cloudinary.uploader.upload(selectedFile);

            const post = new Post({
                description: inputText,
                user: userDatabase,
                imageUrl: uploadResponse?.secure_url
            });

             await post.save()


        } else {
            // Create post with text only
            const post = new Post({
                description: inputText,
                user: userDatabase
            });
            console.log('post->>>>' , post)

            await post.save()

        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};
