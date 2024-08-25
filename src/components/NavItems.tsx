import { Bell, BriefcaseBusiness, Home, MessageCircleMore, Users } from 'lucide-react'
import Link from 'next/link'

// First method to define type 
// type NAVITEMS = {
//     src: String,
//     icon: JSX.Element,
//     text: String
// }

// Second method to define type 
interface NAVITEMS {
    src: String,
    icon: JSX.Element,
    text: String
}

const NavItems = () => {

    const navItems: NAVITEMS[] = [
        {
            src: "/home",
            icon: <Home />,
            text: "Home",
        },
        {
            src: "/networks",
            icon: <Users />,
            text: "My Network",
        },
        {
            src: "/job",
            icon: <BriefcaseBusiness />,
            text: "Jobs",
        },
        {
            src: "/message",
            icon: <MessageCircleMore />,
            text: "Messaging",
        },
        {
            src: "/notification",
            icon: <Bell />,
            text: "Notification",
        },
    ]

    return (
        <div className='flex gap-8'>
            {
                navItems.map((navItem, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center cursor-pointer text-[#666666] hover:text-black'>
                            <span>{navItem.icon}</span>
                            <Link
                                href={`${navItem.src}`}
                                className='text-xs'
                            >
                                {navItem.text}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NavItems