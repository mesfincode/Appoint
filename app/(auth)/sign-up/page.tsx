import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
  <section className='place-center h-screen w-full'>
    <div className='flex justify-center  gap-8'>
      <div className=' max-lg:hidden'>
      <img src="/images/schedule_meeting.svg" className='w-[300px] h-[300px]' alt="" />  
      <h1 className='text-2xl max-lg:text-2xl text-black-2 font-semibold max-lg:w-full lg:max-w-[350px] uppercase'>Register to start scheduling your meetings</h1>
      </div>

       <AuthForm />
    </div> 
  </section>
  )
}

export default page
