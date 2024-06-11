"use client"
import React, { useEffect, useState } from 'react'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { companyServiceProviders } from '@/constants';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import { FaSearchengin } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import AppointmentModal from '@/components/AppointmentModal';
import { Profile, profileRepCard } from '@/types';
import ProfileModal from '@/components/ProfileModal';
import { User } from '@prisma/client';
import { getServiceProviderWithPagination } from '@/data/user';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useState<User | null>(null)
    const { user } = useUser()

    const [userList, setUserList] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0)
    useEffect(() => {
        // setIsMounted(true);
        getServiceProviders()
    }, []);
    const getServiceProviders = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize }
        const userData = await getServiceProviderWithPagination(pagenationOption)
        setUserList(userData.data)
        setPage(userData.page)
        setPageSize(userData.pageSize)
        setTotalPages(userData.totalPages)
        setTotalUsers(userData.totalUsers)

        console.log(userData)

    }

    return (
        <section className='pt-4  flex justify-center items-center flex-col gap-4'>
            <div className=' border-2 mb-4 border-primary-1 px-4 flex justify-between items-center w-[350px] h-[45px] rounded-full'>
                <h1>search </h1>
                <FaSearchengin />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' >
                {
                    userList.length !==0 ?
                        <>
                            {
                                userList.map((item, index) => (
                                    <ServiceCard
                                        onClick={() => {
                                            setIsOpen((prev) => !prev)
                                            setProfile(item)
                                        }}
                                        key={index} email={item.email} serviceDescription={item.serviceDscription ?? ""} name={item.name} profileUrl={item.profileUrl} company={item.companyName ?? ""} />
                                ))
                            }
                        </> : <> 
                        <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                               
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                               
                            </div>
                        </>
                }
                {/* {
                    companyServiceProviders.map((item, index) => (
                        <ServiceCard  onClick={()=>{
                            setIsOpen((prev)=>!prev)
                            setProfile(item)
                        }} key={index} serviceDescription={item.serviceDescription} name={item.name} profileUrl={item.profileUrl} company={item.company} />
                    ))
                } */}
            </div>
            <AppointmentModal profile={profile} handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
            <ProfileModal />
        </section>
    )
}

export default Home
