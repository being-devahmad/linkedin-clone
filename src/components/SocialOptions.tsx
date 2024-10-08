import React, {useState} from 'react'
import {Button} from './ui/button'
import {MessageCircleMore, Repeat, Send, ThumbsUp} from 'lucide-react'
import {IPostDocument} from "@/lib/models/postModel";
import {useUser} from "@clerk/nextjs";
import CommentInput from "@/components/CommentInput";
import Comments from "@/components/Comments";


const SocialOptions = ({post}: { post: IPostDocument }) => {
    const {user} = useUser()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [commentBoxOpen, setCommentBoxOpen] = useState(false)


    const likeOrDislikeHandler = async () => {
        if (!user) throw new Error("User not authenticated")
        const tempLiked = liked
        const tempLikes = likes

        const dislike = likes?.filter((userId) => userId !== user.id)
        const like = [...(likes ?? []), user.id]

        const newLike = liked ? dislike : like
        setLiked(!liked)
        setLikes(newLike)

        const res = await fetch(`/api/posts/${post?._id}/${liked ? '/dislike' : '/like'} `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.id)

        })

        if (!res.ok) {
            setLiked(tempLiked)
            throw new Error("Failed to like or dislike")
        }

        // fetch all likes
        const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`)
        if (!fetchAllLikes) {
            setLikes(tempLikes)
            throw new Error("Failed to fetch like")
        }

        const totalLikes = await fetchAllLikes.json()
        setLikes(totalLikes)

    }

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
                {
                    (likes && likes.length > 0) && (
                        <p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>
                            {likes.length}
                            like
                        </p>
                    )}

                {
                    (post.comments && post.comments.length > 0) && (
                        <p onClick={() => setCommentBoxOpen(!commentBoxOpen)}
                           className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>
                            {post.comments.length} comments
                        </p>
                    )}
            </div>
            <div className='flex items-center m-1 justify-between'>
                <Button
                    onClick={likeOrDislikeHandler}
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <ThumbsUp
                        className={` ${liked && 'fill-[#378FE9]'}`}
                    />
                    <p className={` ${liked && 'text-[#378FE9]'}`}>Like</p>
                </Button>
                <Button
                    onClick={() => setCommentBoxOpen(!commentBoxOpen)}
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore/>
                    <p>Message</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Repeat/>
                    <p>Repost</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Send/>
                    <p>Send</p>
                </Button>
            </div>
            {
                commentBoxOpen && (
                    <div className='p-4'>
                        <CommentInput postId={post?._id}/>
                        <Comments post={post}/>
                    </div>
                )
            }
        </div>
    )
}

export default SocialOptions