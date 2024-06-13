"use client"
import { getReceivedAppointmentsWithPagenation, getRequestedAppointmentsWithPagenation, pastAppointments, upcommingAppointments } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import { DataTablePagination } from '@/components/PaginationComp';
import SkeletenComp from '@/components/SkeletenComp';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { PaginationOptions } from '@/types';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState, useTransition } from 'react'

const UpcommingAppointments = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // setIsMounted(true);
        if (clerkId) {
            getReceivedAppointments()
        }
    }, [clerkId]);


    const getReceivedAppointments = async () => {
        let pagenationOption = { page: page, pageSize: pageSize, clerkId }
        // const appoinmentDta = await upcommingAppointments(pagenationOption)
        console.log(pagenationOption)
        startTransition(() => {

            pastAppointments(pagenationOption).then((appoinmentDta) => {
                console.log(appoinmentDta)
                handleAddAppointment(appoinmentDta.data);
                setPage(appoinmentDta.page )
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

                console.log("Appointment Data", appoinmentDta)
            })
        })


    }

    const fetchNext = async({page,pageSize}:PaginationOptions)=>{
        let pagenationOption = { page: page, pageSize: pageSize, clerkId }
        // const appoinmentDta = await upcommingAppointments(pagenationOption)
        console.log(pagenationOption)
        startTransition(() => {

            pastAppointments(pagenationOption).then((appoinmentDta) => {
                console.log(appoinmentDta)
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page )
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

                console.log("Appointment Data", appoinmentDta)
            })
        })
      
      }
    const handleAddAppointment = (newAppointment: any) => {
        setAppointmentList((prevList) => {
            if (prevList === null) {
                return [...newAppointment];
            } else {
                return [...prevList, ...newAppointment];
            }
        });
    };

    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }

    return (
        <section className='mx-8 my-8'>
            <div className='flex justify-center items-center gap-2 flex-col'>
                <h1 className='text-black-1 font-semibold text-2xl pb-4'>🕰️ Upcoming Appointments</h1>

            </div>
            <div>
                {
                    appointmentList ?
                        <>
                            {
                                !isPending ? <div className='' >
                                    {
                                        appointmentList.length != 0 ?
                                            <>
                                                <h1 className='text-black-2 text-lg text-center font-semibold pb-4'>You have {totalRequestedAppointments} uppcomming appointments</h1>

                                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ' >

                                                    {
                                                        appointmentList.map((item, index) => {
                                                            const requestedFor = item.requestedFor;
                                                            return (
                                                                <>
                                                                    <AppointmentCArd sidebar={false} color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor?.profileUrl ?? ""} name={requestedFor.name} date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {/* <Button disabled={page ==totalPages+1} onClick={() => {
                                          
                                            getReceivedAppointments()

                                        }}>See more</Button> */}
                                                <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} />
                                            </> : <>

                                                <h1>No Received Appointments</h1>
                                            </>
                                    }
                                </div> : <SkeletenComp length={pageSize} />
                            }
                        </>

                        :
                        <SkeletenComp length={6} />

                }
            </div>
        </section>
    )
}

export default UpcommingAppointments
