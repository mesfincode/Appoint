"use server"
import { db } from "@/lib/db";
import { RegisterSchema } from "@/validators";
import bcrypt from "bcryptjs"

export const register = async (values: any)=>{
    console.log(values)
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid data"}
    }

    const {email, password, username} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where:{
        email
    }
  });
  if(existingUser){
    return {error: "Email already in use!"};
  }

  await db.user.create({
    data:{
        name:username,email,password:hashedPassword
    }
  })
//   TODO send verification token email

// const verificationToken = await generateVerificationToken(email);
// await sendVerificationEmail(verificationToken.email,verificationToken.token);

    return {success:"Confirmation email sent! "}
}