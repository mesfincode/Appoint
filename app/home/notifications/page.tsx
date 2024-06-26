"use client"
import { getUserByClerkId } from '@/actions/user';
import EmptyData from '@/components/EmptyData';
import NotificationCard from '@/components/NotificationCard';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { database } from '@/lib/firebase';
import { format } from 'date-fns/fp';
import { equalTo, get, limitToLast, onValue, orderByChild, query, ref, update } from 'firebase/database';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa6';

const NotificationPage = () => {
    const [unreadNotifications, setUnreadNotifications] = useState<any>(null);
    const [readNotfifications, setReadNotifications] = useState<any>(null);
    const [userId, setUserId] = useState("")
    const { clerkId } = useCurrentUser()
    useEffect(() => {
        // Listen for changes in the 'notifications' node of the Realtime Database for the current user
        // console.log(user_2hY5VKh9ynxtp7NKqjRtSDbkvfy)
        if (clerkId) {
            const getUserId = async () => {
                const user = await getUserByClerkId(clerkId)
                setUserId(user.id)
            }
            const getNotifications = async () => {
                const headerRef = ref(database, 'notifications/' + clerkId);
                const queryRef = query(headerRef, orderByChild('read'), equalTo(false))

                onValue(queryRef, (snapshot) => {
                    const data = snapshot.val()
                    console.log("unread", data)
                    if (data) {
                        const unreadNotificationsList: Notification[] = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                        }));
                        const sortedList = unreadNotificationsList.sort((a: any, b: any) => {
                            return b.timestamp - a.timestamp;  // Assuming "date" field holds Unix timestamps
                        });
                        setUnreadNotifications(sortedList);
                    } else {
                        setUnreadNotifications([])
                    }
                });
                const readQuery = query(headerRef, orderByChild('read'), equalTo(true), limitToLast(7))

                onValue(readQuery, (snapshot) => {
                    const data = snapshot.val()
                    if (data) {
                        const notificationsList = Object.values(data).map((notification) => ({
                            ...(notification ?? {}),
                            id: snapshot.key,
                        }));
                        const sortedList = notificationsList.sort((a: any, b: any) => {
                            return b.timestamp - a.timestamp;  // Assuming "date" field holds Unix timestamps
                        });
                        setReadNotifications(sortedList);
                    } else {
                        setReadNotifications([])
                    }
                });

            }
            getNotifications()
        }

    }, [clerkId]);


    return (
        <section className='mx-auto w-full ##'>
            {
                unreadNotifications != null ? <>
                    {
                        unreadNotifications.length > 0 ? <>
                            <div className='flex justify-center items-center w-full gap-4'>
                                <h1 className='text-center sm:text-2xl py-4'>Your recent notifications </h1>
                                {
                                    unreadNotifications.length > 0 ? <div>
                                        {
                                            unreadNotifications.length > 9 ? <div className='relative cursor-pointer' >
                                                <FaBell color='#47689A' size={30} />
                                                <div className=' bg-red-500 w-[37px] h-[18px] flex items-center justify-center rounded-full absolute right-[-20px]  top-[-10px]'>
                                                    <h1 className='text-white-1 '>{unreadNotifications.length}</h1>
                                                </div>
                                            </div> :
                                                <div className='relative cursor-pointer  hover:bg-primary-2 rounded-full' >
                                                    <FaBell color='#47689A' size={30} />
                                                    <div className=' bg-red-500 w-[20px] h-[20px] flex items-center justify-center rounded-full absolute right-[-10px]  top-[-10px]'>
                                                        <h1 className='text-white-1 '>{unreadNotifications.length}</h1>
                                                    </div>


                                                </div>
                                        }
                                    </div> : <div>

                                        <div className='relative cursor-pointer hover:bg-primary-2 rounded-full' >
                                            <FaBell color='#47689A' size={30} />

                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='flex justify-center items-center flex-col w-full '>
                                {
                                    unreadNotifications.map((notification: any) => (
                                        <NotificationCard userId={userId} key={notification.id} notification={notification} clerkId={clerkId} />

                                    ))
                                }
                            </div>
                        </> : <div className=' flex justify-center items-center w-full gap-4'> <h1 className='text-center text-lg sm:text-2xl py-4 '>Your recent notifications</h1> <FaBell color='#47689A' size={30} /></div>
                    }

                </> : <div></div>
            }
            {
                readNotfifications != null ? <div>

                    <div className='flex justify-center items-center flex-col  w-full'>
                        {
                            readNotfifications.map((notification: any) => (
                                <NotificationCard userId={userId} key={notification.id} notification={notification} clerkId={clerkId} />

                            ))
                        }
                    </div>
                </div> : <div></div>
            }
            {
                readNotfifications != null && unreadNotifications != null && readNotfifications.length < 1 && unreadNotifications.length < 1 && (
                    <div>
                        <EmptyData message='You Don&apos;t Have Recent notifications' />
                    </div>
                )
            }

        </section>
    )
}

export default NotificationPage
