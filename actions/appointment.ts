"use server"

import { getUserByClerkId, getUserById } from "@/actions/user";
import { db } from "@/lib/db";
import { sendAppointmentConfirmedEmail, sendAppointmentEmail } from "@/lib/mail";
import { AppointmentSchema } from "@/validators";
import { Appointment } from "@prisma/client";

export const createAppointment = async (values: any) => {
    const validatedFields = AppointmentSchema.safeParse(values);

    // if(!validatedFields.success){
    //     return {error:"Invalid data"}
    // }

    // const {email} = validatedFields.data;

    const existingUser = await getUserByClerkId(values.requestedById)
    const receiver = await getUserById(values.requestedForId)

    if (!existingUser || !receiver) {
        return { error: "userDoesnn't exist!" };
    }
    values.requestedById = existingUser.id;

    try {
      const apponitment=  await db.appointment.create({
            data: values
        })
        await sendAppointmentEmail(receiver.email,apponitment.id, existingUser.name,receiver.name,apponitment);

    } catch (e) {
        return { error: "Failed to create profile ! " }
    }


    return { success: "Appointment send successfully ! " }
}

interface PaginationOptions {
    page: number;
    pageSize: number;
    clerkId: string | null | undefined;
}
interface PaginationResponse {
    data: any;
    page: number;
    pageSize: number;
    totalPages: number;
    totalRequestedAppointments: number;
    error: String;
    userId?: string;
}

export const getRequestedAppointmentsWithPagenation = async (paginationOptions: PaginationOptions): Promise<PaginationResponse> => {
    try {

        const { page, pageSize, clerkId } = paginationOptions;
        const skip = (page - 1) * pageSize;

        const existingUser = await getUserByClerkId(clerkId ?? "")
        if (!existingUser) {
            return {
                data: [],
                page: 0,
                pageSize: 0,
                totalPages: 0,
                totalRequestedAppointments: 0,
                error: 'Error fetching employee data'
            };
        }

        const requestedById = existingUser.id
        const totalUsers = await db.appointment.count({
            where: {
                requestedById
            }
        });
        const totalPages = Math.ceil(totalUsers / pageSize);

        const users = await db.appointment.findMany({
            where: { requestedById },
            take: pageSize,
            skip: skip,
            include: {
                requestedFor: true,
                requestedBy:true

            }
        });

        return {
            data: users,
            page: page,
            userId:existingUser.id,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        return {
            data: [],
            page: 0,
            pageSize: 0,
            totalPages: 0,
            totalRequestedAppointments: 0,
            error: 'Error fetching employee data'
        };
    }
};



export const getReceivedAppointmentsWithPagenation = async (paginationOptions: PaginationOptions): Promise<PaginationResponse> => {
    try {

        const { page, pageSize, clerkId } = paginationOptions;
        const skip = (page - 1) * pageSize;

        const existingUser = await getUserByClerkId(clerkId ?? "")
        if (!existingUser) {
            return {
                data: [],
                page: 0,
                pageSize: 0,
                totalPages: 0,
                totalRequestedAppointments: 0,
                error: 'Error fetching employee data'
            };
        }

        const requestedForId = existingUser.id
        const totalUsers = await db.appointment.count({
            where: {
                requestedForId
            }
        });
        const totalPages = Math.ceil(totalUsers / pageSize);

        const users = await db.appointment.findMany({
            where: { requestedForId },
            take: pageSize,
            skip: skip,
            include: {
                requestedFor: true,
                requestedBy:true
            }
        });

        return {
            data: users,
            page: page,
            userId:existingUser.id,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        return {
            data: [],
            page: 0,
            pageSize: 0,
            totalPages: 0,
            totalRequestedAppointments: 0,
            error: 'Error fetching employee data'
        };
    }
};


export const upcommingAppointments = async (paginationOptions: PaginationOptions): Promise<PaginationResponse> => {
    try {

        const { page, pageSize, clerkId } = paginationOptions;
        const skip = (page - 1) * pageSize;

        const existingUser = await getUserByClerkId(clerkId ?? "")
        if (!existingUser) {
            return {
                data: [],
                page: 0,
                pageSize: 0,
                totalPages: 0,
                totalRequestedAppointments: 0,
                error: 'Error fetching employee data'
            };
        }

        const requestedForId = existingUser.id
        const requestedById = existingUser.id

        const today = new Date();

        const totalUsers = await db.appointment.count({
            where: {
                OR: [
                    { requestedForId },
                    { requestedById }
                ],
                appointmentDate: {
                    gt: today,
                },
            }
        });
        const totalPages = Math.ceil(totalUsers / pageSize);

        const users = await db.appointment.findMany({
            where: {
                OR: [
                    { requestedForId },
                    { requestedById }
                ],
                appointmentDate: {
                    gt: today,
                },
            },
            take: pageSize,
            skip: skip,
            include: {
                requestedFor: true,
                requestedBy:true

            }
        });

        return {
            data: users,
            userId:existingUser.id,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        return {
            data: [],
            page: 0,
            pageSize: 0,
            totalPages: 0,
            totalRequestedAppointments: 0,
            error: 'Error fetching employee data'
        };
    }
};

export const pastAppointments = async (paginationOptions: PaginationOptions): Promise<PaginationResponse> => {
    try {

        const { page, pageSize, clerkId } = paginationOptions;
        const skip = (page - 1) * pageSize;

        const existingUser = await getUserByClerkId(clerkId ?? "")
        if (!existingUser) {
            return {
                data: [],
                page: 0,
                pageSize: 0,
                totalPages: 0,
                totalRequestedAppointments: 0,
                error: 'Error fetching employee data'
            };
        }

        const requestedForId = existingUser.id
        const requestedById = existingUser.id

        const today = new Date();

        const totalUsers = await db.appointment.count({
            where: {
                OR: [
                    { requestedForId },
                    { requestedById }
                ],
                appointmentDate: {
                    lt: today,
                },
            }
        });
        const totalPages = Math.ceil(totalUsers / pageSize);

        const users = await db.appointment.findMany({
            where: {
                OR: [
                    { requestedForId },
                    { requestedById }
                ],
                appointmentDate: {
                    lt: today,
                },
            },
            take: pageSize,
            skip: skip,
            include: {
                requestedFor: true,
                requestedBy:true

            }
        });

        return {
            data: users,
            page: page,
            userId:existingUser.id,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        return {
            data: [],
            page: 0,
            pageSize: 0,
            totalPages: 0,
            totalRequestedAppointments: 0,
            error: 'Error fetching employee data'
        };
    }
};

export const confirmAppointment = async (appointmentId:string)=>{
    try{
        const appointment = await db.appointment.update({
            where: {
              id: appointmentId
            },
            data: {
             status:"CONFIRMED"
            }, 
            include: {
                requestedFor: true,
                requestedBy:true

            }
          })
          await sendAppointmentConfirmedEmail(appointment);

        return { success: "Appointment Confirmed successfully ! " ,appointment}
        ;
    }catch(e){
        return { error: "Error Confirming appointment " }

    }
 }