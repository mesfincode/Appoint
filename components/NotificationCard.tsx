"use client"
import { database } from '@/lib/firebase';
import { ref, set, update } from 'firebase/database';
import React, { useEffect, useState, useTransition } from 'react'
import { formatRelative, formatDistance } from 'date-fns';
import { getAppointmentById } from '@/actions/appointment';
import { Appointment } from '@prisma/client';
import Image from 'next/image';
import NotificationCardSkeleton from './NotificationCardSkeleton';

const TimeAgo = ({ timestamp }: { timestamp: any }) => {
    const timeAgo = formatDistance(timestamp, new Date(), { addSuffix: true })

    return <div className='flex justify-end items-end w-full text-black-2'><h1 className='text-center'>{timeAgo}</h1></div>;
};
const NotificationCard = ({ notification, clerkId }: { notification: any, clerkId: any }) => {
    const [appointmentDetail, setAppointmentDetail] = useState<any>()
    const [iRequsted, setIrequested] = useState()
    const [isLoading, setTransition] = useTransition()
    const [success, setSuccess] = useState()
    const [error, setError] = useState<string>()
    const markNotificationAsRead = (notificationId: string) => {
        console.log(notificationId)
        console.log(notification)
        const headerRef = ref(database, 'notifications/' + clerkId + "/" + notificationId);
        notification.read = true;
        // const notificationsRef =database.ref(`notifications/${currentUserId}/${notificationId}`);
        set(headerRef, notification).then((data) => {
            console.log(data)
        }).catch((e) => {
            console.log(e)
        })
    };
    useEffect(() => {
        setTransition(() => {
            getAppointmentById(notification.appointmentId).then((response) => {
                if (response.data) {
                    setAppointmentDetail(response.data)
                    console.log(response.data)
                } else {
                    setError(response.error)
                }
            })
        })
    }, [])
    return (
        <div className='  mx-8 max-w-[600px] w-full my-1 '>
            {
                !isLoading && appointmentDetail != null ?
                    <div onClick={() => markNotificationAsRead(notification.id)} className={`${notification.read ? "border-2 border-primary-2 rounded-lg" : "bg-primary-2 border-2 border-primary-2 rounded-lg "}`}>

                        <div className='flex flex-col justify-start items-start p-2'>
                            <div className='flex gap-4 justify-center items-center ' >
                                {/* <Image src={appointmentDetail.requestedFor.profileUrl} alt={appointmentDetail.id} width={50} height={50} style={{ borderRadius: "100%" }} /> */}
                                {
                                    notification.type == 0  && (
                                        <>
                                            <img src={appointmentDetail.requestedFor.profileUrl} alt="profile" className='w-[60px] h-[60px] rounded-full' />
                                            <div className=''>
                                                <h1 className='text-start'>{appointmentDetail.requestedFor.firstName} {appointmentDetail.requestedFor.lastName}</h1>
                                                <h1 className='text-start text-black-2'>You sent appointment requst</h1>
                                            </div>
                                        </>
                                    )
                                }
                                  {
                                    notification.type == 2  && (
                                        <>
                                            <img src={appointmentDetail.requestedFor.profileUrl} alt="profile" className='w-[60px] h-[60px] rounded-full' />
                                            <div className=''>
                                                <h1 className='text-start'>{appointmentDetail.requestedFor.firstName} {appointmentDetail.requestedFor.lastName}</h1>
                                                <h1 className='text-start text-black-2'>{notification.message}</h1>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    notification.type == 1 && (
                                        <>
                                            <img src={appointmentDetail.requestedBy.profileUrl} alt="profile" className='w-[60px] h-[60px] rounded-full' />
                                            <div className=''>
                                                <h1 className='text-start'>{appointmentDetail.requestedBy.firstName} {appointmentDetail.requestedBy.lastName}</h1>
                                                <h1 className='text-start text-black-2 '>{notification.message}</h1>
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                          
                            {
                                notification.timestamp && (
                                    <TimeAgo timestamp={notification.timestamp} />
                                )
                            }
                        </div>


                    </div> :<NotificationCardSkeleton length={1}/>
            }
        </div>
    )
}

export default NotificationCard
