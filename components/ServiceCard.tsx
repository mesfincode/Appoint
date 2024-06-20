
import { profileRepCard } from '@/types'
import Image from 'next/image'
import React from 'react'



const ServiceCard = ({ profileUrl,email, company, serviceDescription ,firstName,lastName,onClick}: profileRepCard) => {

    return (
      
        <div className={`  sm:max-w-[400px] w-full border-2 bg-gray-100 border-gray-200 transition-all duration-500 hover:bg-primary-2 cursor-pointer  p-4 rounded-lg`} onClick={onClick}>
            <div className=' flex flex-col gap-1 justify-center  items-center'>
            <Image src={profileUrl} width={40} height={40} alt={profileUrl} style={{ borderRadius: "100%" }} />
                <div className='flex gap-2'>
                <h1 className='  font-semibold text-black-2'>{firstName.length > 20 ? `${firstName.slice(0, 20)}...` : firstName}</h1>
                <h1 className='  font-semibold text-black-2'>{lastName.length > 20 ? `${lastName.slice(0, 20)}...` : lastName}</h1>

                </div>
                <h1 className=' font-semibold text-black-1'>{company.length > 20 ? `${company.slice(0, 20)}...` : company}</h1>
                {/* <h1 className='text-black-2'>{email}</h1> */}
                {/* <h1 className='text-center pt-2'>{serviceDescription.slice(0, 100)}</h1> */}
                <h1 className='text-center pt-1 px-2 max-w-[250px] overflow-wrap-break-word'>{serviceDescription.length > 30 ? `${serviceDescription.slice(0, 30)}...` : serviceDescription}</h1>
            </div>

        </div>
    )

}

export default ServiceCard
