import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'

const Feed = ({ user }: { user: any }) => {

    const userData = JSON.parse(JSON.stringify(user))

    return (
        <div className='flex-1'>
            <PostInput user={user} />
            <Posts />
        </div>
    )
}

export default Feed