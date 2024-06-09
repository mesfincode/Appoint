import { db } from "@/lib/db";

export const getAccountByUserId = async (userId:string)=>{
   try{
       const account = await db.appointment.findFirst({
        where: {}
       })
       return account;
   }catch{
    return null;  
   }
}