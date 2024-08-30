import React from 'react'
import {IPostDocument} from "@/lib/models/postModel";
import SingleComment from "@/components/SingleComment";


const Comments = ({post}: { post: IPostDocument }) => {
    console.log("post>>" + post)
    return (
        <div>
            {
                post?.comments.map((comment: any) => {
                    return (
                        <>
                            <SingleComment
                                key={comment._id}
                                comment={comment}
                            />
                        </>
                    )
                })
            }
        </div>
    )
}

export default Comments