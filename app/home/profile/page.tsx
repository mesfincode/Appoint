"use client"
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs'

import React from 'react'
// import { CopyIcon } from "@radix-ui/react-icons"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserByEmail } from "@/actions/user"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Profile, profileRepCard } from "@/types"
import { CopyIcon, Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useTransition } from "react"
import { ProfileSchema } from "@/validators"

import { register } from "@/actions/auth"
import { Switch } from '@/components/ui/switch'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { User } from '@prisma/client'
import ViewProfile from '@/components/ViewProfile'
import ProfileModal from '@/components/ProfileModal'

const ProfilePage = () => {
  const { signOut, openUserProfile } = useClerk()
  const [isOpen, setIsOpen] = useState(false);
  const { email, clerkId, profileUrl, firstName, lastName } = useCurrentUser()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    console.log("user email -------", email)

    const getUserfromdb = async () => {

      if (email != null && email.length > 0) {
        const user = await getUserByEmail(email)
        setUser(user);
        console.log("ProfileModal", user)
        if (user == null) {
          // setTimeout(()=>setIsOpen(true),3000)

          setIsOpen(true)

        }
      }
    }
    getUserfromdb();
    //  
  }, [email])




  if (!user) {
    return <div className='h-screen flex justify-center items-center'>
      <div className='flex gap-2'>
        <Loader />
        <h1 className='text-black-1 text-2xl text-center'> Lloading Profile...</h1>
      </div>
    </div>
  }


  return (
    <section className='mt-8 mx-4 flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center mb-4'>
        {
          user.profileUrl && (<Image onClick={() => openUserProfile()} src={user.profileUrl} alt='profile-url' width={60} height={60} style={{ borderRadius: "100%", cursor: "pointer" }} />)
        }
        <h1 className='text-black-1 font-bold'>{user.firstName} {user.lastName}</h1>
        <h1 className='text-black-2 font-semibold'>{email}</h1>
      </div>
      {
        user && <ViewProfile firstName={user.firstName} lastName={user.lastName} email={user.email} readyForAppointments={user.readyForAppointments} profession={user.profession} phone={user.phone ?? ""} service={user.service ?? ""} serviceDscription={user.serviceDscription ?? ""} companyName={user.companyName ?? ""} verified={user.verified} />

      }
                  <ProfileModal />

    </section>
  )
}

export default ProfilePage
