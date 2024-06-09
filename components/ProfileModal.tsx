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
import { getUserByEmail } from "@/data/user"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Profile, profileRepCard } from "@/types"
import { CopyIcon, Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useTransition } from "react"
import { ProfileSchema } from "@/validators"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
import { Switch } from "./ui/switch"

interface ProfileModalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: Profile | null
}
const ProfileModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { email, id, imageUrl, firstName, lastName } = useCurrentUser()
    console.log("ProfileModal", email)
    useEffect(() => {

        const getUserfromdb = async () => {

            const user = await getUserByEmail(email || "")
            // console.log("ProfileModal", user)
            if (user == null) {
                // setTimeout(()=>setIsOpen(true),3000)
                setIsOpen(true)

            }
        }
        getUserfromdb();
        //  
    }, [])

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            clerkId: id,
            name: `${firstName} ${lastName}`,
            email: email,
            phone: "",
            service: "",
            serviceDscription: "",
            companyName: "",
            verified: false,
            readyForAppointments: false,
            profession: "",
            profileUrl: imageUrl,
        }
    })

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        console.log(values)
        setError("");
        setSuccess("");
        startTransition(() => {
            // register(values).then((data) => {
            //     setError(data.error)
            //     setSuccess(data.success)
            // })
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prv) => !prv)} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]  z-50">
                <DialogHeader>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <DialogTitle >Set Up Your Profile</DialogTitle>
                        <DialogDescription>
                            Let your clients and customers discover you , good profile good impression
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="pb-4 flex flex-col justify-center items-center">
                        {
                            imageUrl && (
                                <Image src={imageUrl} width={40} height={40} alt="profileImage" style={{ borderRadius: "100%" }} />

                            )
                        }
                        <h1>{firstName} {lastName}</h1>
                        {/* <h1>{profile?.company}</h1> */}
                    </div>
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


                                <DialogFooter>
                                    {/* <Button type="submit">Save changes</Button> */}
                                    <Button onClick={()=>onSubmit(form.getValues())} variant="outline" className='w-full bg-primary-2 transition-all duration-500 hover:bg-primary-3' >
                                        {
                                            isPending ? <>
                                                <Loader />Loading
                                            </> : <>Submit</>
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

export default ProfileModal
