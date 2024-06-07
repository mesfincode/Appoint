import LandingNav from '@/components/landing/LandingNav'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className=''>
    <LandingNav />
    <div className='flex h-screen w-full items-center  justify-center'>
    <SignIn />
    </div>

</main>
  )
}

export default SignInPage
