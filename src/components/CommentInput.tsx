"use client"
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import {useUser} from '@clerk/nextjs'
import {Input} from './ui/input'
import {Button} from './ui/button'
import {createCommentAction} from "@/lib/actions/comment";

const CommentInput = ({postId}: { postId: any }) => {
    const {user} = useUser()
    const commentActionHandler = async (formData: FormData) => {
        try {
            if (!user) {
                throw new Error("User is not authenticated")
            }
            await createCommentAction(postId, formData)
        } catch (error) {
            throw new Error("An error occurred")
        }
    }

    return (
        <form action={(formData) => commentActionHandler(formData)}>
            <div className='flex items-center gap-2'>
                <ProfilePhoto src={user?.imageUrl!}/>
                <Input
                    type="text"
                    name="inputText"
                    placeholder='Add a comment'
                    className='rounded-full'
                />
                <Button type='submit' variant={'outline'} className='rounded-full'>Send</Button>
            </div>
        </form>
    )
}

export default CommentInput