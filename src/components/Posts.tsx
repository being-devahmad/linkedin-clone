import React from 'react'
import Post from './Post'
import {IPostDocument} from "@/lib/models/postModel";

const Posts = ({posts}: { posts: IPostDocument[] }) => {

    return (
        <div>
            {
                posts?.map((post) => {
                    return (
                        <>
                            <Post post={post} key={post._id }/>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Posts