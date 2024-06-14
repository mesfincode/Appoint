
import { profileRepCard } from '@/types'
import Image from 'next/image'
import React from 'react'



const ServiceCard = ({ profileUrl,email, company, serviceDescription ,firstName,lastName,onClick}: profileRepCard) => {

    return (
       <div className='max-sm:mx-4'>
         <div className='h-[250px] max-sm:w-full  w-[250px] border-2 border-gray-200 bg-gray-100 transition-all duration-500 hover:bg-primary-2  p-4 rounded-lg cursor-pointer' onClick={onClick} >
            <div className=' flex flex-col gap-1 justify-center  items-center'>
                <Image src={profileUrl} width={40} height={40} alt={profileUrl} style={{ borderRadius: "100%" }} />
                <div className='flex gap-2'>
                <h1 className='  font-semibold text-black-2'>{firstName.length > 20 ? `${firstName.slice(0, 20)}...` : firstName}</h1>
                <h1 className='  font-semibold text-black-2'>{lastName.length > 20 ? `${lastName.slice(0, 20)}...` : lastName}</h1>

                </div>
                <h1 className=' font-semibold text-black-1'>{company.length > 20 ? `${company.slice(0, 20)}...` : company}</h1>
                <h1 className='text-black-2'>{email}</h1>
                {/* <h1 className='text-center pt-2'>{serviceDescription.slice(0, 100)}</h1> */}
                <h1 className='text-center pt-1 px-2 max-w-[250px] overflow-wrap-break-word'>{serviceDescription.length > 30 ? `${serviceDescription.slice(0, 30)}...` : serviceDescription}</h1>
            </div>

        </div>
       </div>
    )

}

export default ServiceCard
