import { useUser } from "@clerk/nextjs"

export const useCurrentUser =()=>{
    const {user} = useUser()
    const firstName = user?.firstName
    const lastName = user?.lastName
    const id = user?.id
    const imageUrl = user?.imageUrl
    const email = user?.primaryEmailAddress?.emailAddress

    return {firstName,lastName,id,imageUrl,email}
}