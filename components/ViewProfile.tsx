import React from 'react'


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
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
import { getUserByEmail, updateUserProfile } from "@/actions/user"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Profile, profileRepCard } from "@/types"
import { CopyIcon, Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useTransition } from "react"
import { ProfileSchema } from "@/validators"
import { User } from '@prisma/client'
import { Switch } from './ui/switch'
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'
interface  ProfileViewProps{
    email:string
    phone:string;
    service:string;
    serviceDscription:string;
    companyName:string;
    verified:boolean;
    readyForAppointments:boolean;
    profession:string;
}
const ViewProfile = ({phone,email,service,serviceDscription,companyName,verified,readyForAppointments,profession}:ProfileViewProps ) => {
    const {  clerkId, profileUrl, firstName, lastName } = useCurrentUser()
// console.log(user)
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            // clerkId: id,
            // name: `${firstName} ${lastName}`,
            // email: email,
            phone,
            service:service??"",
            serviceDscription:serviceDscription??"",
            companyName:companyName??"",
            verified,
            readyForAppointments,
            profession,
            // profileUrl: imageUrl,
        }
    })
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        const name =`${firstName} ${lastName}`
        const data = {...values,clerkId,name,email,profileUrl}
        console.log(data)
        setError("");
        setSuccess("");
        startTransition(() => {
            updateUserProfile(email,data).then((data) => {
                console.log(data)
                setError(data.error)
                setSuccess(data.success)
            })
        })

    }
  return (
    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                            <div className="flex gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name='phone'
                                                    render={({ field }) => (<FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="appoint" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                        </FormControl>
                                                        <FormMessage className="text-red-400" />
                                                    </FormItem>)}
                                                />


                                                <FormField
                                                    control={form.control}
                                                    name='service'
                                                    render={({ field }) => (<FormItem>
                                                        <FormLabel>service</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Service" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                        </FormControl>
                                                        <FormMessage className="text-red-400" />
                                                    </FormItem>)}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name='serviceDscription'
                                                render={({ field }) => (<FormItem>
                                                    <FormLabel>serviceDscription</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Service Description" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>)}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='companyName'
                                                render={({ field }) => (<FormItem>
                                                    <FormLabel>companyName</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Company Name" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>)}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='profession'
                                                render={({ field }) => (<FormItem>
                                                    <FormLabel>profession</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Your Profession" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>)}
                                            />
                                            {/* <FormField
                                                control={form.control}
                                                name='verified'
                                                render={({ field }) => (<FormItem>
                                                    <FormLabel>verified</FormLabel>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>)}
                                            /> */}
                                            <FormField
                                                control={form.control}
                                                name='readyForAppointments'
                                                render={({ field }) => (<FormItem>
                                                    <div className="flex flex-row my-4 items-center justify-between rounded-lg border border-primary-1 p-3 shadow-sm">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>Ready For Appointments</FormLabel>
                                                            <FormDescription>
                                                                Let users request appointment to you
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage className="text-red-400" />

                                                </FormItem>)}
                                            />


                                            {/* <FormField
                                                control={form.control}
                                                name='profileUrl'
                                                render={({ field }) => (<FormItem>
                                                    <FormLabel>Profile Image</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Your profileUrl" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>)}
                                            /> */}

                                            {/* serviceDscription: "",
            companyName: "",
            verified: false,
            readyForAppointments: false,
            profession: "",
            profileUrl: imageUrl, */}
                                        </div>

                                {/* <div className="">
                    <Link href="/" className="underline ">
                            Forgot Password?
                        </Link>
                    </div> */}
                                <FormError message={error} />
                                <FormSuccess message={success} />


                               <div className='mb-8'>
                               <DialogFooter>
                                    {/* <Button type="submit">Save changes</Button> */}
                                    <Button type="submit" variant="outline" className='w-full text-white-1 bg-primary-1 transition-all duration-500 hover:bg-primary-2' >
                                        {
                                            isPending ? <>
                                                <Loader />Loading
                                            </> : <>Submit</>
                                        }
                                    </Button>
                                </DialogFooter>
                               </div>
                            </form>
                        </Form>
                    </div>
  )
}

export default ViewProfile
