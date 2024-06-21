"use client"
import { getReceivedAppointmentsWithPagenation, getRequestedAppointmentsWithPagenation, upcommingAppointments } from '@/actions/appointment';
import AppointmentCArd from '@/components/AppointmentCard';
import AppointmentDetailModal from '@/components/AppointmentDetailModal';
import EmptyData from '@/components/EmptyData';
import { DataTablePagination } from '@/components/PaginationComp';
import ProfileModal from '@/components/ProfileModal';
import SkeletenComp from '@/components/SkeletenComp';
import TitleWithNotificationIcon from '@/components/TitleWithNotificationIcon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { PaginationOptions } from '@/types';
import { Appointment } from '@prisma/client';
import React, { useEffect, useState, useTransition } from 'react'
import InfiniteScroll from 'react-infinite-scroller';

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
        let pagenationOption = { page: 1, pageSize: pageSize, clerkId }
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
        let pagenationOption = { page: page+1, pageSize: pageSize, clerkId }
        // const appoinmentDta = await upcommingAppointments(pagenationOption)
        startTransition(() => {

            upcommingAppointments(pagenationOption).then((appoinmentDta) => {
                setAppointmentList((prev)=>prev!=null?[...prev,...appoinmentDta.data]:appoinmentDta.data)
                setPage((prev)=>prev+1)
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
        <section className=' my-4'>
           <TitleWithNotificationIcon title={ <div className='flex justify-center items-center gap-2 flex-col'>
                <h1 className='text-black-1 font-semibold text-2xl'> Upcoming Appointments</h1>

            </div>} />
            <div>
                {
                    appointmentList ?
                        <>
                            {
                                
                                        appointmentList.length != 0 ?
                                            <>
                                                <h1 className='text-black-2 text-lg text-center  pb-4'>🕰️ You have {totalRequestedAppointments} uppcomming appointments</h1>

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
                                                                      color="" key={index} profileUrl={requestedFor?.profileUrl ?? ""}  date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                               
                                               <Button disabled={page==totalPages || isPending } className='hover:border-2 hover:border-primary-1 text-primary-1 my-4' variant="custom" onClick={()=>fetchNext({page,pageSize})}> <h1 className='text-primary-1 text-lg'>Load More</h1> </Button>
                                                {/* <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} /> */}
                                            </> : <>

                                      
                                            <EmptyData message='You Don&apos;t Have Upcomming Appointments'  />
                                            </>
                                  
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
