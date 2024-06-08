"use client"
import React, { useState } from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';
import HomeNav from '@/components/home/HomeNav';
import { companyServiceProviders } from '@/constants';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import { FaSearchengin } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import AppointmentModal from '@/components/AppointmentModal';
import { Profile, profileRepCard } from '@/types';

const Home = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [profile,setProfile]= useState<Profile | null >(null)
    return (
        <section className='pt-4  flex justify-center items-center flex-col gap-4'>
            <div className=' border-2 mb-4 border-primary-1 px-4 flex justify-between items-center w-[350px] h-[45px] rounded-full'>
                
          
                <h1>search </h1>
                <FaSearchengin/>
            </div>
            {/* <h1 className='text-center text-2xl py-4'>Company Representatives</h1> */}
            <div className='grid grid-cols-3 gap-4' >
                {
                    companyServiceProviders.map((item, index) => (
                        <ServiceCard  onClick={()=>{
                            setIsOpen((prev)=>!prev)
                            setProfile(item)
                        }} key={index} serviceDescription={item.serviceDescription} name={item.name} profileUrl={item.profileUrl} company={item.company} />
                    ))
                }
            </div>
            <AppointmentModal profile={profile}  handleClose={()=>setIsOpen((prev)=>!prev)} isOpen={isOpen} />
        </section>
    )
}

export default Home
