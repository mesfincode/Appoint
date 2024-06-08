import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

const HomeNav = () => {
    return (
        <section className=' xl:px-32 py-4 px-4 '>
        <nav className='flex justify-between items-center'>
            <Link href="/" className='flex justify-center items-center gap-2'>
                <Image src="/images/logo-image.png" width={40} height={40} alt='logo-icon'/>
                <h1 className='text-2xl max-md:text-2xl'>Appoint</h1>
            </Link>
            <div className=' border-4 border-primary-1 px-4  w-[300px] h-[30px] rounded-full'>
              <h1>search</h1>
            </div>
            <SignedIn>
                <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
        </nav>
    </section>
    )
}

export default HomeNav
