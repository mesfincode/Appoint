
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
const AuthForm = () => {

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className=" px-8 py-8 border-2 border-primary-1  rounded-2xl">
             <div className="py-2">
                <h1 className="text-center text-3xl font-semibold">🔒 Register</h1>
             </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                           <div>
                             <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} className="w-[300px]  lg:w-[350px]  focus:ring-primary-1 focus-visible:ring-offset-primary-1" />
                                </FormControl>
                             
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} className="w-[300px]  lg:w-[350px]  focus:ring-primary-1 focus-visible:ring-offset-primary-1" />
                                </FormControl>
                             
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" {...field} className="w-[300px]  lg:w-[350px]  focus:ring-primary-1 focus-visible:ring-offset-primary-1" />
                                </FormControl>
                             
                                <FormMessage />
                            </FormItem>
                           </div>
                        )}
                    />

                    <Button type="submit" variant="outline" className='w-full bg-primary-2 transition-all duration-500 hover:bg-primary-3' >Submit</Button>
                    <div className="w-full flex items-center gap-x-2">
                        <Button size="lg" variant="outline" className="w-full bg-primary-3 transition-all duration-500 hover:bg-primary-1" >
                            <FcGoogle className="h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full bg-primary-3 transition-all duration-500 hover:bg-primary-1" >
                            <FaGithub className="h-5 w-5" />
                        </Button>

                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm
