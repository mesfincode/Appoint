import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingNav = () => {
  return (
    <section className='bg-primary-4 xl:px-32 py-4 px-4 '>
        <nav className='flex justify-between items-center'>
            <Link href="/" className='flex justify-center items-center gap-2'>
                <Image src="/images/logo-image.png" width={40} height={40} alt='logo-icon'/>
                <h1 className='text-4xl max-md:text-2xl'>Appoint</h1>
            </Link>
          <ul className='max-md:hidden block'>
            <li className='flex gap-4 justify-center items-center'>
                <Link href="/about" className='text-lg'><h1 className='text-2xl'>About</h1></Link>
                <Link href="/about" className='text-lg'><h1 className='text-2xl'>Contact</h1></Link>
                <Link href="/about" className='text-lg'><h1 className='text-2xl'>Start</h1></Link>

            </li>

          </ul>
          <Image src="/icons/menu-icon.svg" alt='log-icon' width={30} height={30}/>
        </nav>
    </section>
  )
}

export default LandingNav
