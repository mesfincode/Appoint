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
        console.log(typeOfAppointment)
        const data = {
            ...values,
            requestedById,
            requestedForId,
            appointmentDate,
            appointmentType: typeOfAppointment,
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
                if (data.success) {
                    toast({
                        title: "Meeting created and sent",
                    })
                }
            })
        })

    }
    const handleConfirmAppointment = () => {
        startTransition(() => {
            confirmAppointment(appointment.id).then((data) => {
                console.log(data)
                setError(data.error)
                setSuccess(data.success)
                if (data.success) {
                    toast({
                        title: "Meeting created and sent",
                    })
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
                    <div className="flex flex-col justify-center items-center gap-4">

                        {
                            iRequested ?
                                <>
                                    <DialogTitle >You Requested This Appointment</DialogTitle>
                                    <DialogDescription>
                                        Requested To
                                    </DialogDescription>
                                </> :
                                <>

                                    <DialogTitle >{appointment?.requestedBy?.name} Requested This Appointment</DialogTitle>
                                    <DialogDescription>
                                        Requested By
                                    </DialogDescription>
                                </>
                        }
                    </div>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center w-full gap-4">
                    <div className="pb-4 flex gap-4 justify-center flex-col items-center">

                        {/* <div>
                            <h1>{appointment?.name}</h1>
                            <h1>{appointment?.companyName}</h1>
                            <h1>{appointment?.email}</h1>
                        </div> */}
                        {
                            iRequested ?

                                <>
                                    <div className="flex gap-4 flex-col justify-center">
                                        <Image src={appointment.requestedFor?.profileUrl} width={40} height={40} alt={appointment.requestedFor.name} style={{ borderRadius: "100%" }} />
                                        <div>
                                            <div className="flex gap-2">
                                                <h1 className="text-center font-bold">{appointment.requestedFor?.firstName}</h1>
                                                <h1 className="text-center font-bold">{appointment.requestedFor?.lastName}</h1>
                                            </div>
                                            <h1 className="text-center">{appointment.requestedFor?.companyName}</h1>
                                            <h1 className="text-center">{appointment.requestedFor?.email}</h1>

                                        </div>
                                    </div>
                                    <h1 className="overflow-wrap-break-word  max-w-[300px]">{appointment.requestedFor?.serviceDscription}</h1>

                                </> :
                                <>
                                    <div className="flex gap-4 flex-col items-center">
                                        <Image src={appointment.requestedBy?.profileUrl} width={40} height={40} alt={appointment.requestedBy?.name} style={{ borderRadius: "100%" }} />
                                        <div>
                                            <div className="flex gap-2">
                                                <h1 className="text-center font-bold">{appointment.requestedBy?.firstName}</h1>
                                                <h1 className="text-center font-bold">{appointment.requestedBy?.lastName}</h1>
                                            </div>
                                            <h1 className="text-center">{appointment.requestedBy?.companyName}</h1>
                                            <h1 className="text-center">{appointment.requestedBy?.email}</h1>

                                        </div>
                                    </div>
                                    <h1 className="overflow-wrap-break-word max-w-[300px]">{appointment.requestedBy?.serviceDscription}</h1>

                                </>
                        }
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="text-black-2 font-bold">Reason</h1>
                            <h1 className=""> {appointment.reason}</h1>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-black-2 font-bold">Notes</h1>

                            <h1 >Note: {appointment.notes}</h1>
                        </div>
                    </div>

                    <DialogFooter>
                        {
                            appointment.status == "PENDING" && !iRequested ?
                                <Button onClick={handleConfirmAppointment} type="submit" variant="outline" className='w-full bg-primary-1 text-white-1 transition-all duration-500 hover:bg-primary-3 hover:text-black-1' >
                                    {
                                        isPending ? <>
                                            <Loader />Loading
                                        </> : <>Confirm Appointment</>
                                    }
                                </Button> : <div className="flex flex-col justify-center items-center ">
                                    <h1>Status</h1>

                                    <h1>{appointment.status}</h1>
                                </div>

                        }
                    </DialogFooter>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AppointmentDetailModal
