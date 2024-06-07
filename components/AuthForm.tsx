
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import Image from "next/image"
import { FcGoogle, } from "react-icons/fc"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"
import { useState, useTransition } from "react"
import { RegisterSchema } from "@/validators"
import { register } from "@/actions/auth"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
import { Loader } from "lucide-react"
const AuthForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""

        }
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values)
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })

    }
    return (
        <div className=" mx-4 px-4 py-8 border-2 border-primary-1  rounded-2xl w-full max-w-[450px] ">
            <div className="py-2 flex justify-center flex-col items-center gap-2">
                {/* <img src="/images/schedule_meeting.svg" className='w-[100px] h-[100px] lg:hidden' alt="" />   */}
                <p className="text-4xl ">Register</p>
                <p className=" ">Set up your Appoint account</p>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <div>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="appoint" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>)}
                                />
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@gmail.com" {...field} className="w-full focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>)}
                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="*******" {...field} className="w-full  focus:ring-primary-1 focus-visible:ring-offset-primary-1" />

                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>)}
                                />

                            </div>
                        )}
                    />

                    {/* <div className="">
                    <Link href="/" className="underline ">
                            Forgot Password?
                        </Link>
                    </div> */}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" variant="outline" className='w-full bg-primary-2 transition-all duration-500 hover:bg-primary-3' >
                        {
                            isPending?<>
                            <Loader/>Loading
                            </>:<>Submit</>
                        }
                    </Button>
                    <div className="w-full flex items-center justify-center gap-x-2">
                        <Button size="lg" variant="outline" className=" rounded-full bg-primary-3 transition-all duration-500 hover:bg-primary-1" >
                            <FcGoogle className="h-5 w-5" />
                        </Button>
                        {/* <Button size="lg" variant="outline" className="w-full bg-primary-3 transition-all duration-500 hover:bg-primary-1" >
                            <FaGithub className="h-5 w-5" />
                        </Button> */}

                    </div>
                    <Button

                        className="w-full underline"
                    >
                        <Link href="/sign-in">
                            Already have account ? SignIn
                        </Link>
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm
