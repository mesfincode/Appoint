"use client"
import React from 'react'
import ClockComp from './ClockComp'
import { upcomingAppointments } from '@/constants'
import AppointmentCArd from './AppointmentCard'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

const RightSideBar = () => {
    const {user} = useUser()
    return (
        <div className='right_sidebar '>
            <div className='flex justify-center items-center pt-2'>
                <SignedIn>
                    <UserButton  afterSignOutUrl="/sign-in" />
                </SignedIn>
                <h1>{user?.username}</h1>
           
            </div>
            <ClockComp size={100} showSpeaker={true} />
            <h1 className=' text-black-2'>UPCOMING APPOINTMENTS</h1>
            <div className=' flex flex-col justify-start  items-start gap-4 '>
                {
                    upcomingAppointments.map((item, index) => (
                        <AppointmentCArd color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={item.profileUrl} name={item.name} date={item.date} company={item.company} />
                    ))
                }
            </div>

        </div>
    )
}

export default RightSideBar
