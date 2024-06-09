
import { Phone } from "lucide-react"
import * as z from "zod"




export const NewPasswordSchema = z.object({
    password: z.string().min(6,{message:"Minimum of 6 characters required"})
})

export const ResetSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
})


export const LoginSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    password: z.string().min(1,{message:"Password is rquired"}),
    code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    username: z.string().min(5,{
        message:"Username is required"
    }),
    password: z.string().min(1,{message:"Password is rquired"})
})

const PersonSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });
  
  const AppointmentSchema = z.object({
    // id: z.string().optional(),
    requestedBy: PersonSchema,
    requestedFor: PersonSchema,
    appointmentDate: z.date(),
    appointmentType: z.enum(['virtual', 'in-person']),
    reason: z.string(),
    notes: z.string().optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled','completed']).default('pending'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const ProfileSchema = z.object({
    clerkId: z.string().min(5,{
        message:"clerkId is required"
    }),
    name: z.string().min(5,{
        message:"name is required"
    }),
    email: z.string().min(5,{
        message:"email is required"
    }),
    phone: z.string().min(5,{
        message:"phone is required"
    }),
    service: z.string().min(5,{
        message:"sercice is required"
    }),
    serviceDscription:  z.string().min(5,{
        message:"service description is required"
    }),
    companyName:  z.string().min(5,{
        message:"company name is required"
    }),
    verified: z.boolean(),
    readyForAppointments: z.boolean(),
    profileUrl:  z.string().min(5,{
        message:"profile url is required"
    }),
    profession:  z.string().min(5,{
        message:"profession is required"
    }),
})