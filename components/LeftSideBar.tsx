"use client"
import React from 'react'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { it } from 'node:test'
import { usePathname, useRouter } from 'next/navigation'
const LeftSideBar = () => {
  const pathname = usePathname()
  return (
    <div className='left_sidebar'>
      <nav className='flex flex-col gap-6'>
        {
          sidebarLinks.map((item) => {
            console.log(`${item.route}`, pathname)
            const isActive = pathname === `${item.route}`
            return  <Link key={item.label} href={item.route} className={`${isActive?"bg-primary-2 border-r-8 border-primary-1":""} px-2 py-1 items-center text-black-1 mx-4 flex justify-start gap-4`}>
            <Image src={item.imgURL} alt={item.label} width={30} height={30} />
            {item.label}
          </Link>
          })
        }
      </nav>

    </div>
  )
}

export default LeftSideBar