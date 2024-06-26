"use client"
import React, { useEffect, useState } from 'react'
import ClockComp from './ClockComp'
import { upcomingAppointments } from '@/constants'
import AppointmentCArd from './AppointmentCard'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { upcommingAppointments } from '@/actions/appointment'
import { Skeleton } from './ui/skeleton'
import AppointmentDetailModal from './AppointmentDetailModal'
import EmptyData from './EmptyData'
import { database } from '@/lib/firebase'
import { ref, get } from "firebase/database";

export const getData = async () => {
    try {
        const headerRef = ref(database, 'name'); // Get ref of 'data'
        const snapshot = await get(headerRef); // Get data of 'data'
        return snapshot.val();
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
const RightSideBar = () => {
    const getData = async () => {
        try {
            const headerRef = ref(database, 'name'); // Get ref of 'data'
            const snapshot = await get(headerRef); // Get data of 'data'
            return snapshot.val();
        } catch (error) {
            console.error('Error getting data:', error);
            throw error;
        }
    };
    const [data, setData] = useState<any>(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getData();
          setData(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }, []);
  
    const { user } = useUser()
    const [appointmentList, setAppointmentList] = useState<any[] | null>(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequestedAppointments, setTotalRequestedAppointments] = useState(0)
    const { clerkId } = useCurrentUser()
    const [userId, setUserId] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [appointment, setAppointment] = useState(false)
    const [iRequested, setIRequested] = useState(false)
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
        setUserId(appoinmentDta.userId ?? "")


    }
    return (
        <div className='right_sidebar pt-4 '>
            {/* <div className='flex justify-center items-center pt-2'>
                <SignedIn>
                    <UserButton  afterSignOutUrl="/sign-in" />
                </SignedIn>
                <h1>{user?.username}</h1>
           
            </div> */}
            <ClockComp size={130} showSpeaker={true} />

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
                                                const iRequested = item.requestedById == userId ? true : false;
                                                const requestedFor = item.requestedFor;
                                                return (
                                                    <>
                                                        <AppointmentCArd onClick={() => {
                                                            setIsOpen(true)
                                                            setAppointment(item)
                                                            setIRequested(iRequested)
                                                        }} status={item.status} iRequested={true} appointment={item} sidebar={true} color={Math.floor(Math.random() * 16777215).toString(16)} key={index} profileUrl={requestedFor.profileUrl} date={item.appointmentDate.toString()} company={requestedFor.companyName} />

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </> : <div>

                                    <EmptyData message='No Upcoming Appointments' sidebar={true} />
                                </div>
                            }
                        </> :
                        <div className='grid grid-cols-1 gap-4' >
                            <Skeleton className="h-[200px] max-sm:w-full w-[200px] rounded-xl border-2 bg-gray-100 border-gray-300 flex flex-col gap-1 justify-around  items-center" >
                                <div className='flex flex-col justify-center items-center'>
                                    <Skeleton className="h-[50px] w-[50px] b rounded-full" />
                                    {/* <Skeleton className="h-[20px] w-[100px] bg-white-3" />
                             <Skeleton className="h-[20px] w-[150px] bg-white-3" /> */}
                                </div>
                                <div className='space-y-2 flex flex-col justify-center items-center mx-4'>
                                    <Skeleton className="h-[20px] w-[100px] " />
                                    <Skeleton className="h-[5px] w-[180px] " />
                                    <Skeleton className="h-[5px] w-[180px] " />
                                </div>


                            </Skeleton>

                        </div>
                }
            </div>
            <AppointmentDetailModal iRequested={iRequested} appointment={appointment} handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />

        </div>
    )
}

export default RightSideBar
