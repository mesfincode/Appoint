"use client"
import { getRequestedAppointmentsWithPagenation } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import { DataTablePagination, PaginationOptions } from '@/components/PaginationComp';
import SkeletenComp from '@/components/SkeletenComp';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState, useTransition } from 'react'

const RequestedAppointment = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const [isPending,startTransition] = useTransition()
    const { clerkId } = useCurrentUser()
    useEffect(() => {
        // setIsMounted(true);
        if (clerkId) {
            getRequestedAppointments()
        }

    }, [clerkId]);
    const getRequestedAppointments = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
        startTransition(()=>{
            getRequestedAppointmentsWithPagenation(pagenationOption).then((appoinmentDta)=>{
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page)
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)
            })
        })
     

    }
    const fetchNext =  async({page,pageSize}:PaginationOptions)=> {
        let pagenationOption = { page: page, pageSize: pageSize, clerkId }
        startTransition(()=>{
            getRequestedAppointmentsWithPagenation(pagenationOption).then((appoinmentDta)=>{
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page)
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)
            })
        })
     

    }
    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }
    return (
        <section className='mx-8 my-8'>
            <h1 className='text-black-1 text-center font-semibold text-2xl pb-4'>🕐 Requested Appointments</h1>
            {
                appointmentList ?
                    <>
                        {
                            appointmentList.length > 0 ?
                                <>

                                    <h1 className='text-black-2 text-lg font-semibold pb-4 text-center'>You have {totalRequestedAppointments} Requested Appointments</h1>
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

                                </> :
                                <>
                                    <h1>You Don&apos;t Have Requested Appointments</h1>
                                </>
                        }
                    </> :
                    <SkeletenComp length={5} />
            }
        </section>
    )
}

export default RequestedAppointment
