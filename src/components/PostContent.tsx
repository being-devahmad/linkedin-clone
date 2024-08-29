import {IPostDocument} from "@/lib/models/postModel";
import Image from "next/image";

export const PostContent = ({post}: { post: IPostDocument }) => {
    return <div className='my-3'>
        <p className='my-3 px-4'>
            {post?.description}
            {
                post?.imageUrl && (
                    <Image
                        src={post?.imageUrl}
                        alt={'post-image'}
                        width={500}
                        height={500}
                        className={'w-full mx-auto'}/>
                )
            }
        </p>
    </div>
}