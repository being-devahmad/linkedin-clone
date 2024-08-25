import React from 'react'
import { Input } from './ui/input'
import ProfilePhoto from './shared/ProfilePhoto'

const PostInput = ({ user }: { user: any }) => {
    return (
        <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <ProfilePhoto src={user?.imageUrl} />
                <Input
                    type="text"
                    placeholder='Start a post'
                    className='rounded-full hover:bg-gray-100 h-12 cursor-pointer'

                />
                {/* <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} /> */}
            </div>
        </div>
    )
}

export default PostInput