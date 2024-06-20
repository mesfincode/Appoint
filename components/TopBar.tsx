import React, { useEffect, useState } from 'react'
import { FaBell, FaSearchengin } from 'react-icons/fa6'
import { Input } from './ui/input'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database'
import { database } from '@/lib/firebase'
import Image from 'next/image'

interface topBarProps{
    onKeyChange:(pageSize:string)=>void;

}
export interface ChildComponentProps {
    // count: string;
    setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  }
const TopBar = ({setSearchKeyWord}:ChildComponentProps) => {
    
    const [numberOfNotification] = useState("30")

    const [notifications, setNotifications] = useState<any>([]);
    const { clerkId } = useCurrentUser()
    const router = useRouter()

    useEffect(() => {
        // Listen for changes in the 'notifications' node of the Realtime Database for the current user
        // console.log(user_2hY5VKh9ynxtp7NKqjRtSDbkvfy)
        if (clerkId) {
            const getNotifications = async () => {
                const headerRef = ref(database, 'notifications/' + clerkId);
                const queryRef = query(headerRef, orderByChild('read'), equalTo(false))

                onValue(queryRef, (snapshot) => {
                    const data = snapshot.val()
                    console.log(data)
                    if (data) {
                        const notificationsList = Object.values(data).map((notification) => ({
                            ...(notification ?? {}),
                            id: snapshot.key,
                        }));
                        setNotifications(notificationsList);
                    }
                });


            }
            getNotifications()
        }
        // Clean up the listener when the component unmounts
        // return () => {
        //   notificationsRef.off();
        // };
    }, [clerkId]);
    return (
        <div className='flex justify-center items-center gap-4 pb-4'>
            <div className='relative '>
                <Input type='text'
                    onChange={(e) => setSearchKeyWord(e.target.value)} 
                    placeholder='Search with name, email,phone company' className='border-primary-1 rounded-full max-sm:w-[220px] w-[350px] focus-visible:ring-offset-primary-1' />
                <FaSearchengin className='absolute right-4 top-3' />
            </div>
            <div className='flex justify-center items-center gap-4 '>

                {
                    notifications.length > 0 ? <div>
                        {
                            notifications.length > 9 ? <div className='relative cursor-pointer' onClick={() => router.push("/home/notifications")}>
                                <FaBell color='#47689A'  size={30}/>
                                <div className=' bg-red-500 w-[37px] h-[18px] flex items-center justify-center rounded-full absolute right-[-20px]  top-[-10px]'>
                                    <h1 className='text-white-1 '>{notifications.length}</h1>
                                </div>
                            </div> :
                                <div className='relative cursor-pointer  hover:bg-primary-2 rounded-full' onClick={() => router.push("/home/notifications")}>
                                <FaBell color='#47689A'  size={30}/>
                                <div className=' bg-red-500 w-[20px] h-[20px] flex items-center justify-center rounded-full absolute right-[-10px]  top-[-10px]'>
                                        <h1 className='text-white-1 '>{notifications.length}</h1>
                                    </div>


                                </div>
                        }
                    </div> : <div>

                        <div className='relative cursor-pointer hover:bg-primary-2 rounded-full' onClick={() => router.push("/home/notifications")}>
                        <FaBell color='#47689A'  size={30}/>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default TopBar
