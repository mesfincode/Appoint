
"use client"
import { appointmentCardProp, profileRepCard } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DateCountDown from './DateCountDown'
import { format } from 'date-fns';
import { AppointmentStatus } from '@prisma/client'



const AppointmentCArd = ({ profileUrl,company, date, color, sidebar, status, iRequested, appointment, onClick }: appointmentCardProp) => {
    const target = new Date(date);

    const now = new Date();
    const remaining = target.getTime() - now.getTime();

    return (

        <div className={`  max-sm:w-full  ${sidebar ? "w-[200px] h-[230px]" : "w-full"} border-2 bg-gray-100 border-gray-200 transition-all duration-500 hover:bg-primary-2 cursor-pointer  p-4 rounded-lg`} onClick={onClick}>
            <div className=' flex flex-col gap-1 justify-center  items-center'>
                {
                    iRequested ? <>
                        <Image src={appointment.requestedFor.profileUrl} width={40} height={40} alt={appointment.requestedFor.firstName} style={{ borderRadius: "100%" }} />
                        <div className='flex gap-2'>
                            <h1 className='text-black-1 font-semibold'>{appointment.requestedFor.firstName}</h1>
                            <h1 className='text-black-1 font-semibold'>{appointment.requestedFor.lastName}</h1>

                        </div>
                    </> : <> <Image src={appointment?.requestedBy.profileUrl} width={40} height={40} alt={appointment?.requestedBy.firstName} style={{ borderRadius: "100%" }} />
                        <div className='flex gap-2'>
                            <h1 className='text-black-1 font-semibold'>{appointment?.requestedBy.firstName}</h1>
                            <h1 className='text-black-1 font-semibold'>{appointment?.requestedBy.lastName}</h1>

                        </div>
                    </>
                }

                {/* <h1 className='text-black-1'>{company}</h1> */}
                <h1 className='text-center text-black-1'>{format(date, 'EEE MMM d/ hh:mm:ss a')}</h1>
                {
                    remaining <= 0 ? <div className=" font-bold text-center">Past</div>
                        : <>
                            {
                                status == AppointmentStatus.CONFIRMED ? <DateCountDown targetDate={date} /> :
                                    <>
                                        {
                                            iRequested ? <>

                                                {
                                                    status == "PENDING" ? <h1 className='text-primary-1'>Waiting Confirmation</h1> : <h1>{status}</h1>
                                                }
                                            </> : <> {
                                                status == "PENDING" ? <h1>Confirm</h1> : <h1>{status}</h1>
                                            }</>
                                        }
                                    </>
                            }
                        </>
                }
            </div>

        </div>
    )

}

export default AppointmentCArd
