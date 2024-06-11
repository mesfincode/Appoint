
import { profileRepCard } from '@/types'
import Image from 'next/image'
import React from 'react'



const ServiceCard = ({ profileUrl, name,email, company, serviceDescription ,onClick}: profileRepCard) => {

    return (
       <div className='max-sm:mx-2'>
         <div className='h-[250px] max-sm:w-full  w-[250px] bg-primary-3 border-2 border-gray-200 lg:p-4 rounded-lg cursor-pointer' onClick={onClick} >
            <div className=' flex flex-col gap-1 justify-center  items-center'>
                <Image src={profileUrl} width={40} height={40} alt={name} style={{ borderRadius: "100%" }} />
                <h1 className='text-lg font-semibold text-black-2'>{name}</h1>
                <h1 className='text-xl font-semibold text-black-1'>{company}</h1>
                <h1 className='text-black-2'>{email}</h1>
                {/* <h1 className='text-center pt-2'>{serviceDescription.slice(0, 100)}</h1> */}
                <h1 className='text-center pt-1 px-2'>{serviceDescription.length > 50 ? `${serviceDescription.slice(0, 50)}...` : serviceDescription}</h1>
            </div>

        </div>
       </div>
    )

}

export default ServiceCard
