"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const HomeMobileNav = () => {
    const pathname = usePathname();
    const { email, profileUrl } = useCurrentUser()
    const router = useRouter()
    const {signOut} = useClerk()

    return (
        <div className="flex 
    items-center justify-between lg:hidden
    bg-white-1 px-8 py-4 border-b border-gray-200
    ">
            <Link href="/" className='flex justify-center items-center gap-2'>
                <Image src="/images/logo-image.png" width={40} height={40} alt='logo-icon' />
                <h1 className='text-2xl max-md:text-2xl'>Appoint</h1>
            </Link>
            <Sheet>
                <SheetTrigger asChild >

                    <Image className='lg:hidden' src="/icons/menu-icon.svg" alt='log-icon' width={30} height={30} />


                </SheetTrigger>
                <SheetContent side="left" className='border-none bg-primary-2'>
                    <div>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {
                                    sidebarLinks.map((item) => {
                                        const isActive = pathname === `${item.route}`
                                        return <SheetClose asChild key={item.label}>
                                            <Link key={item.label} href={item.route} className={`${isActive ? " bg-white-1 border-r-8 border-primary-1" : ""} px-2 py-1 items-center text-black-1 mx-4 flex justify-start gap-4`}>
                                                <Image src={item.imgURL} alt={item.label} width={30} height={30} />
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    })
                                }
                            </section>
                        </SheetClose>
                    </div>
                    <div className='absolute bottom-8 left-0 right-0 px-4'>
                        {/* <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn> */}
                        <SheetClose asChild>
                            <div className='flex justify-start flex-col gap-2 items-start'>

                                <div className='flex  justify-between items-center w-full'>
                                    {
                                        profileUrl && <Image onClick={() => router.push("/home/profile")} src={profileUrl} width={40} height={40} alt="profile" style={{ borderRadius: "100%" }} />
                                    }
                                    <Image onClick={() => signOut()} src="/icons/log-out.svg" width={30} height={30} alt='logout' style={{ cursor: "pointer" }} />
                                </div>
                                <h1 className='text-black-1'> {email?.slice(0, 15)}... </h1>
                            </div>
                        </SheetClose>

                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default HomeMobileNav
