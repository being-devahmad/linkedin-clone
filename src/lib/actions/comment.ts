"use server"

import {currentUser} from "@clerk/nextjs/server";
import {dbConnect} from "@/lib/db/db";
import {IUser} from "@/lib/models/userModel";
import {Post} from "@/lib/models/postModel";
import {Comment} from "@/lib/models/commentModel"
import {revalidatePath} from "next/cache";

export const createCommentAction = async (postId: string, formData: FormData) => {
    await dbConnect()

    try {
        const user = await currentUser()
        if (!user) throw new Error("User not authenticated")

        const inputText = formData.get('inputText') as string
        if (!inputText) {
            throw new Error("Field is required")
        }
        if (!postId) {
            throw new Error("Post is not found")
        }

        const userDatabase: IUser = {
            firstName: user.firstName || "Patel",
            lastName: user.lastName || "Mern Stack",
            userId: user.id,
            profilePhoto: user.imageUrl
        }

        const post = await Post.findById({
            _id: postId
        })
        if (!post) throw new Error("Post not found")

        const comment = await Comment.create({
            textMessage: inputText,
            user: userDatabase
        })
        console.log("comment++" , comment)
        // @ts-ignore
        post.comments?.push(comment._id)
        await post.save()

        revalidatePath('/')

    } catch (error) {
        throw new Error('An error occurred');
    }
}