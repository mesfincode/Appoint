"use server"

import { getUserByClerkId } from "@/data/user";
import { db } from "@/lib/db";
import { AppointmentSchema } from "@/validators";
import { Appointment } from "@prisma/client";

export const createAppointment = async (values: any) => {
    console.log(values)
    const validatedFields = AppointmentSchema.safeParse(values);

    // if(!validatedFields.success){
    //     return {error:"Invalid data"}
    // }

    // const {email} = validatedFields.data;

    const existingUser = await getUserByClerkId(values.requestedById)
    if (!existingUser) {
        return { error: "userDoesnn't exist!" };
    }
    values.requestedById = existingUser.id;

    try {
        await db.appointment.create({
            data: values
        })
    } catch (e) {
        console.log(e)
        return { error: "Failed to create profile ! " }
    }
    //   TODO send verification token email

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(verificationToken.email,verificationToken.token);

    return { success: "Profile created successfully ! " }
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
        console.log(requestedById)
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
                requestedFor: true
            }
        });
        console.log(users)

        return {
            data: users,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        console.error('Error fetching employee data:', error);
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
        console.log(requestedForId)
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
                requestedFor: true
            }
        });
        console.log(users)

        return {
            data: users,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        console.error('Error fetching employee data:', error);
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

        console.log(requestedForId)
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
                requestedFor: true
            }
        });
        console.log(users)

        return {
            data: users,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRequestedAppointments: totalUsers,
            error: "",
        };
    } catch (error) {
        console.error('Error fetching employee data:', error);
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