import {NextRequest, NextResponse} from "next/server";
import {dbConnect} from "@/lib/db/db";
import {Post} from "@/lib/models/postModel";


// get all likes
export const GET = async (req: NextRequest, {params}: { params: { postId: string } }) => {
    try {
        await dbConnect()

        const post = await Post.findById({_id: params.postId})

        if (!post) return NextResponse.json({
            message: "Post not found",
            success: false,
        })

        return NextResponse.json(post.likes)

    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            success: false,
        })
    }
}


// post likes
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
            $addToSet: {likes: userId} // only unique , yani user sirf aik bar like kryga
        })
        return NextResponse.json({
            message: "Post liked successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            error: "An error occurred"
        })
    }
}