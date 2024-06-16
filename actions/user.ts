"use server"

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email:string)=>{
    try{

        const user = await db.user.findUnique({where:{email}});
        return user;
    }catch{
        return null;
    }
}
export const getUserByClerkId = async (clerkId:string)=>{
  try{
      const user = await db.user.findFirst({
       where: {clerkId}
      })
      return user;
  }catch{
   return null;  
  }
}
export const getUserById = async (id:string)=>{
  try{
      const user = await db.user.findUnique({where:{id}});
      
      return user;

  }catch{
      return null;
  }
}
interface PaginationOptions {
    page: number;
    pageSize: number;
  }
interface PaginationResponse {
    data: User[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalUsers: number;
    error:String;
  }

export const getServiceProviderWithPagination = async (paginationOptions: PaginationOptions): Promise<PaginationResponse> =>{
    try {
      const { page, pageSize } = paginationOptions;
      const skip = (page - 1) * pageSize;
  
      const totalUsers = await db.user.count();
      const totalPages = Math.ceil(totalUsers / pageSize);
  
      const users = await db.user.findMany({
        take: pageSize,
        skip: skip,
      });
  
      return {
        data: users,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalUsers: totalUsers,
        error:"",
      };
    } catch (error) {
      return { 
        data: [],
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalUsers: 0,
        error: 'Error fetching employee data' };
    } 
  };

  export const getFilteredUsers = async ( 
     searchString: string = '',
    page: number = 1,
    pageSize: number = 10): Promise<PaginationResponse> =>{
    try {
      // const { page, pageSize } = paginationOptions;
      const skip = (page - 1) * pageSize;
  
      const totalUsers = await db.user.count({
        where: {
          OR: [
            { name: { contains: searchString, mode: 'insensitive' } },
            // { lastName: { contains: searchString, mode: 'insensitive' } },
            { email: { contains: searchString, mode: 'insensitive' } },
  
            { phone: { contains: searchString, mode: 'insensitive' } },
            { companyName: { contains: searchString, mode: 'insensitive' } },

            // Add more fields as needed
          ],
        },
      });
      const totalPages = Math.ceil(totalUsers / pageSize);
  
      const users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: searchString, mode: 'insensitive' } },
            // { lastName: { contains: searchString, mode: 'insensitive' } },
            { email: { contains: searchString, mode: 'insensitive' } },
  
            { phone: { contains: searchString, mode: 'insensitive' } },
            { companyName: { contains: searchString, mode: 'insensitive' } },

            // Add more fields as needed
          ],
        },
        take: pageSize,
        skip: skip,
      });
  
      return {
        data: users,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalUsers: totalUsers,
        error:"",
      };
    } catch (error) {
      return { 
        data: [],
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalUsers: 0,
        error: 'Error fetching employee data' };
    } 
  };

  export const updateUserProfile = async (email:string,data:any)=>{
    try{
        const appointment = await db.user.update({
            where: {
              email: email
            },
            data
           
          })
          // await sendAppointmentConfirmedEmail(appointment);

        return { success: "Profile Updated successfully ! " ,appointment}
        ;
    }catch(e){
        return { error: "Profile Update Error " }

    }
 }