import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
    const { user } = useUser()
    const [firstName, setFirstName] = useState<string | undefined | null>("")
    const [lastName, setLastName] = useState<string | undefined | null>("")
    const [id, setId] = useState<string | undefined | null>("")
    const [imageUrl, setImageUrl] = useState<string | undefined | null>("")
    const [email, setEmail] = useState<string | undefined | null>("")
    // const firstName = user?.firstName




    useEffect(() => {
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setId(user?.id)
        setImageUrl(user?.imageUrl)
        setEmail(user?.primaryEmailAddress?.emailAddress)
    }, [user])
    return { firstName, lastName, id, imageUrl, email }
}