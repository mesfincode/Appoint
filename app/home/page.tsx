"use client"
import React, { useEffect, useState, useTransition } from 'react'
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
import { getFilteredUsers, getServiceProviderWithPagination } from '@/actions/user';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletenComp from '@/components/SkeletenComp';
import { DataTablePagination, PaginationOptions } from '@/components/PaginationComp';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { get, onValue, ref, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '@/lib/firebase';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}
const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useState<User | null>(null)
    const { user } = useUser()
    const [isPending, startTransition] = useTransition();

    const [userList, setUserList] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0)
    const [searchKeyword, setSearchKeyWord] = useState<string>("")

    useEffect(() => {
        // setIsMounted(true);
        getServiceProviders()
    }, []);
    useEffect(() => {
        if (searchKeyword.length > 0) {
            searchUser()
        } else {
            getServiceProviders()
        }
    }, [searchKeyword])
    const getServiceProviders = async () => {
        let pagenationOption = { page: 1, pageSize: pageSize }
        const userData = await getServiceProviderWithPagination(pagenationOption)
        setUserList(userData.data)
        setPage(userData.page)
        setPageSize(userData.pageSize)
        setTotalPages(userData.totalPages)
        setTotalUsers(userData.totalUsers)


    }
    const searchUser = async () => {
        // let pagenationOption = { page: 1, pageSize: pageSize,searchKeyword }

        startTransition(() => {

            getFilteredUsers(searchKeyword, page, pageSize).then((userData => {
                setUserList(userData.data)
                setPage(userData.page)
                setPageSize(userData.pageSize)
                setTotalPages(userData.totalPages)
                setTotalUsers(userData.totalUsers)
            }))


        })

    }
    const fetchNext = async ({ page, pageSize }: PaginationOptions) => {
        // let pagenationOption = { page: 1, pageSize: pageSize,searchKeyword }

        startTransition(() => {

            getFilteredUsers(searchKeyword, page, pageSize).then((userData => {
                setUserList(userData.data)
                setPage(userData.page)
                setPageSize(userData.pageSize)
                setTotalPages(userData.totalPages)
                setTotalUsers(userData.totalUsers)
            }))


        })

    }
    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }

    return (
        <section className=''>
           <TopBar setSearchKeyWord={setSearchKeyWord} />
            <h1 className='text-center font-semibold text-black-2 py-4'>Send Appointment Request To Service Providers From All Over The World</h1>

            {
                userList.length !== 0 ?
                    <div className='w-full'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            {
                                userList.map((item, index) => (
                                    <ServiceCard
                                        onClick={() => {
                                            setIsOpen((prev) => !prev)
                                            setProfile(item)
                                        }}
                                        key={index} firstName={item.firstName} lastName={item.lastName} email={item.email} serviceDescription={item.serviceDscription ?? ""} profileUrl={item.profileUrl} company={item.companyName ?? ""} />
                                ))
                            }
                        </div>
                        <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} />

                    </div>
                    : <div className='max-sm:mx-4'>
                        <SkeletenComp length={pageSize} />
                    </div>
            }


            <AppointmentModal profile={profile} handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
            <ProfileModal />
        </section>
    )
}

export default Home
