"use client"
import { getRequestedAppointmentsWithPagenation } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import AppointmentDetailModal from '@/components/AppointmentDetailModal';
import EmptyData from '@/components/EmptyData';
import { DataTablePagination, PaginationOptions } from '@/components/PaginationComp';
import ProfileModal from '@/components/ProfileModal';
import SkeletenComp from '@/components/SkeletenComp';
import TitleWithNotificationIcon from '@/components/TitleWithNotificationIcon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState, useTransition } from 'react'

const RequestedAppointment = () => {
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const [isPending,startTransition] = useTransition()
    const { clerkId } = useCurrentUser()
    const [userId,setUserId] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [appointment, setAppointment] = useState(false)
    const [iRequested,setIRequested] = useState(false)

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
                setUserId(appoinmentDta.userId ??"")

                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)
            })
        })
     

    }
    const fetchNext =  async({page,pageSize}:PaginationOptions)=> {
        let pagenationOption = { page: page+1, pageSize: pageSize, clerkId }
        startTransition(()=>{
            getRequestedAppointmentsWithPagenation(pagenationOption).then((appoinmentDta)=>{
                setAppointmentList((prev)=>prev!=null?[...prev,...appoinmentDta.data]:appoinmentDta.data)
                setPage((prev)=>prev+1)
                setPageSize(appoinmentDta.pageSize)
                setUserId(appoinmentDta.userId ??"")

                setTotalPages(appoinmentDta.totalPages)
                setTotalRequestedAppointments(appoinmentDta.totalRequestedAppointments)
            })
        })
     

    }
    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }
    return (
        <section className=' my-4'>
           
            <TitleWithNotificationIcon title={ <h1 className='text-black-1 text-center font-semibold text-2xl '> Requested Appointments</h1>} />
            {
                appointmentList ?
                    <>
                        {
                            appointmentList.length > 0 ?
                                <>

                                    <h1 className='text-black-2 text-lg pb-4 text-center'>🕐 You have {totalRequestedAppointments} Requested Appointments</h1>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >

                                        {
                                            appointmentList.map((item, index) => {
                                                const requestedFor = item.requestedFor;
                                                const iRequested = item.requestedById == userId? true:false;
                                                return (
                                                    <>
                                                        <AppointmentCArd   onClick={()=>{
                                                                        setIsOpen(true)
                                                                        setAppointment(item)
                                                                        setIRequested(iRequested)
                                                                    }}
                                                                    appointment={item}
                                                                    iRequested={iRequested} status={item.status} sidebar={false} color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor.profileUrl}  date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} /> */}
                                    <Button disabled={page==totalPages || isPending } className='hover:border-2 hover:border-primary-1 text-primary-1 my-4' variant="custom" onClick={()=>fetchNext({page,pageSize})}> <h1 className='text-primary-1 text-lg'>Load More</h1> </Button>

                                </> :
                                <>
                                    <EmptyData message='You Don&apos;t Have Requested Appointments' />
                                </>
                        }
                    </> :
                    <SkeletenComp length={5} />
            }
                        <AppointmentDetailModal iRequested={iRequested} appointment={appointment} handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
                        <ProfileModal />

        </section>
    )
}

export default RequestedAppointment
