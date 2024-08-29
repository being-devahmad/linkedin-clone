"use server"

import {currentUser} from "@clerk/nextjs/server";
import {dbConnect} from "@/lib/db/db";

export const createCommentAction = async (postId: string, formData: FormData) => {
    await dbConnect()

    const user = await currentUser()
    if (!user) throw new Error('User not authenticated');

    try {


    } catch (error) {

    }
}