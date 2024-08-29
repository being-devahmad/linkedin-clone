import React from 'react'
import {IPostDocument} from "@/lib/models/postModel";

const Comments = ({post}: { post: IPostDocument }) => {
    return (
        <div className='mt-5 ml-9'>
          All previous comments are shown here below
        </div>
    )
}

export default Comments