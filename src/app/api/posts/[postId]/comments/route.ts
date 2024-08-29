import {dbConnect} from "@/lib/db/db";
import {NextRequest, NextResponse} from "next/server";
import {Post} from "@/lib/models/postModel";

// fetch all comments
export const GET = async (req: NextRequest, {params}: { params: { postId: string } }) => {
    try {
        await dbConnect()

        const post = await Post.findById({_id: params.postId})

        if (!post) return NextResponse.json({
            message: "Post not found",
            success: false,
        })

        const comments = await post.populate({
            path: "comments",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })

        return NextResponse.json(comments)


    } catch (error) {

    }
}