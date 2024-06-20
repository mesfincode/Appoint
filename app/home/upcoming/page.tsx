"use client"
import { getReceivedAppointmentsWithPagenation, getRequestedAppointmentsWithPagenation, upcommingAppointments } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import AppointmentDetailModal from '@/components/AppointmentDetailModal';
import EmptyData from '@/components/EmptyData';
import { DataTablePagination } from '@/components/PaginationComp';
import ProfileModal from '@/components/ProfileModal';
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
    const [userId,setUserId] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [appointment, setAppointment] = useState(false)
    const [iRequested,setIRequested] = useState(false)

    useEffect(() => {
        // setIsMounted(true);
        if (clerkId) {
            getReceivedAppointments()
        }
    }, [clerkId]);


    const getReceivedAppointments = async () => {
        let pagenationOption = { page: page, pageSize: pageSize, clerkId }
        // const appoinmentDta = await upcommingAppointments(pagenationOption)
        startTransition(() => {

            upcommingAppointments(pagenationOption).then((appoinmentDta) => {
                handleAddAppointment(appoinmentDta.data);
                setPage(appoinmentDta.page )
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setUserId(appoinmentDta.userId ??"")

                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)

            })
        })


    }

    const fetchNext = async({page,pageSize}:PaginationOptions)=>{
        let pagenationOption = { page: page, pageSize: pageSize, clerkId }
        // const appoinmentDta = await upcommingAppointments(pagenationOption)
        startTransition(() => {

            upcommingAppointments(pagenationOption).then((appoinmentDta) => {
                setAppointmentList(appoinmentDta.data)
                setPage(appoinmentDta.page )
                setPageSize(appoinmentDta.pageSize)
                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)
                setUserId(appoinmentDta.userId ??"")
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
        <section className=' my-8'>
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
                                                           
                                                            const iRequested = item.requestedById == userId? true:false;
                                                            const requestedFor = item.requestedFor;
                                                            return (
                                                                <>
                                                                    <AppointmentCArd
                                                                    onClick={()=>{
                                                                        setIsOpen(true)
                                                                        setAppointment(item)
                                                                        setIRequested(iRequested)
                                                                    }}
                                                                     
                                                                     iRequested={iRequested}
                                                                      status={item.status} 
                                                                      sidebar={false} 
                                                                      appointment={item}
                                                                      color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor?.profileUrl ?? ""}  date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                               
                                                <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} />
                                            </> : <>

                                      
                                            <EmptyData message='You Don&apos;t Have Upcomming Appointments'  />
                                            </>
                                    }
                                </div> : <SkeletenComp length={pageSize} />
                            }
                        </>

                        :
                        <SkeletenComp length={6} />

                }
            </div>
            <AppointmentDetailModal iRequested={iRequested} appointment={appointment} handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
            <ProfileModal />

        </section>
    )
}

export default UpcommingAppointments
