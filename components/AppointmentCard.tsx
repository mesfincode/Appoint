
"use client"
import { appointmentCardProp, profileRepCard } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DateCountDown from './DateCountDown'
import { format } from 'date-fns';



const AppointmentCArd = ({ profileUrl, name, company, date, color, sidebar }: appointmentCardProp) => {
    const target = new Date(date);

    const now = new Date();
    const remaining = target.getTime() - now.getTime();
  
    return (
       
            <div className={`  max-sm:w-full ${sidebar?"w-[200px] h-[230px]":"w-[250px]"} border-2 bg-gray-100 border-gray-200 transition-all duration-500 hover:bg-primary-2 cursor-pointer  p-4 rounded-lg`} >
                <div className=' flex flex-col gap-1 justify-center  items-center'>
                    <Image src={profileUrl} width={40} height={40} alt={name} style={{ borderRadius: "100%" }} />
                    <h1 className='text-black-1 font-semibold'>{name}</h1>
                    {/* <h1 className='text-black-1'>{company}</h1> */}
                    <h1 className='text-center text-black-1'>{format(date,  'EEE MMM d/ hh:mm:ss a')}</h1>
                    {
                        remaining <=0?      <div className=" font-bold text-center">Past</div>
                        :<DateCountDown targetDate={date} />
                    }
                </div>
            
        </div>
    )

}

export default AppointmentCArd
