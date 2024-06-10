"use server"

import { db } from "@/lib/db";

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

export const getUserById = async (id:string)=>{
    try{
        const user = await db.user.findUnique({where:{id}});
        
        return user;

    }catch{
        return null;
    }
}