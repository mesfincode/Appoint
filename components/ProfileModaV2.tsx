// import { CopyIcon } from "@radix-ui/react-icons"

"use client"

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
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
import { Switch } from "./ui/switch"
import { register } from "@/actions/auth"
import { Textarea } from "./ui/textarea"
import { ScrollArea } from "./ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { useToast } from "./ui/use-toast"

interface ProfileModalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: Profile | null
}
const ProfileModalV2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { email, clerkId, profileUrl, firstName, lastName } = useCurrentUser()
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [service, setService] = useState("")
    const [serviceDscription, setServciceDescription] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [profession, setProfession] = useState("")
    const [readyForAppointments, setReadyForAppointments] = useState(false)
    const { toast } = useToast()

    const [step, setStep] = useState(1)

    useEffect(() => {

        const getUserfromdb = async () => {

            if (email != null && email.length > 0) {
                const user = await getUserByEmail(email)
                if (user == null) {
                    // setTimeout(()=>setIsOpen(true),3000)
                    setNewFirstName(firstName ?? "")
                    setNewLastName(lastName ?? "")
                    setIsOpen(true)

                }
            }
        }
        getUserfromdb();
        //  
    }, [email])

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();



    const onSubmit = () => {
        const name = `${newFirstName} ${newLastName}`
    
        const data = {firstName:newFirstName ,lastName:newLastName,phone,service,serviceDscription,companyName,profession,readyForAppointments, clerkId, name, email, profileUrl }
        setError("");
        setSuccess("");
        startTransition(() => {
            register(data).then((data) => {
                console.log(data.error)
                if(data.error){
                    setError(data.error)
                    toast({
                        title: "Failed try again",
                        variant:"destructive"

                    })
                }
                if (data.success) {
                    setSuccess(data.success)

                    toast({
                        title: "Profile created Successfully",

                    })
                }
                setIsOpen(false)
            })
        })

    }
  
    const RenderStep = () => {
        switch (step) {
            case 1:
                return <FirstStep />;
            case 2:
                return <SecondStep />;
            case 3:
                return <ThirdStep />;
            case 4:
                return <ForthStep />;
            // default:
            //   return <DefaultComponent />;
        }


    }
    const ProgressIndicator = () => {
        return <Progress value={step * 25} className="h-[10px] my-2" />

    }

    const FirstStep = () => {
        const stepONeFormSchema = z.object({
            firstName: z.string().min(2, {
                message: "First name is required ",
            }),
            lastName: z.string().min(2, {
                message: "Last name is required",
            }),
            phone: z.string().min(6, {
                message: "Phone number is required",
            }),
        })
        const stepOneForm = useForm<z.infer<typeof stepONeFormSchema>>({
            resolver: zodResolver(stepONeFormSchema),
            defaultValues: {
                firstName: newFirstName,
                lastName: newLastName,
                phone: phone
            },
        })
        const hansleStepOneFormSubmit = (values: z.infer<typeof stepONeFormSchema>) => {
            console.log(values)

            setNewFirstName(values.firstName)
            setNewLastName(values.lastName)
            setPhone(values.phone)
            setStep((prev) => prev + 1)
        }
        return <div className="flex flex-col justify-center items-center gap-1 ">
            
            <div className="pb-4 flex flex-col justify-center items-center">
                {
                    profileUrl && (
                        <Image src={profileUrl} width={40} height={40} alt="profileImage" style={{ borderRadius: "100%" }} />

                    )
                }
                <h1 className="text-black-1 font-bold">{newFirstName} {newLastName}</h1>
                {/* <h1>{profile?.company}</h1> */}
            </div>
            <ProgressIndicator />
            <h1 className="text-center text-black-2">Let service seekers and other service providers know who you are</h1>

            <Form {...stepOneForm}>
                <form onSubmit={stepOneForm.handleSubmit(hansleStepOneFormSubmit)} className="space-y-8">


                    <div className="flex gap-4">
                        <FormField
                            control={stepOneForm.control}
                            name='firstName'
                            render={({ field }) => (<FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="First Name" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />


                        <FormField
                            control={stepOneForm.control}
                            name='lastName'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Last Name" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />
                    </div>
                    <div className="w-full">
                        <FormField
                            control={stepOneForm.control}
                            name='phone'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Phone number" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />


                    </div>

                    <div className="flex justify-between">
                        <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" disabled={step == 1} variant="outline" onClick={() => setStep((prev) => prev - 1)} >Prev</Button>
                        <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" type="submit"  >Next</Button>
                    </div>
                </form>
            </Form>



        </div>


    }
    const SecondStep = () => {
        const stepTwoFormSchema = z.object({
            service: z.string().min(2, {
                message: "Service catagory is required",
            }),
            serviceDscription: z.string().min(2, {
                message: "Please provide a short description",
            }),

        })
        const stepTwoForm = useForm<z.infer<typeof stepTwoFormSchema>>({
            resolver: zodResolver(stepTwoFormSchema),
            defaultValues: {
                service: service,
                serviceDscription: serviceDscription,

            },
        })
        const hansleStepTwoForm = (values: z.infer<typeof stepTwoFormSchema>) => {
            console.log(phone)
            console.log(values)

            setService(values.service)
            setServciceDescription(values.serviceDscription)

            setStep((prev) => prev + 1)
        }
        return <div className="flex flex-col justify-center items-center gap-1 w-full ">

            <div className="pb-4 flex flex-col justify-center items-center">
                {
                    profileUrl && (
                        <Image src={profileUrl} width={40} height={40} alt="profileImage" style={{ borderRadius: "100%" }} />

                    )
                }
                <h1 className="text-black-1 font-bold">{newFirstName} {newLastName}</h1>
                {/* <h1>{profile?.company}</h1> */}
            </div>
            <ProgressIndicator />

            <h1 className="text-center text-black-2">Provide info about your service</h1>
            <Form {...stepTwoForm}>
                <form onSubmit={stepTwoForm.handleSubmit(hansleStepTwoForm)} className="space-y-8 w-full">
                    <div className="w-full ">
                        <FormField
                            control={stepTwoForm.control}
                            name='service'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Service Catagory</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Health care, IT" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                             
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={stepTwoForm.control}
                            name='serviceDscription'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Service Description</FormLabel>
                                <FormControl>
                                    {/* <Input type="text" placeholder="Service Description" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" /> */}
                                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Describe your service more specifically using few words " {...field} />

                                </FormControl>
                                
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button disabled={step == 1} className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" onClick={() => setStep((prev) => prev - 1)} >Prev</Button>
                        <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" type="submit"  >Next</Button>
                    </div>
                </form>
            </Form>


        </div>
    }
    const ThirdStep = () => {
        const stepThreeFormSchema = z.object({
            companyName: z.string().min(2, {
                message: "Company Name is required",
            }),
            profession: z.string().min(2, {
                message: "What is your profession name in your service sector or in your company",
            }),

        })
        const stepThreeForm = useForm<z.infer<typeof stepThreeFormSchema>>({
            resolver: zodResolver(stepThreeFormSchema),
            defaultValues: {
                companyName: companyName,
                profession: profession,

            },
        })
        const hansleStepThreeForm = (values: z.infer<typeof stepThreeFormSchema>) => {
            console.log(phone, service)
            console.log(values)

            setCompanyName(values.companyName)
            setProfession(values.profession)

            setStep((prev) => prev + 1)
        }
        return <div className="flex flex-col justify-center items-center gap-1 ">
           

            <div className="pb-4 flex flex-col justify-center items-center">
                {
                    profileUrl && (
                        <Image src={profileUrl} width={40} height={40} alt="profileImage" style={{ borderRadius: "100%" }} />

                    )
                }
                <h1 className="text-black-1 font-bold">{newFirstName} {newLastName}</h1>
                {/* <h1>{profile?.company}</h1> */}
            </div>
            <ProgressIndicator />
            <h1 className="text-center">Tell us about your company</h1>
            <Form {...stepThreeForm}>
                <form onSubmit={stepThreeForm.handleSubmit(hansleStepThreeForm)} className="space-y-8 w-full">
                    <div className="w-full ">
                        <FormField
                            control={stepThreeForm.control}
                            name='companyName'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Company Name" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={stepThreeForm.control}
                            name='profession'
                            render={({ field }) => (<FormItem>
                                <FormLabel>Profession</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Your Profession" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" disabled={step == 1} variant="outline" onClick={() => setStep((prev) => prev - 1)} >Prev</Button>
                        <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" type="submit"  >Next</Button>
                    </div>
                </form>
            </Form>
        </div>
    }
    const ForthStep = () => {
        return <div className="flex flex-col justify-center items-center gap-1 w-full">
            <ProgressIndicator />

            <div className="pb-4 flex flex-col justify-center items-center">
                {
                    profileUrl && (
                        <Image src={profileUrl} width={40} height={40} alt="profileImage" style={{ borderRadius: "100%" }} />

                    )
                }
                <h1 className="text-black-1 font-bold">{newFirstName} {newLastName}</h1>
                {/* <h1>{profile?.company}</h1> */}
            </div>

            <h1 className="text-center">Let service seekers and other service providers know who you are</h1>
            <div className="flex flex-row my-4 items-center justify-between rounded-lg border border-primary-1 p-3 shadow-sm">
                <div className="space-y-0.5">
                    <label>Ready For Appointments</label>
                    Let users request appointment to you
                </div>
                <Switch
                    checked={readyForAppointments}
                    onCheckedChange={(value) => setReadyForAppointments(value)}
                />
            </div>
            <div className="flex justify-between w-full">
                <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" onClick={() => setStep((prev) => prev - 1)} >Prev</Button>

                <Button className=" border-2 border-primary-1  bg-gray-100  transition-all duration-500 hover:bg-primary-1 hover:text-white-1  rounded-full flex justify-center items-center" variant="outline" onClick={onSubmit} disabled={isPending} >
                    {
                        isPending? <Loader />:"Submit"
                    }
                </Button>
            </div>

        </div>
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prv) => true)} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]  z-50">
                <DialogHeader>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <DialogTitle >Set Up Your Profile</DialogTitle>

                    </div>
                </DialogHeader>
                <RenderStep />
            </DialogContent>
        </Dialog>
    )

}

export default ProfileModalV2


