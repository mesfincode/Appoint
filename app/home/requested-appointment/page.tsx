"use client"
import { getRequestedAppointmentsWithPagenation } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState } from 'react'

const RequestedAppointment = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    useEffect(() => {
        // setIsMounted(true);
        if(clerkId ){
            getRequestedAppointments()
        }
       
    }, [clerkId]);
    const getRequestedAppointments = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
        const appoinmentDta = await getRequestedAppointmentsWithPagenation(pagenationOption)
        setAppointmentList(appoinmentDta.data)
        setPage(appoinmentDta.page)
        setPageSize(appoinmentDta.pageSize)
        setTotalPages(appoinmentDta.totalPages)
        setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

        console.log("Appointment Data", appoinmentDta)

    }
    return (
        <section className='pt-8 flex flex-col justify-center items-center'>
            <h1>Requested Appointments</h1>
            {
                appointmentList  ?
                    <>
                       {
                        appointmentList.length >0? 
                        <>
                        
                        <h1>{totalRequestedAppointments} Requested Appointments</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >

                            {
                                appointmentList.map((item, index) => {
                                    const requestedFor = item.requestedFor;
                                    return (
                                        <>
                                        <AppointmentCArd color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor.profileUrl} name={requestedFor.name} date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                    </>
                                    )
                                })
                            }
                        </div>
                        </>:
                        <>
                        <h1>You Don't Have Requested Appointments</h1>
                        </>
                       }
                    </> :
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                        </div>
                    </div>
            }
        </section>
    )
}

export default RequestedAppointment
