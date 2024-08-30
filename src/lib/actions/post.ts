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
                imageUrl: uploadResponse?.secure_url // Her we'll pass the imageUrl from cloudinary
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
        }).populate({
            path: "comments",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })
        if(!posts) return []
        return JSON.parse(JSON.stringify(posts))
    } catch (error) {
        console.log(error)
    }
}


// delete Post by id
export const deletePostAction = async (postId: any) => {
    await dbConnect()
    const user = await currentUser();
    console.log('thisUser>>>>', user)
    if (!user) throw new Error('User not authenticated.');
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found.');

    // logic to handle that user could delete its own post only
    if (post.user.userId !== user.id) {
        throw new Error('You are not an owner of this Post.');
    }
    try {
        await Post.deleteOne({_id: postId});
        revalidatePath("/");
    } catch (error: any) {
        throw new Error('An error occurred', error);
    }
}

