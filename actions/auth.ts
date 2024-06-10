"use server"
import { db } from "@/lib/db";
import { ProfileSchema, RegisterSchema } from "@/validators";
import bcrypt from "bcryptjs"
import { error } from "console";

export const register = async ( values: any)=>{
    console.log(values)
    const validatedFields = ProfileSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid data"}
    }

    // const {email} = validatedFields.data;

  // const existingUser = await db.user.findUnique({
  //   where:{
  //       email
  //   }
  // });
  // if(existingUser){
  //   return {error: "Email already in use!"};
  // }

  try{
    await db.user.create({
      data: values
     })
  }catch(e){
    console.log(e)
    return {error:"Failed to create profile ! "}
  }
//   TODO send verification token email

// const verificationToken = await generateVerificationToken(email);
// await sendVerificationEmail(verificationToken.email,verificationToken.token);

    return {success:"Profile created successfully ! "}
}