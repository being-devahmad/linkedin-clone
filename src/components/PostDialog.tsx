import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import ProfilePhoto from "./shared/ProfilePhoto"
import Image from "next/image"
import { Textarea } from "./ui/textarea"
import { Images } from "lucide-react"

const PostDialog = ({ setOpen, open, src }: { setOpen: any, open: boolean, src: string }) => {
    return (
        <Dialog open={open} >
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        <ProfilePhoto src={src} />
                        <div>
                            <h1>John Doe</h1>
                            <p className="text-xs">public</p>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form action={''}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            <Image
                                src=''
                                alt="preview-image"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input type="file" name="image" className="hidden" accept="image/*" />
                            <Button type="submit">Post</Button>
                        </div>
                    </DialogFooter>
                </form>
                <Button className="gap-2" variant={'ghost'}>
                    <Images className="text-blue-500" />
                    <p>Media</p>
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default PostDialog