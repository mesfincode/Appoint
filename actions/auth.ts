"use server"
import { db } from "@/lib/db";
import { ProfileSchema, RegisterSchema } from "@/validators";
import bcrypt from "bcryptjs"

export const register = async ( values: any)=>{
    const validatedFields = ProfileSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid data"}
    }



  try{
    await db.user.create({
      data: values
     })
  }catch(e){
    return {error:"Failed to create profile ! "}
  }


    return {success:"Profile created successfully ! "}
}