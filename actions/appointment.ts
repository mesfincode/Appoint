"use server"

import { getUserByClerkId } from "@/data/user";
import { db } from "@/lib/db";
import { AppointmentSchema } from "@/validators";

export const createAppointment = async ( values: any)=>{
    console.log(values)
    const validatedFields = AppointmentSchema.safeParse(values);

    // if(!validatedFields.success){
    //     return {error:"Invalid data"}
    // }

    // const {email} = validatedFields.data;

  const existingUser = await getUserByClerkId(values.requestedForId)
  if(!existingUser){
    return {error: "userDoesnn't exist!"};
  }
  values.requestedForId= existingUser.id;

  try{
    await db.appointment.create({
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