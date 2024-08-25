import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'

const Feed = ({ user }: { user: any }) => {
    return (
        <div className='flex-1'>
            <PostInput user={user} />
            <Posts />
        </div>
    )
}

export default Feed