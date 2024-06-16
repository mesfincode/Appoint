"use client"
import React from 'react'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { it } from 'node:test'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogOutIcon } from 'lucide-react'
const LeftSideBar = () => {
  const pathname = usePathname()
  const { firstName, lastName, email,profileUrl } = useCurrentUser()
   const router = useRouter()
   const {signOut} = useClerk()
  return (
    <div className='left_sidebar'>
      <div className='flex flex-col  justify-between'>
        <nav className='flex flex-col gap-6'>
          <div className='flex px-2  justify-center items-center'>
            <Link href="/" className='flex justify-center items-center gap-2'>
              <Image src="/images/logo-image.png" width={40} height={40} alt='logo-icon' />
              <h1 className='text-2xl text-black-1 max-md:text-2xl'>Appoint</h1>
            </Link>
          </div>
          {
            sidebarLinks.map((item) => {
              const isActive = pathname === `${item.route}`
              return <Link key={item.label} href={item.route} className={`${isActive ? "bg-primary-2 border-r-8 border-primary-1" : ""} px-2 py-1 items-center text-black-1 mx-4 flex justify-start gap-4`}>
                <Image src={item.imgURL} alt={item.label} width={30} height={30} />
                {item.label}
              </Link>
            })
          }

        </nav>
        <div className='absolute bottom-8 left-0 right-0 px-4 z-[1000]'>
          <div className='flex justify-start flex-col gap-2 items-start w-full'>
            {/* <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn> */}
           <div className='flex  justify-between items-center w-full'>
           {
              profileUrl &&<Image onClick={()=>router.push("/home/profile")} src={profileUrl} width={40 } height={40}  alt="profile"style={{ borderRadius: "100%" }}  />
            }
            <Image onClick={()=>signOut()} src="/icons/log-out.svg" width={30} height={30} alt='logout' style={{cursor:"pointer"}}/>
           </div>
            <h1 className='text-black-1'> {email?.slice(0, 15)}... </h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeftSideBar
