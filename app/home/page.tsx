import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';
import HomeNav from '@/components/home/HomeNav';
import { companyServiceProviders } from '@/constants';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
const Home = () => {
    return (
        <section className=''>
            <h1 className='text-center text-2xl py-4'>Company Representatives</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    companyServiceProviders.map((item, index) => (
                        <ServiceCard key={index} serviceDescription={item.serviceDescription} name={item.name} profileUrl={item.profileUrl}  company={item.company} />
                    ))
                }
            </div>
        </section>
    )
}

export default Home
