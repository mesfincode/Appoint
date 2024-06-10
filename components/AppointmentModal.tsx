// import { CopyIcon } from "@radix-ui/react-icons"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Profile, profileRepCard } from "@/types"
import { AppointmentSchema } from "@/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { AppointmentType, User } from "@prisma/client"
import { CopyIcon, Loader } from "lucide-react"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { createAppointment } from "@/actions/appointment"
interface modalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: User | null
}
const appointmentType = [
    'IN_PERSON', 'VIRTUAL'
]

const AppointmentModal = ({ isOpen, handleClose, profile }: modalProps) => {
    const { email, clerkId, profileUrl, firstName, lastName } = useCurrentUser()
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [typeOfAppointment, setTypeOfAppointment] = useState("IN_PERSON")
    const [dateTime, setDateTime] = useState(new Date())
    const form = useForm<z.infer<typeof AppointmentSchema>>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            // clerkId: id,
            // name: `${firstName} ${lastName}`,
            // email: email,
            appointmentDate: dateTime,
            // requestedById
            // requestedForId
            appointmentType: AppointmentType.IN_PERSON,
            reason: "",
            notes: "",
            // status: "PENDING",

            // profileUrl: imageUrl,
        }
    })
    const onSubmit = (values: z.infer<typeof AppointmentSchema>) => {
        // const name =`${firstName} ${lastName}`
        const requestedById = profile?.id;
        const requestedForId = clerkId;
        const appointmentDate = dateTime;
        const status = "PENDING"
        console.log(typeOfAppointment)
        const data = {
            ...values,
            requestedById,
            requestedForId,
            appointmentDate,
            appointmentType:typeOfAppointment,
            status
            
        }
        console.log(data)
        setError("");
        setSuccess("");
        startTransition(() => {
            createAppointment(data).then((data) => {
                console.log(data)
                setError(data.error)
                setSuccess(data.success)
            })
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="  z-50">
                <DialogHeader>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <DialogTitle >Request Appointment</DialogTitle>
                        <DialogDescription>
                            Fill the following form and request appointment
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center w-full gap-1">
                    <div className="pb-4 flex flex-col justify-center items-center">
                        {
                            profile?.profileUrl && (
                                <Image src={profile?.profileUrl} width={40} height={40} alt={profile.name} style={{ borderRadius: "100%" }} />

                            )
                        }
                        <h1>{profile?.name}</h1>
                        <h1>{profile?.companyName}</h1>
                        <h1>{profile?.email}</h1>
                    </div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormLabel>Select Appointment Type</FormLabel>

                            <Select onValueChange={(value) => setTypeOfAppointment(value)}>
                                    <SelectTrigger className={cn('text-16 w-full  border-2 border-primary-1  text-gray-1  focus:ring-offset-orange-1')}>
                                        <SelectValue placeholder="Select Appointment Type" />
                                    </SelectTrigger>
                                    <SelectContent className="text-16 z-50 bg-white-1  border-2 border-primary-1  font-bold text-primary-1focus:ring-offset-orange-1">
                                        {
                                            appointmentType.map((category) => (
                                                <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                                                    {category}
                                                </SelectItem>
                                            ))
                                        }

                                    </SelectContent>

                                </Select>

                                <FormField
                                    control={form.control}
                                    name='reason'
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Reason</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Service Description" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>)}
                                />

                                <FormField
                                    control={form.control}
                                    name='notes'
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Notes" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>)}
                                />
                                  
                                <div className='flex w-full flex-col gap-2.5'>
                                    <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
                                    <ReactDatePicker selected={dateTime}
                                        onChange={(date) => setDateTime(date!)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="w-full p-2 focus:outline-none"
                                    />
                                </div>
                                {/* <FormField
                                        control={form.control}
                                        name='appointmentType'
                                        render={({ field }) => (<FormItem>
                                            <FormLabel>Appointment Type</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Appointment Type" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>)}
                                    /> */}
                            



                                {/* <div className="">
                    <Link href="/" className="underline ">
                            Forgot Password?
                        </Link>
                    </div> */}
                                <FormError message={error} />
                                <FormSuccess message={success} />


                                <DialogFooter>
                                    <Button type="submit" variant="outline" className='w-full bg-primary-2 transition-all duration-500 hover:bg-primary-3' >
                                    {
                                            isPending ? <>
                                                <Loader />Loading
                                            </> : <>Send Appointment</>
                                        }
                                    </Button>
                                  
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal
