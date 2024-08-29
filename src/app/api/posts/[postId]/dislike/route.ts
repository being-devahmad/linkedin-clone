// post dislike

import {NextRequest, NextResponse} from "next/server";
import {dbConnect} from "@/lib/db/db";
import {Post} from "@/lib/models/postModel";

export const POST = async (req: NextRequest, {params}: { params: { postId: string } }) => {
    try {
        await dbConnect()

        const userId = await req.json()
        const post = await Post.findById({_id: params.postId})

        if (!post) return NextResponse.json({
            message: "Post not found",
            success: false,
        })

        await post.updateOne({
            $pull: {likes: userId} // only unique , yani user sirf aik bar like kryga
        })
        return NextResponse.json({
            message: "Post disliked successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            error: "An error occurred"
        })
    }
}