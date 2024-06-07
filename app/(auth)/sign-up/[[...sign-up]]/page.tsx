import LandingNav from '@/components/landing/LandingNav'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div>
        <main className=''>
            <LandingNav />
            <div className='flex h-screen w-full items-center  justify-center'>
            <SignUp />
            </div>
       
    </main>
    </div>
  )
}

export default SignUpPage
