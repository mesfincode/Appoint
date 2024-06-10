import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
    const { user } = useUser()
    const [firstName, setFirstName] = useState<string | undefined | null>("")
    const [lastName, setLastName] = useState<string | undefined | null>("")
    const [clerkId, setClerkId] = useState<string | undefined | null>("")
    const [profileUrl, setProfileUrl] = useState<string | undefined | null>("")
    const [email, setEmail] = useState<string | undefined | null>("")
    // const firstName = user?.firstName




    useEffect(() => {
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setClerkId(user?.id)
        setProfileUrl(user?.imageUrl)
        setEmail(user?.primaryEmailAddress?.emailAddress)
    }, [user])
    return { firstName, lastName, clerkId, profileUrl, email }
}