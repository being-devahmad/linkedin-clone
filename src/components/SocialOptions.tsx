import React, {useState} from 'react'
import {Button} from './ui/button'
import {MessageCircleMore, Repeat, Send, ThumbsUp} from 'lucide-react'
import {IPostDocument} from "@/lib/models/postModel";


const SocialOptions = ({post}: { post: IPostDocument }) => {

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
                {/*{*/}
                {/*    (likes && likes.length > 0) && (*/}
                {/*        <p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{likes.length} likes</p>)*/}
                {/*}*/}
                {/*{*/}
                {/*    (post.comments && post.comments.length > 0) && (<p onClick={() => setCommentOpen(!commentOpen)}*/}
                {/*                                                       className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{post.comments.length} message</p>)*/}
                {/*}*/}
            </div>
            <div className='flex items-center m-1 justify-between'>
                <Button
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <ThumbsUp
                        className={` 'fill-[#378FE9]'}`}
                    />
                    <p className={` 'text-[#378FE9]'}`}>Like</p>
                </Button>
                <Button
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
            {/*{*/}
            {/*    commentOpen && (*/}
            {/*        <div className='p-4'>*/}
            {/*            <CommentInput postId={post._id}/>*/}
            {/*            <Comments post={post}/>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    )
}

export default SocialOptions