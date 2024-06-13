"use client"
import { getReceivedAppointmentsWithPagenation } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import { DataTablePagination } from '@/components/PaginationComp';
import SkeletenComp from '@/components/SkeletenComp';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React, { startTransition, useEffect, useState, useTransition } from 'react'

const ReceivedAppointment = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    useEffect(() => {
        // setIsMounted(true);
        if (clerkId) {
            getReceivedAppointments()
        }
    }, [clerkId]);
    const getReceivedAppointments = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
        startTransition(() => {
            getReceivedAppointmentsWithPagenation(pagenationOption).then((appoinmentDta) => {
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page)
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

                console.log("Appointment Data", appoinmentDta)
            })
        })


    }

    const fetchNext = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
        startTransition(() => {
            getReceivedAppointmentsWithPagenation(pagenationOption).then((appoinmentDta) => {
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page)
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

                console.log("Appointment Data", appoinmentDta)
            })
        })


    }
    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }
    return (
        <section className='mx-8 my-8'>
            <h1 className='text-black-1 text-center font-semibold text-2xl pb-4'>Requested Appointments</h1>
            {
                appointmentList ?
                    <>
                        {
                            appointmentList.length != 0 ? <>
                                <h1 className='text-black-2 text-lg font-semibold pb-4 text-center'>{totalRequestedAppointments} Received Appointments</h1>
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >

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
                                </div>
                                <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} />

                            </> : <>

                                <h1>You Don&apos;t Have Received Appointments</h1>
                            </>
                        }
                    </> :
                    <SkeletenComp length={5} />

            }
        </section>
    )
}

export default ReceivedAppointment
