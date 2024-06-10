"use server"

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email:string)=>{
    try{
        console.log("user email ==",email)

        const user = await db.user.findUnique({where:{email}});
        console.log("user date",user)
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
      console.error('Error fetching employee data:', error);
      return { 
        data: [],
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalUsers: 0,
        error: 'Error fetching employee data' };
    } 
  };
export const getUserById = async (id:string)=>{
    try{
        const user = await db.user.findUnique({where:{id}});
        
        return user;

    }catch{
        return null;
    }
}