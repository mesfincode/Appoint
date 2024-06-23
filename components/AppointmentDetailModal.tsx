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
import { confirmAppointment, createAppointment } from "@/actions/appointment"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import { format } from 'date-fns';

interface AppointmentModalDetailProps {
    isOpen: boolean;
    handleClose: () => void;
    appointment: any,
    iRequested: boolean

}
const appointmentType = [
    'IN_PERSON', 'VIRTUAL'
]

const AppointmentDetailModal = ({ isOpen, handleClose, appointment, iRequested }: AppointmentModalDetailProps) => {
    const target = new Date(appointment.appointmentDate);

    const now = new Date();
    const remaining = target.getTime() - now.getTime();
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
        const requestedForId = appointment?.id;
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
                        title: "Meeting created and sent",
                    })
                    setSuccess(data.success)
                    handleClose()
                }
                if(data.error){
                    toast({
                        title: "Failed Try agina",
                        variant:"destructive"
                    })
                    setError(data.error)
                }
               
            })
        })

    }
    const handleConfirmAppointment = () => {
        startTransition(() => {
            confirmAppointment(appointment.id).then((data) => {
                
               
                if (data.success) {
                    setSuccess(data.success)
                    toast({
                        title: "Appointment Confirmed successfully",
                    })
                    handleClose()
                }
                if(data.error){
                    toast({
                        title: "Failed Try agina",
                        variant:"destructive"
                    })
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
            <DialogContent className="  z-50">
                <DialogHeader>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">

                        {
                            iRequested ?
                                <>
                                    <DialogTitle >You Requested This Appointment</DialogTitle>
                                    <DialogDescription>
                                        Requested To
                                    </DialogDescription>
                                </> :
                                <>

                                    <DialogTitle >You Received This Appointment</DialogTitle>
                                    <DialogDescription>
                                        Requested By
                                    </DialogDescription>
                                </>
                        }
                    </div>
                </DialogHeader>
                <div className="  w-full gap-4">
                    <div className="pb-4 flex gap-4 justify-center flex-col items-center w-full">

                        {/* <div>
                            <h1>{appointment?.name}</h1>
                            <h1>{appointment?.companyName}</h1>
                            <h1>{appointment?.email}</h1>
                        </div> */}
                        {
                            iRequested ?

                                <>
                                    <div className="flex gap-4  justify-start items-center w-full">
                                        <Image src={appointment.requestedFor?.profileUrl} width={100} height={100} alt={appointment.requestedFor.name} style={{ borderRadius: "5px" }} />
                                        <div >
                                            <div className="flex gap-2 ">
                                                <h1 className="text-start font-bold">{appointment.requestedFor?.firstName}</h1>
                                                <h1 className="text-start font-bold">{appointment.requestedFor?.lastName}</h1>
                                            </div>

                                            <h1 className="text-start">{appointment.requestedFor?.companyName}</h1>

                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col justify-start">
                                        <h1 className="text-start">{appointment.requestedFor?.service}</h1>

                                        <h1 className="overflow-wrap-break-word text-start text-black-2">{appointment.requestedFor?.serviceDscription}</h1>


                                    </div>

                                </> :
                                <>
                                    <div className="flex gap-4 justify-start  items-center w-full">
                                        <Image src={appointment.requestedBy?.profileUrl} width={100} height={100} alt={appointment.requestedBy?.name} style={{ borderRadius: "5px" }} />
                                        <div>
                                            <div className="flex gap-2">
                                                <h1 className="text-start font-bold">{appointment.requestedBy?.firstName}</h1>
                                                <h1 className="text-start font-bold">{appointment.requestedBy?.lastName}</h1>
                                            </div>
                                            {/* <h1 className="text-center">{appointment.requestedBy?.email}</h1> */}
                                            <h1 className="text-start">{appointment.requestedBy?.companyName}</h1>

                                        </div>

                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <h1 className="text-start ">{appointment.requestedBy?.service}</h1>

                                        <h1 className="overflow-wrap-break-word text-start text-black-2">{appointment.requestedBy?.serviceDscription}</h1>

                                    </div>
                                </>
                        }
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                            <h1 className="text-black-2 font-bold">Appointment Reason</h1>
                            <h1 className=""> {appointment.reason}</h1>
                        </div>

                        <div className="flex flex-col justify-start items-start w-full">
                            <h1 className="text-black-2 font-bold">Appointment Notes</h1>

                            <h1 > {appointment.notes}</h1>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full pb-2">
                            <h1 className="text-black-2 font-bold">Appointment Date</h1>

                            <h1 > {
                                appointment.appointmentDate != null && <>{format(appointment.appointmentDate.toString(), 'EEE MMM d/ hh:mm:ss a')} {remaining <0 && <label htmlFor="" className="text-red-600">Expired</label>} </> 
                            }</h1>
                        </div>
                    </div>

                    <DialogFooter>
                        {
                            appointment.status == "PENDING" && !iRequested &&    appointment.status !== "CONFIRMED" ?
                                <Button disabled={remaining <0} onClick={handleConfirmAppointment} type="submit" variant="outline" className='w-full bg-primary-1 text-white-1 transition-all duration-500 hover:bg-primary-2 hover:text-black-1' >
                                    {
                                        isPending ? <>
                                            <Loader />Loading
                                        </> : <>Confirm Appointment</>
                                    }
                                </Button> :
                                <>
                                {
                                    remaining>0 &&(<div className="flex flex-col justify-start items-start w-full">
                                        <h1 className="text-black-2 font-bold">Status</h1>
    
                                        <h1>{appointment.status}</h1>
                                    </div>)
                                }
                                </>

                        }
                    </DialogFooter>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AppointmentDetailModal
