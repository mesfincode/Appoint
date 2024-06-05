import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
  <section className='place-center h-screen w-full'>
    <div className='flex justify-center items-center  max-lg:flex-col gap-8'>
      {/* <div className='' >
      <img src="/images/schedule_meeting.svg" className='w-[300px] max-lg:w-[100px] h-[300px] max-lg:h-[100px]' alt="" />  
      <h1 className=' text-black-2 font-semibold max-lg:w-full lg:max-w-[350px] '>Appoint</h1>
      </div> */}

       <AuthForm />
    </div> 
  </section>
  )
}

export default page
