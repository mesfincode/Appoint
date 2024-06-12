"use client"
import React, { useEffect, useState } from 'react'
import ClockComp from './ClockComp'
import { upcomingAppointments } from '@/constants'
import AppointmentCArd from './AppointmentCard'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { upcommingAppointments } from '@/actions/appointment'
import { Skeleton } from './ui/skeleton'

const RightSideBar = () => {
    const {user} = useUser()
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    useEffect(() => {
        // setIsMounted(true);
        if(clerkId ){
            getReceivedAppointments()
        }
    }, [clerkId]);
    const getReceivedAppointments = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
        const appoinmentDta = await upcommingAppointments(pagenationOption)
        setAppointmentList(appoinmentDta.data)
        setPage(appoinmentDta.page)
        setPageSize(appoinmentDta.pageSize)
        setTotalPages(appoinmentDta.totalPages)
        setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

        console.log("Appointment Data", appoinmentDta)

    }
    return (
        <div className='right_sidebar '>
            <div className='flex justify-center items-center pt-2'>
                <SignedIn>
                    <UserButton  afterSignOutUrl="/sign-in" />
                </SignedIn>
                <h1>{user?.username}</h1>
           
            </div>
            <ClockComp size={100} showSpeaker={true} />
         
            <div className=' flex flex-col justify-start  items-start gap-4 '>
            {
                appointmentList ?
                    <>
                    
                        {
                            appointmentList.length != 0 ? <>
                              <div className=' w-full'>
                              <h1 className=' text-black-1 font-semibold text-center'>{totalRequestedAppointments}  UPCOMING </h1>
                              <h1 className=' text-black-1 font-semibold text-center'>APPOINTMENTS</h1>
                              </div>
                                <div className='grid grid-cols-1  gap-4' >

                                    {
                                        appointmentList.map((item, index) => {
                                            const requestedFor = item.requestedFor;
                                            return (
                                                <>
                                                    <AppointmentCArd sidebar={true} color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor.profileUrl} name={requestedFor.name} date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </> : <>

                               <h1>No Received Appointments</h1>
                            </>
                        }
                    </> :
                    <div className='grid grid-cols-1 gap-4' >
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[200px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[200px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[200px] rounded-xl" />

                        </div>
                       
                    </div>
            }
            </div>

        </div>
    )
}

export default RightSideBar
