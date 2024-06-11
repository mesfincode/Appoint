"use client"
import { getReceivedAppointmentsWithPagenation, getRequestedAppointmentsWithPagenation, upcommingAppointments } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState } from 'react'

const UpcommingAppointments = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    useEffect(() => {
        // setIsMounted(true);
        if (clerkId) {
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
        <section className='mx-8 my-8'>
            <div className='flex justify-center items-center gap-2 flex-col'>
                <h1 className='text-black-1 font-semibold text-2xl pb-4'>🕰️ Upcoming Appointments</h1>
                <h1 className='text-black-2 text-lg font-semibold pb-4'>You have {totalRequestedAppointments} uppcomming appointments</h1>

            </div>
            <div>
                {
                    appointmentList ?
                        <div className='' >
                            {
                                appointmentList.length != 0 ?
                                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ' >

                                        {
                                            appointmentList.map((item, index) => {
                                                const requestedFor = item.requestedFor;
                                                return (
                                                    <>
                                                        <AppointmentCArd sidebar={false} color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor.profileUrl} name={requestedFor.name} date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                    </>
                                                )
                                            })
                                        }
                                    </div> : <>

                                        <h1>No Received Appointments</h1>
                                    </>
                            }
                        </div> :
                        < >
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
                        </>
                }
            </div>
        </section>
    )
}

export default UpcommingAppointments
