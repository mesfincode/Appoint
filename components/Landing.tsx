"use client"
import Image from 'next/image'
import React from 'react'
import ClockComp from './ClockComp'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import LandingNav from './landing/LandingNav'

const Landing = () => {
    const navigate = useRouter()
    return (
        <section>
            <LandingNav />
            <div className='px-8 md:px-16  gap-4 xl:px-32 py-16  flex max-lg:flex-col justify-between max-lg:items-center'>
                <div className='flex  flex-col gap-6'>

                    <ClockComp />
                    <h1 className='text-4xl max-lg:text-2xl text-black-2 text-center  max-w-[300px] max-lg:w-full lg:max-w-[600px] '>Set up your appointments fast</h1>

                    <Button className='px-7 bg-primary-2 transition-all duration-500 hover:bg-primary-3  max-w-[300px] w-full ' onClick={() => navigate.push('/sign-up')}>
                        Start Now
                    </Button>
                </div>
                {/* <Image

                    src="/images/bg-image1.png"

                    alt='hero-img'
                    width={600}
                    height={600}
                    className='rounded-lg'
                /> */}
                <div className='flex max-md:flex-col-reverse  flex-col justify-center items-center'>
                    <h1 className='text-4xl max-lg:text-2xl text-black-2  text-center max-lg:w-full lg:max-w-[600px] '>Use <span className=' text-primary-1 '>Appoint</span> To Schedule your appointments</h1>

                    <img src="/images/appint_wit_doctors.svg" alt="" className='w-[400px] h-[400px]' />
                </div>
                {/* <Button  className='px-7 bg-primary-3 lg:hidden max-w-[300px]'>
                        Start Now
                    </Button> */}
            </div>
        </section>
    )
}

export default Landing
