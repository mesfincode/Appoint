
import { profileRepCard } from '@/types'
import Image from 'next/image'
import React from 'react'



const ServiceCard = ({ profileUrl, name, company, serviceDescription ,onClick}: profileRepCard) => {

    return (
        <div className='h-[250px] w-[250px] bg-primary-2 p-4 rounded-lg cursor-pointer' onClick={onClick} >
            <div className=' flex flex-col gap-1 justify-center  items-center'>
                <Image src={profileUrl} width={40} height={40} alt={name} style={{ borderRadius: "100%" }} />
                <h1>{name}</h1>
                <h1>{company}</h1>
                <h1 className='text-center'>{serviceDescription}</h1>
            </div>

        </div>
    )

}

export default ServiceCard
