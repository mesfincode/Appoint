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
import { getFilteredUsers, getServiceProviderWithPagination } from '@/data/user';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletenComp from '@/components/SkeletenComp';
import { DataTablePagination, PaginationOptions } from '@/components/PaginationComp';

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
    const [searchKeyword, setSearchKeyWord] = useState("")
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

        console.log(userData)

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
                console.log(userData)
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
                console.log(userData)
            }))


        })

    }
    const updatePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }
    return (
        <section className='mx-8 my-8'>
            <div className='flex justify-center items-center flex-col gap-4 pb-4'>
                <div className='relative '>
                    <Input type='text' onChange={(e) => setSearchKeyWord(e.target.value)} placeholder='Search with name, email,phone company' className='border-primary-1 rounded-full max-sm:w-[300px] w-[350px] focus-visible:ring-offset-primary-1' />
                    <FaSearchengin className='absolute right-4 top-3' />
                </div>
            </div>


            {
                userList.length !== 0 ?
                    <>
                        <div className='grid max-sm:flex max-sm:flex-col sm:grid-cols-2 xl:grid-cols-3 gap-4'>
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
                        </div>
                        <DataTablePagination fetchNext={fetchNext} updatePageSize={updatePageSize} page={page} pageSize={pageSize} totalPages={totalPages} />

                    </>
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
