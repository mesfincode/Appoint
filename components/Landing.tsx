"use client"
import Image from 'next/image'
import React from 'react'
import ClockComp from './ClockComp'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Landing = () => {
    const navigate = useRouter()
    return (
        <section>
            <div className='px-8 md:px-16  gap-4 xl:px-32 py-16  flex max-lg:flex-col justify-between max-lg:items-center'>
                <div className='flex gap-4 flex-col justify-between'>

                    <ClockComp />
                    <h1 className='text-4xl max-lg:text-2xl text-black-2 font-semibold max-lg:w-full lg:max-w-[600px] uppercase'>Use <span className=' text-primary-1 '>Appoint</span> To Schedule your appointments</h1>
                    <Button  className='px-7 bg-primary-2 transition-all duration-500 hover:bg-primary-3  max-w-[300px] w-full ' onClick={()=>navigate.push('/sign-up')}>
                        Start Now
                    </Button>
                </div>
                <Image

                    src="/images/bg-image1.png"

                    alt='hero-img'
                    width={600}
                    height={600}
                    className='rounded-lg'
                />
                 {/* <Button  className='px-7 bg-primary-3 lg:hidden max-w-[300px]'>
                        Start Now
                    </Button> */}
            </div>
        </section>
    )
}

export default Landing
