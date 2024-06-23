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
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

interface modalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: User | null
}
const appointmentType = [
    'IN_PERSON', 'VIRTUAL'
]

const AppointmentModal = ({ isOpen, handleClose, profile }: modalProps) => {
    const { toast } = useToast()

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
        const requestedById = clerkId;
        const requestedForId = profile?.id;
        const appointmentDate = dateTime;
        const status = "PENDING"
        const data = {
            ...values,
            requestedById,
            requestedForId,
            appointmentDate,
            appointmentType: typeOfAppointment,
            status

        }
        setError("");
        setSuccess("");
        startTransition(() => {
            createAppointment(data).then((data) => {
                
                
                if (data.success) {
                    toast({
                        title: "Appointmnet created and sent",

                    })
                    setSuccess(data.success)
                    handleClose();
                }
                if(data.error){
                    setError(data.error)
                }
                
            })
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            {
                profile?.readyForAppointments ? <DialogContent className="  z-50">
                    <DialogHeader>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <DialogTitle >Request Appointment</DialogTitle>

                        </div>
                    </DialogHeader>
                    <div className="flex flex-col justify-center items-center w-full gap-1">
                        <div className="pb-4 flex gap-4 justify-center items-center w-full">
                            {
                                profile?.profileUrl && (
                                    <Image src={profile?.profileUrl} width={100} height={100} alt={profile.name} style={{ borderRadius: "5px", objectFit: "fill" }} />

                                )
                            }
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex gap-2 text-black-1 font-bold uppercase">
                                    <h1>{profile?.firstName}</h1>
                                    <h1>{profile?.lastName}</h1>
                                </div>
                                <h1>{profile?.companyName}</h1>
                                {/* <h1>{profile?.email}</h1> */}

                            </div>

                        </div>
                        <div className=" flex justify-start items-start">
                            <h1 className="overflow-wrap-break-word text-center text-black-2">{profile?.serviceDscription}</h1>

                        </div>
                        <div className="w-full">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


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
                                                {/* <Input type="text" placeholder="Notes" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" /> */}
                                                <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short discription " {...field} />

                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>)}
                                    />

                                    <div className="flex gap-4 max-sm:flex-col-reverse">
                                        <div className='flex w-full flex-col gap-2.5 flex-1'>
                                            <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
                                            <ReactDatePicker
                                                selected={dateTime}
                                                onChange={(date) => setDateTime(date!)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className="w-full h-12 p-2 focus:outline-none border-2 border-primary-1 rounded-xl"
                                                calendarClassName="bg-primary-1"
                                                dayClassName={(date) => `bg-primary-3 text-white`}
                                                
                                            />
                                        </div>
                                        <div className="flex flex-col  gap-2.5">
                                            <label className='text-base text-normal leading-[22px] text-sky-2'>Select Appointment Type</label>

                                            <Select onValueChange={(value) => setTypeOfAppointment(value)}>
                                                <SelectTrigger className={cn('text-16 w-full h-12 rounded-xl py-2 bg-primary-3 border-2 border-primary-1  text-gray-1  focus:ring-offset-orange-1')}>
                                                    <SelectValue placeholder="Select Appointment Type" />
                                                </SelectTrigger>
                                                <SelectContent className=" z-[200] bg-primary-3  border-2 border-primary-1  font-bold text-primary-1focus:ring-offset-orange-1">
                                                    {
                                                        appointmentType.map((category) => (
                                                            <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                                                                {category}
                                                            </SelectItem>
                                                        ))
                                                    }

                                                </SelectContent>

                                            </Select>
                                        </div>
                                    </div>

                                    <FormError message={error} />
                                    <FormSuccess message={success} />


                                    <DialogFooter>
                                        <Button type="submit" variant="outline" className='w-full bg-primary-1 text-white-1 transition-all duration-500 hover:bg-primary-3 hover:text-black-1' >
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

                </DialogContent> : <>
                    <DialogContent className="  z-50">
                        <DialogHeader>
                            <div className="flex flex-col justify-center items-center gap-4">
                                <DialogTitle >Request Appointment</DialogTitle>

                            </div>
                        </DialogHeader>
                        <div className="flex flex-col justify-center items-center w-full gap-1">
                            <div className="pb-4 flex gap-4 justify-center items-center w-full">
                                {
                                    profile?.profileUrl && (
                                        <Image src={profile?.profileUrl} width={100} height={100} alt={profile.name} style={{ borderRadius: "5px", objectFit: "fill" }} />

                                    )
                                }
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex gap-2 text-black-1 font-bold uppercase">
                                        <h1>{profile?.firstName}</h1>
                                        <h1>{profile?.lastName}</h1>
                                    </div>
                                    <h1>{profile?.companyName}</h1>
                                    {/* <h1>{profile?.email}</h1> */}

                                </div>

                            </div>
                            <div className=" flex justify-start items-start">
                                <h1 className="overflow-wrap-break-word text-center text-black-2">{profile?.serviceDscription}</h1>
                            </div>

                            <h1 className=" text-red-400"> User is Not available for appointments</h1>
                        </div>

                    </DialogContent>
                </>
            }
        </Dialog>
    )
}

export default AppointmentModal
