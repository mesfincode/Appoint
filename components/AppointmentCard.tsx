
"use client"
import { appointmentCardProp, profileRepCard } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DateCountDown from './DateCountDown'



const AppointmentCArd = ({ profileUrl, name, company, date, color }: appointmentCardProp) => {
 
    return (
        <div className={`h-[200px] w-[200px] bg-[#FFB0B1]  p-4 rounded-lg`} >
            <div className=' flex flex-col gap-1 justify-center  items-center'>
                <Image src={profileUrl} width={40} height={40} alt={name} style={{ borderRadius: "100%" }} />
                <h1>{name}</h1>
                <h1>{company}</h1>
                {/* <h1 className='text-center'>{date}</h1> */}
                <DateCountDown targetDate={date} />
            </div>
        </div>
    )

}

export default AppointmentCArd
